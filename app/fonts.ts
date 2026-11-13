import { Inter_Tight, JetBrains_Mono } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Pas de préchargement : la mono ne sert qu'aux cotes, elle ne doit pas retarder le premier rendu (DESIGN.md § 16).
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});
