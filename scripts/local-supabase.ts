import { execFileSync } from "node:child_process";

export type LocalSupabase = { url: string; publishableKey: string; secretKey: string };

/**
 * URL et clés du Supabase local (Docker). Elles viennent de l'environnement en CI
 * (`supabase status -o env` exporté), sinon de `supabase status`. Jamais de Supabase Cloud ici :
 * le poste local ne touche pas la prod (docs/PLAN.md, « Environnements et secrets »).
 */
export function localSupabase(): LocalSupabase {
  let url = process.env.SUPABASE_URL;
  let publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  let secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !publishableKey || !secretKey) {
    const status = JSON.parse(
      execFileSync("npx", ["supabase", "status", "-o", "json"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }),
    );
    url ??= status.API_URL;
    publishableKey ??= status.PUBLISHABLE_KEY;
    secretKey ??= status.SECRET_KEY;
  }

  if (!url || !publishableKey || !secretKey) throw new Error("Supabase local introuvable : lancez `npx supabase start`.");
  const { hostname } = new URL(url);
  if (hostname !== "127.0.0.1" && hostname !== "localhost") {
    throw new Error(`Refusé : ${url} n'est pas le Supabase local.`);
  }
  return { url, publishableKey, secretKey };
}
