import { LOCKUP_HEIGHT, LOCKUP_WIDTH, WORDMARK_PATH } from "./wordmark";

/** Épaisseur du trait selon la largeur rendue du symbole (DESIGN.md § 2). */
function strokeFor(symbolWidth: number) {
  if (symbolWidth >= 120) return 3;
  if (symbolWidth < 48) return 5;
  return 4;
}

function SymbolShapes({ stroke }: { stroke: number }) {
  return (
    <>
      <path d="M28 63H55V53" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 40H95V30" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="50" width="26" height="26" rx="7" fill="#B3C7D9" stroke="currentColor" strokeWidth={stroke} />
      <rect x="42" y="27" width="26" height="26" rx="7" fill="#F2BB6B" stroke="currentColor" strokeWidth={stroke} />
      <rect x="82" y="4" width="26" height="26" rx="7" fill="#EE6F5A" stroke="currentColor" strokeWidth={stroke} />
    </>
  );
}

/** Symbole seul (« Les Étapes »). La hauteur est en px ; le trait suit `currentColor`. */
export function LogoMark({ height, className }: { height: number; className?: string }) {
  const width = (height * 110) / 80;
  return (
    <svg
      viewBox="0 0 110 80"
      width={width}
      height={height}
      fill="none"
      overflow="visible"
      aria-hidden
      focusable="false"
      className={className}
    >
      <SymbolShapes stroke={strokeFor(width)} />
    </svg>
  );
}

/**
 * Lockup symbole + nom vectorisé. `height` est la hauteur du symbole en px
 * (32 dans le header, 28 sous `sm`). Le nom suit `currentColor`.
 */
export function LogoLockup({ height, className }: { height: number; className?: string }) {
  const width = (height * LOCKUP_WIDTH) / LOCKUP_HEIGHT;
  const symbolWidth = (height * 110) / 80;
  return (
    <svg
      viewBox={`0 0 ${LOCKUP_WIDTH} ${LOCKUP_HEIGHT}`}
      width={width}
      height={height}
      fill="none"
      overflow="visible"
      aria-hidden
      focusable="false"
      className={className}
    >
      <SymbolShapes stroke={strokeFor(symbolWidth)} />
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  );
}
