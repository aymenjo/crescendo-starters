import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { withSessionMaxAge } from "@/lib/admin/session-age";
import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

/** Client SSR à cookies (admin : pages, actions). Le cookie de session dure 7 jours. */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, key } = supabaseEnv();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, withSessionMaxAge(options));
          }
        } catch {
          // Appelé depuis un Server Component : les cookies sont en lecture seule. proxy.ts les rafraîchit.
        }
      },
    },
  });
}
