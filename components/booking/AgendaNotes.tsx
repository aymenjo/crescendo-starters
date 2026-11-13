import { linkClass, Rich } from "@/components/ui/Rich";
import { landing } from "@/content/landing";
import { typo } from "@/lib/typo";
import { calPublicUrl } from "./cal";

const { reservation } = landing;

/**
 * Sous l'agenda : le lien de secours vers un nouvel onglet, la mention RGPD et la phrase sans créneau.
 * Sans lien Cal.com, il ne reste que la phrase de secours avec l'email.
 */
export function AgendaNotes({ calLink }: { calLink: string }) {
  return (
    <div className="grid justify-items-start gap-3 text-sm leading-normal text-ink-2">
      {calLink && (
        <>
          <a
            href={calPublicUrl(calLink)}
            target="_blank"
            rel="noopener"
            className={`inline-flex min-h-11 items-center text-base font-medium text-ink ${linkClass}`}
          >
            {typo(reservation.newTab)}
          </a>
          <p>
            <Rich text={reservation.rgpd} />
          </p>
        </>
      )}
      <p>
        <Rich text={reservation.noSlot} />
      </p>
    </div>
  );
}
