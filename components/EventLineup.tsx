
import React from 'react';
import { EVENTS } from '../constants';
import EventCard from './EventCard';

interface Props {
  onSeeAll: () => void;
}

const EventLineup: React.FC<Props> = ({ onSeeAll }) => {
  // Only show the first 4 events
  const featuredEvents = EVENTS.slice(0, 4);

  return (
    <section id="events" className="py-24 bg-black relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase leading-none">
              FEATURED <span className="text-[#0050FF]">EVENTS</span>
            </h2>
            <p className="mt-4 font-mono text-xs tracking-widest text-white/40">Curated highlights for the week.</p>
          </div>
          <button
            onClick={onSeeAll}
            className="font-mono text-xs text-white/60 hover:text-[#FFB404] flex items-center tracking-widest uppercase group transition-colors"
          >
            View Full Schedule
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Grid - 2x2 Layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {featuredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventLineup;
