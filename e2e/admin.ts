import type { Page } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { expect, test } from "./fixtures";
import { adminClient, createTestUser, deleteTestUser, signIn } from "./supabase";

/**
 * Tests de l'admin : chaque test a son compte (connecté) et nettoie les articles qu'il crée,
 * images comprises.
 */
export function withAdminSession() {
  const state = { user: { id: "", email: "" }, slugs: [] as string[] };

  test.beforeEach(async ({ page }) => {
    state.user = await createTestUser("editeur");
    await signIn(page, state.user.email);
  });

  test.afterEach(async () => {
    await deleteArticles(state.slugs.splice(0));
    await deleteTestUser(state.user.id);
  });

  /** Un titre unique, et le slug qu'il produit ; l'article sera supprimé après le test. */
  return function uniqueTitle(label: string) {
    const suffix = randomUUID().slice(0, 6);
    const title = `${label} ${suffix}`;
    const slug = `${label}-${suffix}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-");
    state.slugs.push(slug);
    return { title, slug };
  };
}

/** Supprime des articles et leurs images (bucket `articles`, dossier `<id>/`). */
export async function deleteArticles(slugs: string[]) {
  if (slugs.length === 0) return;
  const supabase = adminClient();
  const { data } = await supabase.from("articles").select("id").in("slug", slugs);
  for (const { id } of data ?? []) {
    const { data: files } = await supabase.storage.from("articles").list(id);
    if (files?.length) await supabase.storage.from("articles").remove(files.map((f) => `${id}/${f.name}`));
  }
  await supabase.from("articles").delete().in("slug", slugs);
}

/** Ouvre l'éditeur et attend qu'il soit hydraté. */
export async function openEditor(page: Page, path = "/admin/articles/nouveau") {
  await page.goto(path);
  await expect(page.locator("[data-editor][data-ready]:visible")).toBeAttached();
}

/**
 * Crée un brouillon par l'éditeur, puis rouvre l'éditeur à son adresse définitive.
 * Sans ce rechargement, le prochain rafraîchissement du routeur (après une publication) afficherait
 * la route `/admin/articles/<id>` en gardant l'ancienne route `nouveau` masquée dans le DOM (Activity) :
 * les sélecteurs par texte ou par label trouveraient alors deux éditeurs.
 */
export async function createDraft(page: Page, title: string) {
  await openEditor(page);
  await page.getByLabel("Titre", { exact: true }).fill(title);
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page).toHaveURL(/\/admin\/articles\/[0-9a-f-]{36}$/);
  await expect(page.getByText(/^Enregistré à/)).toBeVisible();
  const id = page.url().split("/").pop()!;
  await openEditor(page, `/admin/articles/${id}`);
  return id;
}
