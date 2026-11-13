import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogEmpty } from "@/components/blog/BlogEmpty";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { container } from "@/components/ui/Container";
import { Cote } from "@/components/ui/Cote";
import { ui } from "@/content/interface";
import { getPublishedArticles } from "@/lib/articles";
import { typo } from "@/lib/typo";

export const metadata: Metadata = {
  title: ui.blog.title,
  description: ui.blog.description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Crescendo",
    locale: "fr_FR",
    title: ui.blog.title,
    description: ui.blog.description,
    // La liste n'a pas de couverture : elle reprend l'image de partage de la landing.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: ui.blog.title,
    description: ui.blog.description,
    images: ["/opengraph-image"],
  },
};

/**
 * Liste du blog (DESIGN.md § 12.2) : en-tête sur `paper`, puis la grille 3 / 2 / 1 du plus récent
 * au plus ancien, ou l'état vide. En cache, invalidée par chaque publication (tag `articles`).
 */
export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <Header blog={{}} />
      <main className="section section-end">
        <div className={container}>
          <header className="grid max-w-[720px] gap-4">
            <Cote>{ui.blog.cote}</Cote>
            <h1 className="t-h1">{ui.blog.title}</h1>
            <p className="t-lead">{typo(ui.blog.lead)}</p>
          </header>
          <div className="mt-12 lg:mt-16">
            {articles.length > 0 ? (
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, i) => (
                  <li key={article.id}>
                    <ArticleCard article={article} preload={i === 0} />
                  </li>
                ))}
              </ul>
            ) : (
              <BlogEmpty />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
