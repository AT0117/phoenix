import React, { useEffect, useState } from 'react';

const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate an initial set of particles
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage across width
      size: Math.random() * 3 + 1, // random size between 1px and 4px
      duration: Math.random() * 4 + 3, // random duration between 3s and 7s
      delay: Math.random() * 5, // random delay
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
