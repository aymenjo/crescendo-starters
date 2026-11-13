const WORDS_PER_MINUTE = 200;

/**
 * Temps de lecture en minutes : 200 mots par minute, arrondi à la minute supérieure, 1 au minimum
 * (DESIGN.md § 12.1). Les adresses des liens et des images ne comptent pas comme des mots.
 */
export function readingTime(markdown: string): number {
  const text = markdown.replace(/\]\([^)]*\)/g, "]");
  const words = text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
