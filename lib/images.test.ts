import { describe, expect, it } from "vitest";
import { IMAGE_MAX_BYTES, imageMarkdown, imagePath, insertBlock, validateImage } from "./images";

describe("validateImage", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])("accepte %s jusqu'à 5 Mo", (type) => {
    expect(validateImage({ type, size: IMAGE_MAX_BYTES })).toBe(true);
  });

  it("refuse au-delà de 5 Mo", () => {
    expect(validateImage({ type: "image/png", size: IMAGE_MAX_BYTES + 1 })).toBe(false);
  });

  it.each(["image/gif", "image/svg+xml", "application/pdf", ""])("refuse le format « %s »", (type) => {
    expect(validateImage({ type, size: 1000 })).toBe(false);
  });

  it("refuse un fichier vide", () => {
    expect(validateImage({ type: "image/png", size: 0 })).toBe(false);
  });
});

describe("chemin et Markdown d'une image", () => {
  it("range l'image sous le dossier de l'article", () => {
    expect(imagePath("a1", "image/webp", "u1")).toBe("a1/u1.webp");
    expect(imagePath("a1", "image/jpeg", "u2")).toBe("a1/u2.jpg");
  });

  it("échappe les crochets du texte alternatif", () => {
    expect(imageMarkdown(" Schéma [v2] ", "https://x/y.png")).toBe("![Schéma \\[v2\\]](https://x/y.png)");
  });
});

describe("insertBlock", () => {
  it("insère dans un texte vide sans ligne vide", () => {
    expect(insertBlock("", 0, 0, "![a](u)")).toEqual({ text: "![a](u)", cursor: 7 });
  });

  it("isole l'image dans son paragraphe au milieu d'une ligne", () => {
    const { text, cursor } = insertBlock("Avant après", 6, 6, "![a](u)");
    expect(text).toBe("Avant\n\n![a](u)\n\naprès");
    expect(text.slice(0, cursor)).toBe("Avant\n\n![a](u)");
  });

  it("n'ajoute pas de ligne vide en trop entre deux paragraphes", () => {
    expect(insertBlock("Un\n\nDeux", 4, 4, "![a](u)").text).toBe("Un\n\n![a](u)\n\nDeux");
  });

  it("remplace la sélection", () => {
    expect(insertBlock("Un TEXTE fin", 3, 8, "![a](u)").text).toBe("Un\n\n![a](u)\n\nfin");
  });
});
