import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AboutSection.css';

const slides = [
  {
    id: 'about',
    title: 'About Us',
    content: (
      <div className="slide-content-split">
        <div className="slide-left">
          <img src="/logo.png" alt="Phoenix Club Logo" className="about-logo" />
        </div>
        <div className="slide-right">
          <p>
            The Phoenix Club is the student-led technical community of the AI & DS department at KKWIEER. Built by students, for students, it serves as a collaborative space designed to bridge the gap between classroom learning and real-world application. Through hands-on workshops, expert seminars, and large-scale technical fests, the club provides a platform to explore emerging technologies, sharpen problem-solving skills, and connect with peers who share a passion for tech.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'vision',
    title: 'Vision and Mission',
    content: (
      <div className="slide-content-center">
        <p>
          <strong>Our Vision</strong> is to build a strong, collaborative community of tech enthusiasts where students can confidently explore AI, Data Science, and beyond. 
          <br /><br />
          <strong>Our Mission</strong> is to support this vision by organizing practical workshops, interactive sessions, and engaging competitions. We aim to equip our fellow students with industry-relevant skills, foster creative problem-solving, and provide a supportive environment where we can all grow into capable tech professionals together.
        </p>
      </div>
    )
  },
  {
    id: 'experience',
    title: 'The Club Experience',
    content: (
      <div className="slide-content-center">
        <p>
          Being a part of the Phoenix Club offers a practical way to make the most of your time on campus. Members have the opportunity to build a strong portfolio through hands-on projects and showcase their creativity in various tech and design competitions. Beyond technical skills, organizing and participating in club initiatives naturally develops essential communication, leadership, and teamwork abilities. It is an active space to network with seniors, mentors, and industry experts while building meaningful projects alongside classmates.
        </p>
      </div>
    )
  }
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: 0.8
    }
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        duration: 0.6
      }
    };
  }
};

const SLIDE_DURATION = 15000;

const AboutSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); // Starts when 30% visible

  // Handle wrapping for positive and negative pages
  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!isInView) return; // Wait until user is actually looking at the section
    
    const timer = setInterval(() => {
      paginate(1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [page, isInView]);

  return (
    <motion.section 
      id="about" 
      ref={sectionRef}
      className="about-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="about-header">
        <h2 className="section-title">
          About Phoenix Club
        </h2>
      </div>

      <div className="carousel-container">
        
        <button className="nav-btn-modern left" onClick={() => paginate(-1)}>
          <ChevronLeft size={48} strokeWidth={1.5} />
        </button>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="carousel-slide"
          >
            <div className="glass-card">
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-bar-fill" 
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              </div>

              <div className="card-content">
                <h3 className="slide-title">{slides[slideIndex].title}</h3>
                {slides[slideIndex].content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button className="nav-btn-modern right" onClick={() => paginate(1)}>
          <ChevronRight size={48} strokeWidth={1.5} />
        </button>

      </div>
    </motion.section>
  );
};

export default AboutSection;
