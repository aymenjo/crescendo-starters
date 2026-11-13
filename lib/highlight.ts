import type { HighlighterCore, ThemeRegistration, ThemedToken } from "shiki/core";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import python from "shiki/langs/python.mjs";
import sql from "shiki/langs/sql.mjs";
import typescript from "shiki/langs/typescript.mjs";
import yaml from "shiki/langs/yaml.mjs";

/**
 * Coloration du code (DESIGN.md § 12.5) : Shiki allégé, synchrone et sans `fs`, pour tourner
 * aussi bien au rendu serveur de l'article que dans l'aperçu de l'éditeur, dans le navigateur.
 * Les langages hors de cette liste s'affichent en texte brut.
 */
const INK = "#111111";
const ON_INK = "#FAF7F2";
const ON_INK_2 = "#B5B0A7";
const SKY = "#B3C7D9";
const MUSTARD = "#F2BB6B";
const SAGE = "#AFC6A2";
const BLUSH = "#EDB1B3";

/** Thème sombre aux couleurs de la palette, sans corail (réservé à la réservation) ni italique. */
const theme: ThemeRegistration = {
  name: "crescendo",
  type: "dark",
  fg: ON_INK,
  bg: INK,
  settings: [
    { settings: { foreground: ON_INK, background: INK } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: ON_INK_2 } },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new", "entity.name.tag"],
      settings: { foreground: SKY },
    },
    {
      scope: ["string", "string.quoted", "string.template", "punctuation.definition.string", "markup.inline.raw"],
      settings: { foreground: SAGE },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "support.constant",
        "variable.other.constant",
        "entity.other.attribute-name",
      ],
      settings: { foreground: MUSTARD },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call", "entity.name.type", "support.type", "entity.name.class"],
      settings: { foreground: BLUSH },
    },
    {
      scope: ["support.type.property-name", "meta.object-literal.key", "variable.parameter", "meta.property-name"],
      settings: { foreground: SKY },
    },
  ],
};

let highlighter: HighlighterCore | null = null;

function getHighlighter() {
  highlighter ??= createHighlighterCoreSync({
    themes: [theme],
    langs: [bash, json, javascript, typescript, python, sql, yaml, html, css],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
  return highlighter;
}

export type CodeLine = { content: string; color?: string }[];

/** Les lignes colorées du code, ou `null` si le langage n'est pas pris en charge. */
export function highlight(code: string, lang: string | undefined): CodeLine[] | null {
  if (!lang) return null;
  const shiki = getHighlighter();
  const id = lang.toLowerCase();
  if (!shiki.getLoadedLanguages().includes(id)) return null;
  const { tokens } = shiki.codeToTokens(code, { lang: id, theme: "crescendo" });
  return tokens.map((line: ThemedToken[]) =>
    line.map(({ content, color }) => ({ content, color: color && color.toUpperCase() !== ON_INK ? color : undefined })),
  );
}
