import React from 'react';
import { TrendingUp, DollarSign, Briefcase, Building2 } from 'lucide-react';

interface VisionPageProps {
  onNavigate: (view: 'landing' | 'events' | 'about' | 'team' | 'vision', hash?: string) => void;
}

const VisionPage: React.FC<VisionPageProps> = ({ onNavigate }) => {
  return (
    <div id="vision-full" className="min-h-screen bg-black pt-32 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0050FF] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="text-[#FFB404]" size={20} />
            <span className="font-mono text-xs tracking-[0.4em] text-[#0050FF] uppercase font-bold">The Next Decade</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-extrabold uppercase tracking-tighter mb-8 leading-[0.85]">
            THE <br />
            <span className="text-[#FFB404] italic">VISION.</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed">
            Baltimore Tech Week is positioned to deliver transformational impact over the next decade.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* $300M+ */}
          <div className="p-10 border border-white/10 bg-white/[0.02] hover:border-[#FFB404]/40 transition-all">
            <DollarSign className="w-10 h-10 mb-6 text-[#FFB404]" />
            <div className="text-5xl font-black text-[#FFB404] mb-4">$300M+</div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">In New Revenue</p>
            <p className="text-white/60 text-sm leading-relaxed">
              From tourism to corporate investment, Baltimore Tech Week will inject new energy and dollars into the city's economy over the next 5–10 years.
            </p>
          </div>

          {/* 5,000+ Jobs */}
          <div className="p-10 border border-white/10 bg-white/[0.02] hover:border-[#0050FF]/40 transition-all">
            <Briefcase className="w-10 h-10 mb-6 text-[#0050FF]" />
            <div className="text-5xl font-black text-[#0050FF] mb-4">5,000+</div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">New Jobs</p>
            <p className="text-white/60 text-sm leading-relaxed">
              A thriving tech ecosystem means opportunities from startups to enterprise expansions that directly benefit Baltimore residents.
            </p>
          </div>

          {/* 100+ Companies */}
          <div className="p-10 border border-white/10 bg-white/[0.02] hover:border-[#FFB404]/40 transition-all">
            <Building2 className="w-10 h-10 mb-6 text-[#FFB404]" />
            <div className="text-5xl font-black text-[#FFB404] mb-4">100+</div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">New Companies</p>
            <p className="text-white/60 text-sm leading-relaxed">
              By showcasing the city's talent, affordability, and culture, Baltimore Tech Week will attract companies that want to build here, hire here, and stay here.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="relative p-10 border-l-2 border-[#FFB404] bg-white/[0.02]">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            The goal is simple: make Baltimore a place where people want to start companies.
          </h3>
          <p className="text-white/60 leading-relaxed">
            Not because of tax breaks or incentives. Because there's talent here, community here, and momentum here. Tech Week is one piece of that. We're betting on this city because we've seen what's already happening—and we think the next decade is ours.
          </p>
        </div>
      </div>

      {/* Yellow Impact Band */}
      <div className="relative overflow-hidden mb-32">
        <div className="bg-[#FFB404] py-24 transform skew-y-1">
          <div className="transform -skew-y-1 max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter mb-6">
              CHARM CITY <span className="text-white" style={{ WebkitTextStroke: '2px black' }}>RISING.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-black font-bold text-xl leading-tight">
              Join us in building a tech ecosystem that represents the best of Baltimore—innovative, inclusive, and unstoppable.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#0050FF]/10 blur-[120px] rounded-full"></div>
        <p className="font-mono text-sm tracking-[0.5em] text-white/40 uppercase mb-8 relative z-10">Join the Movement</p>
        <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
          <button
            onClick={() => onNavigate('events', '#events-full')}
            className="px-16 py-6 bg-[#0050FF] text-white font-mono font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all glow-blue active:scale-95"
          >
            See the Events
          </button>
          <button
            onClick={() => onNavigate('team', '#team-full')}
            className="px-16 py-6 border-2 border-white/20 text-white font-mono font-bold uppercase tracking-[0.2em] text-sm hover:border-[#FFB404] hover:text-[#FFB404] transition-all active:scale-95"
          >
            Meet the Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
