import { container } from "@/components/ui/Container";
import { Relance } from "@/components/ui/Relance";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";

const { engagement } = landing;

/** Engagement : panneau `raised` sans trait (DESIGN.md § 10.17), puis la relance. */
export function Engagement() {
  return (
    <section aria-labelledby="engagement-title" className="section">
      <div className={container}>
        <div className="grid gap-4 rounded-xl bg-raised px-6 py-8 lg:p-12">
          <h2 id="engagement-title" className="t-h2">
            <TitleText title={engagement.h2} />
          </h2>
          <p className="max-w-[56ch]">{typo(engagement.text)}</p>
        </div>
        <Relance text={engagement.relance} label={engagement.cta.label} position="engagement" />
      </div>
    </section>
  );
}
