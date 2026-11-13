import { createClient } from "@/lib/supabase/browser";
import { type ImageType, imagePath, validateImage } from "@/lib/images";

export type UploadResult = { ok: true; path: string } | { ok: false; error: "format" | "failed" };

/**
 * Téléverse une image du navigateur directement vers le bucket `articles` (les requêtes Vercel
 * sont limitées à 4,5 Mo). Contrôle côté client, puis par le bucket (format et poids).
 * Le nom est unique et ne change jamais : l'image peut être gardée en cache un an.
 */
export async function uploadImage(articleId: string, file: File): Promise<UploadResult> {
  if (!validateImage(file)) return { ok: false, error: "format" };
  const path = imagePath(articleId, file.type as ImageType, crypto.randomUUID());
  try {
    const { error } = await createClient()
      .storage.from("articles")
      .upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
    if (!error) return { ok: true, path };
    const { status, code } = error as { status?: number; code?: string };
    const refused = status === 413 || status === 415 || code === "EntityTooLarge" || code === "InvalidMimeType";
    return { ok: false, error: refused ? "format" : "failed" };
  } catch {
    return { ok: false, error: "failed" };
  }
}
