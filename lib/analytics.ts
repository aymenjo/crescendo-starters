import { track } from "@vercel/analytics";

/**
 * Envoie un événement Vercel Web Analytics. La file `window.va` est créée si besoin :
 * un événement émis avant l'injection du script n'est pas perdu (le script dépile `vaq`).
 */
export function trackEvent(name: "cta_click" | "reservation_confirmee", properties?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.va ??= (event, properties) => {
    (window.vaq ??= []).push([event, properties]);
  };
  track(name, properties);
}

const STORAGE_KEY = "crescendo:reservations";

/**
 * Vrai si cette réservation n'a pas encore été comptée sur ce navigateur, et la mémorise.
 * Sans stockage disponible (navigation privée stricte), on compte quand même.
 */
export function isFirstConfirmation(uid: string, storage: Pick<Storage, "getItem" | "setItem"> | null): boolean {
  if (!storage) return true;
  try {
    const seen: string[] = JSON.parse(storage.getItem(STORAGE_KEY) ?? "[]");
    if (seen.includes(uid)) return false;
    storage.setItem(STORAGE_KEY, JSON.stringify([...seen, uid].slice(-20)));
    return true;
  } catch {
    return true;
  }
}
