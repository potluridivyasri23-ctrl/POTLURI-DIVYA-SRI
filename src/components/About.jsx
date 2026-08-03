import React from 'react';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-grid">
          <div className="about-card glass-card">
            <div className="card-icon"><i className="ri-user-search-line"></i></div>
            <h3>Who I Am</h3>
            <p>
              I am a driven software engineer currently pursuing my <strong>M.Tech in Computer Science & Engineering</strong> at KL University, Vijayawada, with a strong background in Electronics & Communication Engineering (B.Tech from VVIT).
            </p>
            <p>
              My core focus is centered on <strong>Full Stack Web Development</strong> (React, Node, Express, SQL) and <strong>Autonomous AI Agent Building</strong>. I specialize in developing end-to-end web applications, automated prompt workflows, and AI integrations.
            </p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon"><i className="ri-focus-3-line"></i></div>
            <h3>What I Do Best</h3>
            <ul className="check-list">
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Full Stack Web Engineering:</strong> Building stateful React UIs, Node RESTful APIs, and database schemas.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Autonomous AI Agents:</strong> Designing prompt-driven workflows, agent pipelines, and LLM automation tools.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Machine Learning & AI:</strong> Supervised model training, classification, and computer vision.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Hardware & Security:</strong> Embedded biometrics, fingerprint access control, and IoT integration.</li>
            </ul>
          </div>
        </div>

        <div className="specialization-grid">
          <div className="spec-box">
            <i className="ri-layout-masonry-line"></i>
            <h4>Frontend React Engineering</h4>
            <p>Component-driven web applications, React hooks, state management & modern responsive UI design.</p>
          </div>
          <div className="spec-box">
            <i className="ri-robot-2-line"></i>
            <h4>AI Agent Building</h4>
            <p>Autonomous workflow agents, LLM integrations & prompt engineering during NxtWave hackathons.</p>
          </div>
          <div className="spec-box">
            <i className="ri-image-line"></i>
            <h4>Computer Vision</h4>
            <p>Product recognition models & automated checkout billing for retail environments.</p>
          </div>
          <div className="spec-box">
            <i className="ri-heart-pulse-line"></i>
            <h4>Medical AI</h4>
            <p>Machine learning classification models for breast cancer detection and diagnostic assistance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
