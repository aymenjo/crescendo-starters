import type { Metadata } from "next";

/** L'admin n'est jamais indexé, ni lié depuis le site public, ni mesuré (DESIGN.md § 12.7). */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Les pages de l'admin lisent la session à chaque requête : pas de shell statique à valider. */
export const instant = false;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-paper">{children}</div>;
}
