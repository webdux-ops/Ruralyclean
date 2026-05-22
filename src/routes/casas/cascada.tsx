import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseDetail } from "@/components/HouseDetail";
import { BookingWidget } from "@/components/BookingWidget";
import casaCascada from "@/assets/casa-cascada.jpg";
import casaCascadaPiscina from "@/assets/casa-cascada-piscina.jpg";
import casaCascadaPiscinaNoche from "@/assets/casa-cascada-piscina-noche.jpg";
import casaCascadaDormitorio from "@/assets/casa-cascada-dormitorio.jpg";
import casaCascadaSalon from "@/assets/casa-cascada-salon.jpg";
import casaCascadaJacuzzi from "@/assets/casa-cascada-jacuzzi.jpg";
import casaCascadaAlbercaNoche from "@/assets/casa-cascada-alberca-noche.jpg";
import casaCascadaTipi from "@/assets/casa-cascada-tipi.jpg";
import casaCascadaFutbolin from "@/assets/casa-cascada-futbolin.jpg";
import casaCascadaBano from "@/assets/casa-cascada-bano.jpg";
import casaCascadaCocina from "@/assets/casa-cascada-cocina.jpg";
import casaCascadaBano5 from "@/assets/casa-cascada-bano-5.jpg";
import casaCascadaBano6 from "@/assets/casa-cascada-bano-6.jpg";
import casaCascadaBano7 from "@/assets/casa-cascada-bano-7.jpg";
import casaCascadaBano8 from "@/assets/casa-cascada-bano-8.jpg";
import casaCascadaBano9 from "@/assets/casa-cascada-bano-9.jpg";
import casaCascadaBano10 from "@/assets/casa-cascada-bano-10.jpg";
import casaCascadaBano11 from "@/assets/casa-cascada-bano-11.jpg";

