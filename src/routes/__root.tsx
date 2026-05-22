import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { PageTransition } from "../components/premium/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4 text-earth">
      <div className="max-w-md text-center">
        <p className="label-eyebrow text-olive">404</p>
        <h1 className="mt-4 font-serif text-5xl">Página no encontrada</h1>
        <p className="mt-4 text-sm text-earth/60">
          La página que buscas se ha perdido entre los olivares.
        </p>
        <div className="mt-8">
          <Link to="/" className="label-mini bg-earth text-sand px-6 py-3 inline-block hover:bg-olive-deep transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4 text-earth">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">Algo no ha cargado bien</h1>
        <p className="mt-3 text-sm text-earth/60">Inténtalo de nuevo en un momento.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="label-mini bg-earth text-sand px-6 py-3 hover:bg-olive-deep transition-colors"
          >
            Reintentar
          </button>
          <a href="/" className="label-mini border border-earth/20 px-6 py-3 hover:bg-earth hover:text-sand transition-colors">
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ruraly Hoz — Casas rurales premium en Rute, Córdoba" },
      {
        name: "description",
        content:
          "Dos refugios exclusivos de lujo rural en Rute, Córdoba. Naturaleza, piedra y luz mediterránea. Reserva tu escapada premium en Andalucía.",
      },
      { name: "author", content: "Ruraly Hoz" },
      { name: "theme-color", content: "#FAF9F6" },
      { property: "og:site_name", content: "Ruraly Hoz" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Ruraly Hoz — Casas rurales premium en Rute, Córdoba" },
      {
        property: "og:description",
        content:
          "Dos refugios exclusivos de lujo rural en Rute, Córdoba. Naturaleza, piedra y luz mediterránea.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Ruraly Hoz",
          description:
            "Casas rurales premium en Rute, Córdoba. Lujo rural andaluz con dos refugios exclusivos.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rute",
            addressRegion: "Córdoba",
            addressCountry: "ES",
          },
          telephone: "+34627436424",
          email: "hola@ruralyhoz.com",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </QueryClientProvider>
  );
}
