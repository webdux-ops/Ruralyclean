import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronRight,
  Home as HomeIcon,
  MapPin,
  Sparkles,
  Tv,
  Users,
} from "lucide-react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { CountUp } from "@/components/premium/CountUp";
import { DateRange } from "react-day-picker";
import { SiteShell } from "@/components/SiteShell";
import casaCascada from "@/assets/casa-cascada.jpg";
import casaFilm from "@/assets/casa-film.jpg";
import casaMar from "@/assets/casa-mar.jpg";
import ctaAerial from "@/assets/cta-aerial.png";
import entornoIznajar from "@/assets/entorno-iznajar.png";
import { es } from "date-fns/locale";
import expAceite from "@/assets/exp-aceite.jpg";
import expRelax from "@/assets/exp-relax.jpg";
import expRomantico from "@/assets/exp-romantico.jpg";
import expSenderismo from "@/assets/exp-senderismo.jpg";
import { format } from "date-fns";
import heroBalinesa from "@/assets/hero-balinesa.jpg";
import heroJacuzzi from "@/assets/hero-jacuzzi.jpg";
import heroPool from "@/assets/hero-pool.jpg";
import heroVilla from "@/assets/hero-villa.jpg";
import packRomantico from "@/assets/pack-romantico.png";
import packWeekend from "@/assets/pack-weekend.png";
import philosophy from "@/assets/philosophy-detail.jpg";
import philosophyJacuzzi from "@/assets/philosophy-jacuzzi.png";
import { useReveal } from "@/hooks/use-reveal";

