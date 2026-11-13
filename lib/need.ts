/**
 * Un `[NEED: …]` signale une information à fournir avant la mise en ligne (07-copy-final.md).
 * Il reste un manque explicite : jamais remplacé par une invention.
 */
export const NEED_PATTERN = /\[NEED\b[^\]]*\]/g;

/** Tous les `[NEED…]` d'un texte, dans l'ordre. */
export function findNeeds(text: string): string[] {
  return text.match(NEED_PATTERN) ?? [];
}
