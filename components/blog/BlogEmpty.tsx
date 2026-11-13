import { CtaLink } from "@/components/ui/CtaLink";
import { LogoMark } from "@/components/ui/Logo";
import { ui } from "@/content/interface";
import { landing } from "@/content/landing";
import { blogCtaHref } from "@/lib/utm";

/** État vide de la liste (DESIGN.md § 12.2) : l'escalier du logo, une phrase courte et le bouton compact. */
export function BlogEmpty() {
  return (
    <div className="grid justify-items-start gap-6 rounded-xl border border-rule bg-surface p-8">
      <LogoMark height={96} />
      <p className="t-h3">{ui.blog.empty}</p>
      <CtaLink position="blog-vide" variant="compact" label={landing.header.cta.label} href={blogCtaHref("nav")} />
    </div>
  );
}
