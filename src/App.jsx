import React from 'react';
import Particles from './Particles';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import TeamSection from './components/TeamSection';
import ConnectSection from './components/ConnectSection';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <Particles />
      
      <HeroSection />
      
      <AboutSection />
      <EventsSection />
      <TeamSection />
      <ConnectSection />
      <ScrollToTop />
    </>
  );
}

export default App;
