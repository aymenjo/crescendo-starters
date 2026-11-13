import { test as base, expect } from "@playwright/test";
import { fakeCal } from "./fake-cal";

/**
 * Toutes les pages de test reçoivent le faux embed Cal.com (aucun appel réel à cal.com),
 * et le script de Vercel Web Analytics est neutralisé (il n'existe que sur Vercel).
 */
export const test = base.extend<{ calStub: void }>({
  calStub: [
    async ({ page }, use) => {
      await fakeCal(page);
      await page.route("**/_vercel/insights/**", (route) =>
        route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
      );
      await use();
    },
    { auto: true },
  ],
});

export { expect };
