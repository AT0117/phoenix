import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './EventsSection.css';

const pastEvents = [
  { id: 'celestra', title: "Celestra '26", img: '/celestra.jpg' },
  { id: 'aisprint', title: "AI & Innovation Sprint 2025", img: '/aisprint.jpg' },
  { id: 'pbl', title: "Project Based Learning Competition 2025", img: '/pbl.jpg' },
  { id: 'nexus', title: "Nexus '25 - Department Research Colloquium", img: '/nexus.jpg' }
];

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('past');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    if (!isInView || activeTab !== 'past') return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % pastEvents.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isInView, activeTab, activeIndex]);

  const nextSlide = () => setActiveIndex((activeIndex + 1) % pastEvents.length);
  const prevSlide = () => setActiveIndex((activeIndex - 1 + pastEvents.length) % pastEvents.length);

  return (
    <motion.section 
      id="events" 
      className="events-section"
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="events-header">
        <h2 className="section-title">Events</h2>
      </div>

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

      <div className="events-content-container">
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
          <div className="coverflow-carousel">
            <button className="nav-btn-modern left" onClick={prevSlide} aria-label="Previous event">
              <ChevronLeft size={48} strokeWidth={1.5} />
            </button>
            
            <div className="carousel-track">
              {pastEvents.map((event, index) => {
                let diff = (index - activeIndex + pastEvents.length) % pastEvents.length;
                if (diff > 2) diff -= pastEvents.length;
                
                const isCenter = diff === 0;
                const isLeft = diff === -1;
                const isRight = diff === 1;
                const isHidden = diff === 2 || diff < -1 || diff > 1;

                return (
                  <motion.div
                    key={event.id}
                    className="coverflow-card"
                    animate={{
                      x: isLeft ? '-65%' : isRight ? '65%' : '0%',
                      scale: isCenter ? 1 : 0.8,
                      filter: isCenter ? 'blur(0px)' : 'blur(8px)',
                      opacity: isHidden ? 0 : isCenter ? 1 : 0.4,
                      zIndex: isCenter ? 10 : isHidden ? 0 : 5
                    }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="card-image-wrapper">
                      <img src={event.img} alt={event.title} className="event-img" />
                      <div className={`event-title-overlay ${isCenter ? 'active' : ''}`}>
                        <h4>{event.title}</h4>
                      </div>
                      
                      {/* Fiery Progress Border */}
                      {isCenter && isInView && (
                        <svg className="progress-border-svg" width="100%" height="100%" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="fiery-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ffea00" />
                              <stop offset="50%" stopColor="#ff5e00" />
                              <stop offset="100%" stopColor="#ff0000" />
                            </linearGradient>
                          </defs>
                          <motion.rect
                            key={`${activeIndex}-${isInView}`}
                            x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)"
                            rx="18.5" ry="18.5"
                            fill="none"
                            stroke="url(#fiery-gradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 8, ease: "linear" }}
                          />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button className="nav-btn-modern right" onClick={nextSlide} aria-label="Next event">
              <ChevronRight size={48} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default EventsSection;
