import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/** Champ d'un formulaire (DESIGN.md § 10.10) : label visible au-dessus, erreur en texte + icône + bord `danger`. */
export function Field({
  id,
  label,
  error,
  hint,
  aside,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string | null;
  /** Indication sous le champ (cote). */
  hint?: ReactNode;
  /** Élément aligné à droite du label (compteur). */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid content-start gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium text-ink">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {hint}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-2 text-sm font-medium text-danger">
      <AlertCircle size={18} strokeWidth={1.75} aria-hidden className="mt-px flex-none" />
      <span>{children}</span>
    </p>
  );
}

/** Classes d'un input, d'une zone de texte ou d'une liste : bord `rule-strong`, `danger` en erreur. */
export function inputClass(error?: boolean, extra = "") {
  return `w-full rounded-md border bg-surface px-4 text-base text-ink ${
    error ? "border-danger" : "border-rule-strong"
  } ${extra}`;
}
