/** Une session admin dure 7 jours fixes après la connexion, comme son cookie (docs/PLAN.md, « Auth »). */
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

type Claims = { amr?: unknown };

/** Instant de la connexion (secondes UNIX), lu dans le claim `amr` du JWT ; il ne bouge pas au rafraîchissement. */
export function sessionStartedAt(claims: Claims): number | null {
  if (!Array.isArray(claims.amr)) return null;
  const stamps = claims.amr
    .map((entry) => (typeof entry === "object" && entry ? (entry as { timestamp?: unknown }).timestamp : undefined))
    .filter((t): t is number => typeof t === "number" && Number.isFinite(t));
  return stamps.length > 0 ? Math.max(...stamps) : null;
}

/** Vrai si la connexion date de plus de 7 jours. `startedAt` en secondes, `now` en millisecondes. */
export function isSessionTooOld(startedAt: number, now: number): boolean {
  return now / 1000 - startedAt > SESSION_MAX_AGE;
}

/** Le cookie de session suit la même durée ; une suppression (maxAge 0) reste une suppression. */
export function withSessionMaxAge<T extends { maxAge?: number }>(options: T): T {
  return options.maxAge === 0 ? options : { ...options, maxAge: SESSION_MAX_AGE };
}
