import React from "react";
import {
  Heart,
  Rocket,
  Terminal,
  Code,
  Cpu,
  Sparkles,
  Coffee,
  MapPin,
  Zap,
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (
    view: "landing" | "events" | "about" | "team",
    hash?: string
  ) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div
      id="about-full"
      className="min-h-screen bg-black pt-32 pb-24 overflow-x-hidden"
    >
      {/* Intro Hero with extra "fun" accents */}
      <div className="max-w-7xl mx-auto px-6 mb-24 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFB404] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="text-[#FFB404]" size={20} />
            <span className="font-mono text-xs tracking-[0.4em] text-[#0050FF] uppercase font-bold">
              EST. 2026 // CHARM CITY
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-extrabold uppercase tracking-tighter mb-8 leading-[0.85]">
            BUILT WITH <br />
            PURE <span className="text-[#FFB404] italic">CHARM.</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed mb-10">
            Baltimore Tech Week is a{" "}
            <span className="text-[#0050FF] font-bold">
              community-powered movement
            </span>{" "}
            celebrating the builders, founders, and creatives who make this city
            pulse with innovation.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest flex items-center">
              <Cpu size={14} className="mr-2 text-[#FFB404]" /> Hardware & IoT
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest flex items-center">
              <Code size={14} className="mr-2 text-[#0050FF]" /> Software Dev
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest flex items-center">
              <Coffee size={14} className="mr-2 text-[#FFB404]" /> Community
            </div>
            <div className="px-4 py-2 bg-[#0050FF]/20 border border-[#0050FF]/50 font-mono text-[10px] uppercase tracking-widest flex items-center">
              <Zap size={14} className="mr-2 text-white" /> Innovation
            </div>
          </div>
        </div>
      </div>

      {/* Baltimore Image Section - National Aquarium at Night by Brendan Beale */}
      <div className="w-full relative h-[500px] md:h-[800px] overflow-hidden mb-24 border-y border-white/10">
        <img
          src="/images/about-baltimore.jpg"
          alt="Baltimore Inner Harbor"
          className="w-full h-full object-cover opacity-100 transition-all duration-1000 scale-105 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>

        <div className="absolute bottom-20 left-6 md:left-24 max-w-xl z-10">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin size={16} className="text-[#FFB404]" />
            <p className="font-mono text-xs tracking-[0.5em] text-white uppercase font-bold">
              39.2904° N, 76.6122° W
            </p>
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            THIS IS <br />
            <span className="text-[#0050FF]">OUR CITY.</span>
          </h2>
          <div className="flex space-x-4">
            <div className="w-16 h-1 bg-[#FFB404]"></div>
            <div className="w-16 h-1 bg-white"></div>
            <div className="w-16 h-1 bg-[#0050FF]"></div>
          </div>
        </div>
      </div>

      {/* Manifesto / The "Why" - Community Driven */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 mb-32 items-center">
        <div>
          <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-8 leading-none">
            A MOVEMENT, <br />
            <span className="text-[#FFB404]">NOT A MEETING.</span>
          </h3>
          <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light">
            <p>
              We believe the best tech scenes aren't bought—they're built. By
              us.
            </p>
            <p>
              This is a grassroot celebration of the{" "}
              <span className="text-white font-bold">
                engineers, hackers, and founders
              </span>{" "}
              who make Baltimore tick. No corporate agendas. No gatekeepers.
              Just an open platform for the community to connect, collaborate,
              and showcase the raw talent that defines our city.
            </p>
            <p className="bg-white/5 border-l-4 border-[#0050FF] p-6 text-white text-base md:text-lg italic">
              "This isn't just about tech; it's about the grit, the soul, and
              the charm that makes Baltimore a global powerhouse for
              innovation."
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 border border-white/5 bg-white/[0.02] hover:border-[#FFB404]/40 transition-all group">
            <div className="text-[#FFB404] text-3xl font-mono font-black mb-6 group-hover:scale-110 transition-transform">
              &gt;_
            </div>
            <h4 className="font-mono text-base font-bold uppercase mb-4 tracking-widest">
              Open Spirit
            </h4>
            <p className="text-white/40 text-sm">
              No walls. No VIP lists. We're tearing down silos to connect the
              city's brightest minds directly to one another.
            </p>
          </div>
          <div className="p-8 border border-white/5 bg-white/[0.02] hover:border-[#0050FF]/40 transition-all group">
            <Rocket
              className="text-[#0050FF] mb-6 group-hover:scale-110 transition-transform"
              size={32}
            />
            <h4 className="font-mono text-base font-bold uppercase mb-4 tracking-widest">
              High Energy
            </h4>
            <p className="text-white/40 text-sm">
              We're not just networking; we're building. This week is a catalyst
              for the city's future.
            </p>
          </div>
          <div className="p-8 border border-white/5 bg-white/[0.02] hover:border-[#FFB404]/40 transition-all group sm:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#FFB404]/20 flex items-center justify-center">
                <Heart className="text-[#FFB404] fill-[#FFB404]" size={20} />
              </div>
              <h4 className="font-mono text-base font-bold uppercase tracking-widest">
                Built with Grit
              </h4>
            </div>
            <p className="text-white/40 text-sm">
              Baltimore has a specific kind of hustle. We celebrate the unique
              culture that makes this city's tech scene unlike any other.
            </p>
          </div>
        </div>
      </div>

      {/* Fun Section with "Energy" */}
      <div className="relative overflow-hidden mb-32">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB404] to-transparent"></div>
        <div className="bg-[#FFB404] py-32 transform skew-y-1">
          <div className="transform -skew-y-1 max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter mb-8">
              <span
                className="text-white stroke-black"
                style={{ WebkitTextStroke: "2px black" }}
              >
                BUT IMPACTFUL.
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-black font-bold text-xl md:text-2xl leading-tight">
              We're building a tech ecosystem that looks like Baltimore—bold,
              diverse, and unapologetically visionary.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB404] to-transparent"></div>
      </div>

      {/* Final Call to Action */}
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#0050FF]/10 blur-[120px] rounded-full"></div>
        <p className="font-mono text-sm tracking-[0.5em] text-white/40 uppercase mb-8 relative z-10">
          THE MOVEMENT STARTS HERE
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
          <button
            onClick={() => onNavigate("events", "#events-full")}
            className="px-16 py-6 bg-[#0050FF] text-white font-mono font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all glow-blue active:scale-95"
          >
            See the Full Schedule
          </button>
        </div>
        <div className="mt-24 flex flex-wrap justify-center gap-12 opacity-30 grayscale">
          <div className="font-mono text-[10px] uppercase tracking-widest">
            #BmoreTech
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest">
            #CharmCityBuilt
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest">
            #InnovationForAll
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
