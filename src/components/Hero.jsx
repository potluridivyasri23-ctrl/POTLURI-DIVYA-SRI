import React, { useState, useEffect } from 'react';

export default function Hero({ profilePhoto, onUploadPhoto, onOpenResume }) {
  const [rotatingText, setRotatingText] = useState('');
  const words = ["Full Stack Web Engineering", "Autonomous AI Agents", "Machine Learning Systems", "React & Node Architecture"];

  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = words[wordIdx];
      if (isDeleting) {
        setRotatingText(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setRotatingText(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIdx === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 400;
      }
      timeoutId = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>Full Stack & AI Agent Engineer at NxtWave | M.Tech CSE</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Potluri Divya Sri</span>
          </h1>

          <h2 className="hero-subtitle">
            Specializing in <span className="txt-rotate">{rotatingText}</span>
          </h2>

          <p className="hero-description">
            Experienced in building end-to-end <strong>Full Stack Web Applications</strong>, <strong>Autonomous AI Agents</strong>, reactive <strong>React & Node UIs</strong>, and machine learning models. Passionate about AI workflow automation and full-stack software architecture.
          </p>

          <div className="hero-meta">
            <span className="meta-item"><i className="ri-map-pin-line"></i> Vijayawada, AP, India</span>
            <a href="mailto:potluridivyasri23@gmail.com" className="meta-item"><i className="ri-mail-line"></i> potluridivyasri23@gmail.com</a>
            <a href="tel:9000839375" className="meta-item"><i className="ri-phone-line"></i> +91 9000839375</a>
          </div>

          <div className="hero-ctas">
            <a href="#frontend" className="btn btn-primary">
              <i className="ri-layout-masonry-line"></i> <span>Frontend Showcase</span>
            </a>
            <button className="btn btn-secondary" onClick={onOpenResume}>
              <i className="ri-file-text-line"></i> <span>View Resume</span>
            </button>
            <a href="#projects" className="btn btn-outline">
              <span>View Projects</span> <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="profile-card">
            <div className="avatar-container">
              <img src={profilePhoto} alt="Potluri Divya Sri Profile Photo" />
              <div className="avatar-glow"></div>
              <label htmlFor="hero-photo-input" className="change-photo-overlay" title="Click to upload your own photo">
                <i className="ri-camera-switch-line"></i>
                <span>Change Photo</span>
              </label>
              <input type="file" id="hero-photo-input" accept="image/*" onChange={onUploadPhoto} style={{ display: 'none' }} />
            </div>

            <div className="floating-badge badge-1">
              <i className="ri-reactjs-line"></i>
              <div>
                <strong>React Developer</strong>
                <small>Modern Web UIs</small>
              </div>
            </div>

            <div className="floating-badge badge-2">
              <i className="ri-robot-line"></i>
              <div>
                <strong>AI Agents</strong>
                <small>Autonomous Systems</small>
              </div>
            </div>

            <div className="floating-badge badge-3">
              <i className="ri-code-s-slash-line"></i>
              <div>
                <strong>Full Stack</strong>
                <small>Frontend & Backend</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
