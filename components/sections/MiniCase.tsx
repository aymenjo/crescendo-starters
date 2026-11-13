import { Cote } from "@/components/ui/Cote";
import { Marker } from "@/components/ui/Marker";
import { Rich } from "@/components/ui/Rich";
import { typo } from "@/lib/typo";

export type MiniCaseData = { secteur: string; taille: string; avant: string; livre: string };

/**
 * Mini-cas client (DESIGN.md § 11, Preuve) : carte, marqueur `blush`, cote « secteur · taille »,
 * « Avant : » puis « Livré : » (gabarit de la copy). Prêt, mais pas rendu tant qu'il n'y a pas 2 cas avec l'accord écrit du client.
 */
export function MiniCase({ secteur, taille, avant, livre }: MiniCaseData) {
  return (
    <article className="grid gap-3 rounded-lg border border-rule bg-surface p-5 lg:p-6">
      <div className="flex items-center gap-2">
        <Marker color="blush" />
        <Cote>
          {secteur} · {taille}
        </Cote>
      </div>
      <p>
        {typo("Avant : ")}
        <Rich text={avant} />
      </p>
      <p>
        {typo("Livré : ")}
        <Rich text={livre} />
      </p>
    </article>
  );
}
