// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Markdown } from "./markdown";

afterEach(cleanup);

const md = (source: string, marker?: "sky") => render(<Markdown source={source} marker={marker} />).container;

describe("moteur Markdown", () => {
  it("rend un # du corps en h2, pour garder un seul h1 par page", () => {
    const c = md("# Titre\n\n## Sous-titre");
    expect(c.querySelector("h1")).toBeNull();
    expect([...c.querySelectorAll("h2")].map((h) => h.textContent)).toEqual(["Titre", "Sous-titre"]);
  });

  it("n'interprète pas le HTML brut", () => {
    const c = md('Avant <script>alert(1)</script> <b class="x">gras</b> après');
    expect(c.querySelector("script")).toBeNull();
    expect(c.querySelector("b.x")).toBeNull();
  });

  it("rend *texte* en graisse 500, sans italique", () => {
    const em = md("Un *mot* appuyé").querySelector("em");
    expect(em?.className).toContain("font-medium");
    expect(em?.className).toContain("not-italic");
  });

  it("rend les tableaux, avec les chiffres alignés à droite", () => {
    const c = md("| Process | Heures |\n|---|---|\n| Relances | 12 |");
    expect(c.querySelector("table")).not.toBeNull();
    expect(c.querySelector("th")?.className).toContain("bg-raised");
    expect(c.querySelectorAll("td")[1].className).toContain("text-right");
  });

  it("garde un [NEED] visible et marqué", () => {
    const need = md("[NEED: texte des mentions légales]").querySelector("[data-need]");
    expect(need?.textContent).toBe("[NEED: texte des mentions légales]");
  });

  it("ouvre les liens externes dans un nouvel onglet", () => {
    const a = md("[Cal.com](https://cal.com)").querySelector("a");
    expect(a?.getAttribute("target")).toBe("_blank");
    expect(md("[accueil](/)").querySelector("a")?.getAttribute("target")).toBeNull();
  });

  it("colore le code avec Shiki et affiche le langage en cote", () => {
    const c = md('```json\n{ "delai": 3 }\n```');
    expect(c.querySelector("code[data-highlighted]")).not.toBeNull();
    expect(c.querySelector("code span[style]")).not.toBeNull();
    expect(c.querySelector(".cote")?.textContent).toBe("json");
    expect(c.querySelector("pre")?.textContent).toBe('{ "delai": 3 }');
  });

  it("affiche en texte brut un langage non pris en charge", () => {
    const c = md("```cobol\nDISPLAY 'BONJOUR'.\n```");
    expect(c.querySelector("code[data-highlighted]")).toBeNull();
    expect(c.querySelector("pre")?.textContent).toBe("DISPLAY 'BONJOUR'.");
  });

  it("pose le marqueur de la catégorie devant les h2 d'un article, pas sur les pages légales", () => {
    expect(md("# Titre\n\n## Sous-titre", "sky").querySelectorAll("h2 .marker")).toHaveLength(2);
    expect(md("## Sous-titre").querySelector(".marker")).toBeNull();
  });

  it("rend une image en figure paresseuse, hors d'un paragraphe, avec sa légende", () => {
    const c = md('![Schéma des relances](https://exemple.fr/a.png "La relance part à échéance")');
    const img = c.querySelector("figure > img");
    expect(img?.getAttribute("alt")).toBe("Schéma des relances");
    expect(img?.getAttribute("loading")).toBe("lazy");
    expect(c.querySelector("p figure")).toBeNull();
    expect(c.querySelector("figcaption")?.textContent).toBe("La relance part à échéance");
  });
});
