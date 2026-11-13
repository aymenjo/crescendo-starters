import type { ArticleInput } from "@/lib/admin/article-input";
import { isValidSlug } from "@/lib/slug";

/** Les champs obligatoires pour publier (PRD, « Espace admin : articles »), dans l'ordre de l'éditeur. */
export const PUBLISH_FIELDS = {
  title: "Titre",
  excerpt: "Chapô",
  category: "Catégorie",
  cover: "Couverture",
  coverAlt: "Texte alternatif de la couverture",
  slug: "Slug valide",
  body: "Corps de l'article",
} as const;

export type PublishField = keyof typeof PUBLISH_FIELDS;

/** Ce qui manque pour publier, ou une liste vide. La même règle est vérifiée en base. */
export function missingForPublish(
  input: Pick<ArticleInput, "title" | "excerpt" | "category" | "body" | "slug" | "coverPath" | "coverAlt">,
): PublishField[] {
  const missing: PublishField[] = [];
  if (!input.title.trim()) missing.push("title");
  if (!input.excerpt.trim()) missing.push("excerpt");
  if (!input.category) missing.push("category");
  if (!input.coverPath?.trim()) missing.push("cover");
  if (!input.coverAlt.trim()) missing.push("coverAlt");
  if (!isValidSlug(input.slug)) missing.push("slug");
  if (!input.body.trim()) missing.push("body");
  return missing;
}
