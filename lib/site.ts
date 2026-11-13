/**
 * Configuration centrale du site, lue depuis l'environnement.
 * Vercel ne contient que de la config publique (docs/PLAN.md, « Environnements et secrets »).
 */

/** URL absolue du site, sans barre finale. */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;
  return "http://localhost:3000";
}

/** Vrai seulement si le drapeau d'indexation est activé (au lancement). */
export function isIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}

/** Lien Cal.com de l'appel, au format `utilisateur/evenement`. Vide tant qu'il n'est pas fourni. */
export const calLink = (process.env.NEXT_PUBLIC_CAL_LINK ?? "").trim();

/** Mois du prochain démarrage, au format `AAAA-MM`. Vide si non renseigné. */
export const nextStartMonth = (process.env.NEXT_START_MONTH ?? "").trim();

export const contact = {
  email: "aymen@croissanceconsulting.com",
  linkedin: "https://www.linkedin.com/in/aymen-jouini-77038220",
} as const;
