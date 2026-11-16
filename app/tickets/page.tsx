import { Check } from "lucide-react";
import { TicketNotify } from "@/components/TicketNotify";
import { pageMeta, passIncludes, site } from "@/lib/site";

export const metadata = pageMeta(
  "Join the list",
  "Join the Bmore Tech Fest list for April 26–28, 2027 at 4MLK, Baltimore. We’ll write when passes open. No ticket sales yet.",
);

export default function TicketsPage() {
  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates} · 4MLK, Baltimore</p>
          <h1>Join the list</h1>
          <p>
            Meet founders, engineers, creators, students, and technology leaders from across Baltimore and the DMV.
            Spend three days exploring ideas, getting hands-on in workshops, and talking shop with people you could work
            with, learn from, or build alongside.
          </p>
          <p className="pass-line">Be part of year one. {site.passNote}</p>
        </header>

        <div className="packs-grid packs-single">
          <article className="pack pack-ga">
            <p className="pack-name">What happens when you’re in the room</p>
            <ul className="pack-rows">
              {passIncludes.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <TicketNotify
              label="No ticket sales yet. Leave your email and we’ll write when passes open."
              buttonLabel={site.passes}
            />
          </article>
        </div>
      </div>
    </main>
  );
}
