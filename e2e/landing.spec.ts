import { expect, test } from "./fixtures";

test.describe("landing", () => {
  test("affiche les 10 sections dans l'ordre de la copy, sans les éléments masqués", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(
      "Lundi matin, les relances clients sont parties et les appels du week-end sont triés.",
    );
    const h2 = await page.locator("main h2").allTextContents();
    expect(h2).toEqual([
      "Chaque semaine, votre équipe refait à la main ce qu'un automate ferait seul.",
      "Les process calvaires qu'on automatise",
      "Vos automatisations sont conçues par un architecte.",
      "De l'appel à la mise en production, en trois étapes",
      "Démarrez par un process, ou par un audit de toute l'entreprise.",
      "Le prix signé est le prix payé.",
      "Pour les PME de 10 à 250 salariés qui perdent du temps sur des tâches répétitives",
      "Questions fréquentes",
      "Quels process calvaires coûtent le plus à votre équipe ?",
    ]);
    await expect(page.locator("details")).toHaveCount(11);

    const text = await page.locator("body").innerText();
    for (const hidden of ["Quelques projets livrés", "prospects chauds par faute de temps", "[Mise en page", "[Visuel"]) {
      expect(text).not.toContain(hidden);
    }
    // Le seul lien de la landing vers le blog est dans le footer (DESIGN.md § 10.11).
    await expect(page.locator('main a[href^="/blog"]')).toHaveCount(0);
    await expect(page.locator("footer").getByRole("link", { name: "Le carnet" })).toHaveAttribute("href", "/blog");
  });

  test("chaque CTA porte sa position", async ({ page }) => {
    await page.goto("/");
    const positions = await page.locator("[data-cta]").evaluateAll((els) => els.map((el) => el.getAttribute("data-cta")));
    expect(positions).toEqual(["header", "hero", "apres-process", "engagement", "final", "sticky"]);
  });
});

test.describe("bouton fixe mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "sous lg uniquement");

  test("apparaît après le CTA du hero et disparaît sur #rdv", async ({ page }) => {
    await page.goto("/");
    const sticky = page.locator("[data-sticky-cta]");

    // Au chargement : caché et inert.
    await expect(sticky).toBeHidden();
    await expect(sticky).toHaveAttribute("inert", "");

    // Le CTA du hero sort de l'écran : le bouton apparaît et redevient interactif.
    await page.locator("#process").scrollIntoViewIfNeeded();
    await expect(sticky).toBeVisible();
    await expect(sticky).not.toHaveAttribute("inert");
    await expect(sticky.locator('[data-cta="sticky"]')).toHaveText("Réserver mon appel");

    // #rdv entre dans l'écran : le bouton se cache et sort de la tabulation.
    await page.locator("#rdv").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveAttribute("inert", "");
    await expect(sticky).toBeHidden();
  });
});

test.describe("clavier", () => {
  test.skip(({ isMobile }) => isMobile, "parcours au Tab sur desktop");

  test("chaque CTA reçoit un focus visible", async ({ page }) => {
    await page.goto("/");
    const seen: string[] = [];
    // En lg, l'agenda est intégré à #rdv : le CTA « final » n'est rendu que sous lg.
    for (let i = 0; i < 80 && !seen.includes("engagement"); i++) {
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      const position = await focused.getAttribute("data-cta").catch(() => null);
      if (position) {
        seen.push(position);
        await expect(focused).toHaveCSS("outline-style", "solid");
        await expect(focused).toHaveCSS("outline-width", "2px");
      }
    }
    expect(seen).toEqual(["header", "hero", "apres-process", "engagement"]);
  });
});
