import type { AnchorHTMLAttributes } from "react";

/**
 * Lien interne de l'admin : un simple `<a>` et non `next/link`. La navigation recharge la page,
 * si bien que l'avertissement natif de l'éditeur (`beforeunload`) s'affiche aussi dans l'admin.
 */
export function AdminLink(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}
