import React from 'react';
import Particles from './Particles';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import TeamSection from './components/TeamSection';
import ConnectSection from './components/ConnectSection';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <Particles />
      
      <main className="hero-section">
        <Navbar />
        
        <div className="hero-content">
          <div className="hero-text-box">
            <h1 className="hero-title">Phoenix Club<br />KKWIEER</h1>
            <p className="hero-subtitle">
              Rising from the ashes, the official student led club of AI & Data Science department, KKWIEER.
            </p>
          </div>
          
          <div className="hero-image-box">
             {/* The user will place their phoenix image in public folder as phoenix.png */}
            <img src="/phoenix.png" alt="Phoenix Bird" className="phoenix-img" />
          </div>
        </div>
      </main>
      
      <AboutSection />
      <EventsSection />
      <TeamSection />
      <ConnectSection />
      <ScrollToTop />
    </>
  );
}

export default App;
