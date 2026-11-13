import { Plus } from "lucide-react";
import { container } from "@/components/ui/Container";
import { Rich, TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";

const { faq } = landing;

/** FAQ (`#faq`) : 11 `<details>` en liste à filets, tous fermés au chargement (DESIGN.md § 10.8). */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section lg:scroll-mt-18">
      <div className={container}>
        <h2 id="faq-title" className="t-h2 mb-8 lg:mb-10">
          <TitleText title={faq.h2} />
        </h2>
        <div className="max-w-[720px] border-b border-rule">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-t border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] leading-[1.35] font-medium lg:text-lg [&::-webkit-details-marker]:hidden">
                {typo(item.q)}
                <Plus
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                  className="flex-none text-ink-2 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-[62ch] pb-6 text-ink-2">
                <Rich text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
