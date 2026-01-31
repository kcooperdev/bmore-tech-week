import React from 'react';
import { ShieldCheck, Users, Zap, Search, ChevronRight } from 'lucide-react';

const About: React.FC = () => {
  const points = [
    { icon: <ShieldCheck className="text-[#0050FF]" size={24} />, title: "Independent events", desc: "Organized by the community, for the community. We support the builders directly." },
    { icon: <Users className="text-[#FFB400]" size={24} />, title: "Community-driven", desc: "Built on grassroots energy. This is a spotlight on existing city momentum." },
    { icon: <Zap className="text-[#0050FF]" size={24} />, title: "Open to all", desc: "Inclusion is at our core. From students to VCs, everyone has a seat at the table." },
    { icon: <Search className="text-[#FFB400]" size={24} />, title: "Built to highlight", desc: "Spotlighting the innovators and underground builders making real waves." }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505] relative border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Header Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-12 lg:mb-0 z-10">
            <h2 className="text-4xl md:text-6xl xl:text-7xl font-extrabold mb-8 uppercase tracking-tighter leading-[0.9] md:leading-none">
              WHAT IS <br/>
              <span className="text-[#FFB400]">BALTIMORE</span> <br/>
              <span className="text-[#0050FF]">TECH_WEEK?</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-light">
              <p>
                Baltimore Tech Week (Unofficial) is a curated collection of independent tech events happening across the city from February 24–27. 
              </p>
              
              <div className="border-l-4 border-[#0050FF] pl-6 md:pl-8 py-2 bg-white/[0.02]">
                <p className="italic text-white text-xl md:text-2xl mb-2 font-serif">
                  "This is not an official organization — it’s a community-powered spotlight on the momentum already building in Baltimore’s tech ecosystem."
                </p>
              </div>
              <p className="font-mono text-[#FFB400] font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                We amplify. We connect. We celebrate.
              </p>
            </div>
          </div>

          {/* Content Cards Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-0">
            {points.map((point, i) => (
              <div key={i} className="p-8 md:p-10 border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/[0.05] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 transform group-hover:-translate-y-1 transition-transform inline-block">{point.icon}</div>
                <h3 className="font-mono text-sm md:text-base font-bold uppercase tracking-widest mb-4 flex items-center">
                  {point.title}
                  <ChevronRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#FFB400]" />
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">{point.desc}</p>
              </div>
            ))}
            
            <div className="sm:col-span-2 mt-4 md:mt-8 p-8 md:p-10 bg-[#0050FF]/5 border border-[#0050FF]/20 relative">
              <h4 className="font-mono text-[10px] md:text-xs tracking-widest text-[#0050FF] uppercase mb-4 font-bold">THE MISSION</h4>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Our goal is to create a unified narrative for Baltimore's builders. By aggregating the scattered energy of our city into one week, we show the world that Charm City isn't just a tech hub—it's a movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;