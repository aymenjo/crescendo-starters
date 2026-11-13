import type { Metadata } from "next";
import { ui } from "@/content/interface";
import { ConfirmForm } from "./ConfirmForm";

export const metadata: Metadata = { title: ui.admin.confirm.title };

/** `/admin/connexion/confirmer` : la page du lien magique, avec le bouton « Se connecter ». */
export default async function ConfirmPage({ searchParams }: PageProps<"/admin/connexion/confirmer">) {
  const { token_hash } = await searchParams;
  const tokenHash = typeof token_hash === "string" && token_hash ? token_hash : null;
  return (
    <>
      <h1 className="t-h3">{ui.admin.confirm.title}</h1>
      <ConfirmForm tokenHash={tokenHash} />
    </>
  );
}
