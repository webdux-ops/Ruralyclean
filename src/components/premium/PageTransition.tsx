import { useLocation } from "@tanstack/react-router";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps the route Outlet with a fade-in animation on route change.
 *
 * IMPORTANT: the animation class is REMOVED as soon as the animation ends.
 * If we left it (with animation-fill-mode: both retaining transform/filter),
 * the wrapper would keep creating a containing block for `position: fixed`
 * descendants — breaking the custom cursor, sticky CTA, header and WhatsApp
 * float (they would anchor to the wrapper and scroll off-screen).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const hasMountedRef = useRef(false);
  const [entering, setEntering] = useState(false);

  // useLayoutEffect runs synchronously before paint, so the new keyed div
  // receives the page-enter class *before* its first frame is painted.
  useLayoutEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    setEntering(true);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={entering ? "page-enter" : ""}
      onAnimationEnd={() => setEntering(false)}
    >
      {children}
    </div>
  );
}
