import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Editor } from "@/components/admin/Editor";
import { requireAdmin } from "@/lib/admin/session";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/admin/articles/[id]">): Promise<Metadata> {
  const { id } = await params;
  const supabase = await requireAdmin();
  const { data } = await supabase.from("articles").select("title").eq("id", id).maybeSingle();
  return { title: data?.title ?? "Article" };
}

/** `/admin/articles/<id>` : l'éditeur d'un article existant. */
export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const supabase = await requireAdmin();
  const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <Editor initial={data} siteHost={new URL(siteUrl()).host} />;
}
