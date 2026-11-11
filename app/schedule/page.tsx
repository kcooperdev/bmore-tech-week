import Link from "next/link";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Schedule",
  "Bmore Tech Fest runs April 26–28, 2027 at 4MLK, Baltimore. Full schedule goes up when speakers are announced.",
);

export default function SchedulePage() {
  return (
    <main className="plain-page schedule-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap schedule-intro">
          <div>
            <p className="week-kicker">
              {site.dates} · 4MLK, Baltimore
            </p>
            <h1>Schedule</h1>
          </div>
          <p className="plain-lede">
            Three days at 4MLK. Daytime talks, panels, and workshops. Networking events after 5:30.
          </p>
        </div>
      </header>

      <div className="plain-body">
        <div className="week-wrap narrow-copy">
          <p>
            The full timetable goes up when speakers and rooms are locked. Session titles will land here as they are
            confirmed.
          </p>

          <div className="week-actions">
            <p className="pass-line">$99 conference pass. Join the list before tickets open.</p>
            <Link className="week-btn" href="/tickets">
              Join the list
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
