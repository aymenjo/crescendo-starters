import { cacheLife } from "next/cache";
import Link from "next/link";
import { container } from "@/components/ui/Container";
import { LogoLockup } from "@/components/ui/Logo";
import { ui } from "@/content/interface";
import { contact } from "@/lib/site";

/**
 * Footer (DESIGN.md § 10.11) : fond encre. « Le carnet » est le seul lien de la landing vers le blog.
 * `onLanding` : les ancres restent locales ; ailleurs, elles pointent vers la landing.
 */
export async function Footer({ onLanding = false }: { onLanding?: boolean }) {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();
  const anchor = (href: string) => (onLanding ? href : `/${href}`);
  return (
    <footer className="bg-ink pt-16 pb-8 text-on-ink [&_:focus-visible]:outline-on-ink">
      <div className={`${container} grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.6fr]`}>
        <div>
          {onLanding ? (
            <a href="#" aria-label={ui.logoLabel} className="inline-flex">
              <LogoLockup height={32} className="h-7 w-auto sm:h-8" />
            </a>
          ) : (
            <Link href="/" aria-label={ui.logoLabel} className="inline-flex">
              <LogoLockup height={32} className="h-7 w-auto sm:h-8" />
            </Link>
          )}
          <p className="mt-4 max-w-[36ch] text-[15px] text-on-ink-2">{ui.footer.presentation}</p>
        </div>
        <nav aria-labelledby="footer-nav">
          <p id="footer-nav" className="cote mb-3 block text-on-ink-2!">
            {ui.footer.navTitle}
          </p>
          <ul role="list" className="grid gap-2">
            {ui.footer.nav.map((item) => (
              <li key={item.href}>
                <a href={anchor(item.href)} className="underline-offset-4 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="cote mb-3 block text-on-ink-2!">{ui.footer.resourcesTitle}</p>
          <ul role="list" className="grid gap-2">
            <li>
              <Link href="/blog" className="underline-offset-4 hover:underline">
                {ui.footer.blog}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="cote mb-3 block text-on-ink-2!">{ui.footer.contactTitle}</p>
          <ul role="list" className="grid gap-2">
            <li>
              <a href={`mailto:${contact.email}`} className="break-all underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                {ui.footer.linkedin}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={container}>
        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-on-ink/12 pt-6 text-sm text-on-ink-2">
          <Link href="/mentions-legales" className="underline-offset-4 hover:underline">
            {ui.footer.legal}
          </Link>
          <Link href="/confidentialite" className="underline-offset-4 hover:underline">
            {ui.footer.privacy}
          </Link>
          <span>© {year} Crescendo</span>
        </div>
      </div>
    </footer>
  );
}
