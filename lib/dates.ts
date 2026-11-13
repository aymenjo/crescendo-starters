const TIME_ZONE = "Europe/Paris";

function parts(date: Date | string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, ...options }).formatToParts(new Date(date));
}

const part = (list: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) =>
  list.find((p) => p.type === type)?.value ?? "";

/** « 12 novembre 2026 », « 1er décembre 2026 » : la date longue de la ligne méta (DESIGN.md § 12.4). */
export function formatLongDate(date: Date | string): string {
  const p = parts(date, { day: "numeric", month: "long", year: "numeric" });
  const day = part(p, "day");
  return `${day === "1" ? "1er" : day} ${part(p, "month")} ${part(p, "year")}`;
}

/** « 05/11/2026 » : les dates du tableau de l'admin (DESIGN.md § 12.7). */
export function formatShortDate(date: Date | string): string {
  const p = parts(date, { day: "2-digit", month: "2-digit", year: "numeric" });
  return `${part(p, "day")}/${part(p, "month")}/${part(p, "year")}`;
}

/** « 14:32 » : l'heure du dernier enregistrement dans l'éditeur. */
export function formatTime(date: Date | string): string {
  const p = parts(date, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${part(p, "hour")}:${part(p, "minute")}`;
}

/** Date ISO pour l'attribut `dateTime` d'un `<time>`. */
export function isoDate(date: Date | string): string {
  return new Date(date).toISOString();
}
