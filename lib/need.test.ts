import { describe, expect, it } from "vitest";
import { join } from "node:path";
import { findNeeds } from "./need";
import { checkNeeds, collectNeeds } from "./need-guard";

const fixtures = join(__dirname, "__fixtures__");

describe("findNeeds", () => {
  it("trouve chaque [NEED] dans l'ordre", () => {
    const text = "Pour un Sprint, comptez [NEED: délai type] semaines. Durée [NEED: durée de l'audit].";
    expect(findNeeds(text)).toEqual(["[NEED: délai type]", "[NEED: durée de l'audit]"]);
  });

  it("ne trouve rien dans un texte complet", () => {
    expect(findNeeds("Le prix signé est le prix payé")).toEqual([]);
  });

  it("ignore les crochets qui ne sont pas des [NEED]", () => {
    expect(findNeeds("[Visuel : photo] et [NEEDLESS]")).toEqual([]);
  });
});

describe("garde [NEED]", () => {
  it("liste les [NEED] du module de contenu et du Markdown légal", async () => {
    const hits = await collectNeeds(join(fixtures, "needs"));
    expect(hits).toEqual([
      { file: "landing.ts", need: "[NEED: délai en semaines]" },
      { file: join("legal", "mentions.md"), need: "[NEED: texte des mentions légales]" },
    ]);
  });

  it("échoue si le site est indexable et qu'il reste un [NEED]", async () => {
    const result = await checkNeeds({ dir: join(fixtures, "needs"), indexable: true });
    expect(result.ok).toBe(false);
    expect(result.needs).toHaveLength(2);
  });

  it("passe tant que le site n'est pas indexable", async () => {
    const result = await checkNeeds({ dir: join(fixtures, "needs"), indexable: false });
    expect(result.ok).toBe(true);
  });

  it("passe si le site est indexable et qu'il ne reste aucun [NEED]", async () => {
    expect((await checkNeeds({ dir: join(fixtures, "clean"), indexable: true })).ok).toBe(true);
  });

  it("passe si le dossier de contenu n'existe pas encore", async () => {
    expect((await checkNeeds({ dir: join(fixtures, "absent"), indexable: true })).ok).toBe(true);
  });
});

describe("garde [NEED], fichiers de test", () => {
  it("ignore les [NEED] cités par les tests", async () => {
    const hits = await collectNeeds(join(fixtures, "needs"));
    expect(hits.map((h) => h.file)).not.toContain("landing.test.ts");
  });
});