export const Route = createFileRoute("/casas/cascada")({
  head: () => ({
    meta: [
      { title: "La Casa de la Cascada — Ruraly Hoz" },
      {
        name: "description",
        content:
          "Casa rural premium en Rute para 4 personas: jacuzzi privado al aire libre, piscina, zona chill y barbacoa. Ideal para amigos o familia.",
      },
      { property: "og:title", content: "La Casa de la Cascada — Ruraly Hoz" },
      { property: "og:description", content: "Casa rural con jacuzzi privado, piscina y barbacoa en Rute, Córdoba." },
      { property: "og:url", content: "/casas/cascada" },
      { property: "og:type", content: "product" },
      { property: "og:image", content: casaCascada },
      { name: "twitter:image", content: casaCascada },
    ],
    links: [{ rel: "canonical", href: "/casas/cascada" }],
  }),
  component: () => (
    <HouseDetail
      data={{
        slug: "cascada",
        title: "La Casa de la Cascada",
        tagline: "Primavera, buen tiempo y ganas de disfrutar.",
        hero: casaCascada,
        heroHeight: "h-[58vh] md:h-[68vh] min-h-[420px] md:min-h-[540px]",
        gallery: [
          casaCascadaPiscina,
          casaCascadaPiscinaNoche,
          casaCascadaDormitorio,
          casaCascadaSalon,
          casaCascadaJacuzzi,
          casaCascadaAlbercaNoche,
          casaCascadaTipi,
          casaCascadaFutbolin,
          casaCascadaBano,
          casaCascadaCocina,
          casaCascadaBano5,
          casaCascadaBano6,
          casaCascadaBano7,
          casaCascadaBano8,
          casaCascadaBano9,
          casaCascadaBano10,
          casaCascadaBano11
        ],
        groupedGallery: [
          {
            category: "Propiedad",
            photos: [
              casaCascadaPiscina,
              casaCascadaPiscinaNoche,
              casaCascadaAlbercaNoche,
              casaCascadaTipi,
              casaCascadaFutbolin,
              casaCascadaJacuzzi,
              casaCascadaBano5,
              casaCascadaBano6,
              casaCascadaBano7,
              casaCascadaBano8,
              casaCascadaBano9,
              casaCascadaBano10
            ]
          },
          {
            category: "Salón",
            photos: [casaCascadaSalon]
          },
          {
            category: "Dormitorio",
            photos: [casaCascadaDormitorio, casaCascadaBano11]
          },
          {
            category: "Cocina",
            photos: [casaCascadaCocina]
          },
          {
            category: "Cuarto de baño",
            photos: [casaCascadaBano]
          }
        ],
        description: [
          "Llegó la primavera y el buen tiempo, y con él las ganas de disfrutar de nuestra querida Casa de la Cascada: un refugio con capacidad para 4 personas en plena Subbética cordobesa.",
          "Cuenta con jacuzzi privado al aire libre junto a la piscina, zona chill, barbacoa y mucho más. Un espacio pensado para vivirlo a solas, con amigos o con toda la familia.",
          "Y tú, ¿con quién te ves disfrutando de unos días en Rute?",
        ],
        price: "240 € / noche",
        capacity: "Hasta 4 huéspedes",
        rooms: "2 suites",
        amenities: [
          "Jacuzzi privado al aire libre",
          "Piscina privada",
          "Barbacoa",
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
                      <AmenityItem>Parrilla</AmenityItem>
                      <AmenityItem>WiFi</AmenityItem>
                      <AmenityItem>Piscina</AmenityItem>
                      <AmenityItem>Sábanas</AmenityItem>
                      <AmenityItem>Aire acondicionado</AmenityItem>
                      <AmenityItem>Secador de pelo</AmenityItem>
                      <AmenityItem>Secadora</AmenityItem>
                      <AmenityItem>Champú</AmenityItem>
                      <AmenityItem>Platos, vasos y cubiertos</AmenityItem>
                      <AmenityItem>Tetera</AmenityItem>
                      <AmenityItem>Frigorífico</AmenityItem>
                      <AmenityItem>Horno</AmenityItem>
                      <AmenityItem>No hay instalaciones para personas con discapacidades</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Alquiler de kayaks</AmenityItem>
                      <AmenityItem>Jacuzzi</AmenityItem>
                      <AmenityItem>Toallas</AmenityItem>
                      <AmenityItem>Papel higiénico</AmenityItem>
                      <AmenityItem>Chimenea</AmenityItem>
                      <AmenityItem>Lavadora</AmenityItem>
                      <AmenityItem>Jabón</AmenityItem>
                      <AmenityItem>Máquina de café / cafetera</AmenityItem>
                      <AmenityItem>Ollas y sartenes</AmenityItem>
                      <AmenityItem>Lavavajillas</AmenityItem>
                      <AmenityItem>Placa de cocina / cocina de gas</AmenityItem>
                      <AmenityItem>Zona vallada</AmenityItem>
                    </ul>
                  </div>
                </div>

                {/* Actividades */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Experiencias</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Actividades</h3>
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
                    <h3 className="font-serif text-4xl mt-2 text-earth">Alrededores</h3>
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
                    <h3 className="font-serif text-4xl mt-2 text-earth">Acceso / direcciones</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-serif text-xl text-earth font-medium mb-3">En coche</h4>
                      <p className="text-earth/70 text-sm leading-relaxed">
                        Aparcamiento gratuito o en la propiedad. Acceso directo por carretera.
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
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
                    <ul className="space-y-1">
                      <AmenityItem>Tarifa por jacuzzi (25 EUR / por día)</AmenityItem>
                    </ul>
                    <ul className="space-y-1">
                      <AmenityItem>Fianza (150 EUR / el día de la llegada)</AmenityItem>
                    </ul>
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
                        <span className="font-medium block text-sm text-earth/50 uppercase tracking-wider text-[10px]">Hora de entrada</span>
                        <span className="text-earth text-base mt-1 block">Desde 16:00</span>
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
                        <span className="text-earth text-base mt-1 block">Cancelación gratuita de la reserva: hasta 30 días antes de llegar</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localización */}
                <div className="space-y-6 pt-16 border-t border-earth/10">
                  <div>
                    <span className="label-eyebrow text-olive">Localización</span>
                    <h3 className="font-serif text-4xl mt-2 text-earth">Localización</h3>
                  </div>
                  <div className="text-earth/70 text-sm space-y-4">
                    <p className="font-serif text-xl italic text-earth">Rute, Provincia Córdoba, España</p>
                    <div className="w-full overflow-hidden rounded-2xl shadow-soft border border-earth/10 min-h-[380px] relative bg-sand-deep mt-6 mb-8">
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
                    <h4 className="font-serif text-2xl text-earth font-medium mb-3">Casa de la Cascada en Rute</h4>
                    <p className="leading-relaxed">
                      Casa de la Cascada en Rute ofrece un alojamiento acogedor en el corazón de Córdoba. Rute es un pueblo con encanto, famoso por su tradición en la elaboración de dulces y licores artesanales. Aquí, los huéspedes pueden disfrutar de un ambiente tranquilo y desconectar con total comodidad rodeados de naturaleza.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Booking Card (4/12) */}
              <div className="md:col-span-4 md:sticky md:top-28">
                <BookingWidget
                  slug="cascada"
                  name="La Casa de la Cascada"
                  subtitle="Casa"
                  maxGuests={4}
                  pricePerNight={240}
                  images={[casaCascadaPiscina, casaCascada, casaCascadaDormitorio, casaCascadaSalon, casaCascadaJacuzzi, casaCascadaPiscinaNoche]}
                  amenities="Piscina · 2 habitaciones · 1 cuarto de baño · 3 camas dobles"
                />
              </div>

            </div>
          </section>
        )
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
