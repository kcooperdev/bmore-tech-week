import Link from "next/link";
import { ScheduleBoard } from "@/components/ScheduleBoard";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Schedule",
  "April 27–29, 2027. Tuesday, Wednesday, Thursday at 4MLK.",
);

export default function SchedulePage() {
  return (
    <main className="plain-page schedule-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap schedule-intro">
          <div>
            <p className="week-kicker">{site.dates}</p>
            <h1>Schedule</h1>
          </div>
          <p className="plain-lede">
            One building. Mixers at 5:30pm. Talks go up when booked.
          </p>
        </div>
      </header>

      <div className="plain-body">
        <div className="week-wrap">
          <ScheduleBoard />

          <div className="week-actions">
            <p className="pass-line">$99 for the whole fest. On sale later.</p>
            <Link className="week-btn" href="/tickets">
              Tickets
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
