import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isPreview } from "./preview";
import { isSessionTooOld, sessionStartedAt } from "./session-age";

export const LOGIN_PATH = "/admin/connexion";

/**
 * Vérifie la session côté serveur sur chaque page et action de l'admin (la RLS reste la vraie barrière).
 * - preview : la 404 ;
 * - sans session : la connexion ;
 * - connexion de plus de 7 jours : déconnexion, puis la connexion.
 * Renvoie le client Supabase authentifié.
 */
export async function requireAdmin() {
  if (isPreview()) notFound();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) redirect(LOGIN_PATH);

  let startedAt = sessionStartedAt(claims);
  if (startedAt === null) {
    const { data: user } = await supabase.auth.getUser();
    const lastSignIn = user.user?.last_sign_in_at;
    startedAt = lastSignIn ? Date.parse(lastSignIn) / 1000 : 0;
  }
  if (isSessionTooOld(startedAt, Date.now())) {
    await supabase.auth.signOut({ scope: "local" });
    redirect(LOGIN_PATH);
  }
  return supabase;
}
