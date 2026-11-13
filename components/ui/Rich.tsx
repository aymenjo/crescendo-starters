import Link from "next/link";
import type { ReactNode } from "react";
import { typo } from "@/lib/typo";

/**
 * Rendu d'une chaîne de la copy :
 * - `**gras**` en graisse 600 ;
 * - `[NEED: …]` visible et marqué (prod de test), via <Need> ;
 * - `[libellé](url)` en lien `ghost` ;
 * - les adresses email en lien mailto.
 * Le reste du texte reçoit la typographie française (lib/typo.ts).
 */
const TOKEN =
  /\*\*(.+?)\*\*|(\[NEED\b[^\]]*\])|\[([^\]]+)\]\(([^)\s]+)\)|([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)/g;

export const linkClass =
  "underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-ink";

export function Need({ children }: { children: ReactNode }) {
  return (
    <span data-need className="text-ink underline decoration-rule-strong decoration-dashed decoration-1 underline-offset-4">
      {children}
    </span>
  );
}

export function renderRich(text: string, keyPrefix = "r"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(typo(text.slice(last, index)));
    const key = `${keyPrefix}-${i++}`;
    const [, bold, need, label, href, email] = match;
    if (bold !== undefined) {
      out.push(<b key={key}>{renderRich(bold, key)}</b>);
    } else if (need !== undefined) {
      out.push(<Need key={key}>{need}</Need>);
    } else if (label !== undefined && href !== undefined) {
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href} className={linkClass}>
            {typo(label)}
          </Link>
        ) : (
          <a key={key} href={href} className={linkClass} target="_blank" rel="noopener">
            {typo(label)}
          </a>
        ),
      );
    } else if (email !== undefined) {
      out.push(
        <a key={key} href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(typo(text.slice(last)));
  return out;
}

export function Rich({ text }: { text: string }) {
  return <>{renderRich(text)}</>;
}

/** Titre de la copy, avec la ponctuation ajoutée à l'intégration (DESIGN.md § 4). */
export function TitleText({ title }: { title: { text: string; punct: string } }) {
  return (
    <>
      {typo(title.text)}
      {title.punct}
    </>
  );
}
