import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { ui } from "@/content/interface";
import { loadLegal } from "@/lib/legal";

const page = ui.legal.mentions;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/mentions-legales" },
};

export default async function Page() {
  return <LegalPage title={page.title} source={await loadLegal("mentions-legales")} />;
}
