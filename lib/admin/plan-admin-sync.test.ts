import { describe, expect, it } from "vitest";
import { planAdminSync } from "./plan-admin-sync";

const user = (id: string, email: string, created_at: string, confirmed = true) => ({
  id,
  email,
  created_at,
  email_confirmed_at: confirmed ? created_at : null,
});

describe("planAdminSync", () => {
  it("crée le compte quand il n'y en a aucun", () => {
    expect(planAdminSync([], " Aymen@Exemple.fr ")).toEqual({ create: { email: "aymen@exemple.fr" }, remove: [] });
  });

  it("ne fait rien quand le compte existe déjà, confirmé", () => {
    expect(planAdminSync([user("a", "aymen@exemple.fr", "2026-01-01")], "aymen@exemple.fr")).toEqual({ remove: [] });
  });

  it("confirme le compte existant s'il ne l'est pas", () => {
    expect(planAdminSync([user("a", "aymen@exemple.fr", "2026-01-01", false)], "aymen@exemple.fr")).toEqual({
      update: { id: "a", confirm: true },
      remove: [],
    });
  });

  it("donne la nouvelle adresse au compte existant quand l'email change", () => {
    expect(planAdminSync([user("a", "ancien@exemple.fr", "2026-01-01")], "nouveau@exemple.fr")).toEqual({
      update: { id: "a", email: "nouveau@exemple.fr", confirm: true },
      remove: [],
    });
  });

  it("garde le compte qui a l'adresse et supprime les autres", () => {
    const users = [
      user("vieux", "autre@exemple.fr", "2026-01-01"),
      user("admin", "aymen@exemple.fr", "2026-02-01"),
      user("intrus", "intrus@exemple.fr", "2026-03-01"),
    ];
    expect(planAdminSync(users, "aymen@exemple.fr")).toEqual({ remove: ["vieux", "intrus"] });
  });

  it("garde le plus ancien quand aucun compte n'a l'adresse", () => {
    const users = [user("b", "b@exemple.fr", "2026-02-01"), user("a", "a@exemple.fr", "2026-01-01")];
    expect(planAdminSync(users, "aymen@exemple.fr")).toEqual({
      update: { id: "a", email: "aymen@exemple.fr", confirm: true },
      remove: ["b"],
    });
  });

  it("refuse une adresse vide", () => {
    expect(() => planAdminSync([], "  ")).toThrow(/ADMIN_EMAIL/);
  });
});
