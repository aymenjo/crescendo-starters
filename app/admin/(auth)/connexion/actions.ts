"use server";

import { redirect } from "next/navigation";
import { isPreview } from "@/lib/admin/preview";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { status: "idle" } | { status: "invalid" } | { status: "sent"; at: number };

/**
 * Demande un lien magique. Le message est le même pour toutes les adresses (US-17) :
 * toute erreur est ignorée (adresse inconnue, inscriptions désactivées, 60 s pas écoulées).
 */
export async function requestLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (isPreview()) return { status: "idle" };
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "invalid" };

  const supabase = await createClient();
  await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } }).catch(() => undefined);
  return { status: "sent", at: Date.now() };
}

export type ConfirmState = { invalid: boolean };

/** Ouvre la session à partir du lien magique, puis mène à la liste des articles. */
export async function confirmLink(_prev: ConfirmState, formData: FormData): Promise<ConfirmState> {
  const tokenHash = String(formData.get("token_hash") ?? "");
  if (!tokenHash || isPreview()) return { invalid: true };

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" });
  if (error) return { invalid: true };
  redirect("/admin");
}
