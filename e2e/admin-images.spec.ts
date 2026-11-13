import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createDraft, openEditor, withAdminSession } from "./admin";
import { expect, test } from "./fixtures";
import { adminClient } from "./supabase";

const uniqueTitle = withAdminSession();

const PNG = {
  name: "couverture.png",
  mimeType: "image/png",
  buffer: readFileSync(join(process.cwd(), "supabase/seed-images/22222222-2222-4222-8222-222222222222/couverture.png")),
};
const GIF = { name: "anime.gif", mimeType: "image/gif", buffer: Buffer.from("GIF89a") };
const HEAVY = { name: "lourde.png", mimeType: "image/png", buffer: Buffer.alloc(5 * 1024 * 1024 + 1) };
const FORMAT_ERROR = "Format accepté : JPEG, PNG ou WebP, 5 Mo au plus.";

test("avant le premier enregistrement, les images sont désactivées", async ({ page }) => {
  await openEditor(page);
  await expect(page.getByRole("button", { name: "Ajouter une image" })).toBeDisabled();
  await expect(page.locator("#cover")).toBeDisabled();
  await expect(page.getByText("Enregistrez l'article pour ajouter des images.").first()).toBeVisible();
});

test("couverture : un fichier refusé affiche le format attendu, une image valide s'affiche en 16:10", async ({ page }) => {
  const { title } = uniqueTitle("Couverture e2e");
  const id = await createDraft(page, title);

  for (const file of [HEAVY, GIF]) {
    await page.locator("#cover").setInputFiles(file);
    await expect(page.getByText(FORMAT_ERROR)).toBeVisible();
  }

  await page.locator("#cover").setInputFiles(PNG);
  const preview = page.locator("img[data-cover-preview]:visible");
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute("src", new RegExp(`/articles/${id}/[0-9a-f-]+\\.png$`));
  await expect(page.getByText(FORMAT_ERROR)).toHaveCount(0);
  const box = await preview.boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(1.6, 1);

  await page.getByLabel("Texte alternatif de la couverture").fill("Trois documents reliés");
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText(/^Enregistré à/)).toBeVisible();
  await page.reload();
  await expect(page.locator("img[data-cover-preview]:visible")).toBeVisible();
  await expect(page.getByLabel("Texte alternatif de la couverture")).toHaveValue("Trois documents reliés");
});

test("« Ajouter une image » : sans texte alternatif rien n'est inséré, puis l'image arrive au curseur", async ({ page }) => {
  const { title } = uniqueTitle("Image e2e");
  await createDraft(page, title);
  const body = page.getByLabel("Corps de l'article (Markdown)");
  await body.fill("Premier paragraphe.\n\nDernier paragraphe.");
  await body.evaluate((el: HTMLTextAreaElement) => el.setSelectionRange(19, 19));

  const opener = page.getByRole("button", { name: "Ajouter une image" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Ajouter une image" });
  await expect(dialog).toBeVisible();

  await dialog.getByLabel("Fichier").setInputFiles(GIF);
  await expect(dialog.getByText(FORMAT_ERROR)).toBeVisible();

  await dialog.getByLabel("Fichier").setInputFiles(PNG);
  await expect(dialog.locator("img")).toBeVisible();
  await dialog.getByRole("button", { name: "Insérer" }).click();
  await expect(dialog.getByText("Saisissez un texte alternatif.")).toBeVisible();
  await expect(body).toHaveValue("Premier paragraphe.\n\nDernier paragraphe.");

  await dialog.getByLabel("Texte alternatif").fill("Schéma du devis");
  await dialog.getByRole("button", { name: "Insérer" }).click();
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(body).toHaveValue(
    /^Premier paragraphe\.\n\n!\[Schéma du devis\]\(http[^)]+\/articles\/[0-9a-f-]+\/[0-9a-f-]+\.png\)\n\nDernier paragraphe\.$/,
  );
  await expect(page.locator("[data-preview] img[alt='Schéma du devis']")).toBeVisible();
});

test("Échap ferme le dialog et rend le focus au bouton", async ({ page }) => {
  const { title } = uniqueTitle("Echap e2e");
  await createDraft(page, title);
  const opener = page.getByRole("button", { name: "Ajouter une image" });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(opener).toBeFocused();
});

test("le bucket refuse lui aussi un format non autorisé", async () => {
  const { error } = await adminClient()
    .storage.from("articles")
    .upload(`test-${Date.now()}/anime.gif`, GIF.buffer, { contentType: "image/gif" });
  expect(error).not.toBeNull();
});
