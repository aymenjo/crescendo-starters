/** Marqueur bloc : le bloc du logo, porteur d'une couleur qui a un sens (DESIGN.md § 8). */
const colors = {
  sky: "[--marker:var(--color-sky)]",
  mustard: "[--marker:var(--color-mustard)]",
  sage: "[--marker:var(--color-sage)]",
  blush: "[--marker:var(--color-blush)]",
} as const;

export type MarkerColor = keyof typeof colors;

export function Marker({
  color,
  small = false,
  className = "",
}: {
  color: MarkerColor;
  small?: boolean;
  className?: string;
}) {
  return <span aria-hidden className={`marker ${small ? "marker-sm" : ""} ${colors[color]} ${className}`} />;
}
