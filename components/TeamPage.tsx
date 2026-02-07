import React from 'react';
import { Users, Target, Rocket, Heart, Sparkles } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (view: 'landing' | 'events' | 'about' | 'team' | 'vision', hash?: string) => void;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Khalif Cooper',
    role: 'Organizer',
    image: '/images/khalif-cooper.png',
    bio: 'Software engineer passionate about community building and curating events through BLK Tech Connect. Brings a collaborative spirit and a drive to elevate underrepresented talent in tech.',
  },
  {
    name: 'Jeffrey Scruggs',
    role: 'Co-Organizer',
    image: '/images/jeffrey-scruggs.png',
    bio: 'A self-taught technologist who pivoted from traffic engineering to AI leadership. As CTO of Venture for T.H.E.M. and lead of Majestic Light Group, he builds mission-critical software while empowering HBCU founders with the tools to innovate.',
  },
  {
    name: 'Cornelius Hairston',
    role: 'Co-Organizer',
    image: '/images/cornelius-hairston.png',
    bio: 'Creative technologist and software engineer at the technology studio Use All Five. He\'s become a connector in the Baltimore tech community, supporting and engaging hundreds of people through his Baltimore Tech meetup.',
  },
  {
    name: 'Daniel Kai',
    role: 'Co-Organizer',
    image: '/images/daniel-kai.png',
    bio: 'Founder and community builder, Towson University master\'s student working at the intersection of civic engagement, technology, and culture. Building Palava Hut to help people understand and participate in the systems that shape their lives. Grounded in his Liberian heritage, he also leads Palava Hut News and Palava Night.',
  },
];

const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  return (
    <div id="team-full" className="min-h-screen bg-black pt-32 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0050FF] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="text-[#FFB404]" size={20} />
            <span className="font-mono text-xs tracking-[0.4em] text-[#0050FF] uppercase font-bold">The People // The Vision</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-extrabold uppercase tracking-tighter mb-8 leading-[0.85]">
            MEET THE <br />
            <span className="text-[#FFB404] italic">TEAM.</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed">
            The passionate builders behind Baltimore Tech Week who are committed to transforming our city's tech ecosystem.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <article 
              key={member.name} 
              className="group p-5 text-center border border-transparent hover:border-[#FFB404] transition-all duration-200"
            >
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-36 h-36 mx-auto object-cover rounded-full mb-5 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="w-36 h-36 mx-auto bg-white/10 flex items-center justify-center text-3xl font-bold text-white/30 rounded-full mb-5">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}

              <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFB404] transition-colors">{member.name}</h3>
              <p className="text-[#FFB404] text-xs font-mono uppercase tracking-wider mb-3 bg-transparent">{member.role}</p>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative overflow-hidden mb-32">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0050FF] to-transparent"></div>
        <div className="bg-gradient-to-br from-[#0050FF]/20 to-transparent py-24 border-y border-[#0050FF]/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="text-[#0050FF]" size={24} />
                  <span className="font-mono text-xs tracking-[0.4em] text-[#FFB404] uppercase font-bold">Our Mission</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-8 leading-none">
                  BUILDING <br />
                  <span className="text-[#0050FF]">BRIDGES.</span>
                </h2>
                <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light">
                  <p>
                    Our mission is to <span className="text-white font-bold">unite Baltimore's tech community</span> and create opportunities for connection, collaboration, and growth.
                  </p>
                  <p>
                    We believe that Baltimore has untapped potential waiting to be unleashed. By bringing together founders, developers, investors, and innovators, we're creating the foundation for a thriving tech ecosystem.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 border border-white/10 bg-black/50 hover:border-[#FFB404]/40 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <Sparkles className="text-[#FFB404]" size={24} />
                    <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Empower Builders</h4>
                  </div>
                  <p className="text-white/50 text-sm">Providing a platform for local innovators to showcase their work and connect with resources.</p>
                </div>
                <div className="p-6 border border-white/10 bg-black/50 hover:border-[#0050FF]/40 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <Heart className="text-[#0050FF] fill-[#0050FF]" size={24} />
                    <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Foster Community</h4>
                  </div>
                  <p className="text-white/50 text-sm">Creating meaningful connections that extend beyond a single week of events.</p>
                </div>
                <div className="p-6 border border-white/10 bg-black/50 hover:border-[#FFB404]/40 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <Rocket className="text-[#FFB404]" size={24} />
                    <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Accelerate Growth</h4>
                  </div>
                  <p className="text-white/50 text-sm">Catalyzing partnerships and investments that drive Baltimore's tech sector forward.</p>
                </div>
              </div>
            </div>
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
            onClick={() => onNavigate('about', '#about-full')}
            className="px-16 py-6 border-2 border-white/20 text-white font-mono font-bold uppercase tracking-[0.2em] text-sm hover:border-[#FFB404] hover:text-[#FFB404] transition-all active:scale-95"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
