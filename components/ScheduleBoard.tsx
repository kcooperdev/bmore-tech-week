"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pillars, type DayId, type Pillar } from "@/lib/site";

type Row = {
  key: string;
  when: string;
  title: string;
  where: string;
  detail: string;
  pair?: string;
  href?: string;
  tone: "hq" | "pause" | "city";
};

function rowsFor(pillar: Pillar): Row[] {
  const rows: Row[] = [];
  for (const stop of pillar.stops) {
    if (stop.places?.length) {
      for (const place of stop.places) {
        rows.push({
          key: `${stop.id}-${place.name}`,
          when: stop.when,
          title: place.name,
          where: place.line,
          detail: "",
          href: place.href,
          tone: "city",
        });
      }
      continue;
    }
    rows.push({
      key: stop.id,
      when: stop.when,
      title: stop.title,
      where: stop.where,
      detail: stop.text,
      pair: stop.pair,
      tone: stop.kind,
    });
  }
  return rows;
}

function dayFromHash(): DayId {
  const id = window.location.hash.replace("#", "");
  return pillars.some((pillar) => pillar.id === id) ? (id as DayId) : pillars[0].id;
}

export function ScheduleBoard() {
  const [day, setDay] = useState<DayId>(pillars[0].id);

  useEffect(() => {
    const sync = () => setDay(dayFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function open(id: DayId) {
    setDay(id);
    window.history.replaceState(null, "", `/schedule#${id}`);
  }

  const active = pillars.find((pillar) => pillar.id === day) ?? pillars[0];
  const rows = rowsFor(active);

  return (
    <div className="day-board is-tabs">
      <div className="day-tabs" role="tablist" aria-label="Schedule days">
        {pillars.map((pillar) => {
          const selected = pillar.id === active.id;
          return (
            <button
              key={pillar.id}
              type="button"
              className="day-tab"
              role="tab"
              id={`tab-${pillar.id}`}
              aria-selected={selected}
              aria-controls={pillar.id}
              onClick={() => open(pillar.id)}
            >
              <span className="day-tab-day">{pillar.date}</span>
              <span className="day-tab-name">{pillar.day}</span>
            </button>
          );
        })}
      </div>

      <section
        key={active.id}
        id={active.id}
        className={`day-sheet day-sheet-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
      >
        <header>
          <h2>
            {active.date} · {active.day}
          </h2>
        </header>
        <table className="day-clock">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Main Stage</th>
              <th scope="col">Workshop Studio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className={row.tone === "hq" ? undefined : `is-${row.tone}`}>
                <th scope="row">{row.when}</th>
                {row.pair !== undefined ? (
                  <>
                    <td>
                      {row.title}
                      {row.detail ? <span className="day-detail">{row.detail}</span> : null}
                    </td>
                    <td>{row.pair}</td>
                  </>
                ) : (
                  <td colSpan={2}>
                    {row.href ? <Link href={row.href}>{row.title}</Link> : row.title}
                    {row.detail ? <span className="day-detail">{row.detail}</span> : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
