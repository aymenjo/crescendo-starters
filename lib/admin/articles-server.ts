import { updateTag } from "next/cache";
import { ARTICLES_TAG, articleTag, type Article } from "@/lib/articles";
import type { ArticleStatus } from "@/lib/article-model";
import { missingForPublish } from "@/lib/publish";
import { type ArticleInput, type SaveResult, toRow, validateDraft } from "./article-input";
import type { requireAdmin } from "./session";

export type AdminClient = Awaited<ReturnType<typeof requireAdmin>>;

/** Le titre de l'article qui occupe déjà ce slug, pour le message d'erreur. */
async function slugOwner(supabase: AdminClient, slug: string, id: string | null) {
  let query = supabase.from("articles").select("title").eq("slug", slug);
  if (id) query = query.neq("id", id);
  const { data } = await query.maybeSingle();
  return data?.title ?? null;
}

/**
 * Écrit l'article (création au premier enregistrement). Les erreurs de base deviennent des messages.
 * `status` : le statut à écrire en même temps (publier, dépublier) ; un article publié doit être complet.
 */
export async function writeArticle(
  supabase: AdminClient,
  input: ArticleInput,
  status?: ArticleStatus,
): Promise<SaveResult> {
  const invalid = validateDraft(input);
  if (invalid) return { ok: false, ...invalid };
  if (status === "published") {
    const missing = missingForPublish(input);
    if (missing.length > 0) return { ok: false, error: "incomplete", missing };
  }

  const row = { ...toRow(input), ...(status ? { status } : {}) };
  const { data, error } = input.id
    ? await supabase.from("articles").update(row).eq("id", input.id).select().single()
    : await supabase.from("articles").insert(row).select().single();

  if (error) {
    if (error.code === "23505") {
      const takenBy = await slugOwner(supabase, input.slug, input.id);
      return takenBy ? { ok: false, error: "slug_taken", takenBy } : { ok: false, error: "failed" };
    }
    // Contrôle de complétude de la base : même règle que missingForPublish.
    if (error.code === "23514" && error.message.includes("articles_published_complete")) {
      return { ok: false, error: "incomplete", missing: missingForPublish(input) };
    }
    return { ok: false, error: "failed" };
  }
  return { ok: true, article: data as Article };
}

/**
 * Invalide la liste, le sitemap et la page de l'article (docs/PLAN.md, « Rendu et cache ») :
 * le changement est en ligne sans redéploiement. À appeler depuis une Server Action.
 */
export function refreshPublic(slug: string) {
  updateTag(ARTICLES_TAG);
  updateTag(articleTag(slug));
}
