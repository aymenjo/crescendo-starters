"use client";

import { useEffect } from "react";
import { isFirstConfirmation, trackEvent } from "@/lib/analytics";

function localStore() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Sur `/merci` : `reservation_confirmee` part une seule fois par réservation, à la confirmation
 * et non au clic, dédupliqué par l'identifiant Cal.com (`uid`). Sans `uid`, rien ne part :
 * les vues de `/merci` restent l'approximation.
 */
export function ReservationTracker() {
  useEffect(() => {
    const uid = new URLSearchParams(window.location.search).get("uid");
    if (uid && isFirstConfirmation(uid, localStore())) trackEvent("reservation_confirmee");
  }, []);
  return null;
}
