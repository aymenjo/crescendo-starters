import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { container } from "@/components/ui/Container";
import { LogoLockup, LogoMark } from "@/components/ui/Logo";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";
import { blogCtaHref } from "@/lib/utm";
import { HeaderScrollRule } from "./HeaderScrollRule";

/**
 * Header (DESIGN.md § 10.7) : logo à gauche, bouton compact à droite, sans menu.
 * - Landing et pages annexes : collant en `lg` (72 px) avec un filet qui apparaît au scroll ;
 *   64 px et non collant sur mobile, où le bouton fixe prend le relais.
 * - `reduced` : logo seul, sans CTA (page de confirmation).
 * - `blog` : « · le carnet » après le logo, collant sur tous les écrans, CTA `blog-nav` avec ses UTM.
 */
export function Header({
  reduced = false,
  onLanding = false,
  blog,
}: {
  reduced?: boolean;
  onLanding?: boolean;
  /** Variante du blog ; `slug` sur une page article (utm_campaign). */
  blog?: { slug?: string };
}) {
  if (blog) return <BlogHeader slug={blog.slug} />;

  const logo = <LogoLockup height={32} className="h-7 w-auto sm:h-8" />;
  return (
    <header
      data-site-header
      className="border-b border-transparent bg-paper transition-colors duration-200 lg:sticky lg:top-0 lg:z-30 lg:data-scrolled:border-rule"
    >
      <HeaderScrollRule />
      <div className={`${container} flex min-h-16 items-center justify-between gap-4 lg:min-h-18`}>
        {onLanding ? (
          <a href="#" aria-label={ui.logoLabel} className="inline-flex flex-none">
            {logo}
          </a>
        ) : (
          <Link href="/" aria-label={ui.logoLabel} className="inline-flex flex-none">
            {logo}
          </Link>
        )}
        {!reduced && (
          <CtaLink
            position="header"
            variant="compact"
            label={landing.header.cta.label}
            href={onLanding ? "#rdv" : "/#rdv"}
          />
        )}
      </div>
    </header>
  );
}

/**
 * Nav du blog : le logo renvoie vers `/`, « le carnet » vers `/blog`.
 * Sous `sm`, le symbole seul, puis « le carnet » et le bouton : tout tient sur une ligne dès 360 px.
 */
function BlogHeader({ slug }: { slug?: string }) {
  return (
    <header
      data-site-header
      className="sticky top-0 z-30 border-b border-transparent bg-paper transition-colors duration-200 data-scrolled:border-rule"
    >
      <HeaderScrollRule />
      <div className={`${container} flex min-h-16 items-center justify-between gap-4 lg:min-h-18`}>
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/" aria-label={ui.logoLabel} className="inline-flex flex-none">
            <LogoMark height={28} className="sm:hidden" />
            <LogoLockup height={32} className="hidden h-8 w-auto sm:block" />
          </Link>
          <Link
            href="/blog"
            className="font-medium whitespace-nowrap text-ink-2 decoration-1 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            <span aria-hidden className="hidden sm:inline">
              ·{" "}
            </span>
            {ui.blog.nav}
          </Link>
        </div>
        <CtaLink position="blog-nav" variant="compact" label={landing.header.cta.label} href={blogCtaHref("nav", slug)} />
      </div>
    </header>
  );
}
