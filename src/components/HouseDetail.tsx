import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useState, useEffect, type ReactNode } from "react";
import { Grid, X, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface HouseConfig {
  slug: "cascada" | "mar" | "film";
  title: string;
  tagline: string;
  hero: string;
  heroHeight?: string;
  heroPosition?: string;
  videoEmbed?: string;
  gallery: string[];
  groupedGallery?: { category: string; photos: string[] }[];
  description: string[];
  price: string;
  amenities: string[];
  capacity: string;
  rooms: string;
  extraContent?: ReactNode;
}

export function HouseDetail({ data }: { data: HouseConfig }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [mosaicOffset, setMosaicOffset] = useState(0);

  const total = data.gallery.length;
  const mosaicPhoto = (i: number) => data.gallery[(mosaicOffset + i) % total];
  const mosaicIndex = (i: number) => (mosaicOffset + i) % total;
  const prevMosaic = () => setMosaicOffset((o) => (o - 1 + total) % total);
  const nextMosaic = () => setMosaicOffset((o) => (o + 1) % total);

  // Disable body scroll when modal or lightbox is active
  useEffect(() => {
    if (isGalleryOpen || activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen, activePhotoIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => 
          prev !== null ? (prev + 1) % data.gallery.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => 
          prev !== null ? (prev - 1 + data.gallery.length) % data.gallery.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, data.gallery.length]);

  return (
    <SiteShell>
      {/* Hero */}
      <section className={`relative overflow-hidden ${data.heroHeight || "h-[42vh] md:h-[45vh] min-h-[300px] md:min-h-[360px]"}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${data.hero})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: data.heroPosition === "object-top" ? "top" : data.heroPosition === "object-bottom" ? "bottom" : "center",
          }}
          aria-hidden="true"
        />
        {/* Dark overlay for rich contrast and legibility */}
        <div className="absolute inset-0 bg-earth/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/35 to-transparent" />
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-14 right-6 md:right-14 text-sand">
          <span className="label-eyebrow opacity-80 text-xs md:text-sm">
            Rute · Córdoba · {data.slug === "cascada" ? "Naturaleza" : data.slug === "mar" ? "Mediterránea" : "Cinematográfica"}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl mt-2 md:mt-3 leading-[1.02] max-w-3xl">
            {data.title}
          </h1>
          <p className="font-serif italic text-lg md:text-xl mt-2 opacity-90">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* Intro split */}
      <section className="grid md:grid-cols-12 gap-10 md:gap-16 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="md:col-span-5 space-y-6">
          <span className="label-eyebrow text-olive">La casa</span>
          <h2 className="font-serif text-4xl leading-tight">
            Un espacio para
            <br />
            <span className="italic">habitar despacio.</span>
          </h2>
          <Link
            to="/reservas"
            className="inline-block label-mini bg-earth text-sand px-8 py-4 hover:bg-olive-deep transition-colors duration-500 mt-4"
          >
            Consultar disponibilidad
          </Link>
        </div>
        <div className="md:col-span-7 space-y-6 text-earth/70 leading-relaxed">
          {data.description.map((p, i) => (
            <p key={i} className="text-pretty">{p}</p>
          ))}
        </div>
      </section>

      {/* Extra content (if provided) */}
      {data.extraContent}

      {/* Gallery mosaic with arrow navigation */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="relative h-[280px] md:h-[500px] w-full gap-2 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 overflow-hidden bg-white">
          {/* Foto 1 — principal grande */}
          <div className="col-span-1 md:col-span-2 md:row-span-2 overflow-hidden h-full relative cursor-pointer" onClick={() => setActivePhotoIndex(mosaicIndex(0))}>
            <img key={mosaicIndex(0)} src={mosaicPhoto(0)} alt={`${data.title} — foto`} loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2200ms]" />
          </div>

          {/* Foto 2 */}
          <div className="col-span-1 md:col-span-1 md:row-span-1 overflow-hidden h-full relative cursor-pointer" onClick={() => setActivePhotoIndex(mosaicIndex(1))}>
            <img key={mosaicIndex(1)} src={mosaicPhoto(1)} alt={`${data.title} — foto`} loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2200ms]" />
          </div>

          {/* Foto 3 — solo escritorio */}
          <div className="hidden md:block col-span-1 row-span-1 overflow-hidden h-full relative cursor-pointer" onClick={() => setActivePhotoIndex(mosaicIndex(2))}>
            <img key={mosaicIndex(2)} src={mosaicPhoto(2)} alt={`${data.title} — foto`} loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2200ms]" />
          </div>

          {/* Foto 4 — solo escritorio */}
          <div className="hidden md:block col-span-1 row-span-1 overflow-hidden h-full relative cursor-pointer" onClick={() => setActivePhotoIndex(mosaicIndex(3))}>
            <img key={mosaicIndex(3)} src={mosaicPhoto(3)} alt={`${data.title} — foto`} loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2200ms]" />
          </div>

          {/* Foto 5 — solo escritorio */}
          <div className="hidden md:block col-span-1 row-span-1 overflow-hidden h-full relative cursor-pointer" onClick={() => setActivePhotoIndex(mosaicIndex(4))}>
            <img key={mosaicIndex(4)} src={mosaicPhoto(4)} alt={`${data.title} — foto`} loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2200ms]" />
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={prevMosaic}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-earth p-2 md:p-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextMosaic}
            aria-label="Foto siguiente"
            className="absolute right-3 md:right-[calc(50%+0.75rem)] top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-earth p-2 md:p-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Contador de foto */}
          <div className="absolute left-1/2 -translate-x-1/2 md:left-[25%] bottom-4 z-10 bg-earth/70 backdrop-blur-sm text-sand text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full">
            {mosaicOffset + 1} / {total}
          </div>

          {/* Botón mostrar todo */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/95 text-earth border border-earth/15 px-4 py-2 rounded hover:bg-earth hover:text-sand transition-all duration-300 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold shadow-md cursor-pointer active:scale-95 z-10"
          >
            {data.videoEmbed ? (
              <><Play className="w-3 h-3 fill-current" /><span>FOTOS Y VÍDEO</span></>
            ) : (
              <><Grid className="w-3 h-3" /><span>VER TODAS ({total})</span></>
            )}
          </button>
        </section>
      )}

      {/* Fullscreen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-sand overflow-y-auto px-6 md:px-16 py-16 animate-fade-in flex flex-col">
          {/* Circular Sticky Close Button */}
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="fixed top-6 right-6 z-55 bg-earth/10 hover:bg-earth/25 text-earth p-2.5 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer hover:rotate-90 hover:scale-105 shadow-sm active:scale-95"
            aria-label="Cerrar galería"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="max-w-5xl w-full mx-auto mb-10">
            <span className="label-eyebrow text-olive">Galería de fotos</span>
            <h2 className="font-serif text-3xl md:text-4xl text-earth mt-2">{data.title}</h2>
            <p className="text-earth/50 text-xs md:text-sm mt-1 uppercase tracking-wider font-medium">
              {data.rooms} · {data.capacity}
            </p>
          </div>

          {/* Categorized Content */}
          <div className="max-w-5xl w-full mx-auto flex-1 space-y-16 pb-20">
            {data.videoEmbed && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mt-8 mb-4">
                  <h3 className="font-serif text-lg md:text-xl text-earth font-semibold tracking-wide whitespace-nowrap">
                    Vídeo de la experiencia
                  </h3>
                  <div className="h-[1px] bg-earth/10 flex-1" />
                </div>
                <div className="flex justify-center items-center py-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-soft border border-earth/10 bg-sand-deep/40 p-3 max-w-full">
                    <div 
                      dangerouslySetInnerHTML={{ __html: data.videoEmbed }} 
                      className="flex justify-center items-center overflow-hidden rounded-xl bg-black"
                      style={{ width: "267px", height: "476px" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {(data.groupedGallery || [{ category: "Propiedad", photos: data.gallery }]).map((group, groupIdx) => {
              const rows = getRowsForPhotos(group.photos);
              if (rows.length === 0) return null;
              
              return (
                <div key={groupIdx} className="space-y-6">
                  {/* Category separator / divider */}
                  <div className="flex items-center gap-4 mt-8 mb-4">
                    <h3 className="font-serif text-lg md:text-xl text-earth font-semibold tracking-wide whitespace-nowrap">
                      {group.category}
                    </h3>
                    <div className="h-[1px] bg-earth/10 flex-1" />
                  </div>

                  {/* Dynamic Mosaic Grid for this category */}
                  <div className="space-y-4">
                    {rows.map((row, rowIndex) => {
                      const rowLen = row.length;
                      let gridClass = "grid gap-4";
                      let colClass = "col-span-1";
                      
                      if (rowLen === 1) {
                        gridClass = "grid grid-cols-1 md:grid-cols-3 gap-4";
                      } else if (rowLen === 2) {
                        gridClass = "grid grid-cols-2 md:grid-cols-3 gap-4";
                      } else {
                        gridClass = "grid grid-cols-3 gap-4";
                      }
                      
                      return (
                        <div key={rowIndex} className={gridClass}>
                          {row.map((photo, photoIndex) => {
                            const globalIndex = data.gallery.indexOf(photo) + 1;
                            
                            return (
                              <div 
                                key={photoIndex} 
                                className={`${colClass} overflow-hidden rounded-lg border border-earth/5 shadow-sm relative group bg-sand-deep/20 cursor-pointer`}
                                onClick={() => setActivePhotoIndex(data.gallery.indexOf(photo))}
                              >
                                <img
                                  src={photo}
                                  alt={`${data.title} — ${globalIndex > 0 ? globalIndex : photoIndex + 1}`}
                                  loading="lazy"
                                  className="w-full aspect-[4/3] md:aspect-[3/2] object-cover hover:scale-[1.03] transition-transform duration-[1250ms]"
                                />
                                {globalIndex > 0 && (
                                  <div className="absolute bottom-3 left-3 bg-earth/70 backdrop-blur-md text-sand text-[9px] uppercase tracking-wider font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Foto {globalIndex} de {data.gallery.length}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center px-6 md:px-10 py-6 text-white w-full border-b border-white/5 bg-gradient-to-b from-black/50 to-transparent">
            <div>
              <span className="label-eyebrow text-olive block text-xs tracking-wider uppercase font-semibold">
                Ruraly Hoz — {data.title}
              </span>
            </div>
            <div className="text-sm font-serif tracking-wide opacity-80">
              Foto {activePhotoIndex + 1} de {data.gallery.length}
            </div>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Viewer area with photo & arrow buttons */}
          <div className="flex-1 flex items-center justify-between relative px-4 md:px-10">
            {/* Left Chevron Button */}
            <button
              onClick={() => setActivePhotoIndex((prev) => 
                prev !== null ? (prev - 1 + data.gallery.length) % data.gallery.length : 0
              )}
              className="absolute left-6 z-10 bg-white/10 hover:bg-white/20 hover:scale-105 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md active:scale-95 cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Centered Image */}
            <div className="w-full h-[75vh] flex items-center justify-center relative">
              <img
                src={data.gallery[activePhotoIndex]}
                alt={`${data.title} — Visor ${activePhotoIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl select-none pointer-events-none transition-all duration-300 ease-out"
              />
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={() => setActivePhotoIndex((prev) => 
                prev !== null ? (prev + 1) % data.gallery.length : 0
              )}
              className="absolute right-6 z-10 bg-white/10 hover:bg-white/20 hover:scale-105 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md active:scale-95 cursor-pointer"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Navigation Bar (Miniature thumbnails indicator / Swiper dots) */}
          <div className="py-6 flex justify-center items-center gap-1.5 bg-gradient-to-t from-black/50 to-transparent">
            {data.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activePhotoIndex ? "bg-white w-6 scale-110" : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Ir a foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {!data.extraContent && (
        <section className="bg-sand-deep py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="label-eyebrow text-olive">Servicios</span>
              <h3 className="font-serif text-4xl mt-4">Todo lo esencial,<br/><span className="italic">y más.</span></h3>
            </div>
            <ul className="md:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {data.amenities.map((a) => (
                <li key={a} className="flex items-center gap-4 py-3 border-b border-earth/10 text-earth/80">
                  <span className="block w-1.5 h-1.5 bg-olive rounded-full" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Booking strip */}
      {!data.extraContent && (
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-4 gap-8 items-center border-b border-earth/10">
          <Stat label="Capacidad" value={data.capacity} />
          <Stat label="Dormitorios" value={data.rooms} />
          <Stat label="Desde" value={data.price} />
          <Link
            to="/reservas"
            className="label-mini bg-earth text-sand px-8 py-4 text-center hover:bg-olive-deep transition-colors duration-500"
          >
            Reservar
          </Link>
        </section>
      )}

      {/* CTA — fixed background */}
      <section
        className="relative flex items-center justify-center py-16 px-6"
        style={{
          backgroundImage: `url(${data.hero})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-earth/55" />
        {/* Content card */}
        <div className="relative z-10 text-center max-w-xl w-full bg-earth/30 border border-sand/15 backdrop-blur-sm rounded-2xl px-8 py-10 shadow-xl">
          <p className="label-eyebrow text-gold tracking-[0.35em]">Reserva directa</p>
          <h3 className="font-serif text-3xl md:text-4xl mt-3 text-sand leading-tight">
            {data.title} te espera.
          </h3>
          <p className="mt-3 text-sand/65 text-sm leading-relaxed">
            Mejor precio garantizado reservando directamente con nosotros.
          </p>
          <Link
            to="/reservas"
            className="inline-flex items-center gap-2.5 mt-8 label-mini bg-gold text-earth px-8 py-4 rounded-full hover:bg-sand transition-colors duration-500 font-semibold"
          >
            <span>Consultar disponibilidad</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </SiteShell>
  );
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="label-mini text-earth/40">{label}</div>
      <div className="font-serif text-2xl mt-2">{value}</div>
    </div>
  );
}

function getRowsForPhotos(photos: string[]): string[][] {
  const count = photos.length;
  if (count === 0) return [];
  if (count === 1) return [[photos[0]]];
  if (count === 2) return [[photos[0], photos[1]]];
  if (count === 3) return [[photos[0], photos[1], photos[2]]];
  if (count === 4) return [[photos[0], photos[1]], [photos[2], photos[3]]];
  if (count === 5) return [[photos[0], photos[1], photos[2]], [photos[3], photos[4]]];
  if (count === 6) return [[photos[0], photos[1], photos[2]], [photos[3], photos[4], photos[5]]];
  if (count === 7) return [[photos[0], photos[1], photos[2]], [photos[3], photos[4]], [photos[5], photos[6]]];
  if (count === 8) return [
    [photos[0], photos[1], photos[2]],
    [photos[3], photos[4]],
    [photos[5], photos[6], photos[7]]
  ];
  
  const rows: string[][] = [];
  let index = 0;
  while (index < count) {
    const remaining = count - index;
    if (remaining >= 3) {
      if (rows.length % 2 === 1 && remaining >= 5) {
        rows.push([photos[index], photos[index+1]]);
        index += 2;
      } else {
        rows.push([photos[index], photos[index+1], photos[index+2]]);
        index += 3;
      }
    } else if (remaining === 2) {
      rows.push([photos[index], photos[index+1]]);
      index += 2;
    } else {
      rows.push([photos[index]]);
      index += 1;
    }
  }
  return rows;
}
