export type AuthUserSummary = {
  id: string;
  email?: string | null;
  email_confirmed_at?: string | null;
  created_at?: string;
};

export type AdminSyncPlan = {
  /** Créer le compte admin, déjà confirmé. */
  create?: { email: string };
  /** Mettre à jour le compte gardé : nouvelle adresse et/ou confirmation. */
  update?: { id: string; email?: string; confirm: true };
  /** Comptes en trop, à supprimer. */
  remove: string[];
};

const normalize = (email: string | null | undefined) => (email ?? "").trim().toLowerCase();

/**
 * Plan de synchronisation du compte admin unique (docs/PLAN.md, « Auth ») :
 * - aucun compte : on le crée ;
 * - un compte a déjà l'adresse : on le garde, confirmé ;
 * - sinon, le plus ancien prend la nouvelle adresse (procédure de secours quand l'email change) ;
 * - tous les autres comptes sont supprimés.
 */
export function planAdminSync(users: AuthUserSummary[], adminEmail: string): AdminSyncPlan {
  const email = normalize(adminEmail);
  if (!email || !email.includes("@")) throw new Error("ADMIN_EMAIL est vide ou invalide.");

  if (users.length === 0) return { create: { email }, remove: [] };

  const byAge = [...users].sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));
  const kept = byAge.find((u) => normalize(u.email) === email) ?? byAge[0];
  const remove = byAge.filter((u) => u.id !== kept.id).map((u) => u.id);

  const emailChanged = normalize(kept.email) !== email;
  if (emailChanged || !kept.email_confirmed_at) {
    return { update: { id: kept.id, ...(emailChanged ? { email } : {}), confirm: true }, remove };
  }
  return { remove };
}
