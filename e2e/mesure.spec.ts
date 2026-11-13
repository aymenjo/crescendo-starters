import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

type VaCall = [string, { name?: string; data?: Record<string, string> }?];

/** Remplace `window.va` par un faux qui enregistre les appels, avant tout script de la page. */
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const calls: unknown[] = [];
    Object.assign(window, { __va: calls, va: (...args: unknown[]) => calls.push(args) });
  });
});

const events = (page: Page, name: string) =>
  page.evaluate(
    (n) => ((window as never as { __va: VaCall[] }).__va ?? []).filter(([t, p]) => t === "event" && p?.name === n),
    name,
  );

const positions = async (page: Page) => (await events(page, "cta_click")).map(([, p]) => p?.data?.position);

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "CTA visibles en lg");

  test("chaque CTA émet cta_click avec sa position", async ({ page }) => {
    await page.goto("/");
    for (const position of ["header", "hero", "apres-process", "engagement"]) {
      await page.locator(`[data-cta="${position}"]`).click();
    }
    await expect.poll(() => positions(page)).toEqual(["header", "hero", "apres-process", "engagement"]);
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "bouton fixe et CTA final sous lg");

  test("chaque CTA émet cta_click avec sa position, y compris le bouton fixe", async ({ page }) => {
    await page.goto("/");
    const dialog = page.locator("dialog[data-booking-dialog]");
    const clickAndClose = async (position: string) => {
      await page.locator(`[data-cta="${position}"]`).click();
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    };

    await clickAndClose("header");
    await clickAndClose("hero");
    await page.locator("#process").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-sticky-cta]")).toBeVisible();
    await clickAndClose("sticky");
    await clickAndClose("apres-process");
    await clickAndClose("engagement");
    await clickAndClose("final");

    await expect
      .poll(() => positions(page))
      .toEqual(["header", "hero", "sticky", "apres-process", "engagement", "final"]);
  });
});

test("une réservation n'émet reservation_confirmee qu'une fois, même après un rechargement", async ({ page }) => {
  await page.goto("/merci?uid=test-unique");
  await expect.poll(async () => (await events(page, "reservation_confirmee")).length).toBe(1);

  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(await events(page, "reservation_confirmee")).toHaveLength(0);
});

test("sans uid, /merci n'émet rien", async ({ page }) => {
  await page.goto("/merci");
  await page.waitForLoadState("networkidle");
  expect(await events(page, "reservation_confirmee")).toHaveLength(0);
});

test("aucun bandeau cookies ni cookie de mesure", async ({ page, context }) => {
  await page.goto("/");
  await expect(page.getByText(/cookies/i)).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);
});
