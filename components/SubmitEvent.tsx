
import React from 'react';
import { Plus } from 'lucide-react';

const SubmitEvent: React.FC = () => {
  return (
    <section id="submit" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-8 tracking-tighter">
          ADD YOUR <span className="text-[#FFB404]">EVENT</span>
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-12 font-light max-w-2xl mx-auto">
          Hosting something during February 23–27? Add it to the community calendar. 
          All tech, innovation, startup, creative, and ecosystem‑building events are welcome.
        </p>
        <button className="bg-white text-black font-mono font-bold text-sm tracking-widest px-10 py-5 uppercase hover:bg-[#FFB404] transition-colors flex items-center mx-auto group">
          <Plus className="mr-2 group-hover:rotate-90 transition-transform" />
          Submit an Event
        </button>
      </div>
    </section>
  );
};

export default SubmitEvent;
