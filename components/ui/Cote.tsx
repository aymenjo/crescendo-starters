import type { ReactNode } from "react";

/** La cote : annotation mono en casse normale (DESIGN.md § 8). `leader` ajoute le trait de rappel. */
export function Cote({
  children,
  leader = false,
  className = "",
}: {
  children: ReactNode;
  leader?: boolean;
  className?: string;
}) {
  return <span className={`cote ${leader ? "cote-leader" : ""} ${className}`}>{children}</span>;
}
