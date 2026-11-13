/** L'admin n'existe pas sur les previews Vercel : elles lisent la base de prod (docs/PLAN.md). */
export const isPreview = () => process.env.VERCEL_ENV === "preview";
