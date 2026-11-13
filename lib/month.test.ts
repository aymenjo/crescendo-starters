import { describe, expect, it } from "vitest";
import { formatMonth, isUpcomingMonth } from "./month";

const at = (iso: string) => new Date(iso);

describe("isUpcomingMonth", () => {
  it("affiche la phrase pour un mois à venir", () => {
    expect(isUpcomingMonth("2026-12", at("2026-11-12T10:00:00Z"))).toBe(true);
    expect(isUpcomingMonth("2027-01", at("2026-11-12T10:00:00Z"))).toBe(true);
  });

  it("affiche la phrase pendant le mois en cours", () => {
    expect(isUpcomingMonth("2026-11", at("2026-11-30T12:00:00Z"))).toBe(true);
  });

  it("retire la phrase une fois le mois passé", () => {
    expect(isUpcomingMonth("2026-10", at("2026-11-01T10:00:00Z"))).toBe(false);
  });

  it("suit l'heure de Paris au changement de mois", () => {
    // 30 novembre, 23 h 30 UTC = 1er décembre, 0 h 30 à Paris.
    expect(isUpcomingMonth("2026-11", at("2026-11-30T23:30:00Z"))).toBe(false);
  });

  it("ne rend rien si le mois est vide ou mal formé", () => {
    expect(isUpcomingMonth("", at("2026-11-12T10:00:00Z"))).toBe(false);
    expect(isUpcomingMonth("décembre", at("2026-11-12T10:00:00Z"))).toBe(false);
    expect(isUpcomingMonth("2026-13", at("2026-11-12T10:00:00Z"))).toBe(false);
  });
});

describe("formatMonth", () => {
  it("écrit le mois en toutes lettres", () => {
    expect(formatMonth("2026-12")).toBe("décembre 2026");
  });
});
