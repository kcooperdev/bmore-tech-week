import Link from "next/link";
import { hq, pillars, schedule, site, type DayStop, type ScheduleItem } from "@/lib/site";

function Item({ item }: { item: ScheduleItem | undefined }) {
  if (!item) {
    return <p>Nothing posted yet.</p>;
  }
  return (
    <div className="mt-3">
      <p>{item.time}</p>
      <p>{item.title}</p>
      <p>{item.venue}</p>
    </div>
  );
}

function Stop({ stop }: { stop: DayStop | undefined }) {
  if (!stop) return <p>Nothing posted yet.</p>;
  return (
    <div className="mt-3">
      <p>{stop.when}</p>
      <p>{stop.title}</p>
      <p>{stop.where}</p>
    </div>
  );
}

function StopList({ stops }: { stops: DayStop[] }) {
  if (stops.length === 0) return <p>Nothing posted yet.</p>;
  return (
    <ul className="mt-3 space-y-3">
      {stops.map((stop) => (
        <li key={stop.id}>
          <p>{stop.when}</p>
          <p>{stop.title}</p>
          <p>{stop.where}</p>
        </li>
      ))}
    </ul>
  );
}

function List({ items }: { items: ScheduleItem[] }) {
  if (items.length === 0) {
    return <p>Nothing posted yet.</p>;
  }
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.time}</p>
          <p>{item.title}</p>
          <p>{item.venue}</p>
        </li>
      ))}
    </ul>
  );
}

export function LivePortal() {
  const day = pillars.find((pillar) => pillar.id === site.liveDay) ?? pillars[0];
  const today = schedule.filter((item) => item.day === day.id);
  const hqStops = day.stops.filter((stop) => stop.kind === "hq");
  const cityStops = day.stops.filter((stop) => stop.kind === "city");
  const nightStop = [...day.stops].reverse().find((stop) => stop.kind === "hq");

  return (
    <section className="band-ink" aria-label="Happening during Tech Week">
      <div className="week-wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="week-kicker">Today · {day.day}</p>
            <h2 className="week-title">{day.name}</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href={`/schedule#${day.id}`} className="underline underline-offset-4">
              View today&apos;s schedule
            </Link>
            <a href={hq.mapsUrl} className="underline underline-offset-4" target="_blank" rel="noreferrer">
              Directions to 4MLK
            </a>
          </div>
        </div>
        <div className="live-grid">
          <article>
            <h3>Happening now</h3>
            {today[0] ? <Item item={today[0]} /> : <Stop stop={hqStops[0]} />}
          </article>
          <article>
            <h3>Up next</h3>
            {today[1] ? <Item item={today[1]} /> : <Stop stop={hqStops[1]} />}
          </article>
          <article>
            <h3>At 4MLK</h3>
            {today.some((item) => item.place === "hq") ? (
              <List items={today.filter((item) => item.place === "hq")} />
            ) : (
              <StopList stops={hqStops} />
            )}
          </article>
          <article>
            <h3>Around Baltimore</h3>
            {today.some((item) => item.place === "partner") ? (
              <List items={today.filter((item) => item.place === "partner")} />
            ) : (
              <StopList stops={cityStops} />
            )}
            <Link href="/around-baltimore">Partner events</Link>
          </article>
          <article>
            <h3>Tonight</h3>
            {today.some((item) => item.part === "evening") ? (
              <List items={today.filter((item) => item.part === "evening")} />
            ) : (
              <StopList stops={[nightStop, ...cityStops].filter((stop): stop is DayStop => Boolean(stop))} />
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
