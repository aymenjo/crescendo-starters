import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LOCKUP_HEIGHT, LOCKUP_WIDTH, WORDMARK_PATH } from "@/components/ui/wordmark";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";

/**
 * Image de partage de la landing (DESIGN.md § 16), 1200 × 630 : fond `paper`, la photo d'Aymen
 * à gauche, à droite le lockup, l'og:title en Inter Tight 600 et la cote « Aymen Jouini · fondateur ».
 */
export const alt = `${landing.meta.ogTitle}. ${ui.founderCaption}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const [interTight, jetbrainsMono, photo] = await Promise.all([
  readFile(join(root, "assets/fonts/InterTight-SemiBold.ttf")),
  readFile(join(root, "assets/fonts/JetBrainsMono-Medium.ttf")),
  readFile(join(root, "public/images/fondateur.jpg")),
]);
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

const INK = "#111111";
const LOCKUP_H = 56;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 64,
          background: "#EEE7DC",
          color: INK,
          fontFamily: "Inter Tight",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={440}
          height={440}
          style={{ borderRadius: 20, border: "1px solid rgba(17, 17, 17, 0.12)", objectFit: "cover", filter: "saturate(0.85)" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 32 }}>
          <svg
            width={(LOCKUP_H * LOCKUP_WIDTH) / LOCKUP_HEIGHT}
            height={LOCKUP_H}
            viewBox={`0 0 ${LOCKUP_WIDTH} ${LOCKUP_HEIGHT}`}
            fill="none"
          >
            <path d="M28 63H55V53" stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 40H95V30" stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <rect x="2" y="50" width="26" height="26" rx="7" fill="#B3C7D9" stroke={INK} strokeWidth={4} />
            <rect x="42" y="27" width="26" height="26" rx="7" fill="#F2BB6B" stroke={INK} strokeWidth={4} />
            <rect x="82" y="4" width="26" height="26" rx="7" fill="#EE6F5A" stroke={INK} strokeWidth={4} />
            <path d={WORDMARK_PATH} fill={INK} />
          </svg>
          <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", textWrap: "balance" }}>
            {`${landing.meta.ogTitle}.`}
          </div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 24, color: "#6B655B" }}>{ui.founderCaption}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: interTight, style: "normal", weight: 600 },
        { name: "JetBrains Mono", data: jetbrainsMono, style: "normal", weight: 500 },
      ],
    },
  );
}
