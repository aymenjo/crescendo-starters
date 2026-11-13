import type { Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { localSupabase } from "../scripts/local-supabase";

/** Accès au Supabase local depuis les tests (clé secrète locale, jamais Supabase Cloud). */
export function adminClient() {
  const { url, secretKey } = localSupabase();
  return createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function publicClient() {
  const { url, publishableKey } = localSupabase();
  return createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const MAILPIT = "http://127.0.0.1:54324";

/**
 * Un compte de test propre à un test. Supabase impose 60 s entre deux liens pour une même adresse
 * (y compris via generateLink) : une adresse par test évite toute interférence entre tests parallèles.
 */
export async function createTestUser(prefix: string) {
  const email = `${prefix}-${randomUUID().slice(0, 8)}@crescendo.test`;
  const { data, error } = await adminClient().auth.admin.createUser({ email, email_confirm: true });
  if (error) throw error;
  return { id: data.user.id, email };
}

export async function deleteTestUser(id: string) {
  await adminClient().auth.admin.deleteUser(id);
}

/** Ouvre une session dans le navigateur par la page « Se connecter », avec un lien généré sans email. */
export async function signIn(page: Page, email: string) {
  const { data, error } = await adminClient().auth.admin.generateLink({ type: "magiclink", email });
  if (error) throw error;
  await page.goto(`/admin/connexion/confirmer?token_hash=${data.properties.hashed_token}&type=email`);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.waitForURL("/admin");
}

type MailpitMessage = { ID: string; Subject: string; To: { Address: string }[] };

/** Les emails reçus par une adresse dans Mailpit. */
export async function mailsTo(email: string): Promise<MailpitMessage[]> {
  const response = await fetch(`${MAILPIT}/api/v1/search?query=${encodeURIComponent(`to:"${email}"`)}`);
  const { messages } = (await response.json()) as { messages: MailpitMessage[] };
  return messages;
}

/** Le chemin du lien de connexion d'un email (sans l'origine du site_url local). */
export async function magicLinkPath(id: string): Promise<string> {
  const { HTML } = (await (await fetch(`${MAILPIT}/api/v1/message/${id}`)).json()) as { HTML: string };
  const href = HTML.match(/href="([^"]*\/admin\/connexion\/confirmer[^"]*)"/)?.[1];
  if (!href) throw new Error("Lien de connexion introuvable dans l'email.");
  const url = new URL(href.replace(/&amp;/g, "&"));
  return `${url.pathname}${url.search}`;
}
