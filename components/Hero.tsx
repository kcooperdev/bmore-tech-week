import React from "react";
import { ArrowRight } from "lucide-react";

// Added interface for HeroProps to include onNavigate
interface HeroProps {
  onNavigate: (
    view: "landing" | "events" | "about" | "team",
    hash?: string
  ) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grids/Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#0050FF] rounded-full blur-[180px] opacity-[0.15]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#FFB404] rounded-full blur-[180px] opacity-[0.08]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#FFB404] animate-pulse"></span>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/70">
            SYSTEM_ONLINE // FEB 23–27, 2026
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 leading-[0.9] md:leading-none uppercase">
          BALTIMORE
          <br />
          <span className="text-[#FFB404]">TECH_WEEK</span>
          <span className="block text-xl md:text-3xl font-mono text-[#0050FF] mt-4 lowercase tracking-tight"></span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-xl text-white/70 mb-12 font-light px-4">
          A community‑curated week of tech, culture, and innovation.
          Highlighting the momentum already building in Baltimore's ecosystem.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Changed <a> to <button> to use onNavigate for consistent app behavior */}
          <button
            onClick={() => onNavigate("landing", "#events")}
            className="group relative bg-[#FFB404] text-black px-10 md:px-12 py-4 md:py-5 font-mono font-bold text-sm tracking-widest uppercase flex items-center transition-all hover:scale-105 active:scale-95 glow-gold"
          >
            Explore Events
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </button>
        </div>

        <div className="mt-20 md:mt-24 flex flex-wrap justify-center gap-8 md:gap-12 opacity-30 grayscale px-4">
          <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] font-bold">
            BUILDERS
          </div>
          <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] font-bold">
            FOUNDERS
          </div>
          <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] font-bold">
            CREATIVES
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
