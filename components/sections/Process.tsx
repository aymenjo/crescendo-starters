import { BellRing, ChartColumn, FileText, Inbox, Package, PhoneIncoming, RefreshCcw } from "lucide-react";
import { container } from "@/components/ui/Container";
import { Cote } from "@/components/ui/Cote";
import { Relance } from "@/components/ui/Relance";
import { TitleText } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";
import { typo } from "@/lib/typo";

const { process } = landing;

const icons = {
  devis: FileText,
  relances: BellRing,
  emails: Inbox,
  appels: PhoneIncoming,
  bases: RefreshCcw,
  reporting: ChartColumn,
  inventaire: Package,
} as const;

/** Ce qu'on automatise (`#process`) : la nomenclature des process (DESIGN.md § 10.14). */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section lg:scroll-mt-18">
      <div className={container}>
        <div className="mb-8 grid gap-4 lg:mb-10">
          <h2 id="process-title" className="t-h2">
            <TitleText title={process.h2} />
          </h2>
          <p className="t-lead max-w-[56ch]">{typo(process.intro)}</p>
        </div>

        <div className="grid border-b border-rule lg:grid-cols-2 lg:gap-x-12">
          <ul role="list" className="contents">
            {process.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.title}
                  className="grid grid-cols-[20px_1fr] content-start items-start gap-x-4 gap-y-2 border-t border-rule py-6"
                >
                  <Icon size={20} strokeWidth={1.75} className="mt-0.5 text-ink-2" aria-hidden />
                  <h3 className="t-h4">{typo(item.title)}</h3>
                  <p className="col-start-2 text-ink-2">{typo(item.text)}</p>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-rule py-6">
            <div className="grid gap-2 rounded-lg border border-rule bg-surface p-6">
              <Cote>{ui.toolsCote}</Cote>
              <p>{typo(process.tools)}</p>
            </div>
          </div>
        </div>

        <Relance text={process.relance} label={process.cta.label} position="apres-process" bare />
      </div>
    </section>
  );
}
