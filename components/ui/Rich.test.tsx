// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Rich, TitleText } from "./Rich";

afterEach(cleanup);

describe("Rich", () => {
  it("rend **gras** en <b>", () => {
    const { container } = render(<Rich text="**30 jours de support** après chaque mise en production." />);
    expect(container.querySelector("b")?.textContent).toBe("30 jours de support");
    expect(container.textContent).toBe("30 jours de support après chaque mise en production.");
  });

  it("marque un [NEED] sans changer son texte", () => {
    const { container } = render(<Rich text="Durée [NEED: durée de l'audit]" />);
    const need = container.querySelector("[data-need]");
    expect(need?.textContent).toBe("[NEED: durée de l'audit]");
  });

  it("rend un lien Markdown interne et un lien externe", () => {
    const { container } = render(
      <Rich text="Vos informations servent à préparer et à suivre votre appel. [Politique de confidentialité](/confidentialite)" />,
    );
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/confidentialite");
    expect(link?.textContent).toBe("Politique de confidentialité");

    const external = render(<Rich text="[Voir le profil LinkedIn d'Aymen](https://www.linkedin.com/in/x)" />).container.querySelector("a");
    expect(external?.getAttribute("target")).toBe("_blank");
    expect(external?.getAttribute("rel")).toBe("noopener");
  });

  it("transforme une adresse email en lien mailto", () => {
    const { container } = render(<Rich text="Écrivez à aymen@croissanceconsulting.com avec vos disponibilités." />);
    expect(container.querySelector("a")?.getAttribute("href")).toBe("mailto:aymen@croissanceconsulting.com");
  });

  it("applique la typographie française au texte courant", () => {
    const { container } = render(<Rich text="à partir de 4 000 € HT, sur proposition gratuite ?" />);
    expect(container.textContent).toBe("à partir de 4 000 € HT, sur proposition gratuite ?");
  });

  it("gère un [NEED] dans du gras", () => {
    const { container } = render(<Rich text="**[NEED: secteur], [NEED: taille] salariés.** Avant" />);
    expect(container.querySelectorAll("b [data-need]")).toHaveLength(2);
  });
});

describe("TitleText", () => {
  it("ajoute la ponctuation déclarée", () => {
    const { container } = render(<TitleText title={{ text: "Le prix signé est le prix payé", punct: "." }} />);
    expect(container.textContent).toBe("Le prix signé est le prix payé.");
  });
});
