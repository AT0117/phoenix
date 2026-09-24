import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const birdRef = useRef(null);

  useGSAP(() => {
    // Disable heavy scaling animation on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Pin for 150vh of scrolling
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate text fading out and sliding up
    tl.to(textRef.current, {
      y: -50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    }, 0);

    // Animate the phoenix zooming in massive and fading out
    tl.to(birdRef.current, {
      scale: 30, // massive zoom
      opacity: 0,
      ease: "power2.in", // start slow, speed up to simulate flying through
      duration: 1.5,
      transformOrigin: "center center"
    }, 0);
    
    return () => {
      tl.kill();
    }
  }, { scope: containerRef }); // scope to container

  return (
    <main className="hero-section" ref={containerRef}>
      <Navbar />
      
      <div className="hero-content">
        <div className="hero-text-box" ref={textRef}>
          <h1 className="hero-title">Phoenix Club<br />KKWIEER</h1>
          <p className="hero-subtitle">
            Rising from the ashes, the official student led club of AI & Data Science department, KKWIEER.
          </p>
        </div>
        
        <div className="hero-image-box">
          <img src="/phoenix.png" alt="Phoenix Bird" className="phoenix-img" ref={birdRef} />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
