import { ApplyForm } from "@/components/ApplyForm";
import { pageMeta, pillars } from "@/lib/site";

export const metadata = pageMeta(
  "Host an Event",
  "Propose a partner event for Baltimore Tech Week, April 28–30, 2027. If it is accepted, Tech Week lists it.",
);

export default function HostPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Partner events</p>
            <h1>Host</h1>
            <p className="plain-lede">You run the night. If we accept it, we list it and point people to you.</p>
          </header>
          <ApplyForm
            closed
            endpoint="/api/venues"
            submitLabel="Submit"
            successTitle="Thanks. We have the room."
            successBody="If we accept it, we list it and point people to you."
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
                label: "Preferred day",
                type: "select",
                required: true,
                options: [...pillars.map((pillar) => `${pillar.day} — ${pillar.name}`), "No preference"],
                step: "The room",
              },
              {
                name: "time",
                label: "Preferred time",
                type: "select",
                required: true,
                options: ["Morning", "Afternoon", "Evening", "Late night"],
                placeholder: "Choose a time",
                step: "The room",
              },
              { name: "cost", label: "Free or paid", type: "select", required: true, options: ["Free", "Paid", "Not sure"], step: "The room" },
              { name: "concept", label: "What is the night?", type: "textarea", required: true, step: "The room" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
