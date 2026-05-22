import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BookingWidgetProps {
  slug: "cascada" | "mar" | "film";
  name: string;
  subtitle?: string;
  maxGuests: number;
  pricePerNight: number;
  images: string[];
  amenities: string;
}

export function BookingWidget({
  slug,
  name,
  subtitle = "Casa",
  maxGuests,
  pricePerNight,
  images,
  amenities,
}: BookingWidgetProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [photoOffset, setPhotoOffset] = useState(0);
  const totalPhotos = images.length;
  const img0 = images[photoOffset % totalPhotos];
  const img1 = images[(photoOffset + 1) % totalPhotos];

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalCounted = adults + children;
  const isAdultsOnly = slug === "film";

  const handleAdultsChange = (delta: number) => {
    const newAdults = adults + delta;
    if (newAdults >= 1 && newAdults + children <= maxGuests) {
      setAdults(newAdults);
    }
  };

  const handleChildrenChange = (delta: number) => {
    if (isAdultsOnly) return;
    const newChildren = children + delta;
    if (newChildren >= 0 && adults + newChildren <= maxGuests) {
      setChildren(newChildren);
    }
  };

  const handleInfantsChange = (delta: number) => {
    if (isAdultsOnly) return;
    const newInfants = infants + delta;
    if (newInfants >= 0) {
      setInfants(newInfants);
    }
  };

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
      if (day === 5 || day === 6) { // Friday or Saturday night
        hasWeekend = true;
        break;
      }
      current.setDate(current.getDate() + 1);
    }
    return !hasWeekend;
  }, [date, nights]);

  const displayNights = nights > 0 ? nights : 1;
  const basePrice = displayNights * pricePerNight;
  const cascadaDiscount = (slug === "cascada" && isWeekdayStay) ? 115 : 0; // 240 - 125 = 115€ discount
  const totalPrice = basePrice - cascadaDiscount;

  const handleReserve = () => {
    navigate({
      to: "/reservas",
      search: {
        house: slug,
        checkin: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
        checkout: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
        guests: totalCounted,
        adults: adults,
        children: children,
        infants: infants
      },
    });
  };

  return (
    <div className="glass-luxe shadow-premium border-t border-earth/5 rounded-3xl p-6 md:p-8 relative">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-gold pulse-gold shrink-0"></div>
        <h3 className="text-xl md:text-2xl font-serif text-earth font-bold">Ver disponibilidad y precios</h3>
      </div>

      <div className="space-y-4">
        {/* Huéspedes */}
        <div className="relative">
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="border border-earth/10 rounded-2xl px-4 py-3.5 bg-white/70 hover:bg-white transition-all duration-300 shadow-sm cursor-pointer select-none flex items-center justify-between group hover:border-earth/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center text-olive group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-earth/50 uppercase tracking-widest font-bold">Número de huéspedes</span>
                <span className="text-earth font-bold text-[15px]">
                  {totalCounted} {totalCounted === 1 ? "huésped" : "huéspedes"}
                  {infants > 0 ? `, ${infants} ${infants === 1 ? "bebé" : "bebés"}` : ""}
                </span>
              </div>
            </div>
            <svg className={`w-4 h-4 text-earth/40 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-earth/10 p-6 z-20">
              <h4 className="text-xl font-serif text-earth mb-5 font-bold">¿Quién viene?</h4>
              
              <div className="space-y-5">
                {/* Adultos */}
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-medium text-earth">Adultos</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleAdultsChange(-1); }} 
                      disabled={adults <= 1} 
                      className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-[16px] text-earth font-bold">{adults}</span>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleAdultsChange(1); }} 
                      disabled={totalCounted >= maxGuests} 
                      className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:border-earth/30 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                    >
                      +
                    </button>
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
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleChildrenChange(-1); }} 
                          disabled={children <= 0} 
                          className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-[16px] text-earth font-bold">{children}</span>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleChildrenChange(1); }} 
                          disabled={totalCounted >= maxGuests} 
                          className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:border-earth/30 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Bebés */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-earth">Bebés</span>
                        <span className="text-[11px] text-earth/50">Menores de 2 años</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleInfantsChange(-1); }} 
                          disabled={infants <= 0} 
                          className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/60 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-[16px] text-earth font-bold">{infants}</span>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleInfantsChange(1); }} 
                          className="w-8 h-8 rounded-full border border-earth/15 flex items-center justify-center text-earth/80 hover:border-earth/30 hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-lg font-light"
                        >
                          +
                        </button>
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
                  onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); }}
                  className="w-full bg-earth text-sand py-3 rounded-xl font-bold tracking-wider text-[13px] hover:bg-earth-deep transition-colors uppercase"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fechas (Modern DateRange Picker) */}
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <div 
                className="border border-earth/10 rounded-2xl px-4 py-3.5 bg-white/70 hover:bg-white transition-all duration-300 shadow-sm cursor-pointer select-none flex items-center justify-between group hover:border-earth/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center text-olive group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-earth/50 uppercase tracking-widest font-bold">Fechas de estancia</span>
                    <span className="text-earth font-bold text-[15px]">
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
                        <span className="text-earth/40 font-normal">Seleccionar fechas</span>
                      )}
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-earth/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                locale={es}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="bg-white rounded-xl shadow-lg border-earth/10 text-earth"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Inner White Card */}
        <div className="bg-white/90 rounded-2xl border border-earth/5 p-5 shadow-sm mt-4">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-[17px] font-bold text-earth font-serif">{name}</h4>
            <div className="flex items-center gap-1.5 text-earth/70">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="text-sm font-semibold">{maxGuests} pers.</span>
            </div>
          </div>
          <span className="text-earth/50 text-xs block mb-4 uppercase tracking-wider font-semibold">{subtitle}</span>

          {/* Mini Gallery */}
          {images.length > 0 && (
            <div className="relative mb-4 rounded-xl overflow-hidden">
              <div className="flex gap-2 h-28">
                <div className="w-1/2 rounded-lg overflow-hidden h-full cursor-pointer" onClick={() => setPhotoOffset((o) => (o - 1 + totalPhotos) % totalPhotos)}>
                  <img key={photoOffset} src={img0} alt={name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="w-1/2 rounded-lg overflow-hidden h-full cursor-pointer" onClick={() => setPhotoOffset((o) => (o + 1) % totalPhotos)}>
                  <img key={photoOffset + 1} src={img1} alt={name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </div>
              {totalPhotos > 2 && (
                <>
                  <button
                    onClick={() => setPhotoOffset((o) => (o - 1 + totalPhotos) % totalPhotos)}
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-earth p-1 rounded-full shadow transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPhotoOffset((o) => (o + 1) % totalPhotos)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-earth p-1 rounded-full shadow transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-earth/60 text-sand text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    {(photoOffset % totalPhotos) + 1} / {totalPhotos}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Amenities */}
          <p className="text-[12.5px] text-earth/60 leading-relaxed border-b border-earth/10 pb-4 mb-4 font-light">
            {amenities}
          </p>

          {/* Promo Text for Cascada */}
          {slug === "cascada" && (
            <div className={`mt-4 mb-4 p-3.5 rounded-xl border text-[13px] leading-relaxed flex items-start gap-2.5 transition-all duration-300 ${cascadaDiscount > 0 ? 'bg-[#3B8A3F]/8 border-[#3B8A3F]/20 text-[#2F6F33]' : 'bg-gold/5 border-gold/15 text-gold-deep'}`}>
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <div>
                <strong>Promo entre semana:</strong> Quédate 3 noches o más entre semana (domingo a jueves) y consigue la 3ª noche por solo 125€.
              </div>
            </div>
          )}

          {/* Price Calculation */}
          {nights > 0 && (
            <>
              <div className="space-y-3 mb-5 border-b border-earth/10 pb-4 mt-4">
                {cascadaDiscount > 0 ? (
                  <>
                    <div className="flex justify-between items-center text-[14px] font-medium text-earth">
                      <span className="text-earth/70">Precio: €{pricePerNight} x {nights - 1} {nights - 1 === 1 ? "noche" : "noches"}</span>
                      <span className="font-bold text-earth">€{(nights - 1) * pricePerNight}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px] font-medium text-[#2F6F33]">
                      <span>Promo 3ª noche</span>
                      <span className="font-bold">€125</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center text-[14px] font-medium text-earth">
                    <span className="text-earth/70">Precio: €{pricePerNight} x {nights} {nights === 1 ? "noche" : "noches"}</span>
                    <span className="font-bold text-earth">€{nights * pricePerNight}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-[14px] font-medium text-earth relative group cursor-help">
                  <span className="flex items-center gap-1.5 text-earth/70">
                    Tarifa de servicio (IVA incluido)
                    <svg className="w-4 h-4 text-earth/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="font-bold text-earth">€42</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-0 mb-2 w-[280px] sm:w-[320px] bg-[#1A1917] text-[#FAF9F6] text-[12px] leading-relaxed p-3.5 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 pointer-events-none font-normal">
                    Se aplica una tarifa administrativa única para cubrir los costes de gestión de la reserva directa.
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-6 -mt-px border-4 border-transparent border-t-[#1A1917]"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-baseline text-earth mb-5">
                <span className="text-[15px] font-bold uppercase tracking-wider text-earth/60">Total Estimado</span>
                <span className="font-serif text-2xl font-bold">€{totalPrice + 42}</span>
              </div>
            </>
          )}

          {nights === 0 ? (
            <button
              disabled
              className="w-full py-4 rounded-xl font-bold tracking-wider text-xs uppercase bg-earth/10 text-earth/40 cursor-not-allowed border border-earth/5 transition-all duration-300"
            >
              Selecciona fechas de estancia
            </button>
          ) : (
            <button
              onClick={handleReserve}
              className="w-full py-4 bg-gold hover:bg-gold-deep text-earth font-bold rounded-xl btn-hover-grow btn-shimmer shadow-gold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>¡Reservar estancia ahora!</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}

          {/* Benefits Grid */}
          <div className="mt-6 pt-4 border-t border-earth/5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-left">
            <div className="flex items-center gap-2 text-[12px] text-earth/70 font-semibold">
              <svg className="w-4 h-4 text-[#3B8A3F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mejor precio garantizado</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-earth/70 font-semibold">
              <svg className="w-4 h-4 text-[#3B8A3F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Sin costes ocultos</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-earth/70 font-semibold">
              <svg className="w-4 h-4 text-[#3B8A3F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancelación flexible</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-earth/70 font-semibold">
              <svg className="w-4 h-4 text-[#3B8A3F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-olive">Detalle de bienvenida</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
