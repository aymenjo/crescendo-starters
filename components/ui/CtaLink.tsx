import { ArrowRight } from "lucide-react";
import { typo } from "@/lib/typo";

/** Positions mesurées (DESIGN.md § 10.1) : `data-cta` sert à la mesure et à l'ouverture de l'agenda. */
export type CtaPosition =
  | "header"
  | "hero"
  | "apres-process"
  | "engagement"
  | "final"
  | "sticky"
  | "blog-nav"
  | "article-cta"
  | "blog-vide";

const base =
  "btn-press inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] border-ink bg-coral font-medium text-ink shadow-press";

const variants = {
  primary: "min-h-12 w-full px-5 py-3 text-center text-base text-balance sm:w-auto",
  compact: "min-h-11 whitespace-nowrap px-3 py-2 text-[15px] sm:px-4 lg:min-h-10",
} as const;

export function CtaLink({
  position,
  label,
  variant = "primary",
  arrow = false,
  id,
  href = "#rdv",
  className = "",
}: {
  position: CtaPosition;
  label: string;
  variant?: keyof typeof variants;
  arrow?: boolean;
  id?: string;
  /** `#rdv` sur la landing ; `/#rdv` depuis les autres pages. */
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} id={id} data-cta={position} className={`${base} ${variants[variant]} ${className}`}>
      {typo(label)}
      {arrow && <ArrowRight size={18} strokeWidth={1.75} aria-hidden />}
    </a>
  );
}
