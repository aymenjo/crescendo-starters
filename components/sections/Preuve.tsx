import Image from "next/image";
import fondateur from "@/public/images/fondateur.jpg";
import { container } from "@/components/ui/Container";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";
import { typo } from "@/lib/typo";
import { MiniCase } from "./MiniCase";

const { preuve } = landing;

/** Preuve : la photo d'Aymen et son parcours. Les mini-cas (et leur H3) ne sont rendus qu'à partir de 2. */
export function Preuve() {
  const cases = preuve.cases.items;
  return (
    <section aria-labelledby="preuve-title" className="section">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16`}>
        <figure className="max-w-80 lg:col-span-5 lg:max-w-none">
          <Image
            src={fondateur}
            alt={ui.founderAlt}
            sizes="(min-width: 1024px) 480px, 320px"
            className="aspect-square w-full rounded-lg border border-rule object-cover saturate-[.85]"
          />
          <figcaption className="cote mt-3 block">{ui.founderCaption}</figcaption>
        </figure>
        <div className="grid gap-4 lg:col-span-7">
          <h2 id="preuve-title" className="t-h2">
            <TitleText title={preuve.h2} />
          </h2>
          {preuve.paragraphs.map((p) => (
            <p key={p} className="max-w-[56ch]">
              {typo(p)}
            </p>
          ))}
          {cases.length >= 2 && (
            <div className="mt-8 grid gap-6">
              <h3 className="t-h3">
                <TitleText title={preuve.cases.h3} />
              </h3>
              {cases.map((c) => (
                <MiniCase key={c.avant} {...c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
