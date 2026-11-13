import { defineConfig, devices } from "@playwright/test";

// Port du serveur de test : 3000 par défaut, `E2E_PORT` si un autre serveur l'occupe déjà en local.
const PORT = Number(process.env.E2E_PORT ?? 3000);

/**
 * Les tests tournent sur le build de production (`next start`) : lancer avant
 * `NEXT_PUBLIC_CAL_LINK=crescendo-test/appel-process-calvaires npm run build` (agenda simulé dans les tests).
 * Deux projets : desktop (Chromium, 1280 px) et mobile (Pixel 7).
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    // L'admin est conçu pour un écran d'ordinateur (DESIGN.md § 12.7) : ses tests ne tournent que sur desktop.
    { name: "mobile", use: { ...devices["Pixel 7"] }, testIgnore: /admin-.*\.spec\.ts/ },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
