import { notFound } from "next/navigation";
import { AdminBar } from "@/components/admin/AdminBar";
import { isPreview } from "@/lib/admin/preview";

/** Connexion : la barre sans « Se déconnecter », puis un panneau centré. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (isPreview()) notFound();
  return (
    <>
      <AdminBar />
      <main className="px-4 py-16 lg:py-24">
        <div className="mx-auto grid max-w-[440px] gap-6 rounded-xl border border-rule bg-surface p-8">{children}</div>
      </main>
    </>
  );
}
