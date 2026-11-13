import Image from "next/image";
import Link from "next/link";
import { coverUrl, type PublishedArticle } from "@/lib/articles";
import { typo } from "@/lib/typo";
import { ArticleMeta } from "./ArticleMeta";
import { CategoryTag } from "./CategoryTag";

/**
 * Carte d'article (DESIGN.md § 12.3) : sans boîte, tout le bloc est un lien.
 * Couverture 16:10, tag, cote « date · temps de lecture », titre en H4 (2 lignes), chapô (3 lignes).
 * Au survol, le titre se souligne ; l'image ne bouge pas.
 */
export function ArticleCard({ article, preload = false }: { article: PublishedArticle; preload?: boolean }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group grid content-start gap-3">
      <div className="relative mb-2 aspect-[16/10] overflow-hidden rounded-lg border border-rule bg-surface">
        <Image
          src={coverUrl(article.cover_path)}
          alt={article.cover_alt}
          fill
          preload={preload}
          sizes="(min-width: 1200px) 368px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <CategoryTag category={article.category} />
      <ArticleMeta publishedAt={article.first_published_at} body={article.body} />
      <h2 className="t-h4 line-clamp-2 decoration-1 underline-offset-4 group-hover:underline">{typo(article.title)}</h2>
      <p className="line-clamp-3 text-ink-2">{typo(article.excerpt)}</p>
    </Link>
  );
}
