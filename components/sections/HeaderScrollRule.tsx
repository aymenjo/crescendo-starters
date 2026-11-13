"use client";

import { useEffect } from "react";

/** Pose `data-scrolled` sur le header dès que la page a défilé : le filet bas apparaît (200 ms). */
export function HeaderScrollRule() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    const update = () => header.toggleAttribute("data-scrolled", window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
