import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  start?: number;
  className?: string;
}

export function CountUp({
  to,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  start = 0,
  className,
}: CountUpProps) {
  const [value, setValue] = useState<number>(start);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            let rafId: number;
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(start + (to - start) * eased);
              if (progress < 1) rafId = requestAnimationFrame(tick);
              else setValue(to);
            };
            rafId = requestAnimationFrame(tick);
            observer.unobserve(entry.target);
            return () => cancelAnimationFrame(rafId);
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, start]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
