import { Check, Ticket } from "lucide-react";
import { formatPrice, generalAdmission, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  "Be in the room. $99 for three days at 4MLK. All panels, talks, workshops, the expo floor, and all three mixers. Breakfast, coffee, water, and one drink.",
);

export default function TicketsPage() {
  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates}</p>
          <h1>Tickets</h1>
          <p>{site.ticketLine}</p>
        </header>

        <div className="packs-grid packs-single">
          <article className="pack pack-ga">
            <p className="pack-name">
              <Ticket size={18} strokeWidth={2.25} aria-hidden="true" />
              {generalAdmission.name}
            </p>
            <p className="pack-price">{formatPrice(generalAdmission.price)}</p>
            <ul className="pack-rows">
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Three full days at 4MLK</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>All panels, talks, and workshops</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>The expo floor</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>All three evening mixers</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Breakfast</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Coffee and water all day</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>1 drink at any mixer</span>
              </li>
            </ul>
            <button type="button" className="pack-btn" disabled>
              Get Tickets
            </button>
            <p className="pack-closed">Not open yet.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
