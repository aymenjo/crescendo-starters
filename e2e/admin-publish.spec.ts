import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createDraft, withAdminSession } from "./admin";
import { expect, test } from "./fixtures";
import { adminClient } from "./supabase";

const uniqueTitle = withAdminSession();

const PNG = {
  name: "couverture.png",
  mimeType: "image/png",
  buffer: readFileSync(join(process.cwd(), "supabase/seed-images/33333333-3333-4333-8333-333333333333/couverture.png")),
};

test("« Publier » liste ce qui manque et ne publie rien", async ({ page, request }) => {
  const { title, slug } = uniqueTitle("Incomplet e2e");
  await createDraft(page, title);
  await page.getByRole("button", { name: "Publier" }).click();

  const alert = page.locator("main").getByRole("alert");
  await expect(alert).toContainText("Pour publier, il manque :");
  for (const item of ["Chapô", "Catégorie", "Couverture", "Texte alternatif de la couverture", "Corps de l'article"]) {
    await expect(alert.getByRole("listitem").filter({ hasText: new RegExp(`^${item}$`) })).toBeVisible();
  }
  await expect(page.getByLabel("Chapô")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Catégorie")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("[data-article-status]:visible")).toHaveText("Brouillon");
  expect((await request.get(`/blog/${slug}`)).status()).toBe(404);
});

test("publier, mettre à jour, dépublier puis supprimer un article, sans redéploiement", async ({ page, request }) => {
  const { title, slug } = uniqueTitle("Publication e2e");
  const id = await createDraft(page, title);

  await page.getByLabel("Chapô").fill("Un chapô publié par le test.");
  await page.getByLabel("Catégorie").selectOption("digitalisation");
  await page.locator("#cover").setInputFiles(PNG);
  await expect(page.locator("img[data-cover-preview]:visible")).toBeVisible();
  await page.getByLabel("Texte alternatif de la couverture").fill("Trois documents reliés");
  await page.getByLabel("Corps de l'article (Markdown)").fill("## Le détail\n\nUn corps publié.");

  // Publier
  await page.getByRole("button", { name: "Publier" }).click();
  await expect(page.getByRole("button", { name: "Mettre à jour" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Dépublier" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Voir en ligne" })).toHaveAttribute("href", `/blog/${slug}`);
  await expect(page.locator("[data-article-status]:visible")).toHaveText("Publié");

  // Le slug est verrouillé, dans l'UI comme en base.
  await expect(page.getByLabel("Slug")).toHaveAttribute("readonly", "");
  await expect(page.getByText("Le slug ne change plus après publication.")).toBeVisible();
  const { error } = await adminClient().from("articles").update({ slug: `${slug}-bis` }).eq("id", id);
  expect(error?.message).toBe("Le slug ne change plus après publication.");

  // En ligne : la page, la liste et le sitemap.
  const article = await request.get(`/blog/${slug}`);
  expect(article.status()).toBe(200);
  expect(await article.text()).toContain(title);
  await page.goto("/blog");
  // Le plus récent passe avant les articles du seed (d'autres tests peuvent publier en parallèle).
  const titles = (await page.locator("main li h2").allTextContents()).map((t) => t.replace(/[\u00a0\u202f]/g, " "));
  expect(titles.indexOf(title)).toBeGreaterThanOrEqual(0);
  expect(titles.indexOf(title)).toBeLessThan(titles.indexOf("Par quel process commencer l'automatisation de votre PME ?"));
  expect(await (await request.get("/sitemap.xml")).text()).toContain(`/blog/${slug}</loc>`);

  // Mettre à jour : la correction est en ligne aussitôt.
  await page.goto(`/admin/articles/${id}`);
  await expect(page.locator("[data-editor][data-ready]:visible")).toBeAttached();
  await page.getByLabel("Titre", { exact: true }).fill(`${title} corrigé`);
  await page.getByRole("button", { name: "Mettre à jour" }).click();
  await expect(page.getByText(/^Enregistré à/)).toBeVisible();
  expect(await (await request.get(`/blog/${slug}`)).text()).toContain(`${title} corrigé`);

  // Dépublier : 404, hors de la liste et du sitemap, date de première publication conservée.
  const { data: before } = await adminClient().from("articles").select("first_published_at").eq("id", id).single();
  await page.getByRole("button", { name: "Dépublier" }).click();
  await expect(page.getByRole("button", { name: "Publier" })).toBeVisible();
  await expect(page.getByLabel("Slug")).toHaveAttribute("readonly", "");
  // La page déjà en cache peut encore être servie une fois pendant sa revalidation : le PRD demande
  // que le changement soit visible dans la minute.
  const within = { timeout: 30_000, intervals: [250, 500, 1000] };
  await expect.poll(async () => (await request.get(`/blog/${slug}`)).status(), within).toBe(404);
  await expect.poll(async () => (await (await request.get("/blog")).text()).includes(title), within).toBe(false);
  await expect
    .poll(async () => (await (await request.get("/sitemap.xml")).text()).includes(`/blog/${slug}</loc>`), within)
    .toBe(false);
  const { data: after } = await adminClient().from("articles").select("first_published_at").eq("id", id).single();
  expect(after?.first_published_at).toBe(before?.first_published_at);

  // Supprimer : confirmation, « Annuler » a le focus, puis retour à la liste et images supprimées.
  await page.getByRole("button", { name: "Supprimer" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText(`Supprimer définitivement « ${title} corrigé » ?`);
  await expect(dialog.getByRole("button", { name: "Annuler" })).toBeFocused();
  await dialog.getByRole("button", { name: "Supprimer" }).click();
  await expect(page).toHaveURL("/admin");
  await expect(page.getByRole("row").filter({ hasText: title })).toHaveCount(0);
  const { data: files } = await adminClient().storage.from("articles").list(id);
  expect(files ?? []).toHaveLength(0);
});

test("« Annuler » ferme la confirmation sans rien supprimer", async ({ page }) => {
  const { title } = uniqueTitle("Garde e2e");
  const id = await createDraft(page, title);
  const opener = page.getByRole("button", { name: "Supprimer" });
  await opener.click();
  await page.getByRole("dialog").getByRole("button", { name: "Annuler" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(opener).toBeFocused();
  const { data } = await adminClient().from("articles").select("id").eq("id", id);
  expect(data).toHaveLength(1);
});
