"use client";

import { useEffect, useState } from "react";
import { Check, Moon, Sun } from "lucide-react";
import { eveningPass, formatPrice, generalAdmission, pillars } from "@/lib/site";

type PassId = "general" | "evening";

function passFromHash(): PassId {
  return window.location.hash.replace("#", "") === "evening" ? "evening" : "general";
}

export function TicketBoard() {
  const [pass, setPass] = useState<PassId>("general");

  useEffect(() => {
    const sync = () => setPass(passFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function open(id: PassId) {
    setPass(id);
    window.history.replaceState(null, "", `/tickets#${id}`);
  }

  return (
    <div className="pass-board">
      <div className="day-tabs pass-tabs" role="tablist" aria-label="Ticket type">
        <button
          type="button"
          className="day-tab"
          role="tab"
          id="general"
          aria-selected={pass === "general"}
          aria-controls="panel-general"
          onClick={() => open("general")}
        >
          <Sun size={16} strokeWidth={2.25} aria-hidden="true" />
          <span className="day-tab-day">Day and night</span>
          <span className="day-tab-name">General</span>
        </button>
        <button
          type="button"
          className="day-tab"
          role="tab"
          id="evening"
          aria-selected={pass === "evening"}
          aria-controls="panel-evening"
          onClick={() => open("evening")}
        >
          <Moon size={16} strokeWidth={2.25} aria-hidden="true" />
          <span className="day-tab-day">One night</span>
          <span className="day-tab-name">Evening Pass</span>
        </button>
      </div>

      {pass === "general" ? (
        <article className="pack pack-ga" id="panel-general" role="tabpanel" aria-labelledby="general">
          <p className="pack-name">
            <Sun size={18} strokeWidth={2.25} aria-hidden="true" />
            {generalAdmission.name}
          </p>
          <p className="pack-price">{formatPrice(generalAdmission.price)}</p>
          <ul className="pack-rows">
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>Three full days at 4MLK</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>All panels, talks, and workshops</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>The expo floor</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>All three evening mixers</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>Breakfast</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>Coffee and water all day</span>
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>1 drink at any mixer</span>
            </li>
          </ul>
          <button type="button" className="pack-btn" disabled>
            Get Tickets
          </button>
          <p className="pack-closed">Not open yet.</p>
        </article>
      ) : (
        <section className="night-show" id="panel-evening" role="tabpanel" aria-labelledby="evening">
          <header className="night-show-head">
            <p className="night-show-kicker">
              <Moon size={16} strokeWidth={2.25} aria-hidden="true" />
              {eveningPass.name}
            </p>
            <p className="night-show-price">{formatPrice(eveningPass.price)}</p>
            <p className="night-show-line">One night. First drink in.</p>
            <p className="night-show-note">Pick one, two, or all three.</p>
          </header>
          <ul className="night-posters">
            {pillars.map((pillar) => (
              <li key={pillar.id}>
                <p>
                  {pillar.day} · {pillar.date} · 5:30pm
                </p>
                {pillar.night.startsWith("Bmore Tech") ? null : <p className="night-brand">Bmore Tech</p>}
                <h3>{pillar.night}</h3>
              </li>
            ))}
          </ul>
          <div className="night-show-cta">
            <button type="button" className="pack-btn" disabled>
              Get Tickets
            </button>
            <p className="pack-closed">Not open yet.</p>
          </div>
        </section>
      )}
    </div>
  );
}
