"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui } from "@/content/interface";
import { AgendaNotes } from "./AgendaNotes";

const CalEmbed = dynamic(() => import("./CalEmbed").then((m) => m.CalEmbed), { ssr: false });

const DESKTOP = "(min-width: 1024px)";

/**
 * Sous `lg`, chaque CTA de réservation ouvre l'agenda en plein écran (DESIGN.md § 10.9) :
 * un `<dialog>` natif en `showModal` (focus piégé, Échap ferme), « Fermer » en haut,
 * et le focus revient au bouton d'origine. L'embed se charge au premier clic.
 * Au-dessus de `lg`, le lien garde son ancre `#rdv`.
 */
export function BookingDialog({ calLink }: { calLink: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [requested, setRequested] = useState(false);

  const open = useCallback((from: HTMLElement) => {
    const el = dialog.current;
    if (!el || el.open) return;
    trigger.current = from;
    setRequested(true);
    el.showModal();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const cta = (event.target as Element | null)?.closest<HTMLElement>("a[data-cta]");
      if (!cta || cta.getAttribute("href") !== "#rdv" || window.matchMedia(DESKTOP).matches) return;
      event.preventDefault();
      open(cta);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      trigger.current?.focus();
      trigger.current = null;
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      data-booking-dialog
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-paper p-0 text-ink backdrop:bg-ink"
    >
      <div className="grid gap-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <p id="booking-title" className="t-h4">
            {ui.booking.dialogTitle}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="inline-flex min-h-11 items-center rounded-md border border-rule-strong bg-surface px-4 text-[15px] font-medium transition-colors hover:bg-raised"
          >
            {ui.booking.close}
          </button>
        </div>
        {calLink && requested && (
          <div className="min-h-[560px] rounded-lg border border-rule bg-surface">
            <CalEmbed calLink={calLink} namespace="dialog" />
          </div>
        )}
        <AgendaNotes calLink={calLink} />
      </div>
    </dialog>
  );
}
