import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import casaCascada from "@/assets/casa-cascada.jpg";
import casaCascadaPiscina from "@/assets/casa-cascada-piscina.jpg";
import casaCascadaDormitorio from "@/assets/casa-cascada-dormitorio.jpg";
import casaCascadaSalon from "@/assets/casa-cascada-salon.jpg";
import casaCascadaJacuzzi from "@/assets/casa-cascada-jacuzzi.jpg";
import casaMar from "@/assets/casa-mar.jpg";
import casaMarPiscinaNoche from "@/assets/casa-mar-piscina-noche.jpg";
import casaMarJacuzzi from "@/assets/casa-mar-jacuzzi.jpg";
import casaMarSalon from "@/assets/casa-mar-salon.jpg";
import casaMarDormitorio from "@/assets/casa-mar-dormitorio.jpg";
import casaFilm from "@/assets/casa-film.jpg";
import casaFilmBanoArabe from "@/assets/casa-film-bano-arabe.jpg";
import casaFilmTerraza from "@/assets/casa-film-terraza.jpg";
import casaFilmPiscina from "@/assets/casa-film-piscina.jpg";
import casaFilmDormitorio from "@/assets/casa-film-dormitorio.jpg";

const HOUSE_IMAGES: Record<string, string[]> = {
  cascada: [casaCascadaPiscina, casaCascada, casaCascadaDormitorio, casaCascadaSalon, casaCascadaJacuzzi],
  mar: [casaMarPiscinaNoche, casaMar, casaMarJacuzzi, casaMarSalon, casaMarDormitorio],
  film: [casaFilm, casaFilmBanoArabe, casaFilmTerraza, casaFilmPiscina, casaFilmDormitorio],
};

const reservasSearchSchema = z.object({
  house: z.enum(["cascada", "mar", "film"]).optional(),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  guests: z.coerce.number().optional(),
  adults: z.coerce.number().optional(),
  children: z.coerce.number().optional(),
  infants: z.coerce.number().optional(),
});

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas — Ruraly Hoz" },
      { name: "description", content: "Reserva tu estancia en Ruraly Hoz. Calendario de disponibilidad y reserva directa para casa rural premium en Rute, Córdoba." },
      { property: "og:title", content: "Reservas — Ruraly Hoz" },
      { property: "og:description", content: "Reserva directa en Ruraly Hoz, Rute, Córdoba." },
      { property: "og:url", content: "/reservas" },
    ],
    links: [{ rel: "canonical", href: "/reservas" }],
  }),
  validateSearch: reservasSearchSchema,
  component: ReservasPage,
});

/* ─── House & Experience Configuration ─── */

interface Experience {
  id: string;
  label: string;
  pricePerDay: number;
}

interface HouseData {
  slug: "cascada" | "mar" | "film";
  name: string;
  subtitle: string;
  pricePerNight: number;
  minGuests: number;
  maxGuests: number;
  experiences: Experience[];
}

const HOUSES: HouseData[] = [
  {
    slug: "cascada",
    name: "La Casa de la Cascada",
    subtitle: "Hasta 4 huéspedes · Piscina · Jacuzzi",
    pricePerNight: 240,
    minGuests: 1,
    maxGuests: 4,
    experiences: [
      { id: "cascada-jacuzzi", label: "Climatización del Jacuzzi", pricePerDay: 25 },
    ],
  },
  {
    slug: "mar",
    name: "Casa del Mar",
    subtitle: "Hasta 6 huéspedes · Piscina · Jacuzzi",
    pricePerNight: 190,
    minGuests: 1,
    maxGuests: 6,
    experiences: [
      { id: "mar-jacuzzi", label: "Climatización del Jacuzzi", pricePerDay: 25 },
    ],
  },
  {
    slug: "film",
    name: "Film Studio",
    subtitle: "2 huéspedes · Only adults · Baño Árabe",
    pricePerNight: 260,
    minGuests: 1,
    maxGuests: 2,
    experiences: [
      { id: "film-bano-arabe", label: "Climatización del Baño Árabe", pricePerDay: 25 },
    ],
  },
];

