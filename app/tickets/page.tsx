import { Check, Ticket } from "lucide-react";
import { formatPrice, generalAdmission, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  "Baltimore Tech Week tickets are $49 for April 28–30, 2027. Three days at 4MLK. On sale later.",
);

export default function TicketsPage() {
  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates}</p>
          <h1>Tickets</h1>
          <p>One pass. Three days at 4MLK. On sale later.</p>
        </header>

        <div className="packs-grid packs-single">
          <article className="pack pack-ga">
            <p className="pack-name">
              <Ticket size={18} strokeWidth={2.25} aria-hidden="true" />
              {generalAdmission.name}
            </p>
            <p className="pack-kicker">Three days at 4MLK.</p>
            <p className="pack-price">{formatPrice(generalAdmission.price)}</p>
            <p className="pack-note">The building, Wednesday through Friday.</p>
            <ul className="pack-rows">
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Days</span>
                <span>Wed–Fri</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Where</span>
                <span>4MLK</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Floor</span>
                <span>Expo</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Rooms</span>
                <span>Talks and workshops</span>
              </li>
              <li>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                <span>Tables</span>
                <span>Coworking</span>
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
