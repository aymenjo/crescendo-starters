import { describe, expect, it } from "vitest";
import { readingTime } from "./reading-time";

const words = (n: number) => Array.from({ length: n }, () => "mot").join(" ");

describe("readingTime", () => {
  it("compte 1 minute au minimum, même pour un corps vide", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime(words(10))).toBe(1);
  });

  it("arrondit à la minute supérieure, à 200 mots par minute", () => {
    expect(readingTime(words(200))).toBe(1);
    expect(readingTime(words(201))).toBe(2);
    expect(readingTime(words(1200))).toBe(6);
  });

  it("ne compte ni la syntaxe Markdown ni les adresses", () => {
    const md = "# Titre\n\n- un\n- deux\n\n---\n\n![image](https://exemple.fr/a/b.png) [lien](https://exemple.fr)";
    // Titre, un, deux, image, lien
    expect(readingTime(md.repeat(40))).toBe(1);
    expect(readingTime(md.repeat(41))).toBe(2);
  });
});
