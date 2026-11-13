import type { Metadata } from "next";
import { ui } from "@/content/interface";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: ui.admin.login.title };

/** `/admin/connexion` (DESIGN.md § 12.7) : l'email, puis le lien magique. */
export default function LoginPage() {
  return (
    <>
      <h1 className="t-h3">{ui.admin.login.title}</h1>
      <LoginForm />
    </>
  );
}
