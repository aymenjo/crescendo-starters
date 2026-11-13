/**
 * Codes d'une table absente : PGRST205 pour PostgREST 12 et plus, 42P01 (`undefined_table`)
 * quand l'erreur vient de Postgres.
 */
const MISSING_TABLE_CODES = new Set(["PGRST205", "42P01"]);

/**
 * Vrai si la table lue n'existe pas encore dans cette base. Cas attendu : la preview et le build
 * de prod tournent avant la migration qui la crée (docs/PLAN.md, « CI/CD »).
 */
export function isMissingTable(error: { code?: string } | null | undefined): boolean {
  return error?.code !== undefined && MISSING_TABLE_CODES.has(error.code);
}
