import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { buildSummit, site, ticketsSoonLabel } from "@/lib/site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ live?: string }>;
}) {
  const params = await searchParams;
  const live = site.phase === "live" || params.live === "1";

  return (
    <>
      <HarborScene />
      <div className="editorial-flow">
        {live ? <LivePortal /> : null}

        <section className="band-paper" aria-labelledby="week-promise">
          <div className="week-wrap">
            <p className="week-kicker">
              {site.name} {site.year} · {site.dates} · Baltimore, MD
            </p>
            <h2 id="week-promise" className="week-title">
              {site.promise}
            </h2>
            <p className="week-lede">{site.sell}</p>
            <div className="week-actions">
              <button type="button" className="week-btn week-btn-closed" disabled>
                {ticketsSoonLabel}
              </button>
              <Link className="week-btn week-btn-ghost" href="/schedule">
                Schedule
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="summit-title" id="summit">
          <div className="week-wrap">
            <p className="week-kicker">Included with your pass</p>
            <h2 id="summit-title" className="week-title week-title-sm">
              {buildSummit.name}
            </h2>
            <p className="week-lede">{buildSummit.lede}</p>
            <ul className="summit-grid">
              {buildSummit.days.map((day) => (
                <li key={day.name}>
                  <p className="summit-when">{day.when}</p>
                  <h3>{day.name}</h3>
                  <p>{day.text}</p>
                </li>
              ))}
            </ul>
            <div className="week-actions">
              <Link className="week-btn" href="/tickets">
                Get the pass
              </Link>
              <Link className="week-btn week-btn-ghost" href="/schedule">
                Full schedule
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
