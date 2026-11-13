import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { landing } from "./landing";

const copy = readFileSync(join(__dirname, "../.agents/landing/07-copy-final.md"), "utf8");

/** Clés qui ne portent pas de texte affiché : ponctuation ajoutée (DESIGN.md § 4) et identifiants d'icône. */
const NOT_TEXT = new Set(["punct", "icon"]);

function strings(value: unknown, path: string, out: [string, string][] = []): [string, string][] {
  if (typeof value === "string") {
    if (value !== "") out.push([path, value]);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => strings(item, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (!NOT_TEXT.has(key)) strings(item, path ? `${path}.${key}` : key, out);
    }
  }
  return out;
}

describe("contenu de la landing", () => {
  const all = strings(landing, "");

  it("transcrit au moins toutes les sections", () => {
    expect(all.length).toBeGreaterThan(60);
  });

  it.each(all)("%s se trouve mot pour mot dans 07-copy-final.md", (_path, text) => {
    expect(copy).toContain(text);
  });
});
