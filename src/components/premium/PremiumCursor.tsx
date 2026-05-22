import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, select, textarea, summary, label[for], .premium-hoverable';

export function PremiumCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!supportsFinePointer || reducedMotion) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.documentElement.classList.add("premium-cursor-enabled");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    let frame = 0;
    let visible = false;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      ring.classList.toggle("is-hidden", !next);
      dot.style.opacity = next ? "1" : "0";
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      setVisible(true);
    };

    const handleLeaveWindow = () => setVisible(false);
    const handleEnterWindow = () => setVisible(true);
    const handleDown = () => ring.classList.add("is-pressed");
    const handleUp = () => ring.classList.remove("is-pressed");

    const handleHoverOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el && el.closest(HOVER_SELECTOR)) {
        ring.classList.add("is-hover");
      }
    };
    const handleHoverOut = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el && el.closest(HOVER_SELECTOR)) {
        ring.classList.remove("is-hover");
      }
    };

    const animate = () => {
      const lerp = 0.18;
      ringPos.x += (target.x - ringPos.x) * lerp;
      ringPos.y += (target.y - ringPos.y) * lerp;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeaveWindow);
    window.addEventListener("mouseenter", handleEnterWindow);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleHoverOver);
    document.addEventListener("mouseout", handleHoverOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeaveWindow);
      window.removeEventListener("mouseenter", handleEnterWindow);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleHoverOver);
      document.removeEventListener("mouseout", handleHoverOut);
      document.documentElement.classList.remove("premium-cursor-enabled");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="premium-cursor is-hidden" aria-hidden="true">
        <div className="premium-cursor__ring" />
      </div>
      <div ref={dotRef} className="premium-cursor__dot" aria-hidden="true" />
    </>
  );
}
