import { describe, expect, it } from "vitest";
import { typo } from "./typo";

describe("typo", () => {
  it("sépare les milliers par une espace fine insécable et lie l'euro", () => {
    expect(typo("À partir de 4 000 € HT")).toBe("À partir de 4\u202F000\u00A0€\u00A0HT");
    expect(typo("10 000 €")).toBe("10\u202F000\u00A0€");
  });

  it("protège la ponctuation haute", () => {
    expect(typo("Que deviennent nos données ?")).toBe("Que deviennent nos données\u202F?");
    expect(typo("Livrables : cartographie")).toBe("Livrables\u00A0: cartographie");
    expect(typo("50 % à la commande")).toBe("50\u00A0% à la commande");
  });

  it("ne touche pas aux nombres ordinaires", () => {
    expect(typo("de 10 à 250 salariés, 3 nouveaux projets")).toBe("de 10 à 250 salariés, 3 nouveaux projets");
  });
});
