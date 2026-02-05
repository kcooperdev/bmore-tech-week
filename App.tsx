import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import EventLineup from "./components/EventLineup";
import WhyMatters from "./components/WhyMatters";
import Footer from "./components/Footer";
import EventsPage from "./components/EventsPage";
import AboutPage from "./components/AboutPage";
import TeamPage from "./components/TeamPage";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "landing" | "events" | "about" | "team"
  >("landing");

  // Sync state with URL hash for a better UX
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#events-full") {
        setCurrentView("events");
      } else if (hash === "#about-full") {
        setCurrentView("about");
      } else if (hash === "#team-full") {
        setCurrentView("team");
      } else {
        setCurrentView("landing");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (
    view: "landing" | "events" | "about" | "team",
    hash: string = ""
  ) => {
    setCurrentView(view);

    // Safely attempt to update location hash
    try {
      if (hash) {
        window.location.hash = hash;
      } else if (window.location.hash) {
        // Clear hash if navigating to landing without specific hash
        window.history.pushState(
          "",
          document.title,
          window.location.pathname + window.location.search
        );
      }
    } catch (e) {
      // Silently catch navigation errors caused by environment restrictions
      console.warn(
        "Navigation hash update was prevented by the environment security policy."
      );
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen selection:bg-[#FFB400] selection:text-black">
      <Navbar onNavigate={navigateTo} />

      <main className="transition-all duration-500">
        {currentView === "landing" ? (
          <div className="animate-in fade-in duration-700">
            <Hero onNavigate={navigateTo} />
            <About />
            <EventLineup
              onSeeAll={() => navigateTo("events", "#events-full")}
            />
            <WhyMatters />
          </div>
        ) : currentView === "events" ? (
          <div className="animate-in fade-in duration-700">
            <EventsPage onNavigate={navigateTo} />
          </div>
        ) : currentView === "about" ? (
          <div className="animate-in fade-in duration-700">
            <AboutPage onNavigate={navigateTo} />
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <TeamPage onNavigate={navigateTo} />
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
