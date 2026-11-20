import { Check, Ticket } from "lucide-react";
import { PassInterest } from "@/components/PassInterest";
import {
  formatPrice,
  generalAdmission,
  pageMeta,
  passIncludes,
  site,
  speakersAnnounce,
  ticketUrl,
  ticketsSoonHint,
} from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  `${site.promise} All-access pass · $75 · ${site.dates}. ${speakersAnnounce}.`,
);

export default function TicketsPage() {
  const checkout = ticketUrl || undefined;

  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates} · Baltimore, MD</p>
          <h1>{site.promise}</h1>
          <p>{site.sell}</p>
          <p className="home-speakers-note">{speakersAnnounce}</p>
        </header>

        <div className="packs-grid packs-single">
          <article className="pack pack-ga">
            <p className="pack-name">
              <Ticket size={18} strokeWidth={2.25} aria-hidden="true" />
              {generalAdmission.name}
            </p>
            <p className="pack-price">{formatPrice(generalAdmission.price)}</p>
            <h2 className="pack-includes-title">What your all-access pass includes</h2>
            <ul className="pack-rows">
              {passIncludes.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {checkout ? (
              <a className="pack-btn" href={checkout} target="_blank" rel="noreferrer">
                Get the pass
              </a>
            ) : (
              <div className="pack-waitlist">
                <p className="pack-waitlist-label">{ticketsSoonHint}</p>
                <PassInterest id="pass-list" />
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
