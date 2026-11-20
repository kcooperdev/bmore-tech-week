import Link from "next/link";
import { ScheduleBoard } from "@/components/ScheduleBoard";
import { pageMeta, site, speakersAnnounce } from "@/lib/site";

export const metadata = pageMeta(
  "Schedule",
  `${site.name} runs ${site.dates} in Baltimore, MD. ${speakersAnnounce}.`,
);

export default function SchedulePage() {
  return (
    <main className="plain-page schedule-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap schedule-intro">
          <div>
            <p className="week-kicker">{site.dates} · Baltimore, MD</p>
            <h1>Schedule</h1>
          </div>
          <p className="plain-lede">{site.sell}</p>
        </div>
      </header>

      <div className="plain-body">
        <div className="week-wrap">
          <p className="home-speakers-note">{speakersAnnounce}</p>
          <ScheduleBoard />

          <div className="week-actions">
            <Link className="week-btn" href="/tickets">
              Join the list
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
