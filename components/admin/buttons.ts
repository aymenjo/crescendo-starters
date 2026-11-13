/**
 * Boutons de l'admin (DESIGN.md § 10.1) : jamais le corail, réservé à la réservation.
 * `action` : l'action principale, en encre. `secondary` et `ghost` : les autres.
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2 text-[15px] font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed";

export const button = {
  action: `${base} border-[1.5px] border-ink bg-ink text-on-ink hover:border-ink-2 hover:bg-ink-2 disabled:border-rule-strong disabled:bg-raised disabled:text-ink-2`,
  secondary: `${base} border border-rule-strong bg-surface text-ink hover:bg-raised disabled:text-ink-2`,
  ghost:
    "inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-ink underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-ink disabled:cursor-not-allowed disabled:text-ink-2",
} as const;
