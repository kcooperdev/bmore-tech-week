import React from "react";

interface FooterProps {
  onNavigate: (
    view: "landing" | "events" | "about" | "team" | "vision",
    hash?: string
  ) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-[#FFB404] text-[#0A0A0A] font-extrabold p-1 px-2 text-xl">
                B
              </div>
              <span className="font-mono font-bold tracking-tighter text-lg flex flex-col items-start leading-tight">
                <span>ALTIMORE</span>
                <span className="text-[#FFB404]">_TECH_WEEK</span>
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

        {/* Social Media Links */}
        <div className="flex items-center gap-6 mb-10">
          <a
            href="https://www.tiktok.com/@baltimoretechweek"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FFB404] transition-colors"
            aria-label="TikTok"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/baltimoretechweekofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FFB404] transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/baltimore-tech-week"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FFB404] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
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
        <p className="text-white/40 hover:text-[#FFB404] transition-colors text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-center mt-12 pt-8 border-t border-white/5 cursor-default">
          Powered by BLK Tech Connect
        </p>
      </div>
    </footer>
  );
};

export default Footer;
