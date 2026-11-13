/**
 * Lien de réservation depuis le blog (DESIGN.md § 12.0 bis) :
 * `/?utm_source=blog&utm_medium=<nav|article-cta>&utm_campaign=<slug>#rdv`.
 * Les paramètres passent avant `#rdv` : après, ils feraient partie du fragment et ne seraient pas mesurés.
 * Sans slug (liste du blog, état vide), pas de `utm_campaign`.
 */
export function blogCtaHref(medium: "nav" | "article-cta", slug?: string): string {
  const params = new URLSearchParams({ utm_source: "blog", utm_medium: medium });
  if (slug) params.set("utm_campaign", slug);
  return `/?${params.toString()}#rdv`;
}
