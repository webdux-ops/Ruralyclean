import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseDetail } from "@/components/HouseDetail";
import { BookingWidget } from "@/components/BookingWidget";
import casaFilm from "@/assets/casa-film.jpg";
import casaFilmTerraza from "@/assets/casa-film-terraza.jpg";
import casaFilmPiscina from "@/assets/casa-film-piscina.jpg";
import casaFilmBanoArabe from "@/assets/casa-film-bano-arabe.jpg";
import casaFilmDormitorio from "@/assets/casa-film-dormitorio.jpg";
import casaFilmCocina from "@/assets/casa-film-cocina.jpg";
import casaFilmBano6 from "@/assets/casa-mar-bano-6.jpg";
import casaFilmBano7 from "@/assets/casa-mar-bano-7.jpg";
import casaFilmBano8 from "@/assets/casa-mar-bano-8.jpg";
import casaFilmBano9 from "@/assets/casa-mar-bano-9.jpg";
import casaFilmBano10 from "@/assets/casa-mar-bano-10.jpg";
import casaFilmBano11 from "@/assets/casa-mar-bano-11.jpg";
import casaFilmBano12 from "@/assets/casa-mar-bano-12.jpg";

export const Route = createFileRoute("/casas/film")({
  head: () => ({
    meta: [
      { title: "Film Studio — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Apartamento Film Studio en Rute: piscina climatizada, baño árabe y baño acristalado en plena naturaleza. Solo adultos.",
      },
      { property: "og:title", content: "Film Studio — Ruraly Hoz" },
      { property: "og:description", content: "Refugio íntimo para dos en Rute, Córdoba. Only adults." },
      { property: "og:url", content: "/casas/film" },
      { property: "og:type", content: "product" },
      { property: "og:image", content: casaFilm },
      { name: "twitter:image", content: casaFilm },
    ],
    links: [{ rel: "canonical", href: "/casas/film" }],
  }),
  component: () => (
    <HouseDetail
      data={{
        slug: "film",
        title: "Film Studio",
        tagline: "Nuestro pequeño paraíso para dos.",
        hero: casaFilm,
        heroHeight: "h-[58vh] md:h-[68vh] min-h-[420px] md:min-h-[540px]",
        videoEmbed: `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1639427047260136%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`,
        gallery: [
          casaFilmTerraza,
          casaFilmPiscina,
          casaFilmBanoArabe,
          casaFilmDormitorio,
          casaFilmCocina,
          casaFilmBano6,
          casaFilmBano7,
          casaFilmBano8,
          casaFilmBano9,
          casaFilmBano10,
          casaFilmBano11,
          casaFilmBano12
        ],
        groupedGallery: [
          {
            category: "Propiedad",
            photos: [
              casaFilm,
              casaFilmTerraza,
              casaFilmPiscina
            ]
          },
          {
            category: "Dormitorio",
            photos: [casaFilmDormitorio]
          },
          {
            category: "Cocina",
            photos: [casaFilmCocina]
          },
          {
            category: "Cuarto de baño",
            photos: [casaFilmBanoArabe, casaFilmBano6, casaFilmBano7, casaFilmBano8, casaFilmBano9, casaFilmBano10, casaFilmBano11, casaFilmBano12]
          }
        ],
        description: [
          "Film Studio es nuestro apartamento más coqueto, pensado para dos personas (only adults) que buscan una escapada íntima en plena Subbética cordobesa.",
          "Sus zonas privadas son increíbles: piscina climatizada al aire libre, baño árabe, barbacoa y una zona chill donde el tiempo se detiene. Cuenta además con un baño totalmente acristalado, para que disfrutes del máximo contacto con la naturaleza.",
          "¿Algo que celebrar? Preocúpate solo de reservar, nosotros nos encargamos de todo lo demás.",
        ],
        price: "260 € / noche",
        capacity: "2 huéspedes · only adults",
        rooms: "1 suite",
        amenities: [
          "Piscina climatizada al aire libre",
          "Baño árabe privado",
          "Baño totalmente acristalado",
          "Barbacoa privada",
          "Zona chill exterior",
          "Cocina equipada",
          "Wi-Fi de alta velocidad",
          "Aire acondicionado",
          "Ropa de cama de lino",
          "Aparcamiento privado",
        ],
        extraContent: (
          <section className="bg-sand py-24 md:py-32 px-6 md:px-10 border-t border-earth/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-start">
              
              {/* Left Column: Rich Details (8/12) */}
              <div className="md:col-span-8 space-y-24">
                
                {/* Instalaciones y servicios */}
                <div className="space-y-6">
                  <div>
                    <span className="label-eyebrow text-olive">Comodidades</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Instalaciones y servicios</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
                    <ul className="space-y-1">
                      <AmenityItem>WiFi</AmenityItem>
                      <AmenityItem>Piscina</AmenityItem>
                      <AmenityItem>Sábanas</AmenityItem>
                      <AmenityItem>Aire acondicionado</AmenityItem>
                      <AmenityItem>Platos, vasos y cubiertos</AmenityItem>
                      <AmenityItem>Tetera</AmenityItem>
                      <AmenityItem>Frigorífico</AmenityItem>
                      <AmenityItem>Horno</AmenityItem>
                      <AmenityItem>Tostadora</AmenityItem>
                      <AmenityItem>Instalaciones para personas con discapacidades</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Jacuzzi</AmenityItem>
                      <AmenityItem>Toallas</AmenityItem>
                      <AmenityItem>Papel higiénico</AmenityItem>
                      <AmenityItem>Máquina de café / cafetera</AmenityItem>
                      <AmenityItem>Ollas y sartenes</AmenityItem>
                      <AmenityItem>Lavavajillas</AmenityItem>
                      <AmenityItem>Placa de cocina / cocina de gas</AmenityItem>
                      <AmenityItem>Microondas</AmenityItem>
                      <AmenityItem>Botiquín de primeros auxilios</AmenityItem>
                    </ul>
                  </div>
                </div>

                {/* Actividades */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Experiencias</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Actividades en la zona</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
                    <ul className="space-y-1">
                      <AmenityItem>Hacer turismo</AmenityItem>
                      <AmenityItem>Escaladas</AmenityItem>
                      <AmenityItem>Rutas de senderismo leves</AmenityItem>
                      <AmenityItem>Piragüismo</AmenityItem>
                      <AmenityItem>Deportes acuáticos</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Natación</AmenityItem>
                      <AmenityItem>Rutas en bicicleta</AmenityItem>
                      <AmenityItem>Senderismo</AmenityItem>
                      <AmenityItem>Bote</AmenityItem>
                    </ul>
                  </div>
                </div>

                {/* Alrededores */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Entorno</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Alrededores naturales</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
                    <ul className="space-y-1">
                      <AmenityItem>Lago</AmenityItem>
                      <AmenityItem>Montañas</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Bosques</AmenityItem>
                      <AmenityItem>Río</AmenityItem>
                    </ul>
                  </div>
                </div>

                {/* Acceso / direcciones */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Indicaciones</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Acceso y direcciones</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-serif text-xl text-earth font-medium mb-3">En coche</h4>
                      <p className="text-earth/70 text-sm leading-relaxed">
                        Aparcamiento gratuito en la calle disponible.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-earth font-medium mb-3">En transporte público</h4>
                      <p className="text-earth/70 text-sm leading-relaxed">
                        Se puede acceder a la propiedad en transporte público.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reglas de la propiedad */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Estancia</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Reglas de la propiedad</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 py-4 border-b border-earth/10 text-earth/80">
                      <span className="text-olive text-lg">⏱️</span>
                      <div>
                        <span className="font-medium block text-sm text-earth/50 uppercase tracking-wider text-[10px]">Horario de entrada</span>
                        <span className="text-earth text-base mt-1 block">De 16:00 a 21:00</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-4 border-b border-earth/10 text-earth/80">
                      <span className="text-olive text-lg">🚪</span>
                      <div>
                        <span className="font-medium block text-sm text-earth/50 uppercase tracking-wider text-[10px]">Hora de salida</span>
                        <span className="text-earth text-base mt-1 block">Hasta 11:00</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-4 border-b border-earth/10 text-earth/80">
                      <span className="text-olive text-lg">🛡️</span>
                      <div>
                        <span className="font-medium block text-sm text-earth/50 uppercase tracking-wider text-[10px]">Cancelación de la reserva</span>
                        <span className="text-earth text-base mt-1 block">Cancelación gratuita hasta 30 días antes de llegar</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localización */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Localización</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Film Studio en Iznájar</h3>
                  </div>
                  <div className="text-earth/70 text-sm space-y-4">
                    <p className="font-serif text-xl italic text-earth">Iznájar, Provincia Córdoba, España</p>
                    <p className="leading-relaxed">
                      Film Studio en Iznájar ofrece una experiencia única para los Huéspedes que buscan alojamiento en un entorno lleno de historia y Naturaleza. Iznájar, conocido como la 'Perla de la Subbética', es un pueblo encantador con calles empedradas y vistas panorámicas.
                    </p>
                  </div>
                  <div className="w-full overflow-hidden rounded-2xl shadow-soft border border-earth/10 min-h-[380px] relative bg-sand-deep mt-6">
                    <iframe
                      src="https://maps.google.com/maps?q=37.3052,-4.3385&z=15&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "380px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Booking Card (4/12) */}
              <div className="md:col-span-4 md:sticky md:top-28">
                <BookingWidget
                  slug="film"
                  name="Film Studio"
                  subtitle="Casa"
                  maxGuests={2}
                  pricePerNight={260}
                  images={[casaFilm, casaFilmBanoArabe, casaFilmTerraza, casaFilmPiscina, casaFilmDormitorio, casaFilmCocina]}
                  amenities="Calefacción · 1 suite · 1 cuarto de baño · 1 cama doble"
                />
              </div>

            </div>
          </section>
        ),
      }}
    />
  ),
});

function AmenityItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4 py-3 border-b border-earth/10 text-earth/80 text-sm">
      <span className="block w-1.5 h-1.5 bg-olive rounded-full" />
      {children}
    </li>
  );
}
