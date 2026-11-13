import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { findNeeds } from "./need";

export type NeedHit = { file: string; need: string };

async function listFiles(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? listFiles(path) : Promise.resolve([path]);
    }),
  );
  return files.flat().sort();
}

/** Les `[NEED]` restants dans un dossier de contenu (module de la landing, Markdown légal). */
export async function collectNeeds(dir: string): Promise<NeedHit[]> {
  const hits: NeedHit[] = [];
  for (const file of await listFiles(dir)) {
    if (/\.test\.[cm]?[jt]sx?$/.test(file)) continue; // les tests citent des [NEED] sans les afficher
    const text = await readFile(file, "utf8");
    for (const need of findNeeds(text)) hits.push({ file: relative(dir, file), need });
  }
  return hits;
}

/**
 * La garde de build : un site indexable ne part jamais avec un `[NEED]`.
 * Hors indexation, les `[NEED]` restent visibles et marqués sur la prod de test.
 */
export async function checkNeeds({ dir, indexable }: { dir: string; indexable: boolean }) {
  const needs = await collectNeeds(dir);
  return { ok: !indexable || needs.length === 0, needs };
}
