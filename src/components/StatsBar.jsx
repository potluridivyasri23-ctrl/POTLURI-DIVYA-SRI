import React, { useState, useEffect, useRef } from 'react';

export default function StatsBar() {
  const [counts, setCounts] = useState({ projects: 0, certs: 0, hackathons: 0, degrees: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!sectionRef.current || triggered) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        triggered = true;
        setCounts({ projects: 4, certs: 2, hackathons: 10, degrees: 4 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="stats-bar" ref={sectionRef}>
      <div className="container stats-container">
        <div className="stat-item">
          <h3 className="stat-number">{counts.projects}+</h3>
          <p className="stat-label">Major Projects</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">{counts.certs}+</h3>
          <p className="stat-label">Certifications</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">{counts.hackathons}+</h3>
          <p className="stat-label">Hackathon Modules</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">{counts.degrees}+</h3>
          <p className="stat-label">Degrees & Colleges</p>
        </div>
      </div>
    </section>
  );
}
