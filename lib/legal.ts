import { cacheLife } from "next/cache";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type LegalPage = "mentions-legales" | "confidentialite";

/** Le Markdown d'une page légale (`content/legal/`), lu au build et gardé en cache. */
export async function loadLegal(page: LegalPage): Promise<string> {
  "use cache";
  cacheLife("max");
  return readFile(join(process.cwd(), "content/legal", `${page}.md`), "utf8");
}
