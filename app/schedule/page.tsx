import Link from "next/link";
import { pageMeta, partnerEventsNote, site, weekOutline } from "@/lib/site";

export const metadata = pageMeta(
  "Schedule",
  `${site.name} runs ${site.dates} in Baltimore, MD. Kickoff, Baltimore Build Summit, and Wednesday closing event.`,
);

export default function SchedulePage() {
  return (
    <main className="plain-page schedule-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap schedule-intro">
          <div>
            <p className="week-kicker">
              {site.dates} · Baltimore, MD
            </p>
            <h1>Schedule</h1>
          </div>
          <p className="plain-lede">{site.sell}</p>
        </div>
      </header>

      <div className="plain-body">
        <div className="week-wrap">
          <div className="week-outline" role="region" aria-labelledby="week-outline-title">
            <h2 id="week-outline-title" className="sr-only">
              Week outline
            </h2>
            <table className="week-outline-table">
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Event</th>
                  <th scope="col">What to expect</th>
                </tr>
              </thead>
              <tbody>
                {weekOutline.map((row) => (
                  <tr key={row.when}>
                    <th scope="row">{row.when}</th>
                    <td>{row.event}</td>
                    <td>{row.expect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="schedule-note">{partnerEventsNote}</p>
          </div>

          <div className="week-actions">
            <Link className="week-btn" href="/tickets">
              Get the all-access pass
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
