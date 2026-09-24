import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './EventsSection.css';

gsap.registerPlugin(ScrollTrigger);

const pastEvents = [
  { 
    id: 'celestra', 
    title: "Celestra '26", 
    date: 'March 2026',
    description: 'The premier annual techfest bringing together innovators, creators, and engineers for a spectacular showcase of talent and technology.',
    img: '/celestra.jpg' 
  },
  { 
    id: 'aisprint', 
    title: "AI & Innovation Sprint 2025", 
    date: 'February 2025',
    description: 'A 24-hour intensive hackathon focused on building next-generation artificial intelligence solutions and fostering competitive coding.',
    img: '/aisprint.jpg' 
  },
  { 
    id: 'pbl', 
    title: "Project Based Learning Competition 2025", 
    date: 'May 2025',
    description: 'An exhibition of the most creative and impactful student-led engineering projects across the department, evaluated by industry experts.',
    img: '/pbl.jpg' 
  },
  { 
    id: 'nexus', 
    title: "Nexus '25 - Department Research Colloquium", 
    date: 'November 2025',
    description: 'An academic symposium dedicated to presenting groundbreaking research and papers by our brightest minds in the AI and Data Science domain.',
    img: '/nexus.jpg' 
  }
];

const EventsSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (!trackRef.current || !sectionRef.current) return;

    // Detect mobile device to disable heavy GSAP scrubbing
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    // Calculate total horizontal scroll distance
    const scrollAmount = trackRef.current.scrollWidth - window.innerWidth;

    gsap.to(trackRef.current, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Pin exactly when the container reaches the top of the viewport
        end: () => `+=${scrollAmount}`, // The pinning distance matches the horizontal travel distance
        pin: true,
        scrub: 0.1, // Tightened scrubbing so it unpins instantly without lag/wasted scroll space
        invalidateOnRefresh: true, // Recalculate if window resizes
      }
    });
  }, { scope: sectionRef });

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.parentElement.scrollBy({ left: -window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.parentElement.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="events" 
      className="events-section-wrapper"
      ref={sectionRef}
    >
      <div className="events-header-fixed">
        <h2 className="section-title">Events</h2>
      </div>

      <div className="events-main-content">
        <button className="mobile-event-nav left" onClick={scrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div className="gsap-track-viewport">
          <div className="gsap-track" ref={trackRef}>
            {pastEvents.map((event) => (
              <div key={event.id} className="gsap-slide">
                <div className="modern-event-card">
                  <div className="modern-img-container">
                    <img src={event.img} alt={event.title} className="modern-event-img" />
                  </div>
                  <div className="modern-event-overlay">
                    <span className="modern-event-date">{event.date}</span>
                    <h4 className="modern-event-title">{event.title}</h4>
                    <p className="modern-event-desc">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mobile-event-nav right" onClick={scrollRight}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
};

export default EventsSection;
