import { InlineAgenda } from "@/components/booking/InlineAgenda";
import { CtaLink } from "@/components/ui/CtaLink";
import { container } from "@/components/ui/Container";
import { Reassurance } from "@/components/ui/Avatar";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { formatMonth } from "@/lib/month";
import { typo } from "@/lib/typo";

const { ctaFinal } = landing;

/**
 * CTA final et réservation (`#rdv`, DESIGN.md § 10.9). La phrase de capacité n'est rendue
 * que si le mois du prochain démarrage est renseigné et pas encore passé.
 * Desktop : le texte à gauche, l'agenda intégré à droite. Mobile : le bouton ouvre l'agenda en plein écran.
 */
export function CtaFinal({ startMonth, calLink }: { startMonth: string | null; calLink: string }) {
  return (
    <section id="rdv" aria-labelledby="rdv-title" className="section section-end lg:scroll-mt-18">
      <div className={container}>
        <div className="grid gap-10 rounded-xl border border-rule bg-surface p-6 lg:grid-cols-12 lg:items-start lg:gap-12 lg:p-12">
          <div className="grid justify-items-start gap-5 lg:col-span-5">
            <h2 id="rdv-title" className="t-h2">
              <TitleText title={ctaFinal.h2} />
            </h2>
            <p className="max-w-[56ch]">{typo(ctaFinal.text)}</p>
            {startMonth && (
              <p className="max-w-[56ch]">
                {typo(ctaFinal.capacity.before)}
                {formatMonth(startMonth)}
                {ctaFinal.capacity.after}
              </p>
            )}
            {/* En `lg`, l'agenda est visible directement : le bouton n'est rendu que sous `lg`. */}
            <CtaLink position="final" label={ctaFinal.cta.label} className="lg:hidden" />
            <Reassurance text={ctaFinal.reassurance} decorative />
          </div>
          <InlineAgenda calLink={calLink} />
        </div>
      </div>
    </section>
  );
}
