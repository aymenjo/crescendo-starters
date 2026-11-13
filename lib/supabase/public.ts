import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

/**
 * Les requêtes à Supabase ne passent pas par le fetch cache de Next : il survit aux déploiements, et une
 * donnée changée en base sans `updateTag` (migration, édition dans le tableau de bord) y resterait figée.
 * Le seul cache est `'use cache'` (lib/articles.ts) : recalculé à chaque build, invalidé par tags.
 */
const noStore: typeof fetch = (input, init) => fetch(input, { ...init, cache: "no-store" });

/**
 * Client sans cookies, pour les lectures publiques mises en cache (`'use cache'` interdit les cookies).
 * Il lit avec le rôle `anon` : la RLS ne lui montre que les articles publiés.
 */
export function createPublicClient() {
  const { url, key } = supabaseEnv();
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: noStore },
  });
}
