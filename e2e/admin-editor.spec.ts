import { openEditor, withAdminSession } from "./admin";
import { expect, test } from "./fixtures";

const uniqueTitle = withAdminSession();

test("un brouillon créé est retrouvé après rechargement, avec l'aperçu au rendu du blog", async ({ page }) => {
  const { title, slug } = uniqueTitle("Brouillon e2e");
  await page.getByRole("link", { name: "Nouvel article" }).first().click();
  await expect(page).toHaveURL("/admin/articles/nouveau");
  await expect(page.locator("[data-editor][data-ready]:visible")).toBeAttached();

  await page.getByLabel("Titre", { exact: true }).fill(title);
  await expect(page.getByLabel("Slug")).toHaveValue(slug);
  await page.getByLabel("Chapô").fill("Un chapô de test.");
  await page.getByLabel("Catégorie").selectOption("outils-no-code");
  await page.getByLabel("Corps de l'article (Markdown)").fill("# Intertitre\n\nUn paragraphe avec du **gras**.");

  const preview = page.locator("[data-preview]");
  await expect(preview.getByRole("heading", { level: 2, name: "Intertitre" })).toBeVisible();
  await expect(preview.locator("h2 .marker")).toBeAttached();
  await expect(page.getByText("Modifications non enregistrées")).toBeVisible();

  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText(/^Enregistré à \d{2}:\d{2}$/)).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/articles\/[0-9a-f-]{36}$/);

  await page.reload();
  await expect(page.locator("[data-editor][data-ready]:visible")).toBeAttached();
  await expect(page.getByLabel("Titre", { exact: true })).toHaveValue(title);
  await expect(page.getByLabel("Corps de l'article (Markdown)")).toHaveValue("# Intertitre\n\nUn paragraphe avec du **gras**.");
  await expect(page.getByLabel("Catégorie")).toHaveValue("outils-no-code");

  await page.goto("/admin");
  await expect(page.getByRole("row").filter({ hasText: title })).toContainText("Brouillon");
});

test("un enregistrement en échec garde le texte et affiche le message", async ({ page }) => {
  const { title } = uniqueTitle("Echec e2e");
  await openEditor(page);
  await page.getByLabel("Titre", { exact: true }).fill(title);
  await page.getByLabel("Corps de l'article (Markdown)").fill("Un texte qu'on ne veut pas perdre.");

  // Le serveur ne répond pas : la requête de l'action est coupée.
  await page.route("**/admin/articles/nouveau", (route) =>
    route.request().method() === "POST" ? route.abort("failed") : route.continue(),
  );
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.locator("main").getByRole("alert")).toHaveText(
    "L'enregistrement a échoué. Vos modifications sont toujours dans l'éditeur. Réessayez.",
  );
  await expect(page.getByLabel("Corps de l'article (Markdown)")).toHaveValue("Un texte qu'on ne veut pas perdre.");
  await expect(page.getByText("Modifications non enregistrées")).toBeVisible();

  await page.unroute("**/admin/articles/nouveau");
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText(/^Enregistré à/)).toBeVisible();
  await expect(page.locator("main").getByRole("alert")).toHaveCount(0);
});

test("un slug pris ou invalide est refusé avec son message", async ({ page }) => {
  const { title } = uniqueTitle("Slug e2e");
  await openEditor(page);
  await page.getByLabel("Titre", { exact: true }).fill(title);

  await page.getByLabel("Slug").fill("relier-un-devis-excel-a-la-facturation");
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText("Ce slug est déjà utilisé par « Relier un devis Excel à votre outil de facturation ».")).toBeVisible();
  await expect(page.getByLabel("Slug")).toHaveAttribute("aria-invalid", "true");

  await page.getByLabel("Slug").fill("Pas Un Slug");
  await page.getByRole("button", { name: "Enregistrer" }).click();
  await expect(page.getByText("Seuls les lettres a à z, les chiffres et les tirets sont acceptés.")).toBeVisible();
  await expect(page).toHaveURL("/admin/articles/nouveau");
});

test("l'éditeur se parcourt au clavier et Ctrl/Cmd + S enregistre", async ({ page }) => {
  const { title } = uniqueTitle("Clavier e2e");
  await openEditor(page);
  await page.getByRole("link", { name: "Articles" }).focus();

  const focused = () => page.evaluate(() => document.activeElement?.id || document.activeElement?.textContent?.trim());
  for (const name of ["Enregistrer", "Publier", "title"]) {
    await page.keyboard.press("Tab");
    expect(await focused()).toBe(name);
  }
  await page.keyboard.type(title);
  // Le fichier de couverture est désactivé avant le premier enregistrement : le focus passe au texte alternatif.
  for (const id of ["excerpt", "category", "cover-alt"]) {
    await page.keyboard.press("Tab");
    expect(await focused()).toBe(id);
  }
  await page.keyboard.press("Tab");
  expect(await focused()).toBe("Référencement");
  for (const id of ["seo-title", "meta-description", "slug", "body"]) {
    await page.keyboard.press("Tab");
    expect(await focused()).toBe(id);
  }
  await page.keyboard.type("Écrit au clavier.");
  await page.keyboard.press("ControlOrMeta+s");
  await expect(page.getByText(/^Enregistré à/)).toBeVisible();
});

test("quitter l'éditeur sans enregistrer affiche l'avertissement du navigateur", async ({ page }) => {
  const { title } = uniqueTitle("Quitter e2e");
  await openEditor(page);
  await page.getByLabel("Titre", { exact: true }).fill(title);

  const dialog = page.waitForEvent("dialog");
  void page.getByRole("link", { name: "Articles" }).click();
  const shown = await dialog;
  expect(shown.type()).toBe("beforeunload");
  await shown.dismiss();
  await expect(page).toHaveURL("/admin/articles/nouveau");
});
