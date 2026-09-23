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
  const [activeTab, setActiveTab] = useState('past');
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Only apply GSAP scroll trigger if the past events tab is active and refs are available
    if (activeTab !== 'past' || !trackRef.current || !sectionRef.current) return;

    // Calculate total horizontal scroll distance
    // We want the track to move completely to the left, minus exactly one viewport width so the last card remains on screen.
    const scrollAmount = trackRef.current.scrollWidth - window.innerWidth;

    const tl = gsap.to(trackRef.current, {
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

    return () => {
      // Clean up scroll triggers when unmounting or switching tabs
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeTab]); // Re-run effect if activeTab changes

  return (
    <section 
      id="events" 
      className={`events-section-wrapper ${activeTab === 'past' ? 'is-pinned' : ''}`}
      ref={sectionRef}
    >
      <div className="events-header-fixed">
        <h2 className="section-title">Events</h2>
        <div className="events-tabs">
          <button 
            className={`team-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
          <button 
            className={`team-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
        </div>
      </div>

      <div className="events-main-content">
        {activeTab === 'upcoming' ? (
          <motion.div 
            className="coming-soon-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Coming Soon</h3>
            <p>Stay tuned for exciting upcoming events!</p>
          </motion.div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default EventsSection;
