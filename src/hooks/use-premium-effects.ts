import { useEffect } from "react";

const MAGNETIC_SELECTOR =
  ".editorial-cta, [data-magnetic]";
const PARALLAX_SELECTOR = ".editorial-image-frame";

type Cleanup = () => void;

function setupMagnetic(): Cleanup {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR)
  );
  const cleanups: Cleanup[] = [];

  for (const el of elements) {
    const strength = Number(el.dataset.magneticStrength ?? "0.35");
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animating = false;

    const animate = () => {
      const ease = 0.18;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px) translateZ(0)`;

      const settled =
        Math.abs(targetX - currentX) < 0.05 &&
        Math.abs(targetY - currentY) < 0.05;
      if (settled && targetX === 0 && targetY === 0) {
        el.style.transform = "translate(0, 0)";
        animating = false;
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(animate);
    };
    const ensureAnimating = () => {
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      targetX = dx * strength;
      targetY = dy * strength;
      ensureAnimating();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      ensureAnimating();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.transform = "";
    });
  }

  return () => cleanups.forEach((c) => c());
}

function setupParallax(): Cleanup {
  const frames = Array.from(
    document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR)
  );
  type Entry = { frame: HTMLElement; img: HTMLImageElement };
  const entries: Entry[] = [];

  for (const frame of frames) {
    const img = frame.querySelector<HTMLImageElement>("img");
    if (!img) continue;
    img.style.willChange = "transform";
    // Slight zoom-out so the parallax movement doesn't expose edges
    img.style.transformOrigin = "center center";
    entries.push({ frame, img });
  }

  if (!entries.length) return () => {};

  let rafId: number | null = null;
  const update = () => {
    const vh = window.innerHeight;
    for (const { frame, img } of entries) {
      const rect = frame.getBoundingClientRect();
      // Only animate if visible-ish
      if (rect.bottom < -200 || rect.top > vh + 200) continue;
      // Normalized progress: -1 (just entered from bottom) to 1 (about to exit at top)
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      // Translate up to ±18px (subtle)
      const offset = -clamped * 28;
      // Keep existing hover scale untouched: use translate3d
      img.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.06)`;
    }
    rafId = null;
  };

  const onScroll = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafId !== null) cancelAnimationFrame(rafId);
    for (const { img } of entries) {
      img.style.transform = "";
      img.style.willChange = "";
    }
  };
}

export function useGlobalPremiumEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let magneticCleanup: Cleanup | null = null;
    let parallaxCleanup: Cleanup | null = null;

    // Defer to next frame so the DOM is settled (route just rendered)
    const id = window.setTimeout(() => {
      if (supportsFinePointer) {
        magneticCleanup = setupMagnetic();
        parallaxCleanup = setupParallax();
      }
      // Skip parallax on touch devices — saves battery and avoids scroll jank
    }, 120);

    return () => {
      window.clearTimeout(id);
      magneticCleanup?.();
      parallaxCleanup?.();
    };
  }, []);
}
