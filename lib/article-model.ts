import type { MarkerColor } from "@/components/ui/Marker";
import type { Database } from "./supabase/database.types";
import { supabaseEnv } from "./supabase/env";

/**
 * Modèle des articles, sans accès au cache : partagé par le serveur et l'éditeur (navigateur).
 * Les lectures publiques en cache sont dans lib/articles.ts.
 */

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type ArticleCategory = Database["public"]["Enums"]["article_category"];
export type ArticleStatus = Database["public"]["Enums"]["article_status"];

/** Un article publié : la base garantit que ses champs obligatoires sont remplis. */
export type PublishedArticle = Article & {
  category: ArticleCategory;
  cover_path: string;
  cover_alt: string;
  first_published_at: string;
};

/** Les 4 catégories fixes et leur marqueur (DESIGN.md § 3, « Couleurs de catégories »). */
export const CATEGORIES: Record<ArticleCategory, { label: string; marker: MarkerColor }> = {
  "automatisation-ia": { label: "Automatisation IA", marker: "sky" },
  "outils-no-code": { label: "Outils & no-code", marker: "mustard" },
  digitalisation: { label: "Digitalisation & stratégie", marker: "sage" },
  "cas-clients": { label: "Cas clients", marker: "blush" },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as ArticleCategory[];

/** Tags de cache, invalidés par publier, mettre à jour, dépublier et supprimer (docs/PLAN.md, « Rendu et cache »). */
export const ARTICLES_TAG = "articles";
export const articleTag = (slug: string) => `article:${slug}`;

/** Titre SEO et meta description : le titre et le chapô par défaut. */
export const seoTitle = (a: Pick<Article, "seo_title" | "title">) => a.seo_title?.trim() || a.title;
export const metaDescription = (a: Pick<Article, "meta_description" | "excerpt">) =>
  a.meta_description?.trim() || a.excerpt;

/** URL publique d'une image du bucket `articles`. */
export function coverUrl(path: string): string {
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${supabaseEnv().url}/storage/v1/object/public/articles/${encoded}`;
}
