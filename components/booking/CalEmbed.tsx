"use client";

import Cal, { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ui } from "@/content/interface";
import { CAL_ORIGIN, calUi, merciUrl } from "./cal";

/**
 * L'agenda Cal.com, monté seulement quand il est demandé (chargement différé, DESIGN.md § 10.9).
 * Après une réservation dans l'embed, on part vers `/merci?uid=…`.
 */
export function CalEmbed({ calLink, namespace }: { calLink: string; namespace: string }) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    getCalApi({ namespace }).then((cal) => {
      if (cancelled) return;
      cal("ui", calUi);
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (event: EmbedEvent<"bookingSuccessfulV2">) => router.push(merciUrl(event.detail.data.uid)),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [namespace, router]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      calOrigin={CAL_ORIGIN}
      config={{ layout: "month_view", theme: "light" }}
      title={ui.booking.frameTitle}
      className="min-h-[560px] w-full overflow-auto"
    />
  );
}
