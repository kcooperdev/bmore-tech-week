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
              <span className="day-tab-day">{pillar.day}</span>
              <span className="day-tab-name">{pillar.name.replace("Bmore ", "")}</span>
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
          <p className="day-sheet-date">
            {active.day} · {active.date}
          </p>
          <h2>{active.name}</h2>
          <p>{active.tagline}</p>
        </header>
        <ol className="day-rows">
          {rows.map((row) => (
            <li key={row.key} className={row.tone === "hq" ? undefined : `is-${row.tone}`}>
              <time>{row.when}</time>
              <div className="day-main">
                {row.href ? (
                  <Link href={row.href}>
                    <strong>{row.title}</strong>
                  </Link>
                ) : (
                  <strong>{row.title}</strong>
                )}
                {row.detail ? <span className="day-detail">{row.detail}</span> : null}
              </div>
              <span className="day-place">{row.where}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
