import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, MessageCircle, Send } from "lucide-react";

type QuickReply =
  | { label: string; nextStep: StepId }
  | { label: string; href: string; internal?: boolean }
  | { label: string; external: string };

type StepId =
  | "welcome"
  | "houses"
  | "house-cascada"
  | "house-mar"
  | "house-film"
  | "availability"
  | "prices"
  | "contact"
  | "thanks";

interface BotStep {
  messages: string[];
  replies: QuickReply[];
}

const WHATSAPP_URL =
  "https://wa.me/34627436424?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20Ruraly%20Hoz";

const FLOW: Record<StepId, BotStep> = {
  welcome: {
    messages: [
      "¡Hola! Soy Olivia, tu asistente de Ruraly Hoz 🌿",
      "¿En qué puedo ayudarte hoy?",
    ],
    replies: [
      { label: "Ver nuestras casas", nextStep: "houses" },
      { label: "Consultar disponibilidad", nextStep: "availability" },
      { label: "Precios y promociones", nextStep: "prices" },
      { label: "Otras preguntas", nextStep: "contact" },
    ],
  },
  houses: {
    messages: [
      "Tenemos 3 refugios únicos en Rute, Córdoba. ¿Cuál te interesa más?",
    ],
    replies: [
      { label: "🏞️ La Casa de la Cascada (4 pers.)", nextStep: "house-cascada" },
      { label: "🌊 Casa del Mar (6 pers.)", nextStep: "house-mar" },
      { label: "🎬 Film Studio (2 pers.)", nextStep: "house-film" },
      { label: "← Volver", nextStep: "welcome" },
    ],
  },
  "house-cascada": {
    messages: [
      "**La Casa de la Cascada** — desde 240€/noche.",
      "Piscina privada, jacuzzi al aire libre y vistas al valle. Ideal para grupos de amigos o familias hasta 4 personas.",
      "Además, tenemos una promo entre semana: 3ª noche por 125€.",
    ],
    replies: [
      { label: "Ver fotos y detalles", href: "/casas/cascada", internal: true },
      { label: "Reservar ahora", href: "/reservas?house=cascada", internal: true },
      { label: "← Otra casa", nextStep: "houses" },
    ],
  },
  "house-mar": {
    messages: [
      "**Casa del Mar** — desde 190€/noche.",
      "Luz infinita, terraza solarium, piscina y cocina gourmet. Hasta 6 huéspedes.",
    ],
    replies: [
      { label: "Ver fotos y detalles", href: "/casas/mar", internal: true },
      { label: "Reservar ahora", href: "/reservas?house=mar", internal: true },
      { label: "← Otra casa", nextStep: "houses" },
    ],
  },
  "house-film": {
    messages: [
      "**Film Studio** — desde 260€/noche.",
      "Sala de cine privada, proyector 4K, sonido Dolby y baño árabe. Solo adultos, máximo 2 huéspedes.",
    ],
    replies: [
      { label: "Ver fotos y detalles", href: "/casas/film", internal: true },
      { label: "Reservar ahora", href: "/reservas?house=film", internal: true },
      { label: "← Otra casa", nextStep: "houses" },
    ],
  },
  availability: {
    messages: [
      "Para ver disponibilidad real y elegir fechas, lo más rápido es nuestro buscador de reservas.",
      "Te respondemos en menos de 24h por email tras la solicitud.",
    ],
    replies: [
      { label: "Abrir buscador de reservas", href: "/reservas", internal: true },
      { label: "Prefiero WhatsApp", external: WHATSAPP_URL },
      { label: "← Volver", nextStep: "welcome" },
    ],
  },
  prices: {
    messages: [
      "Nuestras tarifas desde:",
      "🌊 Casa del Mar — 190€/noche\n🏞️ La Casa de la Cascada — 240€/noche\n🎬 Film Studio — 260€/noche",
      "💎 Promo Cascada: 3ª noche por solo 125€ entre semana (dom-jue).",
      "Mejor precio garantizado reservando directamente con nosotros.",
    ],
    replies: [
      { label: "Calcular mi precio", href: "/reservas", internal: true },
      { label: "Ver las casas", nextStep: "houses" },
      { label: "← Volver", nextStep: "welcome" },
    ],
  },
  contact: {
    messages: [
      "¡Encantada de ayudarte! Puedes contactarnos por estos canales:",
      "📞 Teléfono: +34 627 43 64 24\n💬 WhatsApp: respuesta inmediata\n✉️ Email: a través del formulario",
    ],
    replies: [
      { label: "Abrir WhatsApp", external: WHATSAPP_URL },
      { label: "Llamar ahora", external: "tel:+34627436424" },
      { label: "← Volver", nextStep: "welcome" },
    ],
  },
  thanks: {
    messages: ["¡Gracias por tu interés! Si necesitas algo más, estoy aquí 🌿"],
    replies: [{ label: "Empezar de nuevo", nextStep: "welcome" }],
  },
};

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<StepId>("welcome");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed initial messages when chat opens for the first time
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory(
        FLOW.welcome.messages.map((text) => ({ role: "bot" as const, text }))
      );
    }
  }, [isOpen, history.length]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, step]);

  const handleReply = (reply: QuickReply) => {
    // Echo user's choice
    setHistory((h) => [...h, { role: "user", text: reply.label }]);

    if ("nextStep" in reply) {
      const next = FLOW[reply.nextStep];
      setTimeout(() => {
        setHistory((h) => [
          ...h,
          ...next.messages.map((text) => ({ role: "bot" as const, text })),
        ]);
        setStep(reply.nextStep);
      }, 350);
    }
    // For external / internal links, the <a> / <Link> handles navigation
  };

  const currentReplies = FLOW[step].replies;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Panel */}
      <div
        className={`absolute bottom-full right-0 mb-3 w-[340px] sm:w-[380px] bg-white border border-earth/10 rounded-2xl shadow-premium overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-earth to-olive-deep px-5 py-4 text-sand">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-deep" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-serif text-lg font-bold">
                O
              </div>
              <div>
                <h4 className="font-serif text-base font-bold leading-tight">
                  Olivia · Asistente
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] text-sand/70 font-medium">
                    En línea · Respuesta inmediata
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              className="text-sand/70 hover:text-sand p-1 rounded-full hover:bg-sand/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="h-[320px] overflow-y-auto px-4 py-4 space-y-2.5 bg-sand-deep/30"
        >
          {history.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-earth text-sand rounded-br-sm"
                    : "bg-white text-earth border border-earth/8 rounded-bl-sm shadow-sm"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="font-bold">$1</strong>'
                  ),
                }}
              />
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-3 bg-white border-t border-earth/8 space-y-1.5">
          {currentReplies.map((reply, i) => {
            const baseClass =
              "w-full text-left text-[12.5px] font-semibold px-3.5 py-2 rounded-xl border border-earth/10 bg-sand-deep/30 hover:bg-earth hover:text-sand hover:border-earth transition-all duration-200 active:scale-[0.98] text-earth";

            if ("external" in reply) {
              return (
                <a
                  key={i}
                  href={reply.external}
                  target={reply.external.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  {reply.label}
                </a>
              );
            }
            if ("href" in reply) {
              return (
                <Link
                  key={i}
                  to={reply.href}
                  onClick={() => setIsOpen(false)}
                  className={baseClass}
                >
                  {reply.label}
                </Link>
              );
            }
            return (
              <button
                key={i}
                onClick={() => handleReply(reply)}
                className={baseClass}
              >
                {reply.label}
              </button>
            );
          })}
        </div>

        {/* WhatsApp fallback always visible */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold tracking-wider uppercase transition-colors duration-300 active:scale-[0.99]"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.1.943 11.993.943c-5.43 0-9.854 4.37-9.858 9.799-.001 1.973.528 3.902 1.532 5.618l-.997 3.65 3.774-.976zm11.391-7.142c-.3-.149-1.786-.889-2.062-.99-.277-.1-.478-.15-.68.15-.201.3-.778.99-.954 1.19-.176.2-.353.226-.653.076-.301-.15-1.267-.47-2.41-1.499-.89-.8-1.49-1.79-1.66-2.09-.176-.3-.02-.463.13-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.68-1.66-.93-2.285-.245-.6-.497-.518-.68-.528-.176-.01-.377-.01-.578-.01-.2 0-.527.075-.803.375-.276.3-1.054 1.04-1.054 2.53 0 1.49 1.079 2.93 1.23 3.13.15.2 2.123 3.27 5.143 4.58.718.311 1.277.498 1.713.638.722.23 1.378.197 1.9.12.58-.088 1.786-.738 2.038-1.45.25-.713.25-1.325.175-1.45-.076-.125-.277-.2-.577-.35z" />
          </svg>
          <span>Continuar por WhatsApp</span>
        </a>
      </div>

      {/* Main Pill Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        className="group flex items-center gap-3 bg-white hover:bg-earth border border-earth/10 hover:border-earth text-earth hover:text-sand pl-3 pr-5 py-3 rounded-full shadow-[0_20px_50px_-15px_rgba(26,25,23,0.18)] transition-all duration-300 cursor-pointer active:scale-[0.98] select-none"
      >
        {isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        )}
        <span className="label-mini tracking-widest font-bold">
          {isOpen ? "Cerrar chat" : "Chat"}
        </span>
        {!isOpen && <MessageCircle className="w-4 h-4 text-earth/40 group-hover:text-sand/60 transition-colors" />}
      </button>
    </div>
  );
}
