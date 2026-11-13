import { CtaLink, type CtaPosition } from "./CtaLink";
import { typo } from "@/lib/typo";

/**
 * Relance CTA intermédiaire (DESIGN.md § 10.15). `bare` : sans filet ni padding haut,
 * quand le bloc précédent se termine déjà par un filet (nomenclature des process).
 */
export function Relance({
  text,
  label,
  position,
  bare = false,
}: {
  text: string;
  label: string;
  position: CtaPosition;
  bare?: boolean;
}) {
  return (
    <div
      className={`mt-12 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between ${bare ? "" : "border-t border-rule pt-8"}`}
    >
      <p className="max-w-[44ch] text-xl leading-[1.35] font-medium">{typo(text)}</p>
      <CtaLink position={position} label={label} arrow />
    </div>
  );
}
