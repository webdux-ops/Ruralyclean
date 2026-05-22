import { Link, createFileRoute } from "@tanstack/react-router";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NatureBackground } from "@/components/NatureBackground";
import { SiteShell } from "@/components/SiteShell";
import casaCascadaAlbercaNoche from "@/assets/casa-cascada-alberca-noche.jpg";
import casaCascadaBano from "@/assets/casa-cascada-bano.jpg";
import casaCascadaBano10 from "@/assets/casa-cascada-bano-10.jpg";
import casaCascadaBano11 from "@/assets/casa-cascada-bano-11.jpg";
import casaCascadaBano5 from "@/assets/casa-cascada-bano-5.jpg";
import casaCascadaBano6 from "@/assets/casa-cascada-bano-6.jpg";
import casaCascadaBano7 from "@/assets/casa-cascada-bano-7.jpg";
import casaCascadaBano8 from "@/assets/casa-cascada-bano-8.jpg";
import casaCascadaBano9 from "@/assets/casa-cascada-bano-9.jpg";
import casaCascadaCocina from "@/assets/casa-cascada-cocina.jpg";
import casaCascadaDormitorio from "@/assets/casa-cascada-dormitorio.jpg";
import casaCascadaFutbolin from "@/assets/casa-cascada-futbolin.jpg";
import casaCascadaJacuzzi from "@/assets/casa-cascada-jacuzzi.jpg";
import casaCascadaPiscina from "@/assets/casa-cascada-piscina.jpg";
import casaCascadaPiscinaNoche from "@/assets/casa-cascada-piscina-noche.jpg";
import casaCascadaSalon from "@/assets/casa-cascada-salon.jpg";
import casaCascadaTipi from "@/assets/casa-cascada-tipi.jpg";
import casaFilmBano10 from "@/assets/casa-mar-bano-10.jpg";
import casaFilmBano11 from "@/assets/casa-mar-bano-11.jpg";
import casaFilmBano12 from "@/assets/casa-mar-bano-12.jpg";
import casaFilmBano6 from "@/assets/casa-mar-bano-6.jpg";
import casaFilmBano7 from "@/assets/casa-mar-bano-7.jpg";
import casaFilmBano8 from "@/assets/casa-mar-bano-8.jpg";
import casaFilmBano9 from "@/assets/casa-mar-bano-9.jpg";
import casaFilmBanoArabe from "@/assets/casa-film-bano-arabe.jpg";
import casaFilmCocina from "@/assets/casa-film-cocina.jpg";
import casaFilmDormitorio from "@/assets/casa-film-dormitorio.jpg";
import casaFilmPiscina from "@/assets/casa-film-piscina.jpg";
import casaFilmTerraza from "@/assets/casa-film-terraza.jpg";
import casaMarBano1 from "@/assets/casa-mar-bano-1.jpg";
import casaMarBano13 from "@/assets/casa-mar-bano-13.jpg";
import casaMarBano2 from "@/assets/casa-mar-bano-2.jpg";
import casaMarBano3 from "@/assets/casa-mar-bano-3.jpg";
import casaMarBano4 from "@/assets/casa-mar-bano-4.jpg";
import casaMarBano5 from "@/assets/casa-mar-bano-5.jpg";
import casaMarBarcoPiscina from "@/assets/casa-mar-barco-piscina.jpg";
import casaMarCocina from "@/assets/casa-mar-cocina.jpg";
import casaMarDormitorio from "@/assets/casa-mar-dormitorio.jpg";
import casaMarDormitorio2 from "@/assets/casa-mar-dormitorio-2.jpg";
import casaMarDormitorio3 from "@/assets/casa-mar-dormitorio-3.jpg";
import casaMarFachada from "@/assets/casa-mar-fachada.jpg";
import casaMarJacuzzi from "@/assets/casa-mar-jacuzzi.jpg";
import casaMarPiscinaCesped from "@/assets/casa-mar-piscina-cesped.jpg";
import casaMarPiscinaNoche from "@/assets/casa-mar-piscina-noche.jpg";
import casaMarPorche from "@/assets/casa-mar-porche.jpg";
import casaMarSalon from "@/assets/casa-mar-salon.jpg";
import casaMarSalon2 from "@/assets/casa-mar-salon-2.jpg";
import casaMarSalon3 from "@/assets/casa-mar-salon-3.png";
import casaMarSalon4 from "@/assets/casa-mar-salon-4.jpg";
import ctaAerial from "@/assets/cta-aerial.png";
import entornoIznajar from "@/assets/entorno-iznajar.png";
import expSenderismo from "@/assets/exp-senderismo.jpg";

