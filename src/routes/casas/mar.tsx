import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseDetail } from "@/components/HouseDetail";
import { BookingWidget } from "@/components/BookingWidget";
import casaMar from "@/assets/casa-mar.jpg";
import casaMarPorche from "@/assets/casa-mar-porche.jpg";
import casaMarPiscinaNoche from "@/assets/casa-mar-piscina-noche.jpg";
import casaMarPiscinaCesped from "@/assets/casa-mar-piscina-cesped.jpg";
import casaMarBarcoPiscina from "@/assets/casa-mar-barco-piscina.jpg";
import casaMarJacuzzi from "@/assets/casa-mar-jacuzzi.jpg";
import casaMarFachada from "@/assets/casa-mar-fachada.jpg";
import casaMarSalon from "@/assets/casa-mar-salon.jpg";
import casaMarSalon2 from "@/assets/casa-mar-salon-2.jpg";
import casaMarSalon3 from "@/assets/casa-mar-salon-3.png";
import casaMarSalon4 from "@/assets/casa-mar-salon-4.jpg";
import casaMarDormitorio from "@/assets/casa-mar-dormitorio.jpg";
import casaMarDormitorio2 from "@/assets/casa-mar-dormitorio-2.jpg";
import casaMarDormitorio3 from "@/assets/casa-mar-dormitorio-3.jpg";
import casaMarCocina from "@/assets/casa-mar-cocina.jpg";
import casaMarBano1 from "@/assets/casa-mar-bano-1.jpg";
import casaMarBano2 from "@/assets/casa-mar-bano-2.jpg";
import casaMarBano3 from "@/assets/casa-mar-bano-3.jpg";
import casaMarBano4 from "@/assets/casa-mar-bano-4.jpg";
import casaMarBano5 from "@/assets/casa-mar-bano-5.jpg";
import casaMarBano13 from "@/assets/casa-mar-bano-13.jpg";

