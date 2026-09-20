import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Phoenix Club Logo" className="logo-img" />
        <div className="logo-text">
          <span className="brand-font">PHOENIX CLUB </span>
          <span style={{fontWeight: 300}}>KKWIEER</span>
        </div>
      </div>
      
      {/* Desktop Menu */}
      <nav className="nav-menu desktop-nav">
        <a href="#about" className="nav-link">About</a>
        <a href="#events" className="nav-link">Events</a>
        <a href="#team" className="nav-link">Team</a>
        <a href="#connect" className="nav-link">Connect</a>
      </nav>

      {/* Mobile Hamburger Icon */}
      <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav-menu">
              <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
              <a href="#events" className="nav-link" onClick={closeMenu}>Events</a>
              <a href="#team" className="nav-link" onClick={closeMenu}>Team</a>
              <a href="#connect" className="nav-link" onClick={closeMenu}>Connect</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
