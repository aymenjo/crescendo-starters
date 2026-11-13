/**
 * Connecteur à l'équerre de la planche (DESIGN.md § 10.6) : il descend, tourne à droite sur la longueur
 * du décalage entre deux documents, puis descend jusqu'au suivant, où il finit par une pointe ouverte.
 * Trait 1.5 px encre ; il se dessine à l'entrée (`flow-draw`), sauf avec prefers-reduced-motion.
 */
export function FlowConnector({ offset, className = "" }: { offset: number; className?: string }) {
  const end = offset + 1;
  return (
    <svg
      aria-hidden
      width={offset + 6}
      height={40}
      viewBox={`0 0 ${offset + 6} 40`}
      fill="none"
      overflow="visible"
      className={`absolute top-0 left-0 ${className}`}
    >
      <path
        className="flow-draw"
        d={`M1 0V14H${end}V38`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="flow-head"
        d={`M${end - 5} 32L${end} 38L${end + 5} 32`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
