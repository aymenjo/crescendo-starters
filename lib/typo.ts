const NNBSP = " "; // espace fine insécable
const NBSP = " "; // espace insécable

/**
 * Typographie française au rendu, sans toucher au texte de la copy (qui reste en espaces simples) :
 * - séparateur de milliers en espace fine insécable (« 4 000 € », DESIGN.md § 4) ;
 * - espace insécable avant « € », « % », « : » et entre « € » et « HT » ;
 * - espace fine insécable avant « ? », « ! » et « ; ».
 */
export function typo(text: string): string {
  return text
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NNBSP}`)
    .replace(/ (€|%)/g, `${NBSP}$1`)
    .replace(/€ HT\b/g, `€${NBSP}HT`)
    .replace(/ ([?!;])/g, `${NNBSP}$1`)
    .replace(/ :/g, `${NBSP}:`);
}
