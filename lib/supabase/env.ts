/**
 * URL et clé publishable de Supabase : de la config publique, sur Vercel comme en local
 * (docs/PLAN.md, « Environnements et secrets »). Accès littéral : Next les inline dans le bundle client.
 */
export function supabaseEnv(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY doivent être renseignées.");
  }
  return { url: url.replace(/\/+$/, ""), key };
}
