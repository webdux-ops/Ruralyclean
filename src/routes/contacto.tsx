import { useEffect, useRef, useState } from "react";

import { NatureBackground } from "@/components/NatureBackground";
import { SiteShell } from "@/components/SiteShell";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Ruraly Hoz" },
      { name: "description", content: "Contacta con Ruraly Hoz para reservas, consultas o experiencias a medida en Rute, Córdoba." },
      { property: "og:title", content: "Contacto — Ruraly Hoz" },
      { property: "og:description", content: "Reservas y consultas para Ruraly Hoz." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

// Custom hook for reveal animations
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated counter for numbers
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
}

function ContactoPage() {
  const headerRef = useReveal();
  const contentRef = useReveal();

  return (
    <SiteShell>
      <NatureBackground />
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-olive/[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div ref={headerRef.ref as any} className="relative z-10 w-full">
          <div className={`transition-all duration-1000 ease-out ${headerRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gold/50" />
              <span className="label-mini text-gold font-semibold tracking-[0.35em] text-[10px]">CONTACTO</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance max-w-4xl">
              Estamos aquí
              <span className="italic text-gold relative inline-block">
                para ti
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4 Q50 0 100 4 T200 4" stroke="var(--gold)" strokeWidth="2" fill="none" className="animate-draw" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl text-earth/60 leading-relaxed text-lg md:text-xl font-light">
              Hablemos de tu próxima escapada. Estamos aquí para acompañarte en cada detalle
              y hacer que tu experiencia en Ruraly Hoz sea inolvidable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section ref={contentRef.ref as any} className="px-6 md:px-10 max-w-7xl mx-auto pb-32">
        <div className={`transition-all duration-1000 ease-out delay-300 ${contentRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            {/* Contact Info */}
            <div className="md:col-span-5 space-y-12">
              <div className="space-y-8 pt-8 border-t border-earth/10">
                <Item label="Ubicación" value="Rute, Córdoba, España" />
                <Item label="Email" value={<a href="mailto:ruralyhoz@icloud.com" className="hover:text-gold transition-colors duration-300">ruralyhoz@icloud.com</a>} />
                <Item label="Teléfono" value={<a href="tel:+34627436424" className="hover:text-gold transition-colors duration-300">+34 627 43 64 24</a>} />
                <Item
                  label="Síguenos"
                  value={
                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href="https://www.instagram.com/ruraly_hoz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-12 h-12 rounded-full border border-earth/20 hover:border-gold text-earth hover:text-sand hover:bg-gold transition-all duration-300 flex items-center justify-center motion-safe:hover:scale-110 shadow-premium hover:shadow-2xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      <a
                        href="https://www.tiktok.com/@ruraly_hoz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="w-12 h-12 rounded-full border border-earth/20 hover:border-gold text-earth hover:text-sand hover:bg-gold transition-all duration-300 flex items-center justify-center motion-safe:hover:scale-110 shadow-premium hover:shadow-2xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/p/Ruraly-Hoz-61562287632721/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-12 h-12 rounded-full border border-earth/20 hover:border-gold text-earth hover:text-sand hover:bg-gold transition-all duration-300 flex items-center justify-center motion-safe:hover:scale-110 shadow-premium hover:shadow-2xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </div>
                  }
                />
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Gracias. Te contactamos en breve."); }}
              className="md:col-span-7 grid gap-8 bg-sand p-8 md:p-12 rounded-3xl shadow-premium"
            >
              <Field label="Nombre"><input required className="form-input" type="text" /></Field>
              <Field label="Email"><input required className="form-input" type="email" /></Field>
              <Field label="Fechas estimadas"><input className="form-input" type="text" placeholder="Ej. 12–15 junio" /></Field>
              <Field label="Mensaje"><textarea required rows={5} className="form-input resize-none" /></Field>
              <button
                type="submit"
                className="label-mini bg-earth text-sand px-8 py-4 justify-self-start hover:bg-gold hover:text-earth transition-all duration-300 rounded-full shadow-premium hover:shadow-2xl"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(26,25,23,0.15);
          padding: 16px 0;
          font-family: var(--font-sans);
          color: var(--earth);
          outline: none;
          transition: border-color .3s ease;
        }
        .form-input:focus { border-color: var(--gold); }
      `}</style>
    </SiteShell>
  );
}

function Item({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="label-mini text-earth/40">{label}</div>
      <div className="mt-2 text-earth">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-mini text-earth/50 block mb-2">{label}</span>
      {children}
    </label>
  );
}
