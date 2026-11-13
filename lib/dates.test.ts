import { describe, expect, it } from "vitest";
import { formatLongDate, formatShortDate, formatTime } from "./dates";

describe("dates à l'heure de Paris", () => {
  it("écrit la date longue en français", () => {
    expect(formatLongDate("2026-11-12T10:00:00Z")).toBe("12 novembre 2026");
  });

  it("écrit « 1er » pour le premier du mois", () => {
    expect(formatLongDate("2026-12-01T10:00:00Z")).toBe("1er décembre 2026");
  });

  it("suit le fuseau de Paris, pas celui du serveur", () => {
    // 23:30 UTC le 31 octobre, c'est déjà le 1er novembre à Paris.
    expect(formatLongDate("2026-10-31T23:30:00Z")).toBe("1er novembre 2026");
    expect(formatShortDate("2026-10-31T23:30:00Z")).toBe("01/11/2026");
  });

  it("écrit la date courte au format JJ/MM/AAAA", () => {
    expect(formatShortDate("2026-03-05T12:00:00Z")).toBe("05/03/2026");
  });

  it("écrit l'heure au format HH:MM, heure d'été comprise", () => {
    expect(formatTime("2026-11-12T13:32:00Z")).toBe("14:32");
    expect(formatTime("2026-07-01T07:05:00Z")).toBe("09:05");
  });
});
