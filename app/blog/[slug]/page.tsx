import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { CategoryTag } from "@/components/blog/CategoryTag";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { container } from "@/components/ui/Container";
import { CATEGORIES, coverUrl, getPublishedArticle, getPublishedArticles, metaDescription, seoTitle } from "@/lib/articles";
import { blogPostingJsonLd, jsonLdScript } from "@/lib/jsonld";
import { typo } from "@/lib/typo";

/**
 * Avec Cache Components, il faut au moins un paramètre : sur une base vide, ce slug réservé
 * (hors du format accepté en base) sert de modèle au build et renvoie la 404.
 */
const EMPTY_PLACEHOLDER = "_aucun-article";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.length > 0 ? articles.map(({ slug }) => ({ slug })) : [{ slug: EMPTY_PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};

  const title = seoTitle(article);
  const description = metaDescription(article);
  const url = `/blog/${article.slug}`;
  const image = { url: coverUrl(article.cover_path), alt: article.cover_alt };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Crescendo",
      locale: "fr_FR",
      title,
      description,
      images: [image],
      publishedTime: article.first_published_at,
      modifiedTime: article.updated_at,
      authors: ["Aymen Jouini"],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/**
 * Page article (DESIGN.md § 12.4). Un brouillon, un article dépublié ou supprimé et un slug inconnu
 * renvoient la 404. En cache, invalidée à chaque publication de l'article (tag `article:<slug>`).
 */
export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(blogPostingJsonLd(article)) }} />
      <Header blog={{ slug: article.slug }} />
      <main className="section section-end">
        <article className={container}>
          <header className="mx-auto grid max-w-[720px] gap-4">
            <CategoryTag category={article.category} />
            <h1 className="t-h1">{typo(article.title)}</h1>
            <p className="t-lead">{typo(article.excerpt)}</p>
            <ArticleMeta publishedAt={article.first_published_at} body={article.body} author />
          </header>
          <div className="relative mx-auto mt-10 aspect-[16/10] max-w-[960px] overflow-hidden rounded-lg border border-rule bg-surface lg:mt-12">
            <Image
              src={coverUrl(article.cover_path)}
              alt={article.cover_alt}
              fill
              preload
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto mt-12 max-w-[720px] lg:mt-16">
            <ArticleBody source={article.body} marker={CATEGORIES[article.category].marker} />
          </div>
          <div className="mx-auto mt-16 max-w-[720px]">
            <ArticleCta slug={article.slug} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
