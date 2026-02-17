import React from "react";
import { Calendar, Clock, ArrowUpRight, MapPin } from "lucide-react";
import { TechEvent } from "../types";

interface Props {
  event: TechEvent;
}

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className="relative group h-full flex flex-col p-8 border border-[#FFB404]/30 bg-black hover:border-[#FFB404] transition-all duration-300">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB404]"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFB404]"></div>

      <div className="flex justify-end items-start mb-6">
        <ArrowUpRight
          className="text-white/30 group-hover:text-[#FFB404] transition-colors"
          size={20}
        />
      </div>

      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[#FFB404] transition-colors leading-tight">
        {event.title}
      </h3>

      <div className="space-y-3 mb-8">
        <div className="flex items-center text-white/50 text-sm font-mono">
          <Calendar size={14} className="mr-2 text-[#0050FF]" />
          {event.date}
        </div>
        {event.time && (
          <div className="flex items-center text-white/50 text-sm font-mono">
            <Clock size={14} className="mr-2 text-[#0050FF]" />
            {event.time}
          </div>
        )}
        {event.location && (
          <div className="flex items-center text-white/50 text-sm font-mono">
            <MapPin size={14} className="mr-2 text-[#FFB404]" />
            {event.locationLink ? (
              <a
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {event.location}
              </a>
            ) : (
              event.location
            )}
          </div>
        )}
      </div>

      <p className="text-white/60 text-sm font-light mb-8 flex-grow leading-relaxed">
        {event.description}
      </p>

      <a
        href={event.link}
        target={event.link.startsWith("http") ? "_blank" : "_self"}
        rel={event.link.startsWith("http") ? "noopener noreferrer" : ""}
        className="inline-block py-3 text-center font-mono text-xs tracking-[0.2em] uppercase transition-all border border-white/10 text-white hover:bg-[#FFB404] hover:text-black hover:border-[#FFB404] hover:font-bold"
      >
        Learn More
      </a>
    </div>
  );
};

export default EventCard;
