import { CtaLink } from "@/components/ui/CtaLink";
import { ui } from "@/content/interface";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";
import { blogCtaHref } from "@/lib/utm";

/** Fin d'article (DESIGN.md § 12.4) : « Ce sujet vous parle ? Réservons 30 min. » et le bouton compact. */
export function ArticleCta({ slug }: { slug: string }) {
  return (
    <aside className="flex flex-col items-start gap-5 rounded-xl border border-rule bg-surface p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
      <p className="max-w-[44ch] text-xl leading-snug font-medium">{typo(ui.blog.articleCta)}</p>
      <CtaLink
        position="article-cta"
        variant="compact"
        label={landing.header.cta.label}
        href={blogCtaHref("article-cta", slug)}
      />
    </aside>
  );
}
