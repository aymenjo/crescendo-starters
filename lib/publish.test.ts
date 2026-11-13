import { describe, expect, it } from "vitest";
import { missingForPublish, PUBLISH_FIELDS } from "./publish";

const complete = {
  title: "Relances clients",
  excerpt: "Un chapô.",
  category: "automatisation-ia" as const,
  body: "Un corps.",
  slug: "relances-clients",
  coverPath: "a1/u1.png",
  coverAlt: "Trois documents",
};

describe("missingForPublish", () => {
  it("ne demande rien pour un article complet", () => {
    expect(missingForPublish(complete)).toEqual([]);
  });

  it("liste tout ce qui manque à un brouillon qui n'a qu'un titre", () => {
    const draft = { ...complete, excerpt: "", category: null, body: "", coverPath: null, coverAlt: "" };
    expect(missingForPublish(draft).map((f) => PUBLISH_FIELDS[f])).toEqual([
      "Chapô",
      "Catégorie",
      "Couverture",
      "Texte alternatif de la couverture",
      "Corps de l'article",
    ]);
  });

  it("refuse les champs remplis d'espaces", () => {
    expect(missingForPublish({ ...complete, excerpt: "  ", body: "\n\n", coverAlt: " " })).toEqual([
      "excerpt",
      "coverAlt",
      "body",
    ]);
  });

  it("exige un slug valide", () => {
    expect(missingForPublish({ ...complete, slug: "Pas Valide" })).toEqual(["slug"]);
  });
});