// Image Imports
























































export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería de Fotos — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Explora en imágenes de alta calidad nuestras villas exclusivas en Rute, Córdoba: La Casa de la Cascada, Film Studio y Casa del Mar.",
      },
      { property: "og:title", content: "Galería de Fotos — Ruraly Hoz" },
      { property: "og:description", content: "Explora la belleza y exclusividad de nuestras cabañas de diseño rural premium en Rute." },
      { property: "og:url", content: "/galeria" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: GaleriaPage,
});

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  h: "tall" | "short";
}

interface GallerySection {
  id: string;
  title: string;
  tagline: string;
  description: string;
  images: GalleryImage[];
}

const gallerySections: GallerySection[] = [
  {
    id: "cascada",
    title: "La Casa de la Cascada",
    tagline: "El murmullo del agua y la roca viva.",
    description:
      "Un refugio integrado en la roca donde el sonido del agua marca el ritmo del descanso. Dispone de piscina privada con cascada natural, terraza abierta al valle, jacuzzi exterior privado y una arquitectura que rinde tributo a la geología local.",
    images: [
      {
        src: casaCascadaPiscina,
        alt: "Piscina exterior con cascada",
        caption: "Fachada tradicional integrada y piscina con cascada de agua natural sobre roca viva",
        h: "tall",
      },
      {
        src: casaCascadaPiscinaNoche,
        alt: "Piscina iluminada de noche",
        caption: "Noches mágicas de desconexión bajo las palmeras y luces de agua azul",
        h: "short",
      },
      {
        src: casaCascadaDormitorio,
        alt: "Dormitorio de la Cascada",
        caption: "Cama decorada con pétalos de rosa y un gran mural fotográfico de la cascada natural",
        h: "tall",
      },
      {
        src: casaCascadaSalon,
        alt: "Salón con chimenea y pared de piedra",
        caption: "Un interior cálido y confortable con sofá de diseño, estufa de leña y muro de piedra vista",
        h: "short",
      },
      {
        src: casaCascadaJacuzzi,
        alt: "Jacuzzi exterior privado",
        caption: "Jacuzzi de hidromasaje exterior integrado sobre plataforma de madera noble",
        h: "tall",
      },
      {
        src: casaCascadaAlbercaNoche,
        alt: "Cascada iluminada de noche",
        caption: "Detalle de la cascada de agua natural fluyendo bajo la luz cálida de la roca",
        h: "short",
      },
      {
        src: casaCascadaTipi,
        alt: "Cabaña tipi de bambú",
        caption: "Tipi de bambú y mimbre en el jardín privado con camino de palés de madera",
        h: "tall",
      },
      {
        src: casaCascadaFutbolin,
        alt: "Zona de juegos exterior",
        caption: "Área de relax al aire libre con hamacas de diseño y futbolín frente a la naturaleza",
        h: "short",
      },
      {
        src: casaCascadaBano,
        alt: "Cuarto de baño de piedra",
        caption: "Baño completo con lavabo de madera, espejo tradicional y ducha decorada con pétalos",
        h: "tall",
      },
      {
        src: casaCascadaCocina,
        alt: "Cocina y comedor rústico",
        caption: "Cocina de diseño tradicional equipada, con mesa de comedor rústica de madera noble",
        h: "short",
      },
      {
        src: casaCascadaBano5,
        alt: "Baño rústico con ducha",
        caption: "Detalle cercano de la cascada de la piscina exterior",
        h: "tall",
      },
      {
        src: casaCascadaBano6,
        alt: "Detalle del lavabo de piedra",
        caption: "Vista del Jacuzzi exterior con ambientación nocturna",
        h: "short",
      },
      {
        src: casaCascadaBano7,
        alt: "Ducha circular con mampara",
        caption: "Zona de reunión exterior o picnic",
        h: "tall",
      },
      {
        src: casaCascadaBano8,
        alt: "Interior del baño rústico",
        caption: "Cama en zona exterior para disfrutar y descansar al aire libre",
        h: "short",
      },
      {
        src: casaCascadaBano9,
        alt: "Baño completo rústico",
        caption: "Zona chill exterior vista de noche",
        h: "tall",
      },
      {
        src: casaCascadaBano10,
        alt: "Detalle baño rústico",
        caption: "Zona de barbacoa y reunión al aire libre",
        h: "short",
      },
      {
        src: casaCascadaBano11,
        alt: "Baño rústico completo",
        caption: "Segundo dormitorio con cama de matrimonio y ambiente romántico",
        h: "tall",
      },
    ],
  },
  {
    id: "film",
    title: "Film Studio",
    tagline: "Atmósfera cinematográfica y sofisticada.",
    description:
      "Diseñado exclusivamente para parejas que buscan una escapada de diseño e intimidad (only adults). Destaca por su piscina climatizada al aire libre de uso privado, un icónico letrero de neón, terraza chill out y su sofisticado baño acristalado.",
    images: [
      {
        src: casaFilmTerraza,
        alt: "Terraza acristalada con vistas a la piscina",
        caption: "Baño acristalado con puertas correderas abiertas a la terraza privada y piscina",
        h: "tall",
      },
      {
        src: casaFilmPiscina,
        alt: "Piscina climatizada con palmeras",
        caption: "Piscina climatizada al aire libre con cascada de piedra natural bajo palmeras tropicales",
        h: "short",
      },
      {
        src: casaFilmBanoArabe,
        alt: "Baño árabe privado",
        caption: "Baño árabe con fuente de roca natural, mosaico artesanal y techo de madera",
        h: "tall",
      },
      {
        src: casaFilmDormitorio,
        alt: "Suite cinematográfica",
        caption: "Dormitorio temático con mural envolvente de cañón y ropa de cama de diseño cinematográfico",
        h: "short",
      },
      {
        src: casaFilmCocina,
        alt: "Cocina de diseño industrial",
        caption: "Cocina equipada de estilo industrial con focos de cine, panel de ónix y barra de madera",
        h: "tall",
      },
      {
        src: casaFilmBano6,
        alt: "Baño rústico con ducha",
        caption: "Baño de diseño rústico con ducha de mampara de cristal y acabados en madera",
        h: "short",
      },
      {
        src: casaFilmBano7,
        alt: "Detalle del lavabo de piedra",
        caption: "Otra vista del baño árabe",
        h: "tall",
      },
      {
        src: casaFilmBano8,
        alt: "Ducha circular con mampara",
        caption: "Vista interior de la sala de estar y la cocina",
        h: "short",
      },
      {
        src: casaFilmBano9,
        alt: "Interior del baño rústico",
        caption: "Zona de barbacoa exterior",
        h: "tall",
      },
      {
        src: casaFilmBano10,
        alt: "Baño completo rústico",
        caption: "Otra vista de la cocina",
        h: "short",
      },
      {
        src: casaFilmBano11,
        alt: "Detalle baño rústico",
        caption: "Vista nocturna del porche con luces ambiente",
        h: "tall",
      },
      {
        src: casaFilmBano12,
        alt: "Baño rústico completo",
        caption: "Vista del entorno del embalse de Iznajar",
        h: "short",
      },
    ],
  },
  {
    id: "mar",
    title: "Casa del Mar",
    tagline: "Esencia mediterránea y luz infinita.",
    description:
      "Evoca la frescura del sur y el Mediterráneo a través de muros encalados, arcos de piedra blanca y vigas de madera noble. Su exterior cuenta con un jacuzzi privado coronado por una barca tradicional de madera de pescadores.",
    images: [
      {
        src: casaMarPorche,
        alt: "Porche exterior y cabaña de madera",
        caption: "Zona lounge exterior bajo un majestuoso porche con techo de paja y camas balinesas",
        h: "tall",
      },
      {
        src: casaMarPiscinaNoche,
        alt: "Piscina exterior iluminada de noche",
        caption: "Reflejos de palmeras y la barca iluminada sobre las aguas cristalinas",
        h: "tall",
      },
      {
        src: casaMarJacuzzi,
        alt: "Jacuzzi exterior privado",
        caption: "Jacuzzi de hidromasaje exterior privado junto a la barca tradicional",
        h: "short",
      },
      {
        src: casaMarFachada,
        alt: "Fachada de la cabaña",
        caption: "Fachada exterior de madera de la cabaña mediterránea junto a la piscina de agua salada",
        h: "short",
      },
      {
        src: casaMarPiscinaCesped,
        alt: "Piscina y jardín exterior",
        caption: "Piscina exterior rodeada de césped artificial, palmeras tropicales, tumbonas para el relax y futbolín en porche exterior",
        h: "short",
      },
      {
        src: casaMarSalon,
        alt: "Cálido salón interior de madera",
        caption: "Comedor y zona de estar dentro de la cabaña, con chimenea de leña y decoración rústica",
        h: "short",
      },
      {
        src: casaMarSalon2,
        alt: "Sofá y comedor del salón",
        caption: "Zona de estar con cómodo sofá y mesa de comedor rústica de madera en el interior de la cabaña",
        h: "short",
      },
      {
        src: casaMarSalon3,
        alt: "Salón con chimenea y televisión",
        caption: "Estufa de leña tradicional, televisión montada en pared y cómoda zona de estar en el salón principal",
        h: "short",
      },
      {
        src: casaMarSalon4,
        alt: "Salón comedor principal",
        caption: "Amplia zona de salón y mesa de comedor de madera bajo un techo de vigas expuestas y lámparas esféricas de diseño",
        h: "short",
      },
      {
        src: casaMarDormitorio,
        alt: "Dormitorio de diseño marino",
        caption: "Cama decorada con cisnes de toallas y un mural pintado en madera con motivos náuticos",
        h: "tall",
      },
      {
        src: casaMarDormitorio2,
        alt: "Habitación con cama doble",
        caption: "Segunda habitación doble con decoración marinera y gran cuadro decorativo de surf",
        h: "short",
      },
      {
        src: casaMarDormitorio3,
        alt: "Habitación con doble cama",
        caption: "Tercer dormitorio doble ambientado con una red de pescador suspendida y remos de madera tradicionales",
        h: "short",
      },
      {
        src: casaMarCocina,
        alt: "Cocina moderna y rústica",
        caption: "Cocina completamente equipada integrada en la estructura de madera",
        h: "short",
      },
      {
        src: casaMarBano1,
        alt: "Baño rústico con ducha",
        caption: "Zona de porche exterior con piscina y futbolín",
        h: "tall",
      },
      {
        src: casaMarBano2,
        alt: "Detalle del lavabo de piedra",
        caption: "Vista interior de la zona lounge bajo el porche",
        h: "short",
      },
      {
        src: casaMarBano3,
        alt: "Ducha circular con mampara",
        caption: "Zona de barbacoa y picnic exterior",
        h: "tall",
      },
      {
        src: casaMarBano4,
        alt: "Interior del baño rústico",
        caption: "Vista interior del baño con paredes de madera clara y acabados naturales",
        h: "short",
      },
      {
        src: casaMarBano5,
        alt: "Baño completo rústico",
        caption: "Comedor y zona de estar desde otro ángulo",
        h: "tall",
      },
      {
        src: casaMarBano13,
        alt: "Cuarto de baño de madera",
        caption: "Detalle del cuarto de baño con lavabo tallado de madera rústica, espejo con marco artesanal y cabina de ducha acristalada",
        h: "short",
      },
    ],
  },
  {
    id: "entorno",
    title: "El Entorno y Finca",
    tagline: "El corazón de la Subbética cordobesa.",
    description:
      "Rute y el entorno que nos rodea son parte de nuestra esencia. Desde vistas espectaculares del embalse de Iznájar hasta senderos que cruzan la sierra de olivos centenarios, invitándote a reconectar con la naturaleza salvaje.",
    images: [
      {
        src: ctaAerial,
        alt: "Vista aérea de la finca",
        caption: "Ubicación priviligiada de la finca en el valle de Rute",
        h: "short",
      },
      {
        src: entornoIznajar,
        alt: "Paisaje del embalse de Iznájar",
        caption: "El majestuoso embalse de Iznájar y sus olivares colindantes",
        h: "tall",
      },
      {
        src: expSenderismo,
        alt: "Ruta de senderismo",
        caption: "Senderos por el Parque Natural de las Sierras Subbéticas",
        h: "short",
      },
    ],
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

function GaleriaPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const headerRef = useReveal();
  const galleryRef = useReveal();

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visibleSections = gallerySections.filter((sec) => sec.images.length > 0);
  const totalImages = visibleSections.reduce((acc, sec) => acc + sec.images.length, 0);

  const filteredSections =
    activeFilter === "all"
      ? visibleSections
      : visibleSections.filter((section) => section.id === activeFilter);

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
              <span className="label-mini text-gold font-semibold tracking-[0.35em] text-[10px]">GALERÍA</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance max-w-4xl">
              Atmósferas
              <span className="italic text-gold relative inline-block">
                visuales
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4 Q50 0 100 4 T200 4" stroke="var(--gold)" strokeWidth="2" fill="none" className="animate-draw" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl text-earth/60 leading-relaxed text-lg md:text-xl font-light">
              Explora los rincones de nuestra finca. Diseños premium, agua y naturaleza se funden 
              para crear tres experiencias de alojamiento únicas en el sur de Córdoba.
            </p>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <AnimatedCounter end={totalImages} />
                <span className="text-earth/40 text-sm">Fotos</span>
              </div>
              <div className="h-8 w-px bg-earth/10" />
              <div className="flex items-center gap-3">
                <AnimatedCounter end={4} />
                <span className="text-earth/40 text-sm">Áreas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <nav className="sticky top-20 z-40 bg-sand/90 backdrop-blur-md border-y border-earth/10 py-4 px-6 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 md:gap-4 justify-start md:justify-center items-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2.5 text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeFilter === "all"
                ? "bg-earth text-sand rounded-full shadow-sm"
                : "text-earth/60 hover:text-earth hover:bg-earth/5 rounded-full"
            }`}
          >
            Todas las áreas
          </button>
          {visibleSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveFilter(sec.id)}
              className={`px-6 py-2.5 text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === sec.id
                  ? "bg-earth text-sand rounded-full shadow-sm"
                  : "text-earth/60 hover:text-earth hover:bg-earth/5 rounded-full"
              }`}
            >
              {sec.id === "entorno" ? "Entorno & Finca" : sec.title.replace("La Casa de la ", "Casa ").replace("La ", "")}
            </button>
          ))}
        </div>
      </nav>

      {/* Gallery Sections */}
      <section ref={galleryRef.ref as any} className="px-6 md:px-10 pb-32 max-w-7xl mx-auto space-y-32">
        <div className={`transition-all duration-1000 ease-out delay-300 ${galleryRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {filteredSections.map((section, sectionIndex) => (
            <div key={section.id} className="space-y-12">
              {/* Section Info Header */}
              <div className="border-l-2 border-gold/30 pl-8 max-w-4xl space-y-4">
                <span className="label-mini text-gold font-semibold tracking-wider">{section.tagline}</span>
                <h2 className="font-serif text-3xl md:text-5xl text-earth leading-tight">{section.title}</h2>
                <p className="text-earth/60 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                  {section.description}
                </p>
              </div>

              {/* Section Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                {section.images.map((img, i) => (
                  <figure
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="mb-6 break-inside-avoid overflow-hidden group cursor-zoom-in relative bg-sand shadow-premium hover:shadow-2xl transition-all duration-700 rounded-2xl"
                  >
                    <div className="overflow-hidden relative rounded-2xl">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out ${
                          img.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                        }`}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-earth/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-sand/90 backdrop-blur-sm text-earth p-4 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-350">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                    <figcaption className="mt-4 px-2 text-xs text-earth/50 font-light italic leading-tight">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-earth to-olive-deep rounded-3xl p-12 md:p-20 overflow-hidden">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10 text-center">
            <h2 className="font-serif text-4xl md:text-6xl text-sand leading-tight mb-6">
              ¿Quieres ver más?
            </h2>
            <p className="text-sand/70 max-w-xl mx-auto mb-10 text-lg">
              Reserva tu estancia y descubre en persona la belleza de nuestras casas.
            </p>
            <Link
              to="/casas"
              className="inline-flex items-center gap-3 bg-gold text-earth px-8 py-4 rounded-full font-semibold hover:bg-sand transition-all duration-300 group"
            >
              <span>Ver nuestras casas</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-earth/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-sand/80 hover:text-sand bg-sand/10 hover:bg-sand/20 p-3 rounded-full cursor-pointer transition-colors duration-300"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-scale-in duration-300"
            />
          </div>

          {/* Description */}
          <div
            className="text-center mt-6 text-sand max-w-xl px-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-lg md:text-xl text-sand/95">{lightboxImage.alt}</p>
            <p className="text-sm text-sand/60 mt-2 font-light">{lightboxImage.caption}</p>
          </div>
        </div>
      )}
    </SiteShell>
  );
}

