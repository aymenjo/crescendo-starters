import { Marker } from "@/components/ui/Marker";
import { CATEGORIES, type ArticleCategory } from "@/lib/article-model";

/** Tag de catégorie (DESIGN.md § 10.2) : une étiquette non cliquable, avec le marqueur de la catégorie. */
export function CategoryTag({ category }: { category: ArticleCategory }) {
  const { label, marker } = CATEGORIES[category];
  return (
    <span className="inline-flex h-7 items-center gap-2 self-start justify-self-start rounded-sm border border-rule bg-surface px-3 text-[13px] leading-none font-medium text-ink">
      <Marker color={marker} small />
      {label}
    </span>
  );
}
