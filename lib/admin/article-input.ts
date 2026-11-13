import type { Article, ArticleCategory } from "@/lib/article-model";
import type { PublishField } from "@/lib/publish";
import { isValidSlug } from "@/lib/slug";

/** Les champs que l'éditeur envoie à l'enregistrement. */
export type ArticleInput = {
  id: string | null;
  title: string;
  excerpt: string;
  category: ArticleCategory | null;
  body: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  coverPath: string | null;
  coverAlt: string;
};

export type SaveError =
  | { error: "title_missing" }
  | { error: "slug_invalid" }
  | { error: "slug_taken"; takenBy: string }
  | { error: "incomplete"; missing: PublishField[] }
  | { error: "failed" };

export type SaveResult = { ok: true; article: Article } | ({ ok: false } & SaveError);

/** Validation avant écriture : un brouillon s'enregistre dès qu'il a un titre et un slug valide. */
export function validateDraft(input: Pick<ArticleInput, "title" | "slug">): SaveError | null {
  if (!input.title.trim()) return { error: "title_missing" };
  if (!isValidSlug(input.slug)) return { error: "slug_invalid" };
  return null;
}

/** La ligne écrite en base : titre SEO et meta description vides retombent sur le titre et le chapô (null). */
export function toRow(input: ArticleInput) {
  return {
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    category: input.category,
    body: input.body,
    slug: input.slug,
    seo_title: input.seoTitle.trim() || null,
    meta_description: input.metaDescription.trim() || null,
    cover_path: input.coverPath,
    cover_alt: input.coverAlt.trim() || null,
  };
}

/** L'état de l'éditeur à partir d'un article enregistré. */
export function fromArticle(article: Article): ArticleInput {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    body: article.body,
    slug: article.slug,
    seoTitle: article.seo_title ?? "",
    metaDescription: article.meta_description ?? "",
    coverPath: article.cover_path,
    coverAlt: article.cover_alt ?? "",
  };
}
