import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './TeamSection.css';

const teamsData = {
  "Executives": [
    { name: "Anuj Deshmukh", position: "President" },
    { name: "Urjita Girase", position: "Vice President" },
    { name: "Sakshi Patil", position: "Secretary" },
    { name: "Jagdish Rathod", position: "Joint Secretary" },
    { name: "Shreyas Shinde", position: "Treasurer" },
    { name: "Aditya Pagar", position: "Co-Treasurer" },
    { name: "Vaibhav Raul", position: "Operations Manager" },
  ],
  "Technical Team": [
    { name: "Suyash Aher", position: "Technical Team Lead" },
    { name: "Atharva Thakare", position: "Member" },
    { name: "Mangesh Shinde", position: "Member" },
    { name: "Pradyumna Tayade", position: "Member" },
    { name: "Sanket Burkul", position: "Member" },
  ],
  "Event Management": [
    { name: "Zuber Chaudhary", position: "Event Management Head" },
    { name: "Riya Kumawat", position: "Co-Head" },
    { name: "Danish Shaikh", position: "Member" },
    { name: "Shreya Nemane", position: "Member" },
    { name: "Sagar Bakshe", position: "Member" },
    { name: "Sujal Patil", position: "Member" },
    { name: "Samrudhhi Moon", position: "Member" },
    { name: "Kunal Kanojiya", position: "Member" },
    { name: "Raj Patil", position: "Member" },
  ],
  "Creative & Social Media": [
    { name: "Om Borse", position: "Creative & Social Media Head" },
    { name: "Netra Ingale", position: "Member" },
    { name: "Vaishnavi Kadam", position: "Member" },
    { name: "Samrudhi Ugale", position: "Member" },
    { name: "Toshit Patil", position: "Member" },
    { name: "Aditi Ippar", position: "Member" },
    { name: "Piyush Dhondge", position: "Member" },
    { name: "Tulika Londhe", position: "Member" },
    { name: "Ishwari Wanarse", position: "Member" },
  ],
  "Sponsorship Team": [
    { name: "Saad Sayyed", position: "Member" },
    { name: "Ritika Kumawat", position: "Member" },
  ]
};

const TeamSection = () => {
  const [activeTeam, setActiveTeam] = useState("Executives");
  const [swiperInstance, setSwiperInstance] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  // Strictly control autoplay based on viewport visibility
  useEffect(() => {
    if (swiperInstance) {
      if (isInView) {
        swiperInstance.autoplay.start();
      } else {
        swiperInstance.autoplay.stop();
      }
    }
  }, [isInView, swiperInstance]);

  return (
    <motion.section 
      id="team"
      ref={sectionRef}
      className="team-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="team-header">
        <h2 className="section-title">Our Team</h2>
      </div>
      
      <div className="team-tabs">
        {Object.keys(teamsData).map((team) => (
          <button 
            key={team} 
            className={`team-tab-btn ${activeTeam === team ? 'active' : ''}`}
            onClick={() => setActiveTeam(team)}
          >
            {team}
          </button>
        ))}
      </div>

      <div className="team-swiper-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="swiper-wrapper-animator"
          >
            <Swiper
              onSwiper={setSwiperInstance}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={teamsData[activeTeam].length >= 3}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 150, 
                modifier: 1, 
                slideShadows: false, 
              }}
              navigation={true}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              watchSlidesProgress={true}
              onSlideChange={(swiper) => {
                const originalLength = teamsData[activeTeam].length;
                const safeRealIndex = swiper.realIndex || 0;
                const calculatedIndex = originalLength > 0 ? safeRealIndex % originalLength : 0;
                
                // Disabling React state update for pagination to prevent re-renders of the Swiper component
                // We'll directly manipulate the DOM of our custom dots for massive performance
                const dots = document.querySelectorAll('.custom-pagination-dot');
                dots.forEach((dot, idx) => {
                  if (idx === calculatedIndex) {
                    dot.classList.add('active');
                  } else {
                    dot.classList.remove('active');
                  }
                });
              }}
              onSetTranslate={(swiper, translate) => {
                if (window.innerWidth <= 768) return; // Skip heavy DOM math on mobile
                for (let i = 0; i < swiper.slides.length; i++) {
                  const slide = swiper.slides[i];
                  const slideProgress = slide.progress; 
                  const y = Math.pow(Math.abs(slideProgress), 2) * -80; 
                  
                  const inner = slide.querySelector('.coverflow-card');
                  if (inner) {
                    inner.style.transform = `translateY(${y}px)`;
                  }
                }
              }}
              onSetTransition={(swiper, transition) => {
                if (window.innerWidth <= 768) return;
                for (let i = 0; i < swiper.slides.length; i++) {
                  const slide = swiper.slides[i];
                  const inner = slide.querySelector('.coverflow-card');
                  if (inner) {
                    inner.style.transitionDuration = `${transition}ms`;
                  }
                }
              }}
              onAutoplayTimeLeft={(s, time, progress) => {
                if (s.el) {
                  s.el.style.setProperty('--autoplay-progress', progress);
                }
              }}
              className="team-swiper"
            >
              {/* Define the gradient for the SVG border */}
              <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                <defs>
                  <linearGradient id="card-timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#ff5e00" />
                  </linearGradient>
                </defs>
              </svg>

              {(() => {
                const members = teamsData[activeTeam];
                let displayMembers = [...members];
                
                // Duplicate array to guarantee flawless left/right looping
                if (members.length >= 3 && members.length < 8) {
                  displayMembers = [...displayMembers, ...members];
                }
                
                return displayMembers.map((member, index) => (
                  <SwiperSlide key={index} className="team-slide">
                    <div className="coverflow-card">
                      
                      {/* Perimeter Progress Border */}
                      <svg className="card-progress-svg" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="18" ry="18" pathLength="1" />
                      </svg>

                      <div className="coverflow-avatar-wrapper">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" 
                          alt={`${member.name} Profile`} 
                          className="coverflow-avatar-img" 
                        />
                      </div>
                      <div className="coverflow-info">
                        <h4 className="coverflow-name">{member.name.toUpperCase()}</h4>
                        <p className="coverflow-position">{member.position.toUpperCase()}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ));
              })()}
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="custom-team-pagination">
              {teamsData[activeTeam].map((_, idx) => (
                <div 
                  key={idx}
                  className={`custom-pagination-dot ${idx === 0 ? 'active' : ''}`}
                  onClick={() => {
                    if (swiperInstance) {
                      swiperInstance.slideToLoop(idx);
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default TeamSection;
