"use server";

import { redirect } from "next/navigation";
import type { ArticleInput, SaveResult } from "@/lib/admin/article-input";
import { refreshPublic, writeArticle } from "@/lib/admin/articles-server";
import { requireAdmin } from "@/lib/admin/session";

/**
 * Actions de l'éditeur (DESIGN.md § 12.7). Chacune revérifie la session ; la RLS reste la vraie barrière.
 * Après publier, mettre à jour, dépublier ou supprimer, la liste, l'article et le sitemap sont invalidés :
 * le blog change sans redéploiement.
 */

/** « Enregistrer » (et Cmd/Ctrl + S) sur un brouillon : le statut ne change pas. */
export async function saveArticle(input: ArticleInput): Promise<SaveResult> {
  const supabase = await requireAdmin();
  const result = await writeArticle(supabase, input);
  // Par sécurité : un article publié enregistré ainsi est en ligne, le blog doit suivre.
  if (result.ok && result.article.status === "published") refreshPublic(result.article.slug);
  return result;
}

/** « Publier » : enregistre, vérifie ce qui manque, puis passe l'article en ligne. */
export async function publishArticle(input: ArticleInput): Promise<SaveResult> {
  const supabase = await requireAdmin();
  const result = await writeArticle(supabase, input, "published");
  if (result.ok) refreshPublic(result.article.slug);
  return result;
}

/** « Mettre à jour » (et Cmd/Ctrl + S) sur un article publié : la correction est en ligne aussitôt. */
export async function updateArticle(input: ArticleInput): Promise<SaveResult> {
  return publishArticle(input);
}

/** « Dépublier » : l'article repasse en brouillon et garde sa date de première publication. */
export async function unpublishArticle(input: ArticleInput): Promise<SaveResult> {
  const supabase = await requireAdmin();
  const result = await writeArticle(supabase, input, "draft");
  if (result.ok) refreshPublic(result.article.slug);
  return result;
}

/** « Supprimer » : les images de l'article (`<id>/…`), puis la ligne, puis retour à la liste. */
export async function deleteArticle(id: string): Promise<{ ok: false }> {
  const supabase = await requireAdmin();
  const { data: article } = await supabase.from("articles").select("slug").eq("id", id).maybeSingle();
  if (!article) return { ok: false };

  const bucket = supabase.storage.from("articles");
  for (;;) {
    const { data: files, error } = await bucket.list(id, { limit: 100 });
    if (error) return { ok: false };
    if (!files || files.length === 0) break;
    const { data: removed, error: removeError } = await bucket.remove(files.map((file) => `${id}/${file.name}`));
    // Rien de supprimé (droits refusés) : on s'arrête plutôt que de boucler, et l'article reste en place.
    if (removeError || !removed?.length) return { ok: false };
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false };
  refreshPublic(article.slug);
  redirect("/admin");
}
