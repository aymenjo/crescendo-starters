import { BellRing, FileText, Receipt } from "lucide-react";
import { Cote } from "@/components/ui/Cote";
import { FlowConnector } from "@/components/ui/FlowConnector";
import { Marker } from "@/components/ui/Marker";
import { ui } from "@/content/interface";

const icons = { devis: FileText, facture: Receipt, relance: BellRing } as const;

// Décalage entre deux documents : 24 px, 48 px en `lg` (DESIGN.md § 10.13).
const stepIndent = ["", "ml-6 lg:ml-12", "ml-12 lg:ml-24"] as const;
const linkIndent = ["ml-6", "ml-12 lg:ml-18"] as const;
const docDelay = ["[--d:0ms]", "[--d:60ms]", "[--d:120ms]"] as const;
const linkDelay = ["[--d:240ms]", "[--d:360ms]"] as const;

function Doc({ index }: { index: number }) {
  const doc = ui.planche.docs[index];
  const Icon = icons[doc.icon];
  return (
    <div
      className={`flow-doc grid w-46 flex-none gap-1 rounded-md border border-rule bg-surface px-4 py-3 shadow-float sm:w-54 ${docDelay[index]}`}
    >
      <div className="flex items-center gap-2">
        <Marker color={doc.marker} />
        <span className="flex-1 text-[15px] leading-[1.3] font-semibold">{doc.name}</span>
        <Icon size={18} strokeWidth={1.75} className="text-ink-2" aria-hidden />
      </div>
      <Cote className="text-xs!">{doc.cote}</Cote>
    </div>
  );
}

function Link({ index }: { index: number }) {
  return (
    <div className={`relative h-10 ${linkIndent[index]} ${linkDelay[index]}`}>
      <FlowConnector offset={24} className="lg:hidden" />
      <FlowConnector offset={48} className="hidden lg:block" />
      <Cote className="absolute top-3 left-10 whitespace-nowrap lg:left-16">{ui.planche.links[index]}</Cote>
    </div>
  );
}

/**
 * La planche du hero (DESIGN.md § 10.13) : devis → facture → relance, reliés à l'équerre.
 * C'est la seule entrée animée de la page. Une image pour les lecteurs d'écran.
 */
export function FlowDiagram() {
  return (
    <figure role="img" aria-label={ui.planche.label} className="planche rounded-xl border border-rule p-6 lg:p-8">
      <div aria-hidden>
        <Cote className="mb-6 block">{ui.planche.title}</Cote>
        <div className="flex items-center gap-3">
          <Doc index={0} />
          <Cote leader className="min-w-0">
            {ui.planche.annotation}
          </Cote>
        </div>
        <Link index={0} />
        <div className={`flex ${stepIndent[1]}`}>
          <Doc index={1} />
        </div>
        <Link index={1} />
        <div className={`flex ${stepIndent[2]}`}>
          <Doc index={2} />
        </div>
      </div>
    </figure>
  );
}
