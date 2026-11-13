import { describe, expect, it } from "vitest";
import { isSessionTooOld, SESSION_MAX_AGE, sessionStartedAt, withSessionMaxAge } from "./session-age";

describe("durée de la session admin", () => {
  it("lit l'instant de connexion dans le claim amr", () => {
    expect(sessionStartedAt({ amr: [{ method: "otp", timestamp: 1_700_000_000 }] })).toBe(1_700_000_000);
    expect(sessionStartedAt({ amr: ["otp"] })).toBeNull();
    expect(sessionStartedAt({})).toBeNull();
  });

  it("expire 7 jours après la connexion, pas avant", () => {
    const start = 1_700_000_000;
    expect(isSessionTooOld(start, (start + SESSION_MAX_AGE - 60) * 1000)).toBe(false);
    expect(isSessionTooOld(start, (start + SESSION_MAX_AGE + 60) * 1000)).toBe(true);
  });

  it("donne 7 jours au cookie, sauf pour une suppression", () => {
    expect(withSessionMaxAge({ path: "/", maxAge: 34_560_000 })).toEqual({ path: "/", maxAge: SESSION_MAX_AGE });
    expect(withSessionMaxAge({ path: "/", maxAge: 0 })).toEqual({ path: "/", maxAge: 0 });
  });
});
