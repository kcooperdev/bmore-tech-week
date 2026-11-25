import { ApplyForm } from "@/components/ApplyForm";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Host a Room",
  "Offer a room for a partner-hosted evening on Tuesday, April 27, 2027 during Bmore Tech Week.",
);

export default function HostPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Tuesday · April 27 · After 5:30</p>
            <h1>Host a Room</h1>
            <p className="plain-lede">
              We’re recruiting partner venues for Tuesday evening only.
            </p>
          </header>
          <ApplyForm
            closed
            endpoint="/api/venues"
            submitLabel="Submit"
            successTitle="Thanks. We have the room."
            successBody="If a Tuesday partner evening can live here, we will write you."
            fields={[
              { name: "organization", label: "Organization", required: true, autoComplete: "organization", step: "You" },
              { name: "contact", label: "Your name", required: true, autoComplete: "name", step: "You" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", step: "You" },
              { name: "venue", label: "Venue", required: true, step: "The room" },
              { name: "address", label: "Address", required: true, step: "The room" },
              {
                name: "capacity",
                label: "How many people?",
                type: "select",
                required: true,
                choices: [
                  { value: "25", label: "Under 30" },
                  { value: "50", label: "30–75" },
                  { value: "100", label: "75–150" },
                  { value: "200", label: "150–300" },
                  { value: "400", label: "300+" },
                ],
                placeholder: "Choose a size",
                step: "The room",
              },
              {
                name: "day",
                label: "Night",
                type: "select",
                required: true,
                options: ["Tuesday · April 27"],
                step: "The room",
              },
              { name: "cost", label: "Free or paid", type: "select", required: true, options: ["Free", "Paid", "Not sure"], step: "The room" },
              { name: "concept", label: "What should we know about the room?", type: "textarea", required: true, step: "The room" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
