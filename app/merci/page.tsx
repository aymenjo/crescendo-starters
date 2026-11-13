import type { Metadata } from "next";
import { ReservationTracker } from "@/components/analytics/ReservationTracker";
import { Avatar } from "@/components/ui/Avatar";
import { container } from "@/components/ui/Container";
import { Cote } from "@/components/ui/Cote";
import { Rich, TitleText } from "@/components/ui/Rich";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { landing } from "@/content/landing";
import { ui } from "@/content/interface";
import { typo } from "@/lib/typo";

const { confirmation } = landing;

export const metadata: Metadata = {
  title: ui.confirmation.title,
  robots: { index: false, follow: false },
};

/** Page de confirmation (DESIGN.md § 10.20) : noindex, header réduit au logo, sans CTA. */
export default function MerciPage() {
  return (
    <>
      <Header reduced />
      <main className="section section-end">
        <div className={container}>
          <div className="mx-auto grid max-w-[640px] justify-items-start gap-5 rounded-xl border border-rule bg-surface p-8 lg:p-12">
            <Cote>{ui.confirmation.cote}</Cote>
            <h1 className="t-h1">
              <TitleText title={confirmation.h1} />
            </h1>
            <p>{typo(confirmation.text)}</p>
            <div className="flex items-center gap-3">
              <Avatar />
              <Rich text={confirmation.link} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ReservationTracker />
    </>
  );
}
