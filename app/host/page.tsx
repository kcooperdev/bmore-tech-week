import { ApplyForm } from "@/components/ApplyForm";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Host an Event",
  "Host your own event at your venue on Tuesday evening, April 27, 2027 during Bmore Tech Week.",
);

export default function HostPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Tuesday · April 27 · Evening · Your venue</p>
            <h1>Host an Event</h1>
            <p className="plain-lede">
              Run your own gathering on Tuesday evening at a venue you control. Meetups, demos,
              dinners, office hours, after-hours hangs. You host it. We help put it on the week’s map.
            </p>
          </header>
          <ApplyForm
            closed
            endpoint="/api/venues"
            submitLabel="Submit your event"
            successTitle="Thanks. We have your event."
            successBody="If it fits Tuesday evening, we will write you about listing it."
            fields={[
              { name: "organization", label: "Organization or group", required: true, autoComplete: "organization", step: "You" },
              { name: "contact", label: "Your name", required: true, autoComplete: "name", step: "You" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", step: "You" },
              {
                name: "concept",
                label: "What event are you hosting?",
                type: "textarea",
                required: true,
                placeholder: "What people will do, who it’s for, and why it belongs in the week",
                step: "Your event",
                wide: true,
              },
              {
                name: "day",
                label: "When",
                type: "select",
                required: true,
                options: ["Tuesday · April 27 · Evening"],
                step: "Your event",
              },
              { name: "venue", label: "Venue name", required: true, step: "Your venue" },
              { name: "address", label: "Venue address", required: true, step: "Your venue" },
              {
                name: "capacity",
                label: "About how many people?",
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
                step: "Your venue",
              },
              {
                name: "cost",
                label: "Free or paid for attendees?",
                type: "select",
                required: true,
                options: ["Free", "Paid", "Not sure yet"],
                step: "Your venue",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
