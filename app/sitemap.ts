import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

/**
 * Sitemap unique (DESIGN.md § 12.0) : la landing, `/blog` et les articles publiés, jamais de brouillon.
 * Il suit le cache des articles (tag `articles`) : une publication ou une dépublication le met à jour.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl();
  const articles = await getPublishedArticles();
  const lastArticleUpdate = articles.map((a) => a.updated_at).sort().at(-1);
  return [
    { url: `${url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/blog`, lastModified: lastArticleUpdate, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((article) => ({
      url: `${url}/blog/${article.slug}`,
      lastModified: article.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
