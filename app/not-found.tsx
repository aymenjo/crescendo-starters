import type { Metadata } from "next";
import Link from "next/link";
import { container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { linkClass } from "@/components/ui/Rich";
import { ui } from "@/content/interface";

export const metadata: Metadata = {
  title: ui.notFound.metaTitle,
};

/** 404 (DESIGN.md § 11) : l'escalier du logo à 96 px, le retour à l'accueil et le lien `ghost` vers le carnet. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="section section-end">
        <div className={`${container} grid justify-items-start gap-8`}>
          <LogoMark height={96} />
          <h1 className="t-h1">{ui.notFound.title}</h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center rounded-md border border-rule-strong bg-surface px-5 py-3 font-medium transition-colors hover:bg-raised"
            >
              {ui.notFound.home}
            </Link>
            <Link href="/blog" className={`inline-flex min-h-12 items-center font-medium ${linkClass}`}>
              {ui.notFound.blog}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
