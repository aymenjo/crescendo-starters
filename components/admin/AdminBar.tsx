import { LogoMark } from "@/components/ui/Logo";
import { ui } from "@/content/interface";
import { button } from "./buttons";

/**
 * Barre haute de l'admin (DESIGN.md § 12.7) : 56 px, symbole et « Admin » à gauche,
 * « Se déconnecter » à droite quand une session est ouverte.
 */
export function AdminBar({ signOut }: { signOut?: () => Promise<void> }) {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-8">
        <p className="flex items-center gap-3 font-medium text-ink-2">
          <LogoMark height={20} />
          {ui.admin.name}
        </p>
        {signOut && (
          <form action={signOut}>
            <button type="submit" className={button.ghost}>
              {ui.admin.signOut}
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
