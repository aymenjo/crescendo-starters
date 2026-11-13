import type { NextConfig } from "next";
import { isIndexable } from "./lib/site";

/** Images des articles : seul le bucket `articles` du projet Supabase est autorisé. */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Désactivé : avec Partial Prefetching, le shell d'une route dynamique part en 200 avant le notFound(),
  // et un brouillon ou un slug inconnu ne renverrait jamais un vrai 404 (docs/PLAN.md, « Rendu et cache »).
  partialPrefetching: false,
  // Les pages légales lisent leur Markdown sur le disque : on l'embarque dans les fonctions.
  outputFileTracingIncludes: {
    "/mentions-legales": ["./content/legal/**/*"],
    "/confidentialite": ["./content/legal/**/*"],
  },
  images: {
    // Photo du fondateur : 80 et 96 px pour l'avatar, 480 px pour la Preuve (DESIGN.md § 16).
    imageSizes: [16, 32, 40, 48, 64, 80, 96, 128, 256, 320, 384, 480],
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl}/storage/v1/object/public/articles/**`)] : [],
    // En local et en CI, Supabase tourne sur 127.0.0.1 : Next bloque les IP locales par défaut. Jamais sur Vercel.
    dangerouslyAllowLocalIP: !process.env.VERCEL,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    if (isIndexable()) return [];
    // Previews et prod de test : jamais indexées (docs/PLAN.md, « Indexation »).
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
