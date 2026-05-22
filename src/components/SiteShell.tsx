import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { PremiumCursor } from "./premium/PremiumCursor";
import { StickyBookingCTA } from "./premium/StickyBookingCTA";
import { useGlobalPremiumEffects } from "@/hooks/use-premium-effects";

export function SiteShell({ children }: { children: ReactNode }) {
  useGlobalPremiumEffects();
  return (
    <div className="min-h-screen bg-sand text-earth">
      <PremiumCursor />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <StickyBookingCTA />
      <WhatsAppFloat />
    </div>
  );
}
