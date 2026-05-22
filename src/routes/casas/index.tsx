import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { NatureBackground } from "@/components/NatureBackground";
import { SiteShell } from "@/components/SiteShell";
import casaCascada from "@/assets/casa-cascada.jpg";
import casaFilm from "@/assets/casa-film.jpg";
import casaMar from "@/assets/casa-mar.jpg";

export const Route = createFileRoute("/casas/")({
  head: () => ({
    meta: [
      { title: "Las Casas — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Descubre nuestras tres casas rurales premium en Rute, Córdoba: La Casa de la Cascada, Casa del Mar y Film Studio.",
      },
      { property: "og:title", content: "Las Casas — Ruraly Hoz" },
      { property: "og:description", content: "Tres refugios de lujo rural en Rute, Córdoba." },
      { property: "og:url", content: "/casas" },
    ],
    links: [{ rel: "canonical", href: "/casas" }],
  }),
  component: CasasIndex,
});

const houses = [
  {
    href: "/casas/cascada",
    title: "La Casa de la Cascada",
    tagline: "Agua, piedra y romanticismo salvaje",
    image: casaCascada,
    price: "Desde 240 € / noche",
    capacity: "1–4 huéspedes",
    features: ["Jacuzzi privado", "Chimenea", "Vistas al valle"],
    accent: "water",
  },
  {
    href: "/casas/mar",
    title: "Casa del Mar",
    tagline: "Luz infinita y aires mediterráneos",
    image: casaMar,
    price: "Desde 190 € / noche",
    capacity: "1-6 huéspedes",
    features: ["Terraza solarium", "Piscina", "Cocina gourmet"],
    accent: "gold",
  },
  {
    href: "/casas/film",
    title: "Film Studio",
    tagline: "Sala de cine privada bajo las estrellas",
    image: casaFilm,
    price: "Desde 260 € / noche",
    capacity: "1–2 huéspedes",
    features: ["Proyector 4K", "Sonido Dolby", "Bar privado"],
    accent: "olive",
  },
];

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

function CasasIndex() {
  const headerRef = useReveal();
  const gridRef = useReveal();

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
              <span className="label-mini text-gold font-semibold tracking-[0.35em] text-[10px]">COLECCIÓN EXCLUSIVA</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance max-w-4xl">
              Nuestros<br />
              <span className="italic text-gold relative inline-block">
                refugios
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4 Q50 0 100 4 T200 4" stroke="var(--gold)" strokeWidth="2" fill="none" className="animate-draw" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl text-earth/60 leading-relaxed text-lg md:text-xl font-light">
              Tres santuarios diseñados para reconectar. Cada casa es una experiencia única, 
              donde el lujo se encuentra con la naturaleza más pura de la Subbética cordobesa.
            </p>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <AnimatedCounter end={3} />
                <span className="text-earth/40 text-sm">Casas Premium</span>
              </div>
              <div className="h-8 w-px bg-earth/10" />
              <div className="flex items-center gap-3">
                <AnimatedCounter end={12} />
                <span className="text-earth/40 text-sm">Huéspedes máx.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Grid Section */}
      <section ref={gridRef.ref as any} className="px-6 md:px-10 max-w-7xl mx-auto pb-32">
        <div className={`transition-all duration-1000 ease-out delay-300 ${gridRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {houses.map((house, index) => (
              <HouseCard key={house.href} house={house} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-earth to-olive-deep rounded-3xl p-12 md:p-20 overflow-hidden">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 text-center">
            <h2 className="font-serif text-4xl md:text-6xl text-sand leading-tight mb-6">
              ¿Listo para tu<br />
              <span className="italic text-gold">escapada?</span>
            </h2>
            <p className="text-sand/70 max-w-xl mx-auto mb-10 text-lg">
              Reserva ahora y descubre la magia de la Subbética cordobesa.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-gold text-earth px-8 py-4 rounded-full font-semibold hover:bg-sand transition-all duration-300 group"
            >
              <span>Volver al inicio</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function HouseCard({ house, index }: { house: typeof houses[0]; index: number }) {
  const cardRef = useReveal();
  const [isHovered, setIsHovered] = useState(false);

  const accentColors = {
    water: "from-water/20 to-transparent",
    gold: "from-gold/20 to-transparent",
    olive: "from-olive/20 to-transparent",
  };

  return (
    <Link
      to={house.href}
      ref={cardRef.ref as any}
      className={`group relative block transition-all duration-1000 ease-out ${
        cardRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-sand shadow-premium hover:shadow-2xl transition-all duration-700">
        {/* Image container with parallax effect */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={house.image}
            alt={house.title}
            width={1280}
            height={1600}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${accentColors[house.accent as keyof typeof accentColors]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          {/* Floating badge */}
          <div className="absolute top-6 right-6 bg-sand/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="label-mini text-earth font-semibold">{house.price}</span>
          </div>

          {/* Features overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <div className="flex flex-wrap gap-2">
              {house.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-sand/90 backdrop-blur-sm text-earth px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <h3 className="font-serif text-2xl md:text-3xl text-earth leading-tight group-hover:text-gold transition-colors duration-300">
              {house.title}
            </h3>
            <p className="font-serif italic text-earth/60 mt-2 text-lg">
              {house.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-earth/10">
            <div>
              <span className="label-mini text-earth/40 block">{house.capacity}</span>
              <span className="font-serif text-lg text-earth font-semibold mt-0.5 block">{house.price}</span>
            </div>
            <div className="flex items-center gap-2 text-gold transition-all duration-300">
              <span className="text-sm font-semibold">Descubrir</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
