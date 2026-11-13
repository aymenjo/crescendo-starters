import Image from "next/image";
import fondateur from "@/public/images/fondateur.jpg";
import { ui } from "@/content/interface";
import { typo } from "@/lib/typo";

/**
 * Avatar rond d'Aymen (DESIGN.md § 10.12) : 40 px, 48 px en `lg`, servi en 80 et 96 px.
 * `decorative` : le même visage déjà décrit plus haut dans la page (alt vide).
 */
export function Avatar({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      src={fondateur}
      alt={decorative ? "" : ui.founderAlt}
      sizes="(min-width: 1024px) 48px, 40px"
      className="size-10 flex-none rounded-full border border-rule object-cover lg:size-12"
    />
  );
}

/** Ligne de réassurance : l'avatar à gauche d'une ligne Small. */
export function Reassurance({
  text,
  decorative = false,
  align = "center",
}: {
  text: string;
  decorative?: boolean;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex max-w-[46ch] gap-3 text-sm leading-normal text-ink-2 lg:text-[15px] ${align === "center" ? "items-center" : "items-start"}`}
    >
      <Avatar decorative={decorative} />
      <p>{typo(text)}</p>
    </div>
  );
}
