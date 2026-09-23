import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <motion.section 
      id="team" 
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

      <motion.div layout className="team-grid-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="team-grid"
          >
            {teamsData[activeTeam].map((member, index) => (
              <motion.div 
                key={index} 
                className="member-card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="member-avatar">
                  <div className="avatar-placeholder">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" 
                      alt={`${member.name} Profile`} 
                      className="placeholder-img" 
                    />
                  </div>
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-position">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default TeamSection;
