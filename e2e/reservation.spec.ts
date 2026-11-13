import { expect, test } from "./fixtures";
import { simulateBooking } from "./fake-cal";

// Le build de test porte un NEXT_PUBLIC_CAL_LINK factice (voir .github/workflows/ci.yml).

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "agenda intégré en lg");

  test("un clic sur le CTA du hero mène à l'agenda intégré dans #rdv", async ({ page }) => {
    await page.goto("/");
    // Rien n'est chargé tant qu'on n'approche pas de #rdv.
    await expect(page.getByTestId("cal-embed")).toHaveCount(0);

    await page.locator('[data-cta="hero"]').click();
    await expect(page).toHaveURL(/#rdv$/);
    const embed = page.locator("#rdv").getByTestId("cal-embed");
    await expect(embed).toBeVisible();
    await expect(embed).toBeInViewport();
    await expect(page.locator('[data-cta="final"]')).toBeHidden();

    const rdv = page.locator("#rdv");
    await expect(rdv.getByRole("link", { name: "Ouvrir l'agenda dans un nouvel onglet" })).toHaveAttribute("target", "_blank");
    await expect(rdv.getByRole("link", { name: "Politique de confidentialité" })).toHaveAttribute("href", "/confidentialite");
    await expect(rdv.getByRole("link", { name: "aymen@croissanceconsulting.com" })).toHaveAttribute(
      "href",
      "mailto:aymen@croissanceconsulting.com",
    );
  });

  test("une réservation dans l'embed mène à /merci", async ({ page }) => {
    await page.goto("/#rdv");
    await expect(page.getByTestId("cal-embed")).toBeVisible();
    await simulateBooking(page, "rdv", "test-desktop");
    await expect(page).toHaveURL("/merci?uid=test-desktop");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "C'est réservé. Préparez deux ou trois process calvaires.",
    );
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "dialog plein écran sous lg");

  test("un CTA ouvre l'agenda en plein écran ; Échap et « Fermer » le ferment", async ({ page }) => {
    await page.goto("/");
    const dialog = page.locator("dialog[data-booking-dialog]");
    const hero = page.locator('[data-cta="hero"]');

    await hero.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId("cal-embed")).toBeVisible();
    await expect(page).not.toHaveURL(/#rdv/);

    // Échap ferme, et le focus revient au CTA d'origine.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(hero).toBeFocused();

    // « Fermer » ferme aussi.
    await page.locator('[data-cta="header"]').click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Fermer" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.locator('[data-cta="header"]')).toBeFocused();
  });

  test("une réservation dans le dialog mène à /merci", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-cta="hero"]').click();
    await simulateBooking(page, "dialog", "test-mobile");
    await expect(page).toHaveURL("/merci?uid=test-mobile");
  });
});

test("/merci n'est pas indexable et son header se réduit au logo", async ({ page }) => {
  const response = await page.goto("/merci");
  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("header [data-cta]")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Voir le profil LinkedIn d'Aymen" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/aymen-jouini-77038220",
  );
});
