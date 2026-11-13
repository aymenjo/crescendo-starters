"use client";

import { useEffect, useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";

/**
 * Bouton fixe mobile (DESIGN.md § 10.19), sous `lg` uniquement.
 * Il apparaît quand le CTA du hero sort de l'écran par le haut, et disparaît quand `#rdv` entre.
 * Caché, il est `inert` : hors de l'ordre de tabulation et des lecteurs d'écran.
 */
export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const rdv = document.getElementById("rdv");
    if (!hero || !rdv || !("IntersectionObserver" in window)) return;

    let heroPassed = false;
    let rdvInView = false;
    const update = () => setVisible(heroPassed && !rdvInView);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    const rdvObserver = new IntersectionObserver(([entry]) => {
      rdvInView = entry.isIntersecting;
      update();
    });
    heroObserver.observe(hero);
    rdvObserver.observe(rdv);
    return () => {
      heroObserver.disconnect();
      rdvObserver.disconnect();
    };
  }, []);

  return (
    <div
      data-sticky-cta
      data-visible={visible || undefined}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] motion-reduce:transition-none lg:hidden ${
        visible
          ? "visible translate-y-0 [transition:transform_200ms_var(--ease-out)]"
          : "invisible translate-y-[110%] [transition:transform_200ms_var(--ease-out),visibility_0s_linear_200ms]"
      }`}
    >
      <CtaLink position="sticky" variant="compact" label={label} className="w-full" />
    </div>
  );
}
