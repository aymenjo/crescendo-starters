"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AgendaNotes } from "./AgendaNotes";

const CalEmbed = dynamic(() => import("./CalEmbed").then((m) => m.CalEmbed), { ssr: false });

/**
 * Desktop (`lg`) : l'agenda intégré à droite du CTA final, dans un cadre `paper`.
 * Il se charge à l'approche de `#rdv`, jamais au chargement de la page.
 */
export function InlineAgenda({ calLink }: { calLink: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el || !calLink) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRequested(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [calLink]);

  return (
    <div className="hidden gap-3 lg:col-span-7 lg:grid">
      {calLink && (
        <div ref={frame} className="min-h-[560px] rounded-lg border border-rule bg-paper p-6">
          {requested && <CalEmbed calLink={calLink} namespace="rdv" />}
        </div>
      )}
      <AgendaNotes calLink={calLink} />
    </div>
  );
}
