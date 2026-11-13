import { ui } from "@/content/interface";
import { formatLongDate, isoDate } from "@/lib/dates";
import { readingTime } from "@/lib/reading-time";

/** Ligne méta en cote : « [Aymen Jouini · ]12 novembre 2026 · 6 min de lecture » (DESIGN.md § 12.3, § 12.4). */
export function ArticleMeta({
  publishedAt,
  body,
  author = false,
  className = "",
}: {
  publishedAt: string;
  body: string;
  author?: boolean;
  className?: string;
}) {
  return (
    <p className={`cote tabular-nums ${className}`}>
      {author && `${ui.blog.author} · `}
      <time dateTime={isoDate(publishedAt)}>{formatLongDate(publishedAt)}</time>
      {` · ${ui.blog.readingTime(readingTime(body))}`}
    </p>
  );
}
