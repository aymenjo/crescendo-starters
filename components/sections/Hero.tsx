import { CtaLink } from "@/components/ui/CtaLink";
import { container } from "@/components/ui/Container";
import { Reassurance } from "@/components/ui/Avatar";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";
import { FlowDiagram } from "./FlowDiagram";

const { hero } = landing;

/** « week-end » est insécable dans le H1 (DESIGN.md § 4). */
function HeroTitle() {
  const [before, after] = hero.h1.text.split("week-end");
  return (
    <>
      {typo(before)}
      <span className="whitespace-nowrap">week-end</span>
      {typo(after)}
      {hero.h1.punct}
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-8 lg:pt-16">
      <div className={container}>
        <p className="t-surtitre">{typo(hero.surtitre)}</p>
        <h1 id="hero-title" className="t-display mt-4">
          <HeroTitle />
        </h1>
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="grid justify-items-start gap-4 lg:col-span-7">
            <p className="t-lead mb-2 max-w-[56ch]">{typo(hero.lead)}</p>
            <CtaLink position="hero" id="hero-cta" label={hero.cta.label} arrow />
            <Reassurance text={hero.reassurance} align="start" />
            <p className="t-small max-w-[52ch]">{typo(hero.proof)}</p>
          </div>
          <div className="lg:col-span-5">
            <FlowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
