import { cacheLife, cacheTag } from "next/cache";
import { ARTICLES_TAG, articleTag, type PublishedArticle } from "./article-model";
import { isMissingTable } from "./supabase/errors";
import { createPublicClient } from "./supabase/public";

export * from "./article-model";

/**
 * La table n'existe pas encore : la preview et le build de prod tournent avant la migration
 * (docs/PLAN.md, « CI/CD »). Le blog est alors vide, ce qui est exact puisque rien n'y est publié,
 * et la première publication invalide ce cache. Toute autre erreur fait échouer le build.
 */
function warnMissingTable(): void {
  console.warn("La table articles n'existe pas encore dans cette base : le blog est vide en attendant la migration.");
}

/** Les articles publiés, du plus récent au plus ancien. En cache jusqu'à la prochaine publication. */
export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  "use cache";
  cacheTag(ARTICLES_TAG);
  cacheLife("max");

  const { data, error } = await createPublicClient()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("first_published_at", { ascending: false });
  if (isMissingTable(error)) {
    warnMissingTable();
    return [];
  }
  if (error) throw new Error(`Lecture des articles impossible : ${error.message}`);
  return data as PublishedArticle[];
}

/** Un article publié, ou `null` (brouillon, dépublié, supprimé ou inconnu). */
export async function getPublishedArticle(slug: string): Promise<PublishedArticle | null> {
  "use cache";
  cacheTag(articleTag(slug));
  cacheLife("max");

  const { data, error } = await createPublicClient()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (isMissingTable(error)) {
    warnMissingTable();
    return null;
  }
  if (error) throw new Error(`Lecture de l'article « ${slug} » impossible : ${error.message}`);
  return data as PublishedArticle | null;
}
