import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { planAdminSync } from "../lib/admin/plan-admin-sync";

/**
 * Crée ou met à jour le compte admin unique depuis ADMIN_EMAIL (docs/PLAN.md, « Auth »).
 * Lancé par la CI : en local dans le job `test`, en prod dans le job `migration`, après `config push`.
 * C'est aussi la procédure de secours : changer le secret ADMIN_EMAIL, puis relancer le workflow.
 */
function env(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} doit être renseignée.`);
  return value;
}

async function listAllUsers(supabase: SupabaseClient): Promise<User[]> {
  const users: User[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`Liste des comptes impossible : ${error.message}`);
    users.push(...data.users);
    if (data.users.length < 1000) return users;
  }
}

async function main() {
  const supabase = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const plan = planAdminSync(await listAllUsers(supabase), env("ADMIN_EMAIL"));

  if (plan.create) {
    const { error } = await supabase.auth.admin.createUser({ email: plan.create.email, email_confirm: true });
    if (error) throw new Error(`Création du compte admin impossible : ${error.message}`);
    console.log("Compte admin créé.");
  }
  if (plan.update) {
    const { id, email } = plan.update;
    const { error } = await supabase.auth.admin.updateUserById(id, { ...(email ? { email } : {}), email_confirm: true });
    if (error) throw new Error(`Mise à jour du compte admin impossible : ${error.message}`);
    console.log(email ? "Compte admin : adresse mise à jour." : "Compte admin confirmé.");
  }
  for (const id of plan.remove) {
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw new Error(`Suppression d'un compte en trop impossible : ${error.message}`);
  }
  if (plan.remove.length > 0) console.log(`${plan.remove.length} compte(s) en trop supprimé(s).`);
  if (!plan.create && !plan.update && plan.remove.length === 0) console.log("Compte admin déjà à jour.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
