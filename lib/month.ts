const MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** Mois courant au format AAAA-MM, à l'heure de Paris. */
export function currentMonth(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit" })
    .formatToParts(now);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  return `${year}-${month}`;
}

/**
 * Vrai si le mois (AAAA-MM) est renseigné, valide, et n'est pas encore passé.
 * Le mois en cours compte comme à venir : la phrase disparaît le 1er du mois suivant.
 */
export function isUpcomingMonth(month: string, now: Date): boolean {
  if (!MONTH.test(month)) return false;
  return month >= currentMonth(now);
}

/** « décembre 2026 » */
export function formatMonth(month: string): string {
  const match = MONTH.exec(month);
  if (!match) return month;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 15));
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}
