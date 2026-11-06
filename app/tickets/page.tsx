import { TicketBoard } from "@/components/TicketBoard";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Tickets",
  "Be in the room. $79 for three days at 4MLK and all three mixers. $45 a night for Connected Night, Built Night, or Bmore Tech Night. Pick one, two, or all three.",
);

export default function TicketsPage() {
  return (
    <main className="plain-page">
      <div className="week-wrap packs">
        <header className="packs-head" id="main">
          <p className="week-kicker">{site.dates}</p>
          <h1>Tickets</h1>
          <p>{site.ticketLine}</p>
        </header>
        <TicketBoard />
      </div>
    </main>
  );
}
