
import React from 'react';

const WhyMatters: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-8 tracking-tighter leading-none">
              WHY THIS WEEK <span className="text-[#0050FF]">MATTERS</span>
            </h2>
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              Baltimore’s tech ecosystem is accelerating. This week gives the city a unified narrative and a shared spotlight — elevating organizers, connecting communities, and showcasing the innovation happening here.
            </p>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
             <div className="aspect-square bg-white/[0.03] border border-white/10 flex flex-col justify-center items-center p-8 group hover:bg-[#FFB400]/10 transition-colors">
                <span className="text-4xl font-extrabold text-[#FFB400] mb-2">4+</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">DAYS</span>
             </div>
             <div className="aspect-square bg-white/[0.03] border border-white/10 flex flex-col justify-center items-center p-8 group hover:bg-[#0050FF]/10 transition-colors">
                <span className="text-4xl font-extrabold text-[#0050FF] mb-2">4+</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">EVENTS</span>
             </div>
             <div className="aspect-square bg-white/[0.03] border border-white/10 flex flex-col justify-center items-center p-8 group hover:bg-[#0050FF]/10 transition-colors">
                <span className="text-4xl font-extrabold text-[#0050FF] mb-2">500+</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">ATTENDEES</span>
             </div>
             <div className="aspect-square bg-white/[0.03] border border-white/10 flex flex-col justify-center items-center p-8 group hover:bg-[#FFB400]/10 transition-colors">
                <span className="text-4xl font-extrabold text-[#FFB400] mb-2">CITY</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">WIDE</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMatters;
