import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const SHOW_AFTER_SCROLL = 0.8; // viewport heights
const HIDE_NEAR_BOTTOM_SELECTOR = "#final-cta, footer";

export function StickyBookingCTA() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Only render on the homepage
  if (location.pathname !== "/") return null;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const threshold = vh * SHOW_AFTER_SCROLL;

      let shouldShow = scrolled > threshold;

      if (shouldShow) {
        const hideTargets = document.querySelectorAll(HIDE_NEAR_BOTTOM_SELECTOR);
        for (const el of hideTargets) {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.85) {
            shouldShow = false;
            break;
          }
        }
      }

      setVisible(shouldShow);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`sticky-cta-enter fixed bottom-24 md:bottom-8 left-1/2 z-[80] pointer-events-none ${
        visible ? "is-visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <Link
        to="/reservas"
        className={`sticky-cta-pill pointer-events-auto relative inline-flex items-center gap-3 md:gap-4 pl-4 md:pl-5 pr-2 md:pr-2.5 py-2 md:py-2.5 rounded-full glass-dark-luxe border border-gold/25 shadow-premium ${
          visible ? "" : "pointer-events-none"
        }`}
      >
        <span className="flex items-center gap-2 md:gap-2.5">
          <span className="sticky-cta-dot shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline label-mini text-[8px] md:text-[9px] text-sand/65 tracking-[0.25em] font-semibold">
            Disponibilidad en directo
          </span>
        </span>

        <span className="h-4 w-px bg-sand/15 hidden sm:block" aria-hidden="true" />

        <span className="font-serif text-sand text-[13px] md:text-[15px] leading-none whitespace-nowrap">
          Comprobar fechas
        </span>

        <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold text-earth shadow-gold transition-transform duration-500 group-hover:translate-x-0.5">
          <ArrowUpRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.25} />
        </span>
      </Link>
    </div>
  );
}
