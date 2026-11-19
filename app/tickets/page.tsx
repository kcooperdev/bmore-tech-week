import { Check, Ticket } from "lucide-react";
import {
  formatPrice,
  generalAdmission,
  pageMeta,
  passIncludes,
  site,
  ticketUrl,
} from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  `Three days of tech in Baltimore. All-access pass · $75 · ${site.dates}. Kickoff, Baltimore Build Summit, and Wednesday closing event.`,
);

export default function TicketsPage() {
  const checkout = ticketUrl || undefined;

  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates} · Baltimore, MD</p>
          <h1>{site.name} {site.year}</h1>
          <p>{site.sell}</p>
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
              <a
                className="pack-btn"
                href={checkout}
                target="_blank"
                rel="noreferrer"
              >
                Get the pass
              </a>
            ) : (
              <a className="pack-btn" href={`mailto:${site.email}?subject=All-access%20pass`}>
                Get the pass
              </a>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
