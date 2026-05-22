import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

const NAV = [
  { to: "/", label: "Inicio", short: "00" },
  { to: "/casas", label: "Casas", short: "01" },
  { to: "/experiencias", label: "Experiencias", short: "02" },
  { to: "/galeria", label: "Galería", short: "03" },
  { to: "/contacto", label: "Contacto", short: "04" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const showDark = scrolled || !isHome;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? y / docHeight : 0;
      setScrollPct(Math.min(1, Math.max(0, pct)));
      rafRef.current = null;
    };
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(compute);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Re-evaluate scroll state on every route change — the router may reset
  // scrollY to 0 without firing a native scroll event, leaving stale state.
  useEffect(() => {
    const y = window.scrollY;
    setScrolled(y > 24);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? y / docHeight : 0;
    setScrollPct(Math.min(1, Math.max(0, pct)));
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      {/* Top scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none origin-left"
        style={{
          transform: `scaleX(${scrollPct})`,
          background:
            "linear-gradient(90deg, rgba(212,175,55,0.0) 0%, rgba(212,175,55,0.85) 35%, rgba(245,214,118,1) 100%)",
          transition: "transform 80ms linear",
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          isHome && scrolled
            ? "bg-sand/90 backdrop-blur-md shadow-premium border-b border-earth/5 py-3"
            : showDark
            ? "glass-luxe shadow-premium border-b border-earth/5 py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-[1500px] flex items-center justify-between px-6 md:px-10 gap-6">
          {/* Logo with subtitle */}
          <Link
            to="/"
            className={`group flex flex-col leading-none transition-all duration-500 ${
              showDark ? "text-earth" : "text-sand"
            }`}
            onClick={() => setOpen(false)}
            aria-label="Ruraly Hoz · Inicio"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.28em] uppercase flex items-center gap-1.5">
              <span>Ruraly Hoz</span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                  showDark ? "bg-olive" : "bg-gold"
                }`}
              />
            </span>
            <span
              className={`label-mini text-[8px] md:text-[9px] tracking-[0.35em] mt-1 transition-all duration-500 ${
                showDark ? "opacity-0 max-h-0" : "opacity-60 max-h-4"
              } overflow-hidden`}
            >
              Escapas de autor · Córdoba
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11 label-mini">
            {NAV.slice(1).map((n) => {
              const isActive = location.pathname.startsWith(n.to) && n.to !== "/";
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`group relative py-2 transition-colors duration-500 ${
                    isActive
                      ? showDark
                        ? "text-earth font-semibold"
                        : "text-sand font-semibold"
                      : showDark
                      ? "text-earth/65 hover:text-earth"
                      : "text-sand/80 hover:text-sand"
                  }`}
                >
                  <span className="relative inline-block">
                    {n.label}
                    {/* Underline grow on hover */}
                    <span
                      className={`absolute left-0 right-0 -bottom-1 h-[1.5px] origin-left transition-transform duration-500 ease-out ${
                        isActive ? "scale-x-100 bg-gold" : "scale-x-0 group-hover:scale-x-100 bg-gold/80"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Action area */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Best price guarantee — desktop only */}
            <div
              className={`hidden lg:flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full transition-all duration-500 ${
                showDark
                  ? "text-olive bg-olive/5 border border-olive/15"
                  : "text-sand/85 bg-sand/10 border border-sand/15"
              }`}
            >
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Mejor precio directo</span>
            </div>

            {/* Reservar CTA */}
            <span className="hidden sm:inline-flex btn-glow-wrap">
              <Link
                to="/reservas"
                className={`inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full font-semibold uppercase tracking-[0.22em] text-[10px] transition-all duration-500 group shadow-md ${
                  showDark
                    ? "bg-earth text-sand hover:bg-gold hover:text-earth hover:shadow-gold"
                    : "bg-sand text-earth hover:bg-gold hover:text-earth hover:shadow-gold"
                }`}
              >
                <span>Reservar</span>
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ${
                    showDark
                      ? "bg-gold/15 text-gold group-hover:bg-earth/20 group-hover:text-earth"
                      : "bg-earth/10 text-earth group-hover:bg-earth/15"
                  }`}
                >
                  <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </span>

            {/* Mobile menu trigger */}
            <button
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((o) => !o)}
              className={`md:hidden relative p-2.5 rounded-full transition-all duration-500 ${
                showDark
                  ? "text-earth hover:bg-earth/5"
                  : "text-sand hover:bg-sand/10"
              }`}
            >
              <span
                className="block w-5 h-5 relative"
                aria-hidden="true"
              >
                <Menu
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: backdrop + side panel */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-earth/40 backdrop-blur-sm cursor-default"
        />

        {/* Panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-[88%] max-w-[380px] bg-sand shadow-premium border-l border-earth/8 flex flex-col transition-transform duration-700 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "var(--ease-editorial)" }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-earth/8">
            <span className="font-serif text-base tracking-[0.3em] uppercase text-earth flex items-center gap-1.5">
              <span>Ruraly Hoz</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
            </span>
            <button
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="p-2 text-earth/60 hover:text-earth transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-7 py-8 flex flex-col">
            <span className="label-mini text-[9px] text-earth/40 tracking-[0.3em] font-semibold mb-5">
              Navegación
            </span>
            <ul className="space-y-1">
              {NAV.map((n, i) => {
                const isActive =
                  n.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(n.to);
                return (
                  <li
                    key={n.to}
                    style={{
                      transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                    }}
                    className={`transition-all duration-700 ${
                      open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                    }`}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline justify-between py-4 border-b border-earth/8 transition-colors duration-300 ${
                        isActive ? "text-earth" : "text-earth/65 hover:text-earth"
                      }`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-serif italic text-xs text-earth/30 w-6">
                          {n.short}
                        </span>
                        <span className="font-serif text-2xl tracking-tight">
                          {n.label}
                        </span>
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? "text-gold translate-x-1"
                            : "text-earth/30 group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Panel footer */}
          <div className="px-7 pb-8 pt-6 border-t border-earth/8 space-y-5 bg-sand-deep">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-semibold text-olive justify-center">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Garantía de Reserva Directa</span>
            </div>

            <Link
              to="/reservas"
              onClick={() => setOpen(false)}
              className="editorial-cta !flex !w-full !justify-center"
            >
              <span>Reservar estancia</span>
              <span className="arrow text-lg" aria-hidden="true">→</span>
            </Link>

            <a
              href="tel:+34627436424"
              className="block text-center"
            >
              <span className="label-mini text-[9px] text-earth/40 tracking-[0.25em] font-semibold uppercase block">
                Atención 24h · WhatsApp
              </span>
              <span className="font-serif text-lg text-earth font-medium tracking-wide mt-1 block">
                +34 627 43 64 24
              </span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
