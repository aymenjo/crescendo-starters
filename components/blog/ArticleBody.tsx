import { cacheLife } from "next/cache";
import type { MarkerColor } from "@/components/ui/Marker";
import { Markdown } from "@/lib/markdown";

/**
 * Corps d'un article, rendu par le moteur Markdown commun et mis en cache (clé : le texte et le marqueur).
 * Le tokenizer de Shiki lit l'horloge : sous Cache Components, ce rendu doit vivre dans `'use cache'`.
 */
export async function ArticleBody({ source, marker }: { source: string; marker: MarkerColor }) {
  "use cache";
  cacheLife("max");
  return <Markdown source={source} marker={marker} />;
}
