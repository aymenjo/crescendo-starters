import { describe, expect, it } from "vitest";
import { isValidSlug, slugify } from "./slug";

describe("slugify", () => {
  it("met en minuscules, retire les accents et relie les mots par des tirets", () => {
    expect(slugify("Par quel process commencer l'automatisation de votre PME ?")).toBe(
      "par-quel-process-commencer-l-automatisation-de-votre-pme",
    );
  });

  it("traite les ligatures et la ponctuation française", () => {
    expect(slugify("Œuvre « cœur » : été 2026 !")).toBe("oeuvre-coeur-ete-2026");
  });

  it("ne garde ni tiret en tête ou en fin, ni tirets doublés", () => {
    expect(slugify("  --Devis -- facture--  ")).toBe("devis-facture");
  });

  it("renvoie une chaîne vide quand le titre n'a aucune lettre ni chiffre", () => {
    expect(slugify("?!…")).toBe("");
  });

  it("produit toujours un slug valide quand il n'est pas vide", () => {
    for (const title of ["Relances clients", "IA & no-code", "Étape n° 3"]) {
      expect(isValidSlug(slugify(title))).toBe(true);
    }
  });
});

describe("isValidSlug", () => {
  it.each(["relances", "devis-2026", "a-b-c"])("accepte %s", (slug) => {
    expect(isValidSlug(slug)).toBe(true);
  });

  it.each(["", "Relances", "devis_facture", "-devis", "devis-", "devis--facture", "été", "a b"])("refuse « %s »", (slug) => {
    expect(isValidSlug(slug)).toBe(false);
  });
});
