/** Formats et poids acceptés pour les images des articles, comme le bucket `articles` (DESIGN.md § 12.1). */
export const IMAGE_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const IMAGE_ACCEPT = Object.keys(IMAGE_TYPES).join(",");

export type ImageType = keyof typeof IMAGE_TYPES;

/** Vrai si le fichier est un JPEG, un PNG ou un WebP de 5 Mo au plus. */
export function validateImage(file: { type: string; size: number }): boolean {
  return file.type in IMAGE_TYPES && file.size > 0 && file.size <= IMAGE_MAX_BYTES;
}

/** Chemin d'une image dans le bucket : `<article_id>/<uuid>.<ext>`, pour la supprimer avec l'article. */
export function imagePath(articleId: string, type: ImageType, id: string): string {
  return `${articleId}/${id}.${IMAGE_TYPES[type]}`;
}

/** `![alt](url)` : les crochets et barres obliques inverses du texte alternatif sont échappés. */
export function imageMarkdown(alt: string, url: string): string {
  return `![${alt.trim().replace(/[[\]\\]/g, "\\$&")}](${url})`;
}

/**
 * Insère un bloc (une image) à la place de la sélection, dans son propre paragraphe :
 * une ligne vide avant et après, sauf en début ou en fin de texte. Renvoie le texte et le curseur.
 */
export function insertBlock(text: string, start: number, end: number, block: string) {
  const before = text.slice(0, start).replace(/[ \t]+$/, "");
  const after = text.slice(end).replace(/^[ \t]+/, "");
  const lead = before === "" ? "" : before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  const trail = after === "" ? "" : after.startsWith("\n\n") ? "" : after.startsWith("\n") ? "\n" : "\n\n";
  const inserted = `${lead}${block}${trail}`;
  return { text: `${before}${inserted}${after}`, cursor: before.length + lead.length + block.length };
}
