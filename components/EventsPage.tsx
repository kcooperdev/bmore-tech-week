import React, { useState, useMemo } from "react";
import { EVENTS } from "../constants";
import EventCard from "./EventCard";

const DATES = [
  "All",
  "February 23",
  "February 24",
  "February 25",
  "February 26",
  "February 27",
];

// Added interface for EventsPageProps to include onNavigate
interface EventsPageProps {
  onNavigate: (
    view: "landing" | "events" | "about" | "team",
    hash?: string
  ) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [activeDate, setActiveDate] = useState("All");

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      return activeDate === "All" || event.date === activeDate;
    });
  }, [activeDate]);

  return (
    <section id="events-full" className="min-h-screen pt-32 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter mb-6">
            FULL <span className="text-[#0050FF]">SCHEDULE</span>
          </h1>
          <p className="text-white/50 font-mono text-sm tracking-widest uppercase">
            FEB 24 – FEB 27 // CURATED ECOSYSTEM CALENDAR
          </p>
        </div>

        {/* Simplified Filters Bar - Date only */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between border-b border-white/10 pb-10">
          <div className="flex flex-wrap gap-2">
            {DATES.map((date) => (
              <button
                key={date}
                onClick={() => setActiveDate(date)}
                className={`px-6 py-2.5 font-mono text-[10px] tracking-widest uppercase border transition-all ${
                  activeDate === date
                    ? "bg-[#FFB404] text-black border-[#FFB404] font-bold shadow-[0_0_15px_rgba(255,180,0,0.2)]"
                    : "border-white/10 hover:border-white/30 text-white/60"
                }`}
              >
                {date === "All" ? "Full Week" : date.split(" ")[1]}
              </button>
            ))}
          </div>

          <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
            {filteredEvents.length} EVENT
            {filteredEvents.length !== 1 ? "S" : ""} FOUND
          </div>
        </div>

        {/* Grid Results */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-white/10">
            <p className="font-mono text-white/30 uppercase tracking-[0.3em]">
              No events scheduled for this day yet.
            </p>
          </div>
        )}

        {/* Unofficial Disclaimer Reminder - Highlighted Bold */}
        <div className="mt-20 p-8 border border-[#FFB404] bg-[#FFB404]/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FFB404]"></div>
          <p className="text-white text-base font-bold text-center font-mono tracking-tight uppercase">
            <span className="text-[#FFB404]">Disclaimer:</span> This is a
            community‑curated calendar. All events are independently organized
            by their respective hosts. Please verify individual registration
            links for details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
