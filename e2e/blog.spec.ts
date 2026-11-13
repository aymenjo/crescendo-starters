import { expect, test } from "./fixtures";

/** Articles du seed (supabase/seed.sql), du plus récent au plus ancien. */
const PUBLISHED = [
  { slug: "par-quel-process-commencer", title: "Par quel process commencer l'automatisation de votre PME ?" },
  { slug: "relier-un-devis-excel-a-la-facturation", title: "Relier un devis Excel à votre outil de facturation" },
  { slug: "automatiser-les-relances-clients", title: "Automatiser les relances clients sans perdre le ton de votre équipe" },
];
const DRAFT = "tri-des-emails-entrants";

/** Compare sans tenir compte des espaces insécables posés au rendu (lib/typo.ts). */
const plain = (text: string) => text.replace(/[  ]/g, " ").trim();

test("la liste montre les articles publiés, du plus récent au plus ancien, sans brouillon", async ({ page }) => {
  const response = await page.goto("/blog");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Le carnet de l'automatisation — Crescendo");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Le carnet de l'automatisation");

  const titles = (await page.locator("main li h2").allTextContents()).map(plain);
  const seed = titles.filter((t) => PUBLISHED.some((a) => a.title === t));
  expect(seed).toEqual(PUBLISHED.map((a) => a.title));
  expect(titles).not.toContain("Tri des emails entrants : un premier bilan");

  await page.locator("main li a").filter({ hasText: "Relier un devis Excel" }).click();
  await expect(page).toHaveURL(`/blog/${PUBLISHED[1].slug}`);
});

test("une page article a son en-tête, ses métadonnées et ses données BlogPosting", async ({ page }) => {
  const { slug } = PUBLISHED[2];
  const response = await page.goto(`/blog/${slug}`);
  expect(response?.status()).toBe(200);

  await expect(page).toHaveTitle("Automatiser les relances clients — Crescendo");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/blog/${slug}$`));
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /couverture\.png$/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator("main").getByText(/^Aymen Jouini · 8 octobre 2026 · \d+ min de lecture$/)).toBeVisible();
  await expect(page.locator("main h2 .marker").first()).toBeAttached();

  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(json["@type"]).toBe("BlogPosting");
  expect(json.headline).toBe(PUBLISHED[2].title);
  expect(json.datePublished).toMatch(/^2026-10-08/);
  expect(json.author).toMatchObject({ "@type": "Person", name: "Aymen Jouini" });
});

for (const [label, slug] of [
  ["un brouillon", DRAFT],
  ["un slug inconnu", "cet-article-n-existe-pas"],
] as const) {
  test(`${label} renvoie la 404`, async ({ page }) => {
    const response = await page.goto(`/blog/${slug}`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cette page n'existe pas.");
  });
}

test("le sitemap déclare /blog et les articles publiés, jamais un brouillon", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toMatch(/<loc>[^<]+\/blog<\/loc>/);
  for (const { slug } of PUBLISHED) expect(xml).toContain(`/blog/${slug}</loc>`);
  expect(xml).not.toContain(DRAFT);
});

test("les liens de réservation du blog portent leurs UTM avant #rdv", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.locator('[data-cta="blog-nav"]')).toHaveAttribute("href", "/?utm_source=blog&utm_medium=nav#rdv");

  const { slug } = PUBLISHED[0];
  await page.goto(`/blog/${slug}`);
  await expect(page.locator('[data-cta="blog-nav"]')).toHaveAttribute(
    "href",
    `/?utm_source=blog&utm_medium=nav&utm_campaign=${slug}#rdv`,
  );
  await expect(page.locator('[data-cta="article-cta"]')).toHaveAttribute(
    "href",
    `/?utm_source=blog&utm_medium=article-cta&utm_campaign=${slug}#rdv`,
  );
  await expect(page.getByText("Ce sujet vous parle ? Réservons 30 min.")).toBeVisible();
});

test("la nav du blog tient sur une ligne et ramène à la liste", async ({ page }) => {
  await page.goto(`/blog/${PUBLISHED[0].slug}`);
  const header = page.locator("[data-site-header]");
  expect((await header.boundingBox())?.height).toBeLessThanOrEqual(73);
  await header.getByRole("link", { name: /le carnet/ }).click();
  await expect(page).toHaveURL("/blog");
});

test("le footer mène au carnet", async ({ page }) => {
  await page.goto("/");
  await page.locator("footer").getByRole("link", { name: "Le carnet" }).click();
  await expect(page).toHaveURL("/blog");
});

test("la 404 propose de lire le carnet", async ({ page }) => {
  await page.goto("/cette-page-n-existe-pas");
  await page.getByRole("link", { name: "Lire le carnet" }).click();
  await expect(page).toHaveURL("/blog");
});
