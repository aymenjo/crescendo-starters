import { container } from "@/components/ui/Container";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";

const { pourQui } = landing;

/** Pour qui (DESIGN.md § 10.18) : l'exclusion dans un encadré neutre, une information et pas une alerte. */
export function PourQui() {
  return (
    <section aria-labelledby="pourqui-title" className="section">
      <div className={`${container} grid gap-4`}>
        <h2 id="pourqui-title" className="t-h2 max-w-[24ch]">
          <TitleText title={pourQui.h2} />
        </h2>
        <p className="max-w-[56ch]">{typo(pourQui.text)}</p>
        <p className="max-w-[56ch] rounded-lg border border-rule bg-surface p-6">{typo(pourQui.exclusion)}</p>
      </div>
    </section>
  );
}
