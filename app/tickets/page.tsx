import { Check, Ticket } from "lucide-react";
import { TicketNotify } from "@/components/TicketNotify";
import {
  festTargets,
  formatPrice,
  generalAdmission,
  hq,
  pageMeta,
  passIncludes,
  site,
} from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  "Three days at Bmore Tech Fest. $99 conference pass · April 26–28, 2027 · 4MLK, Baltimore. Join the list before tickets open.",
);

export default function TicketsPage() {
  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates} · 4MLK, Baltimore</p>
          <h1>Three days at Bmore Tech Fest</h1>
          <p>
            Meet founders, engineers, creators, students, and technology leaders from across Baltimore and the DMV.
            Spend three days exploring ideas, getting hands-on in workshops, and talking shop with people you could work
            with, learn from, or build alongside.
          </p>
          <p className="pass-line">Be part of year one.</p>
        </header>

        <div className="packs-grid packs-single">
          <article className="pack pack-ga">
            <p className="pack-name">
              <Ticket size={18} strokeWidth={2.25} aria-hidden="true" />
              {generalAdmission.name}
            </p>
            <p className="pack-price">{formatPrice(generalAdmission.price)}</p>
            <p className="pack-line">{site.ticketLine}</p>
            <h2 className="pack-includes-title">What happens when you’re in the room</h2>
            <ul className="pack-rows">
              {passIncludes.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h2 className="pack-includes-title">What we’re building toward</h2>
            <ul className="target-list">
              {festTargets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="pack-line">
              At {hq.venue} downtown.{" "}
              <a href={hq.mapsUrl} target="_blank" rel="noreferrer">
                Directions
              </a>
              .
            </p>
            <TicketNotify
              label="Be first to know when tickets are released"
              buttonLabel="Join the list"
            />
          </article>
        </div>
      </div>
    </main>
  );
}
