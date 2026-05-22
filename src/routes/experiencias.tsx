import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { NatureBackground } from "@/components/NatureBackground";
import { SiteShell } from "@/components/SiteShell";
import expAceite from "@/assets/exp-aceite.jpg";
import expRelax from "@/assets/exp-relax.jpg";
import expRomantico from "@/assets/exp-romantico.jpg";
import expSenderismo from "@/assets/exp-senderismo.jpg";
import heroVilla from "@/assets/hero-villa.jpg";
import philosophy from "@/assets/philosophy-detail.jpg";

export const Route = createFileRoute("/experiencias")({
  head: () => ({
    meta: [
      { title: "Experiencias — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Experiencias premium en Rute y la Subbética cordobesa: cata de aceite, senderismo, cenas privadas y bienestar.",
      },
      { property: "og:title", content: "Experiencias — Ruraly Hoz" },
      { property: "og:description", content: "Experiencias de autor en Rute, Córdoba." },
      { property: "og:url", content: "/experiencias" },
    ],
    links: [{ rel: "canonical", href: "/experiencias" }],
  }),
  component: ExperienciasPage,
});

const experiences = [
  { 
    img: expAceite, 
    title: "Cata de aceite de oliva", 
    tag: "Gastronomía", 
    desc: "Visita guiada a almazara local con cata de variedades centenarias.",
    duration: "2-3 horas",
    accent: "gold"
  },
  { 
    img: expSenderismo, 
    title: "Senderismo Subbético", 
    tag: "Naturaleza", 
    desc: "Rutas privadas por el Parque Natural de las Sierras Subbéticas.",
    duration: "4-6 horas",
    accent: "olive"
  },
  { 
    img: expRomantico, 
    title: "Cena privada al atardecer", 
    tag: "Romántico", 
    desc: "Mesa íntima en patio andaluz, menú degustación con chef.",
    duration: "3-4 horas",
    accent: "water"
  },
  { 
    img: expRelax, 
    title: "Ritual de bienestar", 
    tag: "Relax", 
    desc: "Baño aromático, masaje a domicilio y meditación al amanecer.",
    duration: "2-3 horas",
    accent: "water"
  },
  { 
    img: heroVilla, 
    title: "Patrimonio de Córdoba", 
    tag: "Cultura", 
    desc: "Conductor privado a Córdoba, Mezquita y Medina Azahara.",
    duration: "Día completo",
    accent: "gold"
  },
  { 
    img: philosophy, 
    title: "Slow living en casa", 
    tag: "Calma", 
    desc: "Día sin agenda: piscina, lectura y siesta entre olivares.",
    duration: "Día completo",
    accent: "olive"
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

function ExperienciasPage() {
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
              <span className="label-mini text-gold font-semibold tracking-[0.35em] text-[10px]">VIVIR RUTE</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance max-w-4xl">
              Experiencias<br />
              <span className="italic text-gold relative inline-block">
                de autor
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4 Q50 0 100 4 T200 4" stroke="var(--gold)" strokeWidth="2" fill="none" className="animate-draw" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl text-earth/60 leading-relaxed text-lg md:text-xl font-light">
              Comisariadas con productores y guías locales para que vivas
              Andalucía con calma, sin postales. Cada experiencia es única,
              diseñada para conectar con la esencia de la Subbética.
            </p>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <AnimatedCounter end={6} />
                <span className="text-earth/40 text-sm">Experiencias</span>
              </div>
              <div className="h-8 w-px bg-earth/10" />
              <div className="flex items-center gap-3">
                <AnimatedCounter end={100} />
                <span className="text-earth/40 text-sm">% Local</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Grid Section */}
      <section ref={gridRef.ref as any} className="px-6 md:px-10 max-w-7xl mx-auto pb-32">
        <div className={`transition-all duration-1000 ease-out delay-300 ${gridRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.title} experience={exp} index={index} />
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
              ¿Listo para<br />
              <span className="italic text-gold">vivir Rute?</span>
            </h2>
            <p className="text-sand/70 max-w-xl mx-auto mb-10 text-lg">
              Reserva tus experiencias y descubre la auténtica Subbética cordobesa.
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

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const cardRef = useReveal();
  const [isHovered, setIsHovered] = useState(false);

  const accentColors = {
    gold: "from-gold/20 to-transparent",
    olive: "from-olive/20 to-transparent",
    water: "from-water/20 to-transparent",
  };

  return (
    <article
      ref={cardRef.ref as any}
      className={`group relative transition-all duration-1000 ease-out ${
        cardRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-sand shadow-premium hover:shadow-2xl transition-all duration-700">
        {/* Image container with parallax effect */}
        <div className="relative aspect-[5/4] overflow-hidden">
          <img
            src={experience.img}
            alt={experience.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${accentColors[experience.accent as keyof typeof accentColors]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          {/* Floating badge */}
          <div className="absolute top-6 right-6 bg-sand/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="label-mini text-olive font-semibold">{experience.duration}</span>
          </div>

          {/* Tag overlay on hover */}
          <div className="absolute top-6 left-6 transform translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <span className="text-xs bg-sand/90 backdrop-blur-sm text-earth px-3 py-1 rounded-full">
              {experience.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <span className="label-mini text-olive">{experience.tag}</span>
            <h3 className="font-serif text-2xl md:text-3xl text-earth leading-tight mt-2 group-hover:text-gold transition-colors duration-300">
              {experience.title}
            </h3>
          </div>
          
          <p className="text-earth/60 leading-relaxed max-w-md">
            {experience.desc}
          </p>

          <div className="mt-6 pt-4 border-t border-earth/10 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-semibold">Más información</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
