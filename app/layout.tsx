import type { Metadata } from "next";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { interTight, jetbrainsMono } from "./fonts";
import { isIndexable, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Crescendo, agence IA et automatisation pour PME",
    template: "%s — Crescendo",
  },
  // Tout reste en noindex tant que le drapeau d'indexation n'est pas activé (docs/PLAN.md, « Indexation »).
  robots: isIndexable() ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