/* ─── Component ─── */

function ReservasPage() {
  const searchParams = Route.useSearch();
  
  const [selectedHouseSlug, setSelectedHouseSlug] = useState<"cascada" | "mar" | "film">(searchParams.house || "cascada");
  const [selectedExperiences, setSelectedExperiences] = useState<Set<string>>(new Set());
  const [date, setDate] = useState<DateRange | undefined>({
    from: searchParams.checkin ? new Date(searchParams.checkin) : undefined,
    to: searchParams.checkout ? new Date(searchParams.checkout) : undefined,
  });
  const [guests, setGuests] = useState(searchParams.guests || 2);
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);
  const [infants, setInfants] = useState(searchParams.infants || 0);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [photoOffset, setPhotoOffset] = useState(0);

  const selectedHouse = HOUSES.find((h) => h.slug === selectedHouseSlug)!;
  const isAdultsOnly = selectedHouse.slug === "film";
  const totalCounted = adults + children;

  const handleAdultsChange = (delta: number) => {
    const newAdults = adults + delta;
    if (newAdults >= 1 && newAdults + children <= selectedHouse.maxGuests) {
      setAdults(newAdults);
      setGuests(newAdults + children);
    }
  };

  const handleChildrenChange = (delta: number) => {
    if (isAdultsOnly) return;
    const newChildren = children + delta;
    if (newChildren >= 0 && adults + newChildren <= selectedHouse.maxGuests) {
      setChildren(newChildren);
      setGuests(adults + newChildren);
    }
  };

  const handleInfantsChange = (delta: number) => {
    if (isAdultsOnly) return;
    const newInfants = infants + delta;
    if (newInfants >= 0) {
      setInfants(newInfants);
    }
  };

  // Calculate nights
  const nights = useMemo(() => {
    if (!date?.from || !date?.to) return 0;
    const ms = date.to.getTime() - date.from.getTime();
    return Math.max(0, Math.round(ms / 86400000));
  }, [date]);

  const isWeekdayStay = useMemo(() => {
    if (!date?.from || !date?.to || nights < 3) return false;
    let current = new Date(date.from);
    let hasWeekend = false;
    for (let i = 0; i < nights; i++) {
      const day = current.getDay();
      if (day === 5 || day === 6) { // Friday or Saturday
        hasWeekend = true;
        break;
      }
      current.setDate(current.getDate() + 1);
    }
    return !hasWeekend;
  }, [date, nights]);

  // Calculate pricing
  const baseTotal = nights * selectedHouse.pricePerNight;
  const cascadaDiscount = (selectedHouseSlug === "cascada" && isWeekdayStay && nights >= 3) ? 115 : 0;

  const experiencesBreakdown = useMemo(() => {
    return selectedHouse.experiences
      .filter((exp) => selectedExperiences.has(exp.id))
      .map((exp) => ({
        ...exp,
        total: exp.pricePerDay * nights,
      }));
  }, [selectedHouse, selectedExperiences, nights]);

  const experiencesTotal = experiencesBreakdown.reduce((sum, e) => sum + e.total, 0);
  const serviceFee = nights > 0 ? 42 : 0;
  const grandTotal = baseTotal - cascadaDiscount + experiencesTotal + serviceFee;

  // Handle house switch → reset experiences & clamp guests
  const handleHouseChange = (slug: "cascada" | "mar" | "film") => {
    setSelectedHouseSlug(slug);
    setSelectedExperiences(new Set());
    setPhotoOffset(0);
    const newHouse = HOUSES.find((h) => h.slug === slug)!;
    
    // Reset guest counts when changing houses to respect boundaries
    if (slug === "film") {
      setAdults(Math.min(2, adults));
      setChildren(0);
      setInfants(0);
      setGuests(Math.min(2, adults));
    } else {
      if (adults + children > newHouse.maxGuests) {
        setAdults(Math.max(1, newHouse.maxGuests - children));
        // If still over, reduce children
        if (adults + children > newHouse.maxGuests) {
           setChildren(newHouse.maxGuests - adults);
        }
        setGuests(newHouse.maxGuests);
      }
    }
  };

  // Toggle experience
  const toggleExperience = (id: string) => {
    setSelectedExperiences((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Today's date for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <SiteShell>
      {/* Hero Header */}
      <section className="pt-40 pb-16 px-6 md:px-10 max-w-7xl mx-auto text-left">
        <span className="label-eyebrow text-olive font-bold tracking-widest uppercase">Reserva directa</span>
        <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-[1.02] max-w-3xl">
          Consulta <span className="italic text-gold">disponibilidad</span>
        </h1>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-32 grid md:grid-cols-12 gap-10 md:gap-16">

        {/* ─── Left Column: Form Steps ─── */}
        <div className="md:col-span-7 space-y-16">

          {/* ───────────── PASO 01: Elige tu alojamiento ───────────── */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-[1.5px] bg-gold"></span>
              <span className="text-gold text-xs font-bold tracking-widest uppercase">Paso 01</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Elige tu <span className="italic">alojamiento</span>
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {HOUSES.map((house) => {
                const isActive = selectedHouseSlug === house.slug;
                return (
                  <button
                    key={house.slug}
                    type="button"
                    onClick={() => handleHouseChange(house.slug)}
                    className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "border-gold bg-white shadow-premium"
                        : "border-earth/10 bg-white/40 hover:border-earth/20 hover:bg-white/70"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-gold text-earth font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-bl-lg shadow-gold">
                        Seleccionado
                      </div>
                    )}
                    <h3 className={`font-serif text-lg leading-snug transition-colors font-bold ${
                      isActive ? "text-earth" : "text-earth/70 group-hover:text-earth"
                    }`}>
                      {house.name}
                    </h3>
                    <p className={`label-mini mt-2 transition-colors font-semibold ${
                      isActive ? "text-earth/60" : "text-earth/40"
                    }`}>
                      {house.subtitle}
                    </p>
                    <p className={`font-serif text-base mt-4 transition-colors ${
                      isActive ? "text-earth font-bold" : "text-earth/60"
                    }`}>
                      desde <strong className="text-olive">{house.pricePerNight}€</strong> / noche
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ───────────── PASO 02: Añade experiencias ───────────── */}
          {selectedHouse.experiences.length > 0 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-[1.5px] bg-gold"></span>
                <span className="text-gold text-xs font-bold tracking-widest uppercase">Paso 02</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Añade <span className="italic">experiencias</span>
              </h2>

              <div className="grid gap-3 mt-4">
                {selectedHouse.experiences.map((exp) => {
                  const isChecked = selectedExperiences.has(exp.id);
                  return (
                    <label
                      key={exp.id}
                      className={`flex items-center justify-between py-5 px-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        isChecked 
                          ? "bg-white border-gold/40 shadow-sm text-earth" 
                          : "bg-white/30 border-earth/5 hover:bg-white/60 hover:border-earth/10 text-earth/80"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          isChecked
                            ? "bg-gold border-gold text-earth"
                            : "border-earth/25 bg-transparent"
                        }`}>
                          {isChecked && (
                            <svg className="w-3.5 h-3.5 text-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleExperience(exp.id)}
                          className="sr-only"
                        />
                        <span className="text-sm font-semibold">{exp.label}</span>
                      </div>
                      <span className="font-serif text-olive text-sm font-bold whitespace-nowrap">
                        {nights > 0
                          ? `+${exp.pricePerDay * nights}€ (${nights} ${nights === 1 ? "noche" : "noches"})`
                          : `+${exp.pricePerDay}€/día`
                        }
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* ───────────── PASO 03: Fechas y datos ───────────── */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-[1.5px] bg-gold"></span>
              <span className="text-gold text-xs font-bold tracking-widest uppercase">
                Paso {selectedHouse.experiences.length > 0 ? "03" : "02"}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Fechas y <span className="italic">datos</span>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Solicitud de reserva enviada correctamente. Nuestro equipo Premium le contactará en menos de 24h.");
              }}
              className="glass-luxe shadow-premium p-6 md:p-8 rounded-3xl space-y-6 mt-4 border-t border-earth/5"
            >
              <Field label="Fechas de estancia">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="form-input cursor-pointer flex justify-between items-center select-none w-full">
                      <span className={`font-semibold ${date?.from ? "text-earth" : "text-earth/40 font-normal"}`}>
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "d MMM", { locale: es })} -{" "}
                              {format(date.to, "d MMM, yyyy", { locale: es })}
                            </>
                          ) : (
                            format(date.from, "d MMM, yyyy", { locale: es })
                          )
                        ) : (
                          "Seleccionar fechas..."
                        )}
                      </span>
                      <svg className="w-5 h-5 text-earth/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      locale={es}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="bg-white rounded-xl shadow-lg border-earth/10 text-earth"
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field label="Huéspedes">
                <div className="relative">
                  <div 
                    onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                    className="form-input cursor-pointer flex justify-between items-center select-none"
                  >
                    <span className="font-semibold">
                      {totalCounted} {totalCounted === 1 ? "huésped" : "huéspedes"}
                      {infants > 0 ? `, ${infants} ${infants === 1 ? "bebé" : "bebés"}` : ""}
                    </span>
                    <svg className={`w-5 h-5 text-earth/40 transition-transform ${isGuestDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isGuestDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-earth/10 p-6 z-30 text-left">
                      <h4 className="text-lg font-serif text-earth mb-5 font-bold">¿Quién viene?</h4>
                      
                      <div className="space-y-5">
                        {/* Adultos */}
                        <div className="flex justify-between items-center">
                          <span className="text-[15px] font-medium text-earth">Adultos</span>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdultsChange(-1); }} disabled={adults <= 1} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">-</button>
                            <span className="w-6 text-center text-[15px] text-earth font-bold">{adults}</span>
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdultsChange(1); }} disabled={totalCounted >= selectedHouse.maxGuests} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">+</button>
                          </div>
                        </div>

                        {!isAdultsOnly && (
                          <>
                            {/* Niños */}
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-earth">Niños</span>
                                <span className="text-[11px] text-earth/50">De 2 a 12 años</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleChildrenChange(-1); }} disabled={children <= 0} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">-</button>
                                <span className="w-6 text-center text-[15px] text-earth font-bold">{children}</span>
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleChildrenChange(1); }} disabled={totalCounted >= selectedHouse.maxGuests} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">+</button>
                              </div>
                            </div>

                            {/* Bebés */}
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-earth">Bebés</span>
                                <span className="text-[11px] text-earth/50">Menores de 2 años</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleInfantsChange(-1); }} disabled={infants <= 0} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">-</button>
                                <span className="w-6 text-center text-[15px] text-earth font-bold">{infants}</span>
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleInfantsChange(1); }} className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:bg-earth/5 disabled:opacity-20 transition-all text-lg font-light">+</button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-6 pt-5 border-t border-earth/10 text-center">
                        {isAdultsOnly && (
                          <p className="text-[13px] text-[#A67C1E] bg-[#FAF3E0] py-2 px-3 rounded-lg mb-4 font-medium">Este alojamiento es solo para personas mayores de 18 años.</p>
                        )}
                        <p className="text-[13px] text-earth/60 mb-5 font-medium flex items-center justify-center gap-1.5">
                          <svg className="w-4 h-4 text-earth/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          No se aceptan mascotas.
                        </p>
                        
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setIsGuestDropdownOpen(false); }}
                          className="w-full bg-earth text-sand py-3 rounded-xl font-bold tracking-wider text-[13px] hover:bg-earth-deep transition-colors uppercase"
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Email">
                <input type="email" required className="form-input" placeholder="ejemplo@correo.com" />
              </Field>

              <Field label="Mensaje (opcional)">
                <textarea
                  className="form-input resize-none"
                  rows={3}
                  placeholder="¿Alguna petición especial, detalle de bienvenida o preferencia?"
                />
              </Field>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold-deep text-earth font-bold rounded-xl btn-hover-grow btn-shimmer shadow-gold uppercase tracking-wider text-xs transition-all duration-300 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Solicitar reserva directa</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* ─── Right Column: Sticky Summary ─── */}
        <aside className="md:col-span-5 md:sticky md:top-28 self-start">
          <div className="bg-white border border-earth/10 p-8 md:p-10 rounded-3xl space-y-6 shadow-premium relative overflow-hidden text-earth">
            {/* Top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold-deep to-gold" />
            
            <div className="space-y-1">
              <span className="label-mini text-earth/40 block font-bold">Resumen de tu estancia</span>
              <h3 className="font-serif text-3xl text-earth font-bold">{selectedHouse.name}</h3>
            </div>

            {selectedHouseSlug === "cascada" && (
              cascadaDiscount > 0 ? (
                <div className="mt-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[13px] leading-snug flex items-start gap-2.5 text-emerald-800 animate-fade-in">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded mr-1">¡AHORRAS 115€!</span>
                    <span className="font-semibold">Aplicado descuento especial de 3ª noche entre semana.</span>
                  </div>
                </div>
              ) : (
                <div className="mt-2 p-3 bg-amber-50/60 border border-amber-100 rounded-xl text-[13px] leading-snug flex items-start gap-2.5 text-amber-800">
                  <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Promo Cascada:</strong> Estancias ≥ 3 noches entre semana (dom-jue) tienen descuento especial (3ª noche a 125€).
                  </div>
                </div>
              )
            )}

            {/* Mini Gallery */}
            {(() => {
              const imgs = HOUSE_IMAGES[selectedHouseSlug] || [];
              const total = imgs.length;
              if (total === 0) return null;
              const i0 = photoOffset % total;
              const i1 = (photoOffset + 1) % total;
              return (
                <div className="relative rounded-xl overflow-hidden">
                  <div className="flex gap-2 h-32">
                    <div className="w-1/2 rounded-lg overflow-hidden h-full">
                      <img key={i0} src={imgs[i0]} alt={selectedHouse.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="w-1/2 rounded-lg overflow-hidden h-full">
                      <img key={i1} src={imgs[i1]} alt={selectedHouse.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                  <button onClick={() => setPhotoOffset((o) => (o - 1 + total) % total)} aria-label="Foto anterior"
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-earth p-1.5 rounded-full shadow transition-all hover:scale-105 active:scale-95">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setPhotoOffset((o) => (o + 1) % total)} aria-label="Foto siguiente"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-earth p-1.5 rounded-full shadow transition-all hover:scale-105 active:scale-95">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-earth/60 text-sand text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    {i0 + 1} / {total}
                  </div>
                </div>
              );
            })()}

            {/* Base price breakdown */}
            <div className="space-y-4 border-t border-dashed border-earth/15 pt-6">
              <Row label="Precio / noche" value={`${selectedHouse.pricePerNight} €`} />
              <Row label="Noches" value={nights > 0 ? `${nights}` : "—"} />
              <Row label="Huéspedes" value={`${guests}`} />
              {nights > 0 && (
                cascadaDiscount > 0 ? (
                  <>
                    <Row
                      label={`${selectedHouse.pricePerNight}€ × ${nights - 1} ${nights - 1 === 1 ? "noche" : "noches"}`}
                      value={`${(nights - 1) * selectedHouse.pricePerNight} €`}
                      highlight
                    />
                    <div className="flex justify-between text-sm font-semibold text-emerald-700 bg-emerald-50/50 px-2 py-1.5 rounded-lg border border-dashed border-emerald-200/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Promo 3ª noche
                      </span>
                      <span>125 € (-115€)</span>
                    </div>
                  </>
                ) : (
                  <Row
                    label={`${selectedHouse.pricePerNight}€ × ${nights} noches`}
                    value={`${baseTotal} €`}
                    highlight
                  />
                )
              )}
            </div>

            {/* Experiences breakdown */}
            {experiencesBreakdown.length > 0 && (
              <div className="space-y-4 border-t border-dashed border-earth/15 pt-6">
                <span className="label-mini text-earth/40 block font-bold">Experiencias</span>
                {experiencesBreakdown.map((exp) => (
                  <Row
                    key={exp.id}
                    label={exp.label}
                    value={nights > 0 ? `+${exp.total} €` : `+${exp.pricePerDay} €/día`}
                  />
                ))}
                {nights > 0 && experiencesBreakdown.length > 0 && (
                  <div className="text-[10px] text-earth/45 italic space-y-1">
                    {experiencesBreakdown.map((exp) => (
                      <span key={exp.id} className="block">
                        • {exp.label}: {exp.pricePerDay}€ × {nights} noches = {exp.total}€
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Service Fee */}
            {nights > 0 && (
              <div className="border-t border-dashed border-earth/15 pt-6 flex justify-between items-center text-sm font-medium relative group cursor-help text-earth/80">
                <span className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                  Tarifa de servicio (IVA inc.)
                  <svg className="w-4 h-4 text-earth/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-semibold">{serviceFee} €</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-2 w-[280px] sm:w-[320px] bg-earth text-sand text-[13px] leading-relaxed p-4 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30 pointer-events-none text-left font-normal border border-sand/10">
                  Cubre costos de gestión y mantenimiento de la plataforma para garantizar su reserva directa segura.
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-6 -mt-px border-4 border-transparent border-t-earth"></div>
                </div>
              </div>
            )}

            {/* Grand Total */}
            <div className="border-t border-dashed border-earth/15 pt-6 flex justify-between items-baseline">
              <span className="label-mini text-earth/40 font-bold">Total estimado</span>
              <div className="text-right">
                <span className="font-serif text-4xl text-olive font-bold">{grandTotal > 0 ? `${grandTotal} €` : "— €"}</span>
                <span className="text-[10px] text-earth/40 block mt-1 font-medium">IVA e impuestos incluidos</span>
              </div>
            </div>

            {/* Security guarantee badges */}
            <div className="border-t border-dashed border-earth/15 pt-6 space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-earth/70">
                <svg className="w-4.5 h-4.5 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">Reserva 100% segura directa</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-earth/70">
                <svg className="w-4.5 h-4.5 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Cancelación flexible disponible</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-earth/70">
                <svg className="w-4.5 h-4.5 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">Conserjería directa sin comisiones</span>
              </div>
            </div>

            <p className="text-[11px] text-earth/50 leading-relaxed pt-4 border-t border-earth/5 text-center font-medium">
              Confirmamos disponibilidad en menos de 24h por email. También puedes contactar por WhatsApp: <strong>+34 627 43 64 24</strong>.
            </p>
          </div>
        </aside>

      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(26, 25, 23, 0.1);
          border-radius: 14px;
          padding: 14px 18px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--earth);
          outline: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: inset 0 1px 2px rgba(26, 25, 23, 0.01);
        }
        .form-input:focus, .form-input:focus-within {
          background: #ffffff;
          border-color: var(--olive);
          box-shadow: 0 4px 16px rgba(95, 103, 73, 0.08), 0 0 0 3px rgba(95, 103, 73, 0.15);
        }
        .form-input::placeholder { color: rgba(26, 25, 23, 0.35); }
        button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </SiteShell>
  );
}

/* ─── Sub-components ─── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-mini text-earth/50 block mb-2">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${highlight ? "font-semibold" : ""}`}>
      <span className="opacity-70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
