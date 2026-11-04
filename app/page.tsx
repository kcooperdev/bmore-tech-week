import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { pillars, site } from "@/lib/site";

const panelClass = {
  wednesday: "day-panel day-panel-connect",
  thursday: "day-panel day-panel-build",
  friday: "day-panel day-panel-opportunity",
} as const;

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
              {site.dates} · {site.when}
            </p>
            <h2 id="week-promise" className="week-title">
              {site.promise}
            </h2>
            <p className="week-lede">
              {site.room} {site.positioning}
            </p>
            <p className="pass-line">{site.passes}</p>
            <div className="day-panels">
              {pillars.map((pillar) => (
                <Link key={pillar.id} className={panelClass[pillar.id]} href={`/schedule#${pillar.id}`}>
                  <div className="day-panel-copy">
                    <p className="day-panel-day">{pillar.day}</p>
                    <h3>{pillar.name}</h3>
                    <p className="day-panel-q">{pillar.question}</p>
                  </div>
                  <span className="day-panel-go" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M5 12h12M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
