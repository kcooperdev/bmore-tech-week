
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'events' | 'about' | 'team', hash?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', view: 'landing', hash: '#' },
    { name: 'ABOUT', view: 'about', hash: '#about-full' },
    { name: 'EVENTS', view: 'events', hash: '#events-full' },
    { name: 'TEAM', view: 'team', hash: '#team-full' },
  ];

  const handleLinkClick = (view: any, hash: string) => {
    onNavigate(view, hash);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => handleLinkClick('landing', '#')}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <div className="bg-[#FFB404] text-[#0A0A0A] font-extrabold p-1 px-2 text-xl transform group-hover:scale-110 transition-transform">B</div>
          <span className="font-mono font-bold tracking-tighter text-sm md:text-base flex flex-col items-start text-left leading-tight">
            <span>ALTIMORE</span>
            <span className="text-[#FFB404]">_TECH_WEEK</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleLinkClick(link.view, link.hash)}
              className="font-mono text-xs hover:text-[#FFB404] transition-colors tracking-widest font-bold uppercase whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
          <a 
            href="https://www.charmcitycowork.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs hover:text-[#FFB404] transition-colors tracking-widest font-bold uppercase whitespace-nowrap"
          >
            CHARM CITY COWORK
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-white/10 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleLinkClick(link.view, link.hash)}
              className="block w-full text-left font-mono text-xs hover:text-[#FFB404] transition-colors tracking-widest py-2 font-bold uppercase"
            >
              {link.name}
            </button>
          ))}
          <a 
            href="https://www.charmcitycowork.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-left font-mono text-xs hover:text-[#FFB404] transition-colors tracking-widest py-2 font-bold uppercase"
          >
            CHARM CITY COWORK
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
