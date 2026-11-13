import { expect, test } from "./fixtures";
import { createTestUser, deleteTestUser, magicLinkPath, mailsTo, publicClient } from "./supabase";

const SENT = "Si cette adresse est autorisée, un lien de connexion vient de vous être envoyé.";

test("sans session, l'admin renvoie vers la connexion", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL("/admin/connexion");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});

test("lien magique : demande, email, « Se connecter », puis lien déjà utilisé", async ({ page }) => {
  const user = await createTestUser("admin");
  try {
    await page.goto("/admin/connexion");
    await page.getByLabel("Email").fill(user.email);
    await page.getByRole("button", { name: "Recevoir un lien de connexion" }).click();
    await expect(page.getByText(SENT)).toBeVisible();
    await expect(page.getByRole("button", { name: "Recevoir un lien de connexion" })).toBeDisabled();
    await expect(page.getByText(/^Nouveau lien possible dans \d+\s?s$/)).toBeVisible();

    await expect.poll(async () => (await mailsTo(user.email)).length, { timeout: 15_000 }).toBe(1);
    const [mail] = await mailsTo(user.email);
    expect(mail.Subject).toBe("Votre lien de connexion à l'admin Crescendo");
    const link = await magicLinkPath(mail.ID);

    await page.goto(link);
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page).toHaveURL("/admin");
    await expect(page.getByRole("button", { name: "Se déconnecter" })).toBeVisible();
    const session = (await page.context().cookies()).find((c) => c.name.endsWith("-auth-token"));
    expect((session!.expires - Date.now() / 1000) / 86400).toBeCloseTo(7, 0);

    await page.goto(link);
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByText("Ce lien n'est plus valable.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Recevoir un nouveau lien" })).toHaveAttribute("href", "/admin/connexion");

    await page.goto("/admin");
    await page.getByRole("button", { name: "Se déconnecter" }).click();
    await expect(page).toHaveURL("/admin/connexion");
    await page.goto("/admin");
    await expect(page).toHaveURL("/admin/connexion");
  } finally {
    await deleteTestUser(user.id);
  }
});

test("une adresse non autorisée voit le même message et ne reçoit rien", async ({ page }) => {
  const email = `inconnu-${Date.now()}@crescendo.test`;
  await page.goto("/admin/connexion");
  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Recevoir un lien de connexion" }).click();
  await expect(page.getByText(SENT)).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await mailsTo(email)).toHaveLength(0);
});

test("un appel direct à l'API Auth ne crée aucun compte", async () => {
  const supabase = publicClient();
  const email = `inscription-${Date.now()}@crescendo.test`;
  const signUp = await supabase.auth.signUp({ email, password: "un-mot-de-passe-assez-long" });
  expect(signUp.error?.message).toMatch(/signups not allowed/i);
  const otp = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  expect(otp.error?.message).toMatch(/signups not allowed/i);
});

test("un lien absent ou altéré affiche le message d'invalidité", async ({ page }) => {
  await page.goto("/admin/connexion/confirmer");
  await expect(page.getByText("Ce lien n'est plus valable.")).toBeVisible();
  await page.goto("/admin/connexion/confirmer?token_hash=pkce_faux&type=email");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByText("Ce lien n'est plus valable.")).toBeVisible();
});
