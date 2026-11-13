import type { Metadata } from "next";
import { Editor } from "@/components/admin/Editor";
import { ui } from "@/content/interface";
import { requireAdmin } from "@/lib/admin/session";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = { title: ui.admin.editor.newTitle };

/** `/admin/articles/nouveau` : l'article est créé en base au premier enregistrement. */
export default async function NewArticlePage() {
  await requireAdmin();
  return <Editor initial={null} siteHost={new URL(siteUrl()).host} />;
}
