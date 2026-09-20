import React from 'react';
import Particles from './Particles';
import './index.css';

function App() {
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <Particles />
      
      <main className="hero-section">
        <header className="header">
          <div className="logo-container">
            {/* The user will place their logo image in public folder as logo.png */}
            <img src="/logo.png" alt="Phoenix Club Logo" className="logo-img" />
            <div className="logo-text">
              <span className="brand-font">PHOENIX CLUB </span>
              <span style={{fontWeight: 300}}>KKWIEER</span>
            </div>
          </div>
          
          <nav className="nav-menu">
            <a href="#about" className="nav-link">About</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#connect" className="nav-link">Connect</a>
          </nav>
        </header>
        
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
    </>
  );
}

export default App;
