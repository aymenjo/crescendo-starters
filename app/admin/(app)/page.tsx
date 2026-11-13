import type { Metadata } from "next";
import { CategoryTag } from "@/components/blog/CategoryTag";
import { AdminLink } from "@/components/admin/AdminLink";
import { button } from "@/components/admin/buttons";
import { ui } from "@/content/interface";
import { requireAdmin } from "@/lib/admin/session";
import { formatShortDate } from "@/lib/dates";

const t = ui.admin.list;

export const metadata: Metadata = { title: t.title };

/**
 * `/admin` (DESIGN.md § 12.7) : le tableau des articles, trié par dernière modification.
 * Les liens internes de l'admin sont de simples `<a>` : l'avertissement natif de l'éditeur s'affiche aussi pour eux.
 */
export default async function ArticlesPage() {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, status, category, first_published_at, updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`Lecture des articles impossible : ${error.message}`);

  return (
    <main className="mx-auto grid max-w-[1440px] gap-8 px-8 py-12">
      <div className="flex items-center justify-between gap-6">
        <h1 className="t-h2">{t.title}</h1>
        <AdminLink href="/admin/articles/nouveau" className={button.action}>
          {t.new}
        </AdminLink>
      </div>

      {data.length === 0 ? (
        <div className="grid justify-items-start gap-6 rounded-xl border border-rule bg-surface p-8">
          <p>{t.empty}</p>
          <AdminLink href="/admin/articles/nouveau" className={button.action}>
            {t.new}
          </AdminLink>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-rule">
          <table className="w-full border-collapse bg-surface text-[15px]">
            <thead>
              <tr className="bg-raised text-left">
                <th scope="col" className="px-4 py-3 font-medium">{t.columns.title}</th>
                <th scope="col" className="px-4 py-3 font-medium">{t.columns.status}</th>
                <th scope="col" className="px-4 py-3 font-medium">{t.columns.category}</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">{t.columns.published}</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">{t.columns.updated}</th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">{t.viewOnline}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((article) => (
                <tr key={article.id} className="border-t border-rule">
                  <td className="px-4 py-3">
                    <AdminLink
                      href={`/admin/articles/${article.id}`}
                      className="font-medium underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {article.title}
                    </AdminLink>
                  </td>
                  <td className="px-4 py-3">
                    {article.status === "published" ? (
                      <span className="font-medium">{ui.admin.status.published}</span>
                    ) : (
                      <span className="text-ink-3">{ui.admin.status.draft}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{article.category ? <CategoryTag category={article.category} /> : "—"}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums">
                    {article.first_published_at ? formatShortDate(article.first_published_at) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums">
                    {formatShortDate(article.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {article.status === "published" && (
                      <a href={`/blog/${article.slug}`} target="_blank" rel="noopener" className={button.ghost}>
                        {t.viewOnline}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
