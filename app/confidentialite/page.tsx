import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { ui } from "@/content/interface";
import { loadLegal } from "@/lib/legal";

const page = ui.legal.confidentialite;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/confidentialite" },
};

export default async function Page() {
  return <LegalPage title={page.title} source={await loadLegal("confidentialite")} />;
}
