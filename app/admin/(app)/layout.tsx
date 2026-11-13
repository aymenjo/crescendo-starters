import { AdminBar } from "@/components/admin/AdminBar";
import { requireAdmin } from "@/lib/admin/session";
import { signOut } from "./actions";

/** Pages de l'admin connecté : la session est vérifiée côté serveur, « Se déconnecter » partout. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <>
      <AdminBar signOut={signOut} />
      {children}
    </>
  );
}
