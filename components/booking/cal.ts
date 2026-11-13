/**
 * Réglages communs de l'embed Cal.com (DESIGN.md § 10.9) : le jour et le créneau choisis en corail,
 * avec un texte encre ; le reste suit le papier et l'encre.
 */
export const CAL_ORIGIN = "https://app.cal.com";

export function calPublicUrl(calLink: string) {
  return `https://cal.com/${calLink}`;
}

const palette = {
  "cal-brand": "#EE6F5A",
  "cal-brand-emphasis": "#D9573F",
  "cal-brand-text": "#111111",
  "cal-text": "#4A453E",
  "cal-text-emphasis": "#111111",
  "cal-text-subtle": "#6B655B",
  "cal-bg": "#FAF7F2",
  "cal-bg-subtle": "#EEE7DC",
  "cal-bg-emphasis": "#E6DED1",
  "cal-bg-muted": "#EEE7DC",
  "cal-border": "#8A8378",
  "cal-border-subtle": "rgb(17 17 17 / 0.12)",
  "cal-border-booker": "rgb(17 17 17 / 0.12)",
  radius: "10px",
};

export const calUi = {
  theme: "light" as const,
  hideEventTypeDetails: false,
  layout: "month_view" as const,
  // Pas de mode sombre en v1 (DESIGN.md § 3) : le thème sombre reprend la palette claire.
  cssVarsPerTheme: { light: palette, dark: palette },
};

export function merciUrl(uid: string | undefined) {
  return uid ? `/merci?uid=${encodeURIComponent(uid)}` : "/merci";
}
