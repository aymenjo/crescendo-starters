#!/usr/bin/env node
/**
 * Génère une fois le lockup du logo (symbole + « crescendo » vectorisé).
 *
 * Le site ne charge jamais Inter Tight 800 (DESIGN.md § 2) : le nom est converti en tracés,
 * puis le résultat est commité dans `public/logo-lockup.svg` et `components/ui/wordmark.ts`.
 *
 * Usage :
 *   node scripts/generate-wordmark.mjs <chemin vers InterTight-ExtraBold.ttf>
 *
 * Le TTF statique en 800 s'obtient par l'API Google Fonts avec un user-agent qui reçoit du TrueType :
 *   curl -A "Wget/1.21" "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800"
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontPath = process.argv[2];
if (!fontPath) {
  console.error("Usage : node scripts/generate-wordmark.mjs <InterTight-ExtraBold.ttf>");
  process.exit(1);
}

// Géométrie (DESIGN.md § 2 et § 10.7) : symbole 110 × 80, nom à 22 px pour un symbole de 32 px,
// espacement = 0,3 × la hauteur du symbole, letter-spacing -0.045em.
const SYMBOL_W = 110;
const SYMBOL_H = 80;
const FONT_SIZE = (22 / 32) * SYMBOL_H; // 55
const GAP = 0.3 * SYMBOL_H; // 24
const LETTER_SPACING = -0.045;
const TEXT = "crescendo";

const buffer = await readFile(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

// Ligne de base : la ligne de texte (line-height 1) est centrée verticalement sur le symbole,
// comme le lockup HTML du preview (align-items: center).
const scale = FONT_SIZE / font.unitsPerEm;
const ascent = font.tables.hhea.ascender * scale;
const descent = -font.tables.hhea.descender * scale;
const halfLeading = (FONT_SIZE - (ascent + descent)) / 2;
const baseline = SYMBOL_H / 2 - FONT_SIZE / 2 + halfLeading + ascent;

// Placement manuel des glyphes (cmap + kerning GPOS + letter-spacing) : le moteur de substitution
// d'opentype.js ne gère pas toutes les tables ccmp d'Inter Tight, et « crescendo » n'a pas de ligature.
const glyphs = [...TEXT].map((char) => font.charToGlyph(char));
const kerning = font.position.getKerningTables("latn");
const path = new opentype.Path();
let x = SYMBOL_W + GAP;
glyphs.forEach((glyph, i) => {
  path.extend(glyph.getPath(x, baseline, FONT_SIZE));
  x += glyph.advanceWidth * scale;
  const next = glyphs[i + 1];
  if (next) {
    const kern = kerning
      ? font.position.getKerningValue(kerning, glyph.index, next.index)
      : font.getKerningValue(glyph, next);
    x += kern * scale + LETTER_SPACING * FONT_SIZE;
  }
});
const box = path.getBoundingBox();
const d = path.toPathData(2);
const width = Math.ceil(box.x2 * 100) / 100;

const symbol = (stroke) => `<path d="M28 63H55V53" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M68 40H95V30" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="2" y="50" width="26" height="26" rx="7" fill="#B3C7D9" stroke="${stroke}" stroke-width="4"/>
  <rect x="42" y="27" width="26" height="26" rx="7" fill="#F2BB6B" stroke="${stroke}" stroke-width="4"/>
  <rect x="82" y="4" width="26" height="26" rx="7" fill="#EE6F5A" stroke="${stroke}" stroke-width="4"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${SYMBOL_H}" fill="none" color="#111111" role="img" aria-label="crescendo">
  ${symbol("currentColor")}
  <path d="${d}" fill="currentColor"/>
</svg>
`;

const ts = `// Fichier généré par scripts/generate-wordmark.mjs : ne pas modifier à la main.
// « crescendo » en Inter Tight 800, letter-spacing -0.045em, vectorisé (DESIGN.md § 2).

/** Largeur du lockup (symbole + nom), pour une hauteur de ${SYMBOL_H}. */
export const LOCKUP_WIDTH = ${width};
export const LOCKUP_HEIGHT = ${SYMBOL_H};

/** Tracé du nom, dans le repère du lockup. */
export const WORDMARK_PATH =
  "${d}";
`;

await writeFile(join(root, "public/logo-lockup.svg"), svg);
await writeFile(join(root, "components/ui/wordmark.ts"), ts);
console.log(`Lockup généré : ${width} × ${SYMBOL_H} (baseline ${baseline.toFixed(2)})`);
