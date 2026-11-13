"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** « Se déconnecter » : ferme la session de ce navigateur, puis la connexion. */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/admin/connexion");
}
