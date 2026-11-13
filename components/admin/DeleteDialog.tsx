"use client";

import { useEffect, useRef, useState } from "react";
import { ui } from "@/content/interface";
import { button } from "./buttons";

const t = ui.admin.editor;

/**
 * Confirmation de suppression (DESIGN.md § 12.7) : un `<dialog>` modal, « Annuler » a le focus par défaut,
 * Échap ferme, et le focus revient au bouton d'origine. La suppression est définitive.
 */
export function DeleteDialog({
  open,
  title,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="delete-dialog-title"
      onClose={onCancel}
      className="m-auto w-full max-w-[480px] rounded-xl border border-rule bg-surface p-0 text-ink backdrop:bg-ink/40"
    >
      <div className="grid gap-8 p-8">
        <h2 id="delete-dialog-title" className="t-h4">
          {t.deleteConfirm(title)}
        </h2>
        <div className="flex justify-end gap-3">
          <button type="button" autoFocus onClick={() => dialog.current?.close()} className={button.secondary}>
            {t.cancel}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={async () => {
              setPending(true);
              await onConfirm();
              setPending(false);
            }}
            className={button.action}
          >
            {t.delete}
          </button>
        </div>
      </div>
    </dialog>
  );
}
