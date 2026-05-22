import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface StickyBookingFooterProps {
  slug: "cascada" | "mar" | "film";
  title: string;
  price: string;
  capacity: string;
}

export function StickyBookingFooter({ slug, title, price, capacity }: StickyBookingFooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the main hero section (500px)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 px-6 py-4 md:py-5 border-t border-earth/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      } bg-white/90 backdrop-blur-lg shadow-[0_-15px_40px_-10px_rgba(26,25,23,0.1)]`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Left/Center: House descriptor & Price breakdown */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <span className="label-mini text-olive font-bold tracking-widest block">Estancia de Lujo</span>
            <h4 className="font-serif text-lg md:text-xl text-earth font-bold leading-tight mt-0.5">{title}</h4>
          </div>
          <div className="sm:border-l sm:border-earth/10 sm:pl-4">
            <span className="label-mini text-earth/40 block sm:hidden font-bold">Estancia</span>
            <span className="font-serif text-base font-medium text-earth/80 block sm:hidden">{title}</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-serif text-lg md:text-xl text-olive font-bold">{price}</span>
              <span className="text-[10px] text-earth/40 uppercase tracking-widest font-semibold font-sans hidden md:inline">· {capacity}</span>
            </div>
          </div>
        </div>

        {/* Right: Urgent Direct CTA Booking trigger */}
        <div>
          <Link
            to="/reservas"
            search={{ house: slug }}
            className="px-6 md:px-8 py-3 bg-gold hover:bg-gold-deep text-earth font-bold text-xs uppercase tracking-wider rounded-xl btn-hover-grow btn-shimmer shadow-gold inline-flex items-center gap-2 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <span>Reservar ahora</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
