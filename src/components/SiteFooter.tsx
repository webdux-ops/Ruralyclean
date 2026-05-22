import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const WHATSAPP_FOOTER_URL = "https://wa.me/34627436424?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20Ruraly%20Hoz";

  return (
    <footer className="bg-sand-deep text-earth pt-20 pb-12 px-6 md:px-10 border-t border-earth/5 relative z-10">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-earth/10">
        {/* Brand details column (5 cols) */}
        <div className="sm:col-span-2 md:col-span-5 flex flex-col items-start">
          <Link
            to="/"
            className="font-serif text-3xl italic text-earth hover:text-olive transition-colors mb-6 block"
          >
            Ruraly Hoz
          </Link>
          <p className="text-earth/65 text-sm max-w-sm leading-relaxed mb-6">
            Subbética Cordobesa, Rute – Iznájar. El refugio donde el Mediterráneo se encuentra con Andalucía.
          </p>
          <a
            href={WHATSAPP_FOOTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity font-sans text-base font-normal tracking-wider group"
            style={{ color: "oklch(0.60 0.11 75)" }}
          >
            {/* WhatsApp Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-transform duration-300 group-hover:scale-105"
              style={{ color: "oklch(0.60 0.11 75)" }}
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.886 1.452 5.4 0 9.79-4.385 9.793-9.774.002-2.61-1.01-5.064-2.853-6.907C16.58 2.08 14.13 1.066 11.526 1.066c-5.4 0-9.794 4.386-9.797 9.776-.001 1.76.479 3.479 1.39 5.014l-.993 3.628 3.73-.978zm11.387-5.45c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            </svg>
            +34 627 43 64 24
          </a>
        </div>

        {/* Navigation column (2 cols md, offset 1 on big screens) */}
        <div className="md:col-span-2 md:col-start-7 flex flex-col items-start">
          <span className="label-mini text-[10px] tracking-[0.2em] font-semibold text-earth/40 uppercase mb-6 block">
            Navegación
          </span>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <Link to="/" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/casas" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Las Casas
              </Link>
            </li>
            <li>
              <Link to="/experiencias" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Experiencias
              </Link>
            </li>
            <li>
              <Link to="/galeria" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Galería
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow us column (2 cols md) */}
        <div className="md:col-span-2 flex flex-col items-start">
          <span className="label-mini text-[10px] tracking-[0.2em] font-semibold text-earth/40 uppercase mb-6 block">
            Síguenos
          </span>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <a
                href="https://www.instagram.com/ruraly_hoz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth/70 hover:text-olive transition-colors duration-300"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@ruraly_hoz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth/70 hover:text-olive transition-colors duration-300"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/p/Ruraly-Hoz-61562287632721/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth/70 hover:text-olive transition-colors duration-300"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Legal column (2 cols md) */}
        <div className="md:col-span-2 flex flex-col items-start">
          <span className="label-mini text-[10px] tracking-[0.2em] font-semibold text-earth/40 uppercase mb-6 block">
            Legal
          </span>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <Link to="#" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link to="#" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Privacidad
              </Link>
            </li>
            <li>
              <Link to="#" className="text-earth/70 hover:text-olive transition-colors duration-300">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row justify-between items-center label-mini text-[10px] tracking-wide text-earth/40 mt-10 gap-4">
        <p>© {new Date().getFullYear()} Ruraly Hoz. Todos los derechos reservados.</p>
        <p className="font-light">Exclusividad & Naturaleza</p>
      </div>
    </footer>
  );
}
