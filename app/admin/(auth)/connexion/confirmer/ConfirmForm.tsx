"use client";

import { useActionState } from "react";
import { button } from "@/components/admin/buttons";
import { ui } from "@/content/interface";
import { confirmLink, type ConfirmState } from "../actions";

const t = ui.admin.confirm;

/**
 * Le bouton « Se connecter » consomme le lien. Un simple chargement de la page ne le consomme pas :
 * un filtre de messagerie qui ouvre le lien avant le consultant ne le rend pas inutilisable.
 */
export function ConfirmForm({ tokenHash }: { tokenHash: string | null }) {
  const [state, action, pending] = useActionState<ConfirmState, FormData>(confirmLink, { invalid: !tokenHash });

  if (state.invalid) {
    return (
      <div className="grid justify-items-start gap-6">
        <p role="alert">{t.invalid}</p>
        <a href="/admin/connexion" className={button.action}>
          {t.newLink}
        </a>
      </div>
    );
  }
  return (
    <form action={action} className="grid justify-items-start gap-6">
      <p className="text-ink-2">{t.intro}</p>
      <input type="hidden" name="token_hash" value={tokenHash ?? ""} />
      <button type="submit" disabled={pending} className={button.action}>
        {t.submit}
      </button>
    </form>
  );
}
