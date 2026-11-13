import { describe, expect, it } from "vitest";
import { isMissingTable } from "./errors";

describe("isMissingTable", () => {
  it("reconnaît une table absente, côté PostgREST comme côté Postgres", () => {
    expect(isMissingTable({ code: "PGRST205" })).toBe(true);
    expect(isMissingTable({ code: "42P01" })).toBe(true);
  });

  it("laisse passer toutes les autres erreurs", () => {
    expect(isMissingTable({ code: "42501" })).toBe(false); // droits insuffisants
    expect(isMissingTable({ code: "PGRST301" })).toBe(false); // JWT refusé
    expect(isMissingTable({ code: "" })).toBe(false);
    expect(isMissingTable({})).toBe(false);
  });

  it("répond non sans erreur", () => {
    expect(isMissingTable(null)).toBe(false);
    expect(isMissingTable(undefined)).toBe(false);
  });
});
