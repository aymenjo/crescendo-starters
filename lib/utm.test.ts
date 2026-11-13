import { describe, expect, it } from "vitest";
import { blogCtaHref } from "./utm";

describe("blogCtaHref", () => {
  it("place les UTM avant l'ancre #rdv, avec le slug en campagne", () => {
    expect(blogCtaHref("article-cta", "relances-clients")).toBe(
      "/?utm_source=blog&utm_medium=article-cta&utm_campaign=relances-clients#rdv",
    );
  });

  it("n'ajoute pas de campagne sur la liste", () => {
    expect(blogCtaHref("nav")).toBe("/?utm_source=blog&utm_medium=nav#rdv");
  });

  it("garde des paramètres lisibles par l'outil de mesure", () => {
    const url = new URL(blogCtaHref("nav", "devis"), "https://crescendo.fr");
    expect(url.searchParams.get("utm_campaign")).toBe("devis");
    expect(url.hash).toBe("#rdv");
  });
});
