import { container } from "@/components/ui/Container";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";

const { probleme } = landing;

/** Problème : sans la citation « prospects chauds », en réserve (copy v2.1). */
export function Probleme() {
  return (
    <section aria-labelledby="probleme-title" className="section">
      <div className={`${container} grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12`}>
        <h2 id="probleme-title" className="t-h2 lg:col-span-5">
          <TitleText title={probleme.h2} />
        </h2>
        <div className="grid gap-4 lg:col-span-7">
          {probleme.paragraphs.map((p) => (
            <p key={p} className="max-w-[56ch]">
              {typo(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
