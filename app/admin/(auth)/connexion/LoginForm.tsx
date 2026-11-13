"use client";

import { useActionState, useEffect, useState } from "react";
import { button } from "@/components/admin/buttons";
import { Field, inputClass } from "@/components/admin/Field";
import { ui } from "@/content/interface";
import { requestLink, type LoginState } from "./actions";

const WAIT_SECONDS = 60;
const t = ui.admin.login;

/** Formulaire de connexion : même message pour toutes les adresses, puis 60 s avant un nouveau lien. */
export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(requestLink, { status: "idle" });
  const sentAt = state.status === "sent" ? state.at : null;
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (sentAt === null) return;
    const tick = () => setRemaining(Math.max(0, Math.ceil((sentAt + WAIT_SECONDS * 1000 - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [sentAt]);

  const invalid = state.status === "invalid";
  return (
    <form action={action} className="grid gap-6">
      <Field id="email" label={t.email} error={invalid ? t.invalidEmail : null}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? "email-error" : undefined}
          className={inputClass(invalid, "h-12")}
        />
      </Field>
      <div className="grid justify-items-start gap-3">
        <button type="submit" disabled={pending || remaining > 0} className={button.action}>
          {t.submit}
        </button>
        {remaining > 0 && <span className="cote tabular-nums">{t.wait(remaining)}</span>}
      </div>
      <p role="status" className="text-ink-2 empty:hidden">
        {state.status === "sent" ? t.sent : ""}
      </p>
    </form>
  );
}
