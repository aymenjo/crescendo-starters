import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isPreview } from "@/lib/admin/preview";
import { isSessionTooOld, sessionStartedAt, withSessionMaxAge } from "@/lib/admin/session-age";
import { supabaseEnv } from "@/lib/supabase/env";

const LOGIN_PATH = "/admin/connexion";

/**
 * Admin uniquement (matcher) : rafraîchit la session Supabase et pose ses cookies (7 jours),
 * renvoie vers la connexion sans session ou après 7 jours, et répond 404 sur les previews.
 * Ces contrôles passent avant le rendu : la redirection et la 404 gardent leur code HTTP.
 */
export async function proxy(request: NextRequest) {
  if (isPreview()) return NextResponse.rewrite(new URL("/admin/introuvable", request.url), { status: 404 });

  let response = NextResponse.next({ request });
  const { url, key } = supabaseEnv();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, withSessionMaxAge(options));
        }
        for (const [header, value] of Object.entries(headers ?? {})) response.headers.set(header, value);
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const onLogin = request.nextUrl.pathname.startsWith(LOGIN_PATH);

  if (claims) {
    const startedAt = sessionStartedAt(claims);
    if (startedAt !== null && isSessionTooOld(startedAt, Date.now())) {
      await supabase.auth.signOut({ scope: "local" });
      return onLogin ? response : redirectTo(LOGIN_PATH, request, response);
    }
  } else if (!onLogin) {
    return redirectTo(LOGIN_PATH, request, response);
  }
  return response;
}

/** Redirection qui garde les cookies posés par Supabase (rafraîchissement ou suppression). */
function redirectTo(path: string, request: NextRequest, from: NextResponse) {
  const redirect = NextResponse.redirect(new URL(path, request.url));
  for (const cookie of from.cookies.getAll()) redirect.cookies.set(cookie);
  redirect.headers.set("Cache-Control", "private, no-store");
  return redirect;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
