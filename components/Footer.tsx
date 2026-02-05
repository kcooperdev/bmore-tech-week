import React from "react";

interface FooterProps {
  onNavigate: (view: "landing" | "events" | "about" | "team", hash?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-[#FFB400] text-black font-extrabold p-1 px-2 text-xl">
                B
              </div>
              <span className="font-mono font-bold tracking-tighter text-lg">
                BALTIMORE<span className="text-[#FFB400]">_TECH_WEEK</span>
                <span className="text-[#0050FF] ml-1 text-sm">
                </span>
              </span>
            </div>
            <p className="text-white/40 font-mono text-xs tracking-widest mb-6 uppercase font-bold">
              FEBRUARY 23–27, 2026
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              A community‑curated week of tech, culture, and innovation. Built
              to amplify the momentum of Baltimore's tech ecosystem.
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
          <div>
            <p className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-2">
              © 2026 Baltimore Tech Week.
            </p>
            <p className="text-white/20 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em]">
              Made in Baltimore.
            </p>
          </div>
          <div className="max-w-xl md:text-right">
            <p className="text-[#0050FF] text-[11px] md:text-sm font-mono uppercase tracking-[0.1em] font-black leading-relaxed">
              Disclaimer: This is a community‑curated calendar. All events are
              independently organized by their respective hosts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
