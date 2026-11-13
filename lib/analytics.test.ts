import { describe, expect, it } from "vitest";
import { isFirstConfirmation } from "./analytics";

function memoryStorage() {
  const data = new Map<string, string>();
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v) };
}

describe("isFirstConfirmation", () => {
  it("compte une réservation une seule fois, même après un rechargement", () => {
    const storage = memoryStorage();
    expect(isFirstConfirmation("uid-1", storage)).toBe(true);
    expect(isFirstConfirmation("uid-1", storage)).toBe(false);
    expect(isFirstConfirmation("uid-2", storage)).toBe(true);
  });

  it("compte quand le stockage est indisponible ou illisible", () => {
    expect(isFirstConfirmation("uid-1", null)).toBe(true);
    const broken = { getItem: () => "{pas du json", setItem: () => undefined };
    expect(isFirstConfirmation("uid-1", broken)).toBe(true);
  });
});