export const Route = createFileRoute("/casas/mar")({
  head: () => ({
    meta: [
      { title: "Casa del Mar — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Casa rural mediterránea en Rute con arcos blancos, vigas de madera y vistas a los olivares.",
      },
      { property: "og:title", content: "Casa del Mar — Ruraly Hoz" },
      { property: "og:description", content: "Refugio mediterráneo de lujo rural en Rute, Córdoba." },
      { property: "og:url", content: "/casas/mar" },
      { property: "og:type", content: "product" },
      { property: "og:image", content: casaMar },
      { name: "twitter:image", content: casaMar },
    ],
    links: [{ rel: "canonical", href: "/casas/mar" }],
  }),
  component: () => (
    <HouseDetail
      data={{
        slug: "mar",
        title: "Casa del Mar",
        tagline: "Luz infinita y aires mediterráneos.",
        hero: casaMar,
        heroHeight: "h-[58vh] md:h-[68vh] min-h-[420px] md:min-h-[540px]",
        heroPosition: "object-[center_25%]",
        gallery: [
          casaMarPorche,
          casaMarPiscinaNoche,
          casaMarPiscinaCesped,
          casaMarBarcoPiscina,
          casaMarJacuzzi,
          casaMarFachada,
          casaMarSalon,
          casaMarSalon2,
          casaMarSalon3,
          casaMarSalon4,
          casaMarDormitorio,
          casaMarDormitorio2,
          casaMarDormitorio3,
          casaMarCocina,
          casaMarBano1,
          casaMarBano2,
          casaMarBano3,
          casaMarBano4,
          casaMarBano5,
          casaMarBano13
        ],
        groupedGallery: [
          {
            category: "Propiedad",
            photos: [
              casaMarPorche,
              casaMarPiscinaNoche
            ]
          },
          {
            category: "Salón",
            photos: [casaMarSalon, casaMarSalon2, casaMarSalon3, casaMarBano5]
          },
          {
            category: "Dormitorio",
            photos: [casaMarDormitorio, casaMarDormitorio2, casaMarDormitorio3]
          },
          {
            category: "Cocina",
            photos: [casaMarCocina]
          },
          {
            category: "Cuarto de baño",
            photos: [



              casaMarBano4,

              casaMarBano13
            ]
          },
          {
            category: "Exterior",
            photos: [
              casaMarBano3,
              casaMarBano2,
              casaMarBano1,
              casaMarJacuzzi,
              casaMarFachada,
              casaMarPiscinaCesped,
              casaMarBarcoPiscina
            ]
          }
        ],
        description: [
          "Casa del Mar evoca la luz del sur en pleno interior cordobés. Arcos blancos, vigas de olivo y muros encalados componen un espacio diáfano y luminoso.",
          "Cada estancia se abre a los olivares mediante grandes vanos. Un refugio sereno para seis personas, diseñado para compartir, las siestas largas y las cenas a la luz de las velas.",
          "Tres habitaciones, un solo objetivo: contemplar el paisaje y olvidar el tiempo.",
        ],
        price: "190 € / noche",
        capacity: "6 huéspedes",
        rooms: "3 habitaciones",
        amenities: [
          "3 camas dobles",
          "1 cuarto de baño",
          "Vistas panorámicas a olivares",
          "Patio andaluz privado",
          "Bañera independiente",
          "Cocina abierta",
          "Wi-Fi de alta velocidad",
          "Aire acondicionado",
          "Sistema de sonido",
          "Aparcamiento privado",
          "Desayuno opcional",
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
                      <AmenityItem>Parrilla</AmenityItem>
                      <AmenityItem>Alquiler de kayaks</AmenityItem>
                      <AmenityItem>Jacuzzi</AmenityItem>
                      <AmenityItem>Toallas</AmenityItem>
                      <AmenityItem>Papel higiénico</AmenityItem>
                      <AmenityItem>Chimenea</AmenityItem>
                      <AmenityItem>Secador de pelo</AmenityItem>
                      <AmenityItem>Jabón</AmenityItem>
                      <AmenityItem>Máquina de café / cafetera</AmenityItem>
                      <AmenityItem>Ollas y sartenes</AmenityItem>
                      <AmenityItem>Lavavajillas</AmenityItem>
                      <AmenityItem>Placa de cocina / cocina de gas</AmenityItem>
                      <AmenityItem>Zona vallada</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Alquiler de bicicletas</AmenityItem>
                      <AmenityItem>WiFi</AmenityItem>
                      <AmenityItem>Piscina</AmenityItem>
                      <AmenityItem>Sábanas</AmenityItem>
                      <AmenityItem>Aire acondicionado</AmenityItem>
                      <AmenityItem>Lugar para trabajar</AmenityItem>
                      <AmenityItem>Secadora</AmenityItem>
                      <AmenityItem>Champú</AmenityItem>
                      <AmenityItem>Platos, vasos y cubiertos</AmenityItem>
                      <AmenityItem>Tetera</AmenityItem>
                      <AmenityItem>Frigorífico</AmenityItem>
                      <AmenityItem>Horno</AmenityItem>
                      <AmenityItem>No hay instalaciones para personas con discapacidades</AmenityItem>
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
                      <AmenityItem>Rutas en bicicleta</AmenityItem>
                      <AmenityItem>Senderismo</AmenityItem>
                      <AmenityItem>Bote</AmenityItem>
                      <AmenityItem>Pesca</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Escaladas</AmenityItem>
                      <AmenityItem>Rutas de senderismo leves</AmenityItem>
                      <AmenityItem>Piragüismo</AmenityItem>
                      <AmenityItem>Deportes acuáticos</AmenityItem>
                      <AmenityItem>Montar a caballo</AmenityItem>
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
                      <AmenityItem>Pueblo / Campo</AmenityItem>
                      <AmenityItem>Bosques</AmenityItem>
                      <AmenityItem>Río</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Lago</AmenityItem>
                      <AmenityItem>Montañas</AmenityItem>
                      <AmenityItem>Reserva natural</AmenityItem>
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
                        Aparcamiento gratuito en las inmediaciones o en la propia finca. Acceso directo por carretera asfaltada.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cargos adicionales y extras */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Extras</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Cargos adicionales y extras</h3>
                  </div>
                  <ul className="space-y-1">
                    <AmenityItem>Tarifa por jacuzzi (25 EUR / por día)</AmenityItem>
                  </ul>
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
                        <span className="text-earth text-base mt-1 block">Desde 17:00</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-4 border-b border-earth/10 text-earth/80">
                      <span className="text-olive text-lg">🚪</span>
                      <div>
                        <span className="font-medium block text-sm text-earth/50 uppercase tracking-wider text-[10px]">Hora de salida</span>
                        <span className="text-earth text-base mt-1 block">Hasta 10:00</span>
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
                    <h3 className="font-serif text-4xl mt-2 text-earth">Casa del Mar en Rute</h3>
                  </div>
                  <div className="text-earth/70 text-sm space-y-4">
                    <p className="font-serif text-xl italic text-earth">Rute, Provincia Córdoba, España</p>
                    <p className="leading-relaxed">
                      Casa del Mar en Rute ofrece un alojamiento acogedor en el corazón de Córdoba. Este encantador pueblo es conocido por su tradición artesanal y su ambiente tranquilo, ideal para quienes buscan una escapada relajante. Rute es un punto de partida perfecto para explorar la naturaleza andaluza.
                    </p>
                  </div>
                  <div className="w-full overflow-hidden rounded-2xl shadow-soft border border-earth/10 min-h-[380px] relative bg-sand-deep mt-6">
                    <iframe
                      src="https://maps.google.com/maps?q=37.312223,-4.337951&hl=es&z=14&output=embed"
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
                  slug="mar"
                  name="Casa del Mar"
                  subtitle="Casa"
                  maxGuests={6}
                  pricePerNight={190}
                  images={[casaMarPiscinaNoche, casaMar, casaMarJacuzzi, casaMarSalon, casaMarDormitorio, casaMarFachada]}
                  amenities="Piscina · 3 habitaciones · 1 cuarto de baño · 3 camas dobles"
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
