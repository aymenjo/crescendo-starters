import { container } from "@/components/ui/Container";
import { Cote } from "@/components/ui/Cote";
import { Reassurance } from "@/components/ui/Avatar";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";
import { typo } from "@/lib/typo";

const { methode } = landing;

// L'escalier : sky → mustard → sage, décalé vers le haut de gauche à droite en `lg` (96 / 48 / 0 px).
const stairs = [
  "bg-sky lg:mt-24",
  "bg-mustard lg:mt-12",
  "bg-sage",
] as const;

// Connecteur vers la marche suivante : vertical de 24 px sur mobile, horizontal en `lg`.
const connector =
  "after:absolute after:top-full after:left-8 after:h-6 after:border-l-[1.5px] after:border-ink after:content-[''] lg:after:top-14 lg:after:left-full lg:after:h-0 lg:after:w-8 lg:after:border-t-[1.5px] lg:after:border-l-0";

/** Méthode (`#methode`) : la carte de l'appel (§ 10.5), puis l'escalier en écho au logo (§ 10.3). */
export function Methode() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="section lg:scroll-mt-18">
      <div className={container}>
        <h2 id="methode-title" className="t-h2 mb-8 lg:mb-10">
          <TitleText title={methode.h2} />
        </h2>

        <div className="max-w-[720px] rounded-lg border border-rule bg-surface p-6 lg:p-8">
          <h3 className="t-h3">
            <TitleText title={methode.appel.h3} />
          </h3>
          <ol role="list" className="my-6 grid gap-4">
            {methode.appel.steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[28px_1fr] items-start gap-4">
                <span
                  aria-hidden
                  className="grid size-7 place-items-center rounded-sm border border-rule-strong font-mono text-[13px] leading-none font-medium tabular-nums"
                >
                  {i + 1}
                </span>
                <p>{typo(step)}</p>
              </li>
            ))}
          </ol>
          <div className="border-t border-rule pt-5">
            <Reassurance text={methode.appel.footer} decorative />
          </div>
        </div>

        <ol role="list" className="mt-18 grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
          {methode.etapes.map((etape, i) => (
            <li
              key={etape.title}
              className={`relative grid content-start gap-3 rounded-lg border-[1.5px] border-ink p-6 lg:p-8 ${stairs[i]} ${i < 2 ? connector : ""}`}
            >
              <Cote className="text-ink!">{ui.stepCote(i + 1)}</Cote>
              <h3 className="t-h3">{typo(etape.title)}</h3>
              <p>{typo(etape.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
