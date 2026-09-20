import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import './ConnectSection.css';

const InstagramIcon = ({ size, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ConnectSection = () => {
  const cards = [
    {
      id: 'instagram',
      title: 'Instagram',
      icon: <InstagramIcon size={48} color="currentColor" />,
      link: 'https://www.instagram.com/phoenix_kkw',
      color: '#E1306C' 
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      icon: <LinkedinIcon size={48} color="currentColor" />,
      link: 'https://www.linkedin.com/company/phoenix-club-kkwieer',
      color: '#0077b5'
    },
    {
      id: 'email',
      title: 'Email',
      icon: <Mail size={48} strokeWidth={1.5} />,
      link: 'mailto:phoenixclubkkw@gmail.com',
      color: '#ff8c00' // Keeping email fiery orange to match the theme
    }
  ];

  return (
    <section id="connect" className="connect-section">
      <div className="connect-header">
        <h2 className="section-title">Connect With Us</h2>
        <p className="connect-subtitle">Reach out, collaborate, or simply say hello!</p>
      </div>

      <div className="connect-icons-row">
        {cards.map((card, index) => (
          <motion.a 
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-icon-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.15, color: card.color }}
            style={{ color: '#ffffff' }}
          >
            {card.icon}
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ConnectSection;
