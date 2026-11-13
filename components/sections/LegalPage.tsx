import { container } from "@/components/ui/Container";
import { Markdown } from "@/lib/markdown";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Pages légales (DESIGN.md § 11) : header complet, panneau `surface` centré de 720 px, prose § 12.5. */
export function LegalPage({ title, source }: { title: string; source: string }) {
  return (
    <>
      <Header />
      <main className="section section-end">
        <div className={container}>
          <article className="mx-auto max-w-[720px] rounded-xl border border-rule bg-surface p-8 lg:p-12">
            <h1 className="t-h1 mb-8">{title}</h1>
            <Markdown source={source} />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
