import { FolderOpen, LifeBuoy, ShieldCheck, TrendingUp } from "lucide-react";
import { container } from "@/components/ui/Container";
import { Cote } from "@/components/ui/Cote";
import { Rich, TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";

const { offre } = landing;

const icons = { support: LifeBuoy, bilan: TrendingUp, passation: FolderOpen, securite: ShieldCheck } as const;

type OfferData = (typeof offre)["sprint"] | (typeof offre)["audit"];

/** Puces carrées de 6 px en `rule-strong`. Le premier mot prend une capitale : la copy le place après le prix. */
function SquareList({ items }: { items: readonly string[] }) {
  return (
    <ul role="list" className="grid gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 first-letter:uppercase before:absolute before:top-[0.66em] before:left-0.5 before:size-1.5 before:bg-rule-strong before:content-['']"
        >
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

function Offer({ offer }: { offer: OfferData }) {
  return (
    <article className="flex flex-col overflow-clip rounded-lg border border-rule bg-surface">
      <header className="grid gap-2 border-b border-rule p-6 lg:p-8">
        <h3 className="t-h3">
          <TitleText title={offer.h3} />
        </h3>
        <p className="text-ink-2">{typo(offer.pour)}</p>
      </header>
      <div className="grid gap-5 p-6 lg:p-8">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {offer.price.from && <span className="t-small">{offer.price.from}</span>}
          <span className="t-price">{typo(offer.price.amount)}</span>
          <Cote>{offer.price.unit}</Cote>
        </p>
        <SquareList items={offer.items} />
      </div>
    </article>
  );
}

/** Offre (`#offre`) : deux cartes sans mise en avant, puis « Inclus dans chaque projet » (DESIGN.md § 10.16). */
export function Offre() {
  return (
    <section id="offre" aria-labelledby="offre-title" className="section lg:scroll-mt-18">
      <div className={container}>
        <h2 id="offre-title" className="t-h2 mb-8 lg:mb-10">
          <TitleText title={offre.h2} />
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <Offer offer={offre.sprint} />
          <Offer offer={offre.audit} />
        </div>

        <h3 className="t-h3 mt-16 mb-6">
          <TitleText title={offre.inclus.h3} />
        </h3>
        <div className="grid gap-6 rounded-lg border border-rule bg-surface p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          {offre.inclus.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.icon} className="grid grid-cols-[20px_1fr] items-start gap-4">
                <Icon size={20} strokeWidth={1.75} className="mt-0.5 text-ink-2" aria-hidden />
                <p className="text-[15px]">
                  <Rich text={item.text} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
