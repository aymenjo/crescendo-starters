import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Engagement } from "@/components/sections/Engagement";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Methode } from "@/components/sections/Methode";
import { Offre } from "@/components/sections/Offre";
import { PourQui } from "@/components/sections/PourQui";
import { Preuve } from "@/components/sections/Preuve";
import { Probleme } from "@/components/sections/Probleme";
import { Process } from "@/components/sections/Process";
import { StickyCta } from "@/components/sections/StickyCta";
import { landing } from "@/content/landing";
import { jsonLdScript, organizationJsonLd } from "@/lib/jsonld";
import { isUpcomingMonth } from "@/lib/month";
import { calLink, nextStartMonth } from "@/lib/site";

const { meta } = landing;

/** Balises de la copy (« Meta et aperçu LinkedIn ») ; l'image vient de app/opengraph-image.tsx. */
export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Crescendo",
    locale: "fr_FR",
    title: meta.ogTitle,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.description,
  },
};

/**
 * La landing (DESIGN.md § 11), dans l'ordre de la copy finale.
 * Statique, revalidée chaque jour : la phrase « Prochain démarrage » disparaît une fois le mois passé.
 */
export default async function Home() {
  "use cache";
  cacheLife("days");

  const now = new Date();
  const startMonth = isUpcomingMonth(nextStartMonth, now) ? nextStartMonth : null;

  return (
    // Sous `lg`, le bas de page réserve la place du bouton fixe : le footer n'est jamais masqué.
    <div className="pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }} />
      <Header onLanding />
      <main>
        <Hero />
        <Probleme />
        <Process />
        <Preuve />
        <Methode />
        <Offre />
        <Engagement />
        <PourQui />
        <Faq />
        <CtaFinal startMonth={startMonth} calLink={calLink} />
      </main>
      <Footer onLanding />
      <StickyCta label={landing.sticky.cta.label} />
      <BookingDialog calLink={calLink} />
    </div>
  );
}
