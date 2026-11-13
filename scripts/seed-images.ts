import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { localSupabase } from "./local-supabase";

/**
 * Téléverse les images d'exemple du seed (`supabase/seed-images/<article_id>/…`) dans le bucket
 * `articles` du Supabase local. À lancer après `npx supabase db reset`, en local et en CI.
 */
const ROOT = join(process.cwd(), "supabase/seed-images");
const TYPES: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)])),
  );
  return nested.flat().filter((file) => extname(file).toLowerCase() in TYPES);
}

async function main() {
  const { url, secretKey } = localSupabase();
  const supabase = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });

  for (const file of await files(ROOT)) {
    const path = relative(ROOT, file).split("\\").join("/");
    const { error } = await supabase.storage.from("articles").upload(path, await readFile(file), {
      contentType: TYPES[extname(file).toLowerCase()],
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw new Error(`${path} : ${error.message}`);
    console.log(`articles/${path}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
