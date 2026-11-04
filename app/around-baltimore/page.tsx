import { PageHeader } from "@/components/PageHeader";
import { PartnerBoard } from "@/components/PartnerBoard";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Around Baltimore",
  "Nights around Baltimore during Tech Week. A time and an RSVP go up when a room is ready.",
);

export default function AroundBaltimorePage() {
  return (
    <main className="plain-page">
      <PageHeader
        eyebrow="After 5"
        title="Around Baltimore"
        lede="The pass is 4MLK. These are the rooms the nights are headed toward. A time and an RSVP go up when the night is real."
      />
      <div className="plain-body">
        <div className="week-wrap">
          <PartnerBoard />
        </div>
      </div>
    </main>
  );
}
