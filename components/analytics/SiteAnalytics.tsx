"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Rien n'est mesuré dans l'admin (docs/PLAN.md, « Mesure »). */
const isAdmin = (pathname: string) => pathname === "/admin" || pathname.startsWith("/admin/");

function beforeSend(event: BeforeSendEvent) {
  return isAdmin(new URL(event.url).pathname) ? null : event;
}

/**
 * Vercel Web Analytics, sans cookie ni bandeau, et la mesure des clics de réservation :
 * chaque élément `[data-cta]` émet `cta_click` avec sa position (DESIGN.md § 10.1).
 */
export function SiteAnalytics() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const cta = (event.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      const position = cta?.dataset.cta;
      if (position) trackEvent("cta_click", { position });
    };
    // Phase de capture : le clic est compté même si un autre gestionnaire l'intercepte (dialog de l'agenda).
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (isAdmin(pathname)) return null;
  return <Analytics beforeSend={beforeSend} />;
}