const WHATSAPP_URL =
  "https://wa.me/34627436424?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20estancia%20en%20Ruraly%20Hoz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruraly Hoz — Escapa al corazón de Andalucía" },
      {
        name: "description",
        content:
          "Dos refugios exclusivos de lujo rural en Rute, Córdoba. Naturaleza, piedra y luz mediterránea. La Casa de la Cascada y Casa del Mar.",
      },
      { property: "og:title", content: "Ruraly Hoz — Escapa al corazón de Andalucía" },
      {
        property: "og:description",
        content: "Dos refugios exclusivos de lujo rural en Rute, Córdoba.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroVilla },
      { name: "twitter:image", content: heroVilla },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      {/* Fixed background GIF - visible only in white sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay muted loop playsInline>
  <source src="/mi-fondo.mp4" type="video/mp4" />
</video>
      </div>
      <Hero />
      <Philosophy />
      <HousesShowcase />
      <EntornoSection />
      <ExperiencesStrip />
      <PacksSection />
      <Testimonial />
      <FaqSection />
      <FinalCTA />
    </SiteShell>
  );
}

/* ---------- Hero: fullscreen cinematic slider ---------- */
const HERO_SLIDES = [
  { src: heroVilla, alt: "Villa rural de lujo en Rute al atardecer entre olivares", caption: "Atardeceres en la Subbética" },
  { src: heroJacuzzi, alt: "Jacuzzi climatizado al atardecer con velas y vistas al valle", caption: "Jacuzzi climatizado privado" },
  { src: heroPool, alt: "Piscina de agua salada estilo playa entre olivos", caption: "Piscina de agua salada" },
  { src: heroBalinesa, alt: "Cama balinesa con velas y pareja al atardecer", caption: "Rincones románticos" },
  { src: expRelax, alt: "Zona chill al aire libre con luces cálidas", caption: "Naturaleza y silencio" },
];

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  const badges = [
    "Jacuzzi Climatizado 365 días",
    "Piscina Privada de Sal",
    "Experiencias Románticas",
    "Privacidad 100% Garantizada",
  ];

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-earth flex flex-col justify-between z-10">
      {/* Slider */}
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={1920}
          height={1080}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover kenburns transition-opacity duration-[1800ms] ease-out ${i === index ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth/75 via-earth/35 to-earth/95 z-0" />
      <div className="absolute inset-0 bg-earth/35 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-6">
        <div className="flex flex-col items-center max-w-5xl">
          {/* Glowing Premium Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark-luxe border border-gold/15 text-gold text-[9px] font-bold uppercase tracking-[0.25em] mb-8 animate-fade-in shadow-gold pulse-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Refugios Exclusivos de Autor · Andalucía</span>
          </div>

          <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-sand text-balance animate-fade-in">
            Tu escapada perfecta
            <br />
            <span className="italic font-normal text-gold">existe.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sand leading-relaxed text-pretty md:text-lg animate-fade-in font-light">
            Casas de campo de diseño boutique integradas en la naturaleza de Rute (Córdoba). Piscina privada, jacuzzi y total intimidad para reconectar con el silencio.
          </p>

          {/* Quick Booking Bar */}
          <HeroBookingBar />

          {/* Trust badges */}
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-4xl animate-fade-in border-t border-sand/10 pt-5">
            {badges.map((b) => (
              <li
                key={b}
                className="label-mini text-[9px] md:text-[10px] text-sand flex items-center gap-2 font-medium bg-sand/5 px-4 py-1.5 rounded-full border border-sand/5"
              >
                <Check className="w-3.5 h-3.5 text-gold" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row: slide indicator + scroll cue */}
      <div className="relative z-10 pb-8 px-6 md:px-10 flex items-end justify-between text-sand/70">
        <div className="flex items-center gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === index ? "w-10 bg-gold" : "w-3 bg-sand/30"
                }`}
            />
          ))}
          <span className="hidden md:inline label-mini ml-4 text-[9px] text-sand/85 uppercase tracking-widest">
            {HERO_SLIDES[index].caption}
          </span>
        </div>
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="label-mini text-[8px] tracking-[0.25em] text-sand/75 hidden md:block">Descubre el lujo rural</span>
          <span className="block h-8 w-px bg-gold/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero Quick Booking Bar ---------- */
function HeroBookingBar() {
  const navigate = useNavigate();
  const [house, setHouse] = useState<"cascada" | "mar" | "film" | "">("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(2);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const handleSearch = () => {
    navigate({
      to: "/reservas",
      search: {
        house: house || undefined,
        checkin: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
        checkout: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
        guests: guests,
      },
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 mt-8 animate-fade-in relative z-20">
      <div className="glass-dark-luxe shadow-premium p-4 md:p-5 rounded-3xl md:rounded-full grid grid-cols-1 md:grid-cols-4 gap-4 items-center border border-gold/10">

        {/* House Select */}
        <div className="relative border-b md:border-b-0 md:border-r border-sand/10 pb-3 md:pb-0 md:px-4 text-left">
          <label className="label-mini text-gold font-bold block mb-1 text-[9px] tracking-widest">Alojamiento</label>
          <div className="flex items-center gap-2">
            <HomeIcon className="w-4 h-4 text-gold/60 shrink-0" />
            <select
              value={house}
              onChange={(e) => setHouse(e.target.value as any)}
              className="bg-transparent border-0 text-sand font-serif text-[15px] focus:ring-0 outline-none w-full cursor-pointer pr-4"
              style={{ colorScheme: "dark" }}
            >
              <option value="" className="text-earth">¿Qué casa buscas?</option>
              <option value="cascada" className="text-earth">La Casa de la Cascada</option>
              <option value="mar" className="text-earth">Casa del Mar</option>
              <option value="film" className="text-earth">Film Studio</option>
            </select>
          </div>
        </div>

        {/* Dates Select */}
        <div className="relative border-b md:border-b-0 md:border-r border-sand/10 pb-3 md:pb-0 md:px-4 text-left">
          <label className="label-mini text-gold font-bold block mb-1 text-[9px] tracking-widest">Fechas de Estancia</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 bg-transparent text-left border-0 p-0 text-sand font-sans text-sm outline-none cursor-pointer w-full">
                <CalendarIcon className="w-4 h-4 text-gold/60 shrink-0" />
                <span className="truncate font-serif text-[15px] text-sand font-light">
                  {date?.from ? (
                    date.to ? (
                      `${format(date.from, "dd/MM")} - ${format(date.to, "dd/MM")}`
                    ) : (
                      format(date.from, "dd/MM")
                    )
                  ) : (
                    "Elige tus fechas"
                  )}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[60]" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                locale={es}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="bg-white rounded-xl shadow-lg border-earth/10"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Select */}
        <div className="relative border-b md:border-b-0 pb-3 md:pb-0 md:px-4 text-left">
          <label className="label-mini text-gold font-bold block mb-1 text-[9px] tracking-widest">Huéspedes</label>
          <button
            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
            className="flex items-center gap-2 bg-transparent text-left border-0 p-0 text-sand font-serif text-[15px] outline-none cursor-pointer w-full"
          >
            <Users className="w-4 h-4 text-gold/60 shrink-0" />
            <span>{guests} {guests === 1 ? "Huésped" : "Huéspedes"}</span>
          </button>

          {showGuestsDropdown && (
            <div className="absolute top-[calc(100%+12px)] left-0 w-48 bg-white rounded-xl shadow-xl border border-earth/10 p-4 z-50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-earth">Huéspedes</span>
                <div className="flex items-center border border-earth/20 rounded">
                  <button
                    onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}
                    className="px-2 py-0.5 text-earth/75 hover:bg-earth/5 font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm text-earth font-semibold">{guests}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setGuests(Math.min(6, guests + 1)); }}
                    className="px-2 py-0.5 text-olive hover:bg-olive/5 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowGuestsDropdown(false); }}
                className="w-full mt-3 bg-earth text-sand py-2 rounded text-[10px] uppercase font-bold tracking-wider hover:bg-olive transition-colors"
              >
                Guardar
              </button>
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="md:px-2 w-full">
          <button
            onClick={handleSearch}
            className="w-full bg-gold text-earth hover:bg-sand hover:text-earth py-4 px-6 rounded-full font-bold uppercase tracking-widest text-[10px] btn-shimmer btn-hover-grow transition-all duration-300 flex items-center justify-center gap-2 shadow-gold"
          >
            <span>Ver Disponibilidad</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- Philosophy: Manifiesto I ---------- */

const PHILOSOPHY_PILLARS = [
  {
    numeral: "i",
    title: "Intimidad absoluta",
    body: "Sin vecinos visibles. Cero ruido. Cada finca está vallada y aislada — la única conversación es con el paisaje.",
  },
  {
    numeral: "ii",
    title: "Diseño obsesivo",
    body: "Piedra caliza tallada a mano, vigas de roble noble, jacuzzi exterior a 37ºC los 365 días. Cada detalle pensado para parejas.",
  },
  {
    numeral: "iii",
    title: "Conserjería 24 h",
    body: "Chef privado bajo demanda, decoración romántica, experiencias a medida. Decides lo que quieres vivir; nosotros nos encargamos del resto.",
  },
];

function Philosophy() {
  const headerRef = useReveal();
  const bodyRef = useReveal();
  return (
    <section
      id="filosofia"
      className="relative bg-sand/85 pt-6 pb-20 md:pt-8 md:pb-28 overflow-hidden z-10"
    >
      {/* Background giant numeral watermark */}
      <span
        className="editorial-numeral absolute top-10 right-4 md:right-12 text-[9rem] md:text-[32rem]"
        aria-hidden="true"
      >
        I
      </span>

      <div ref={headerRef} className="reveal max-w-4xl mx-auto px-6 md:px-10 text-center relative mb-5 md:mb-8">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em] mb-6">
          <span className="h-px w-12 bg-olive/30" />
          <span>Manifiesto · I</span>
          <span className="h-px w-12 bg-olive/30" />
        </div>

        <p className="mt-3 text-earth/90 text-base md:text-lg leading-relaxed font-light text-pretty max-w-2xl mx-auto">
          Ruraly Hoz no es una casa rural más. Diseñamos refugios donde la luz, la piedra y el silencio conspiran para que el mundo exterior deje de existir durante el tiempo que estás dentro.
        </p>
      </div>

      <div
        ref={bodyRef}
        className="reveal max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center relative"
      >
        {/* IMAGE column with editorial caption + rating card */}
        <div className="md:col-span-7 relative">
          <div className="editorial-image-frame aspect-[4/3] md:aspect-[3/2] rounded-[28px] shadow-premium">
            <img
              src={philosophyJacuzzi}
              alt="Jacuzzi de piedra exterior por la noche con pétalos de rosa flotando y velas encendidas"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="editorial-caption">
              <span>Detalle 01 — Jacuzzi privado de piedra · 37ºC todo el año</span>
              <span className="text-gold/90 tracking-normal">●</span>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-8 md:-bottom-10 -left-2 md:-left-10 bg-sand/95 backdrop-blur shadow-premium rounded-2xl px-5 md:px-7 py-4 md:py-5 border border-earth/8 z-10">
            <span className="label-mini text-[8px] tracking-[0.3em] text-earth/80 font-bold uppercase">
              Valoración Huéspedes
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <CountUp
                to={4.9}
                decimals={1}
                duration={1600}
                className="font-serif text-4xl md:text-5xl text-earth font-medium leading-none"
              />
              <span className="text-earth/70 text-sm font-light">/ 5</span>
              <span className="text-gold text-xl ml-1">★</span>
            </div>
            <span className="text-[10px] md:text-[11px] text-earth/85 mt-1.5 block font-light">
              Sobre <CountUp to={312} duration={1800} /> reseñas verificadas
            </span>
          </div>
        </div>

        {/* MANIFESTO + pillars */}
        <div className="md:col-span-5">
          <p className="font-serif italic text-2xl md:text-3xl text-olive leading-snug max-w-md">
            <span className="text-gold/70 mr-1" aria-hidden="true">“</span>
            Tres principios. Una sola obsesión: tu intimidad.
            <span className="text-gold/70 ml-1" aria-hidden="true">”</span>
          </p>

          {/* Three pillars */}
          <ol className="mt-6 md:mt-8 space-y-5">
            {PHILOSOPHY_PILLARS.map((p) => (
              <li key={p.numeral} className="flex gap-5 md:gap-6 group">
                <span
                  className="font-serif italic text-3xl md:text-4xl text-earth/15 group-hover:text-gold/40 transition-colors duration-700 leading-none w-12 shrink-0 select-none"
                  aria-hidden="true"
                >
                  {p.numeral}
                </span>
                <div className="border-l border-earth/10 pl-5 md:pl-6 -ml-1">
                  <h4 className="font-serif text-xl md:text-2xl text-earth leading-tight">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-earth/95 text-sm md:text-[15px] leading-relaxed font-light">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Press mention */}
          <div className="mt-7 inline-flex items-center gap-3 bg-earth text-sand pl-3 pr-6 py-3 rounded-full border border-gold/20 shadow-premium">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
              <Tv className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="label-mini text-[8px] tracking-[0.25em] text-sand/90 font-bold uppercase">
                Visto en
              </span>
              <span className="font-serif text-[15px] text-sand">
                Andalucía Directo · <span className="italic text-gold/90">Canal Sur</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Houses showcase: editorial magazine spread ---------- */

type HouseSpreadData = {
  slug: string;
  numeral: string;
  chapter: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  price: number;
  availability: string;
  image: string;
  href: string;
  badge: string;
  badgeAccent: "gold" | "olive" | "earth";
  reverse?: boolean;
};

const HOUSES: HouseSpreadData[] = [
  {
    slug: "casa-01",
    numeral: "01",
    chapter: "Naturaleza & Romance",
    title: "La Casa de la Cascada",
    tagline: "Agua, piedra y romanticismo salvaje.",
    description:
      "Un refugio único integrado en la roca viva donde el sonido del agua marca el ritmo del descanso. Piscina privada de sal coronada por una cascada natural, terraza infinita al valle y materiales nobles trabajados a mano.",
    specs: [
      "1–4 huéspedes",
      "2 dormitorios de diseño",
      "Cascada natural privada",
      "Jacuzzi 365 días",
      "Chimenea de leña",
    ],
    price: 240,
    availability: "Junio · 3 fechas disponibles",
    image: casaCascada,
    href: "/casas/cascada",
    badge: "La más codiciada",
    badgeAccent: "gold",
  },
  {
    slug: "casa-02",
    numeral: "02",
    chapter: "Luz Mediterránea",
    title: "Casa del Mar",
    tagline: "Luz infinita y aires marinos en el interior de Córdoba.",
    description:
      "Espacios diáfanos de estilo ibicenco con arcos encalados, vigas de madera noble y ventanales orientados a olivares centenarios. La estancia ideal para familias y parejas que buscan amplitud y silencio.",
    specs: [
      "1–6 huéspedes",
      "3 habitaciones amplias",
      "Piscina de agua salada",
      "Olivares centenarios",
      "Cocina equipada chef",
    ],
    price: 190,
    availability: "Junio · 5 fechas disponibles",
    image: casaMar,
    href: "/casas/mar",
    reverse: true,
    badge: "Luminosa & Espaciosa",
    badgeAccent: "olive",
  },
  {
    slug: "casa-03",
    numeral: "03",
    chapter: "Ocio & Cine Privado",
    title: "Film Studio",
    tagline: "Una suite de cine de autor bajo el cielo estrellado.",
    description:
      "El refugio definitivo para parejas amantes del buen cine. Sala privada con proyector de alta definición, jacuzzi exterior climatizado y baño árabe. Interiorismo inspirado en decorados de cine clásico.",
    specs: [
      "1–2 huéspedes",
      "Adults Only",
      "Cine privado · Proyector 4K",
      "Baño árabe climatizado",
      "Suite con jacuzzi interior",
    ],
    price: 260,
    availability: "Junio · 2 fechas disponibles",
    image: casaFilm,
    href: "/casas/film",
    badge: "100% Adults Only",
    badgeAccent: "earth",
  },
];

function HousesShowcase() {
  const headerRef = useReveal();
  return (
    <section id="casas" className="relative bg-sand-deep pt-4 pb-14 md:pt-6 md:pb-20 overflow-hidden z-10">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-olive/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Editorial header */}
        <div ref={headerRef} className="reveal text-center mb-2 md:mb-4">
          <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em] mb-2">
            <span className="h-px w-12 bg-olive/30" />
            <span>La Colección</span>
            <span className="h-px w-12 bg-olive/30" />
          </div>

          {/* Chapter index */}
          <nav className="flex items-center justify-center gap-6 md:gap-10 mt-2 font-serif text-base md:text-lg tracking-[0.45em]">
            {HOUSES.map((h, i) => (
              <span key={h.slug} className="flex items-center gap-6 md:gap-10">
                <a
                  href={`#${h.slug}`}
                  className="text-earth/30 hover:text-earth transition-colors duration-500 font-light"
                >
                  {h.numeral}
                </a>
                {i < HOUSES.length - 1 && (
                  <span className="text-earth/15 select-none" aria-hidden="true">—</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* House spreads */}
        <div className="space-y-16 md:space-y-24">
          {HOUSES.map((house, i) => (
            <div key={house.slug}>
              <HouseSpread house={house} />
              {i < HOUSES.length - 1 && (
                <div className="editorial-divider mt-16 md:mt-24 max-w-3xl mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseSpread({ house }: { house: HouseSpreadData }) {
  const ref = useReveal();
  const badgeStyles: Record<HouseSpreadData["badgeAccent"], string> = {
    gold: "bg-gold/90 text-earth",
    olive: "bg-olive text-sand",
    earth: "bg-earth/85 text-sand border border-sand/15",
  };

  return (
    <article
      id={house.slug}
      ref={ref}
      className="reveal relative grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center scroll-mt-32"
    >
      {/* IMAGE COLUMN */}
      <div className={`md:col-span-7 ${house.reverse ? "md:order-2" : ""}`}>
        <div className="editorial-image-frame relative aspect-[4/3] md:aspect-[3/2] rounded-[28px] shadow-premium">
          <img
            src={house.image}
            alt={house.title}
            width={1280}
            height={1600}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Badge */}
          <div
            className={`absolute top-6 left-6 px-4 py-2 rounded-full label-mini text-[9px] font-bold tracking-widest shadow-md z-10 ${badgeStyles[house.badgeAccent]}`}
          >
            {house.badge}
          </div>

          {/* Editorial caption */}
          <div className="editorial-caption">
            <span>
              Foto {house.numeral} / {String(HOUSES.length).padStart(2, "0")} — {house.title}
            </span>
            <span className="text-gold/90 tracking-normal">●</span>
          </div>
        </div>
      </div>

      {/* CONTENT COLUMN */}
      <div className={`md:col-span-5 relative ${house.reverse ? "md:order-1" : ""}`}>
        {/* Decorative giant numeral watermark */}
        <span
          className="editorial-numeral absolute -top-10 md:-top-24 -left-2 md:-left-4 text-[8rem] md:text-[18rem]"
          aria-hidden="true"
        >
          {house.numeral}
        </span>

        <div className="relative">
          {/* Chapter eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-serif italic text-3xl md:text-4xl text-gold/80 leading-none">
              {house.numeral}
            </span>
            <span className="h-px flex-1 bg-earth/15" />
            <span className="label-mini text-[9px] text-earth/85 tracking-[0.3em] font-semibold">
              {house.chapter}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-earth leading-[0.95] tracking-tight text-balance">
            {house.title}
          </h3>

          {/* Tagline pull-quote */}
          <p className="font-serif italic text-xl md:text-2xl text-olive mt-6 leading-snug max-w-md">
            <span className="text-gold/70 mr-1" aria-hidden="true">“</span>
            {house.tagline}
            <span className="text-gold/70 ml-1" aria-hidden="true">”</span>
          </p>

          {/* Description */}
          <p className="mt-8 text-earth leading-relaxed text-sm md:text-base font-light max-w-md text-pretty">
            {house.description}
          </p>

          {/* Spec pills */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {house.specs.map((spec) => (
              <li
                key={spec}
                className="px-3.5 py-1.5 rounded-full border border-earth/12 bg-sand text-earth/75 text-[11px] font-medium tracking-wide"
              >
                {spec}
              </li>
            ))}
          </ul>

          {/* Price block */}
          <div className="mt-6 flex items-baseline gap-3 border-t border-earth/10 pt-4">
            <span className="label-mini text-[9px] text-earth/75 font-semibold tracking-[0.25em]">
              Desde
            </span>
            <span className="font-serif text-5xl md:text-6xl text-earth leading-none">
              {house.price}€
            </span>
            <span className="text-earth/80 text-sm font-light">/ noche</span>
          </div>

          {/* Live availability */}
          <div className="editorial-availability mt-4 text-earth text-xs md:text-sm tracking-wide font-light">
            <span className="font-medium text-earth/85">{house.availability}</span>
            <span className="text-earth/75 ml-2">· reservas en tiempo real</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/reservas" className="editorial-cta group">
              <span>Reservar esta casa</span>
              <span className="arrow text-lg" aria-hidden="true">→</span>
            </Link>
            <Link
              to={house.href}
              className="label-mini text-[9px] text-earth/90 hover:text-earth transition-colors duration-300 tracking-[0.28em] font-semibold inline-flex items-center gap-1.5 group"
            >
              <span>Ver galería completa</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Experiences: Capítulo III · El arte del detalle ---------- */

const WHATSAPP_BASE = "https://wa.me/34627436424?text=";

const EXPERIENCES = [
  {
    numeral: "01",
    image: expRomantico,
    eyebrow: "Romance",
    title: "Cena privada al atardecer",
    description:
      "Mesa montada en la terraza de tu casa, velas, pétalos de rosa y menú degustación servido por chef privado. Para aniversarios, pedidas, fechas que recordaréis.",
    waMessage: "Hola, me gustaría organizar una cena privada en Ruraly Hoz.",
    caption: "Detalle — Cena al atardecer",
  },
  {
    numeral: "02",
    image: expAceite,
    eyebrow: "Gastronomía",
    title: "Cata de aceite de autor",
    description:
      "Visita guiada a una almazara histórica de Rute con cata privada de tres aceites premium de la Subbética. Maridaje opcional con quesos y vinos cordobeses.",
    waMessage: "Hola, me interesa la experiencia gastro de cata de aceites.",
    caption: "Detalle — Almazara histórica",
  },
  {
    numeral: "03",
    image: expRelax,
    eyebrow: "Bienestar",
    title: "Masaje en pareja & wellness",
    description:
      "Masaje de 60 minutos a domicilio impartido por fisioterapeutas, baño de vapor aromático en el jacuzzi privado y sesión de yoga al amanecer si lo deseas.",
    waMessage: "Hola, me gustaría reservar un masaje en pareja en Ruraly Hoz.",
    caption: "Detalle — Wellness privado",
  },
];

function ExperiencesStrip() {
  const headerRef = useReveal();
  const gridRef = useReveal();
  const closeRef = useReveal();

  return (
    <section
      id="experiencias"
      className="relative bg-earth py-14 md:py-20 overflow-hidden z-10"
    >
      {/* Background numeral */}
      <span
        className="absolute top-12 left-4 md:left-12 font-serif italic font-extralight text-[9rem] md:text-[32rem] text-gold/[0.05] leading-none select-none pointer-events-none tracking-tight"
        aria-hidden="true"
      >
        III
      </span>

      {/* Radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/[0.08] via-transparent to-transparent pointer-events-none" />

      <div ref={headerRef} className="reveal max-w-4xl mx-auto px-6 md:px-10 text-center relative mb-10 md:mb-14">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-gold font-semibold tracking-[0.35em] mb-6">
          <span className="h-px w-12 bg-gold/30" />
          <span>Capítulo · III · El Detalle</span>
          <span className="h-px w-12 bg-gold/30" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand leading-[0.95] tracking-tight text-balance">
          Tu estancia,<br />
          <span className="italic text-gold font-normal">a tu medida.</span>
        </h2>

        <p className="mt-8 text-sand text-base md:text-lg leading-relaxed font-light text-pretty max-w-2xl mx-auto">
          Cada estancia es una historia distinta. Diseñamos los detalles a medida — cenas privadas, masajes, decoración romántica, catas, pedidas. Tú pones la historia.
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10"
      >
        {EXPERIENCES.map((exp) => (
          <article key={exp.numeral} className="group flex flex-col">
            {/* Image */}
            <div className="editorial-image-frame aspect-[4/3] rounded-[24px] shadow-premium">
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="editorial-caption">
                <span>{exp.caption}</span>
                <span className="text-gold/90 tracking-normal">●</span>
              </div>
              {/* Numeral badge */}
              <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-earth/85 backdrop-blur text-gold px-3 py-1.5 rounded-full border border-gold/25">
                <span className="font-serif italic text-sm leading-none">{exp.numeral}</span>
                <span className="label-mini text-[8px] tracking-[0.3em] font-semibold">{exp.eyebrow}</span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-7 flex flex-col flex-1">
              <h3 className="font-serif text-2xl md:text-[1.65rem] text-sand leading-tight tracking-tight">
                {exp.title}
              </h3>
              <p className="mt-3 text-sand/95 text-sm leading-relaxed font-light flex-1">
                {exp.description}
              </p>

              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent(exp.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 self-start label-mini text-[10px] text-gold/90 hover:text-gold tracking-[0.28em] font-semibold transition-colors duration-300 group/cta"
              >
                <span>Personalizar</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 group-hover/cta:bg-gold group-hover/cta:text-earth transition-all duration-500">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Master CTA */}
      <div
        ref={closeRef}
        className="reveal max-w-3xl mx-auto px-6 mt-12 md:mt-16 text-center relative z-10"
      >
        <div className="editorial-divider max-w-md mx-auto mb-10" />
        <p className="font-serif italic text-2xl md:text-3xl text-sand/95 leading-snug text-balance">
          ¿No encuentras lo que buscas?
        </p>
        <p className="mt-3 text-sand/90 text-sm md:text-base font-light max-w-xl mx-auto">
          Lo diseñamos contigo. Cuéntanos qué fecha es importante y nos encargamos del resto.
        </p>
        <a
          href={`${WHATSAPP_BASE}${encodeURIComponent("Hola, me gustaría diseñar una escapada a medida en Ruraly Hoz.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-cta mt-8"
          style={{ background: "var(--gold)", color: "var(--earth)" }}
        >
          <span>Diseñar mi escapada</span>
          <span className="arrow text-lg" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

/* ---------- Packs: Capítulo IV · La Carta ---------- */
const PACKS = [
  {
    img: packRomantico,
    title: "Pack Romántico",
    subtitle: "Noches de ensueño en pareja",
    includes: [
      "2 noches en Casa del Mar o Cascada",
      "Decoración especial pétalos & velas",
      "Cena privada con Chef en la casa",
      "Botella de Cava premium de bienvenida",
    ],
    price: 520,
    duration: "2 noches",
    tag: "Más vendido",
    accent: "gold" as const,
    href: WHATSAPP_URL,
  },
  {
    img: packWeekend,
    title: "Escapada Weekend",
    subtitle: "Desconexión fin de semana",
    includes: [
      "3 noches (Viernes a Lunes)",
      "Cesta de bienvenida km 0",
      "Late Checkout gratuito (17:00h)",
      "Detalle de leña gratis ilimitada",
    ],
    price: 680,
    duration: "3 noches",
    tag: "Ideal parejas",
    accent: "olive" as const,
    href: WHATSAPP_URL,
  },
  {
    img: expAceite,
    title: "Experiencia Gastro",
    subtitle: "Sabor y cultura de la Subbética",
    includes: [
      "2 noches de alojamiento",
      "Cata privada de aceites premium",
      "Visita a almazara histórica",
      "Desayuno molinero gourmet",
    ],
    price: 460,
    duration: "2 noches",
    tag: "Turismo cultural",
    accent: "earth" as const,
    href: WHATSAPP_URL,
  },
  {
    img: expRelax,
    title: "Wellness & Calma",
    subtitle: "Cuerpo y mente relajados",
    includes: [
      "2 noches de alojamiento",
      "Masaje en pareja (60 min)",
      "Baño de vapor aromático",
      "Yoga privado al amanecer",
    ],
    price: 490,
    duration: "2 noches",
    tag: "Relax absoluto",
    accent: "olive" as const,
    href: WHATSAPP_URL,
  },
];

function PacksSection() {
  const headerRef = useReveal();
  const gridRef = useReveal();

  return (
    <section
      id="packs"
      className="relative bg-sand-deep py-14 md:py-20 overflow-hidden z-10"
    >
      {/* Background numeral */}
      <span
        className="editorial-numeral absolute top-12 right-4 md:right-16 text-[9rem] md:text-[32rem]"
        aria-hidden="true"
      >
        IV
      </span>

      <div ref={headerRef} className="reveal max-w-4xl mx-auto px-6 md:px-10 text-center relative mb-10 md:mb-14">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em] mb-6">
          <span className="h-px w-12 bg-olive/30" />
          <span>Capítulo · IV · La Carta</span>
          <span className="h-px w-12 bg-olive/30" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-earth leading-[0.95] tracking-tight text-balance">
          Cuatro maneras<br />
          <span className="italic text-olive font-normal">de escapar.</span>
        </h2>

        <p className="mt-8 text-earth/90 text-base md:text-lg leading-relaxed font-light text-pretty max-w-2xl mx-auto">
          Estancias diseñadas con todo incluido. Eliges la duración y el motivo; nosotros nos encargamos de cada detalle. Reserva directa, mejor precio garantizado.
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8 relative z-10"
      >
        {PACKS.map((pack, i) => (
          <EditorialPackCard key={pack.title} pack={pack} index={i} />
        ))}
      </div>
    </section>
  );
}

const ACCENT_STYLES: Record<"gold" | "olive" | "earth", { bg: string; text: string; ring: string }> = {
  gold: { bg: "bg-gold", text: "text-earth", ring: "ring-gold/30" },
  olive: { bg: "bg-olive", text: "text-sand", ring: "ring-olive/30" },
  earth: { bg: "bg-earth/85", text: "text-sand", ring: "ring-earth/30" },
};

function EditorialPackCard({
  pack,
  index,
}: {
  pack: (typeof PACKS)[number];
  index: number;
}) {
  const styles = ACCENT_STYLES[pack.accent];
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex flex-col bg-sand border border-earth/8 rounded-[24px] overflow-hidden shadow-premium hover:shadow-[0_30px_60px_-25px_oklch(0.18_0.012_60/0.25)] transition-shadow duration-700">
      {/* IMAGE */}
      <div className="editorial-image-frame relative aspect-[3/2] overflow-hidden">
        <img
          src={pack.img}
          alt={pack.title}
          width={800}
          height={1000}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Tag badge */}
        <div
          className={`absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${styles.bg} ${styles.text} shadow-md`}
        >
          {pack.accent === "gold" && <span className="sticky-cta-dot" aria-hidden="true" />}
          <span className="label-mini text-[8px] tracking-[0.3em] font-bold">
            {pack.tag}
          </span>
        </div>

        {/* Numeral + duration */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-sand">
          <span className="font-serif italic text-3xl leading-none text-sand/95">
            {numeral}
          </span>
          <span className="label-mini text-[8px] tracking-[0.3em] font-semibold text-sand/95">
            {pack.duration}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <span className="label-mini text-[9px] tracking-[0.3em] text-olive font-semibold">
          {pack.subtitle}
        </span>
        <h3 className="font-serif text-2xl md:text-[1.55rem] text-earth leading-tight mt-2 tracking-tight">
          {pack.title}
        </h3>

        {/* Includes */}
        <ul className="mt-5 space-y-2.5 flex-1">
          {pack.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-earth/70 text-[13px] leading-snug font-light"
            >
              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mt-6 pt-5 border-t border-earth/10 flex items-baseline justify-between">
          <span className="label-mini text-[8px] text-earth/75 font-semibold tracking-[0.25em]">
            Desde
          </span>
          <span className="font-serif text-3xl md:text-[2rem] text-earth font-light leading-none">
            {pack.price}€
          </span>
        </div>

        {/* CTA */}
        <a
          href={pack.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-between gap-2 pl-5 pr-2 py-2 rounded-full bg-earth text-sand hover:bg-gold hover:text-earth transition-all duration-500 group/cta"
        >
          <span className="label-mini text-[10px] tracking-[0.25em] font-semibold">
            Reservar
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 group-hover/cta:bg-earth/10 transition-colors duration-500">
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover/cta:translate-x-0.5" />
          </span>
        </a>
      </div>
    </article>
  );
}

/* ---------- El Entorno: Capítulo II ---------- */

const ENTORNO_TIMES: { value: number; decimals: number; unit: string; label: string }[] = [
  { value: 15, decimals: 0, unit: "'", label: "Rute centro · sierras" },
  { value: 20, decimals: 0, unit: "'", label: "Iznájar · embalse" },
  { value: 1, decimals: 0, unit: "h", label: "Córdoba capital · mezquita" },
  { value: 1.5, decimals: 1, unit: "h", label: "Málaga playa · aeropuerto" },
];

const ENTORNO_HIGHLIGHTS = [
  "Olivares milenarios",
  "Embalse de Iznájar (el mayor de Andalucía)",
  "Pueblos blancos colgados",
  "Almazaras históricas con cata",
  "Sendas de la Subbética",
  "Cielo Starlight (sin contaminación lumínica)",
];

function EntornoSection() {
  const headerRef = useReveal();
  const bodyRef = useReveal();
  return (
    <section
      id="entorno"
      className="relative bg-sand/85 border-y border-earth/5 py-14 md:py-20 overflow-hidden z-10"
    >
      <span
        className="editorial-numeral absolute top-10 -left-4 md:left-4 text-[9rem] md:text-[32rem]"
        aria-hidden="true"
      >
        II
      </span>

      <div ref={headerRef} className="reveal max-w-4xl mx-auto px-6 md:px-10 text-center relative mb-10 md:mb-14">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em] mb-6">
          <span className="h-px w-12 bg-olive/30" />
          <span>Capítulo · II · El Lugar</span>
          <span className="h-px w-12 bg-olive/30" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-earth leading-[0.95] tracking-tight text-balance">
          Donde Andalucía<br />
          <span className="italic text-olive font-normal">respira.</span>
        </h2>

        <p className="mt-8 text-earth/90 text-base md:text-lg leading-relaxed font-light text-pretty max-w-2xl mx-auto">
          En el paraje de La Hoz, entre Rute e Iznájar. Olivares centenarios al frente, sierras de la Subbética al fondo, el cielo estrellado más limpio de Andalucía sobre la cabeza.
        </p>
      </div>

      <div
        ref={bodyRef}
        className="reveal max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center relative"
      >
        {/* IMAGE column */}
        <div className="md:col-span-7 md:order-2 relative">
          <div className="editorial-image-frame aspect-[4/3] md:aspect-[3/2] rounded-[28px] shadow-premium">
            <img
              src={entornoIznajar}
              alt="Vista panorámica de Iznájar y su embalse rodeado de montañas en Andalucía"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="editorial-caption">
              <span>Vista 02 — Embalse de Iznájar · "el lago de Andalucía"</span>
              <span className="text-gold/90 tracking-normal">●</span>
            </div>
          </div>

          {/* Floating coords card */}
          <div className="absolute -bottom-8 md:-bottom-10 -right-2 md:-right-10 bg-earth text-sand shadow-premium rounded-2xl px-5 md:px-7 py-4 md:py-5 border border-gold/20 z-10 max-w-[260px]">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="label-mini text-[8px] tracking-[0.3em] text-gold font-bold uppercase">
                Paraje La Hoz
              </span>
            </div>
            <span className="font-serif text-sm md:text-base text-sand font-light leading-snug block">
              Rute · Córdoba · 37.32°N 4.36°O
            </span>
            <span className="text-[11px] text-sand/80 mt-2 block font-light">
              Coordenadas exactas tras reserva
            </span>
          </div>
        </div>

        {/* TIMES + HIGHLIGHTS column */}
        <div className="md:col-span-5 md:order-1">
          <p className="font-serif italic text-2xl md:text-3xl text-olive leading-snug max-w-md">
            <span className="text-gold/70 mr-1" aria-hidden="true">“</span>
            Suficientemente apartada para desaparecer. Lo bastante cerca para verlo todo.
            <span className="text-gold/70 ml-1" aria-hidden="true">”</span>
          </p>

          {/* Travel times grid */}
          <div className="mt-10 md:mt-12 grid grid-cols-2 gap-6 md:gap-8 border-t border-earth/10 pt-8">
            {ENTORNO_TIMES.map((t) => (
              <div key={t.label} className="flex flex-col">
                <div className="font-serif text-4xl md:text-5xl text-earth font-light flex items-start leading-none">
                  <CountUp to={t.value} decimals={t.decimals} duration={1600} />
                  <span className="text-xl md:text-2xl mt-0.5 ml-0.5 text-earth/90">
                    {t.unit}
                  </span>
                </div>
                <div className="label-mini text-earth/80 text-[9px] mt-3 font-semibold tracking-wider leading-relaxed">
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          {/* Highlights checklist */}
          <div className="mt-10 pt-8 border-t border-earth/10">
            <span className="label-mini text-[9px] text-earth/75 font-semibold tracking-[0.3em] block mb-4">
              Lo que verás desde aquí
            </span>
            <ul className="grid grid-cols-1 gap-2.5">
              {ENTORNO_HIGHLIGHTS.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 text-earth/70 text-sm font-light"
                >
                  <span className="w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonial: Capítulo V · Voces ---------- */

const MINI_TESTIMONIALS = [
  {
    quote: "La habitación principal con vistas al embalse es un sueño. Volveremos.",
    author: "Carla & David",
    house: "Casa del Mar",
  },
  {
    quote: "Reservamos el Film Studio para una pedida. Inolvidable.",
    author: "Andrés P.",
    house: "Film Studio",
  },
  {
    quote: "Privacidad real. No vimos a nadie en 4 días. Perfecto.",
    author: "Lucía M.",
    house: "Casa de la Cascada",
  },
];

function Testimonial() {
  const headerRef = useReveal();
  const quoteRef = useReveal();
  const stripRef = useReveal();
  return (
    <section
      id="resenas"
      className="relative py-14 md:py-20 px-6 md:px-10 bg-sand-deep overflow-hidden z-10"
    >
      {/* Background giant numeral */}
      <span
        className="editorial-numeral absolute top-12 right-4 md:right-16 text-[9rem] md:text-[32rem]"
        aria-hidden="true"
      >
        V
      </span>

      {/* Massive decorative quotation marks */}
      <span
        className="absolute -top-8 md:-top-12 left-4 md:left-16 font-serif text-[7rem] md:text-[24rem] text-gold/[0.10] leading-none select-none pointer-events-none italic font-light"
        aria-hidden="true"
      >
        “
      </span>
      <span
        className="absolute bottom-10 md:bottom-20 right-6 md:right-32 font-serif text-[7rem] md:text-[24rem] text-gold/[0.10] leading-none select-none pointer-events-none italic font-light"
        aria-hidden="true"
      >
        ”
      </span>

      <div ref={headerRef} className="reveal max-w-4xl mx-auto text-center relative mb-16 md:mb-20">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em]">
          <span className="h-px w-12 bg-olive/30" />
          <span>Capítulo · V · Voces</span>
          <span className="h-px w-12 bg-olive/30" />
        </div>
      </div>

      <div ref={quoteRef} className="reveal max-w-5xl mx-auto text-center relative z-10">
        {/* Star row */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="text-gold text-xl md:text-2xl"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              ★
            </span>
          ))}
          <span className="ml-3 label-mini text-[9px] tracking-[0.3em] text-earth/75 font-semibold">
            <CountUp to={4.9} decimals={1} duration={1400} /> / 5 ·{" "}
            <CountUp to={312} duration={1600} /> reseñas
          </span>
        </div>

        {/* Lead quote */}
        <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-earth leading-[1.05] tracking-tight text-balance">
          <span className="text-gold/60" aria-hidden="true">“</span>
          Un verdadero oasis<br className="hidden md:inline" />
          <span className="text-olive">de paz.</span>
          <span className="text-gold/60" aria-hidden="true">”</span>
        </p>

        {/* Body quote */}
        <blockquote className="font-serif text-base md:text-xl leading-relaxed text-earth text-balance font-light mt-6 max-w-3xl mx-auto">
          El cuidado por los detalles, el murmullo de la cascada exterior y la privacidad absoluta de la finca hicieron que nuestra estancia fuera inolvidable.
        </blockquote>

        {/* Author block */}
        <div className="mt-7 inline-flex items-center gap-5 bg-sand/70 border border-earth/10 backdrop-blur rounded-full pl-2 pr-6 py-2">
          <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center font-serif italic text-olive text-lg shrink-0">
            E&amp;M
          </div>
          <div className="text-left">
            <p className="font-serif text-[15px] text-earth leading-tight">
              Elena &amp; Marcos
            </p>
            <span className="text-[11px] text-earth/80 font-light leading-tight block mt-0.5">
              Madrid · La Casa de la Cascada · Junio 2024
            </span>
          </div>
        </div>

        {/* Link to more */}
        <div className="mt-10">
          <a
            href="#resenas"
            className="label-mini text-[9px] text-earth/90 hover:text-earth transition-colors duration-300 tracking-[0.28em] font-semibold inline-flex items-center gap-2 group"
          >
            <span>Leer las 312 reseñas verificadas</span>
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Mini testimonials strip */}
      <div
        ref={stripRef}
        className="reveal max-w-6xl mx-auto mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
      >
        {MINI_TESTIMONIALS.map((t) => (
          <figure
            key={t.author}
            className="bg-sand/60 border border-earth/8 backdrop-blur rounded-2xl p-6 md:p-7 shadow-premium hover:border-gold/30 transition-colors duration-500 group"
          >
            <div className="flex gap-1 mb-4 text-gold text-xs">★★★★★</div>
            <blockquote className="font-serif italic text-base md:text-lg text-earth/85 leading-snug">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-earth/8 flex items-center justify-between">
              <span className="font-serif text-sm text-earth">{t.author}</span>
              <span className="label-mini text-[8px] tracking-[0.25em] text-earth/75 font-semibold uppercase">
                {t.house}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Preguntas Frecuentes: Capítulo VI ---------- */
const FAQ_ITEMS = [
  {
    q: "¿Cómo puedo realizar mi reserva?",
    a: "La forma más directa y recomendada es haciendo clic en reservar y completando el formulario. También puedes chatear por WhatsApp al +34 627 43 64 24. Confirmamos disponibilidad inmediata, te asesoramos en base al tipo de escapada que buscas y bloqueamos las fechas sin intermediarios.",
  },
  {
    q: "¿Se admiten mascotas en los alojamientos?",
    a: "Con el objetivo de garantizar una limpieza e higiene perfectas para huéspedes alérgicos, no admitimos mascotas en ninguno de nuestros tres refugios rurales.",
  },
  {
    q: "¿Existe privacidad absoluta?",
    a: "Sí, es absoluta. Cada casa se encuentra ubicada en su propia finca de olivos vallada, es totalmente independiente de las otras y cuenta con piscina y terraza privadas de uso exclusivo para ti y tus acompañantes.",
  },
  {
    q: "¿Qué extras se pueden contratar en los packs?",
    a: "Preparamos decoración personalizada (pétalos de rosa, globos, velas led románticas), cenas con chef privado en la terraza de la casa, masajes profesionales a domicilio impartidos por fisioterapeutas y detalles como botellas de vino de autor y repostería artesana.",
  },
  {
    q: "¿Dónde estáis ubicados exactamente?",
    a: "Estamos situados en el paraje de La Hoz, a las afueras del pueblo de Rute y muy cerca del pantano de Iznájar, en plena Subbética Cordobesa (Andalucía). Enviamos las coordenadas GPS y las indicaciones exactas de acceso tras realizar la confirmación de reserva.",
  },
];

function FaqSection() {
  const headerRef = useReveal();
  const listRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-sand/90 py-14 md:py-20 overflow-hidden z-10"
    >
      <span
        className="editorial-numeral absolute top-10 left-4 md:left-12 text-[9rem] md:text-[32rem]"
        aria-hidden="true"
      >
        VI
      </span>

      <div ref={headerRef} className="reveal max-w-4xl mx-auto px-6 md:px-10 text-center relative mb-16 md:mb-20">
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-olive font-semibold tracking-[0.35em] mb-6">
          <span className="h-px w-12 bg-olive/30" />
          <span>Capítulo · VI · Preguntas</span>
          <span className="h-px w-12 bg-olive/30" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-earth leading-[0.95] tracking-tight text-balance">
          Lo que necesitas<br />
          <span className="italic text-olive font-normal">saber.</span>
        </h2>
      </div>

      <div
        ref={listRef}
        className="reveal max-w-3xl mx-auto px-6 md:px-10 relative z-10"
      >
        <div className="border-t border-earth/15">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`border-b border-earth/15 transition-colors duration-500 ${isOpen ? "bg-sand-deep/30" : ""
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-5 flex-1">
                    <span
                      className={`font-serif italic text-base md:text-lg leading-none transition-colors duration-500 w-8 shrink-0 ${isOpen ? "text-gold" : "text-earth/30"
                        }`}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-xl md:text-2xl leading-tight transition-colors duration-500 ${isOpen ? "text-earth italic" : "text-earth/80 group-hover:text-earth"
                        }`}
                    >
                      {item.q}
                    </span>
                  </span>

                  {/* Toggle indicator */}
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen
                      ? "bg-earth border-earth text-sand rotate-180"
                      : "border-earth/15 text-earth/75 group-hover:border-earth/30 group-hover:text-earth"
                      }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d={isOpen ? "M3 7l3-3 3 3" : "M3 5l3 3 3-3"} />
                    </svg>
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    maxHeight: isOpen ? "320px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="text-earth text-sm md:text-base leading-relaxed pl-13 pr-12 pb-7 font-light max-w-2xl" style={{ paddingLeft: "3.25rem" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing note */}
        <div className="mt-14 text-center">
          <p className="font-serif italic text-lg md:text-xl text-earth/95">
            ¿No has encontrado tu pregunta?
          </p>
          <a
            href={`${WHATSAPP_BASE}${encodeURIComponent("Hola, tengo una duda sobre Ruraly Hoz.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 label-mini text-[10px] text-earth hover:text-gold tracking-[0.28em] font-semibold transition-colors duration-300 group/cta"
          >
            <span>Pregúntanos por WhatsApp</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA: Cinematic close ---------- */
function FinalCTA() {
  const WHATSAPP_CTA_URL = `${WHATSAPP_BASE}${encodeURIComponent("Hola, me gustaría reservar una estancia en Ruraly Hoz.")}`;

  return (
    <section
      id="final-cta"
      className="relative min-h-[65vh] flex items-center justify-center px-6 py-16 overflow-hidden bg-earth z-10"
    >
      {/* Hero image with Ken Burns slow zoom */}
      <img
        src={ctaAerial}
        alt="Vista aérea de finca rural en Rute al atardecer"
        width={1920}
        height={1024}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover kenburns"
        style={{ objectPosition: "center 25%", opacity: 0.55 }}
      />

      {/* Vertical gradient + radial vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth/80 via-earth/40 to-earth/95 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_oklch(0.18_0.012_60/0.4)_100%)] z-0" />

      {/* Decorative giant numeral */}
      <span
        className="absolute top-12 right-4 md:right-16 font-serif italic font-extralight text-[10rem] md:text-[34rem] text-gold/[0.07] leading-none select-none pointer-events-none tracking-tight"
        aria-hidden="true"
      >
        VII
      </span>

      <div className="relative text-center text-sand max-w-4xl z-10 flex flex-col items-center">
        {/* Chapter eyebrow */}
        <div className="inline-flex items-center gap-4 label-mini text-[9px] text-gold font-semibold tracking-[0.35em] mb-8">
          <span className="h-px w-12 bg-gold/40" />
          <span>Capítulo · VII · El Cierre</span>
          <span className="h-px w-12 bg-gold/40" />
        </div>

        {/* Monumental title */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] tracking-tight text-balance">
          Tu próxima escapada<br />
          <span className="italic text-gold font-normal">empieza ahora.</span>
        </h2>

        <p className="mt-8 text-sand/70 text-base md:text-lg max-w-xl leading-relaxed font-light text-pretty">
          No dejes para otro mes lo que puede ser este fin de semana. Las mejores fechas se reservan con antelación.
        </p>

        {/* Dual CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
          <Link
            to="/reservas"
            className="editorial-cta"
            style={{ background: "var(--gold)", color: "var(--earth)" }}
          >
            <span>Reservar online</span>
            <span className="arrow text-lg" aria-hidden="true">→</span>
          </Link>

          <a
            href={WHATSAPP_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-5 rounded-full border border-sand/25 text-sand hover:bg-sand/10 hover:border-sand/45 transition-all duration-500 text-[11px] tracking-[0.28em] uppercase font-semibold"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-emerald-300 shrink-0"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24z" />
            </svg>
            <span>WhatsApp directo</span>
          </a>
        </div>

        {/* Phone number */}
        <a
          href="tel:+34627436424"
          className="mt-10 group"
        >
          <span className="label-mini text-[9px] text-sand/80 tracking-[0.3em] font-semibold uppercase block">
            Atención 24h
          </span>
          <span className="font-serif text-xl md:text-2xl text-sand font-light tracking-wide mt-1 block group-hover:text-gold transition-colors duration-500">
            +34 627 43 64 24
          </span>
        </a>

        {/* Signature */}
        <div className="mt-16 flex items-center gap-4 label-mini text-[9px] text-sand/70 tracking-[0.35em] font-semibold">
          <span className="h-px w-10 bg-sand/20" />
          <span>Ruraly Hoz · Subbética cordobesa</span>
          <span className="h-px w-10 bg-sand/20" />
        </div>
      </div>
    </section>
  );
}
