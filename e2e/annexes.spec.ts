import { expect, test } from "./fixtures";

test("une adresse inconnue renvoie la 404 avec le lien vers l'accueil", async ({ page }) => {
  const response = await page.goto("/cette-page-n-existe-pas");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cette page n'existe pas.");
  await page.getByRole("link", { name: "Retour à l'accueil" }).click();
  await expect(page).toHaveURL("/");
});

test("l'image de partage est un PNG de 1200 × 630", async ({ page, request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");

  await page.goto("/");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Automatisez vos process calvaires, de l'audit à la mise en production",
  );
});

test("la landing déclare ses données Organization", async ({ page }) => {
  await page.goto("/");
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(json["@type"]).toBe("Organization");
  expect(json.founder.sameAs).toEqual(["https://www.linkedin.com/in/aymen-jouini-77038220"]);
});

for (const [path, title] of [
  ["/mentions-legales", "Mentions légales"],
  ["/confidentialite", "Politique de confidentialité"],
] as const) {
  test(`${path} répond avec son titre et la prose`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${title} — Crescendo`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator("footer").getByRole("link", { name: title })).toHaveAttribute("href", path);
  });
}

test("le sitemap déclare la landing", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(await response.text()).toMatch(/<loc>https?:\/\/[^<]+\/<\/loc>/);
});
