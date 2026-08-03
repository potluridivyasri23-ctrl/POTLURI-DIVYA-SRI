import React from 'react';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Career Journey</span>
          <h2 className="section-title">Internships & Certifications</h2>
          <div className="title-underline"></div>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-item main-experience">
            <div className="timeline-dot"><i className="ri-briefcase-4-line"></i></div>
            <div className="timeline-content glass-card">
              <div className="exp-header">
                <div>
                  <span className="company-badge">NxtWave</span>
                  <h3 className="exp-role">Full Stack Instructor Training</h3>
                </div>
                <span className="exp-date"><i className="ri-calendar-line"></i> Present</span>
              </div>
              <p className="exp-summary">
                Currently working at NxtWave undergoing specialized Full Stack Instructor Training. Mastering React UI architecture, Node/Express backend APIs, database management (SQL), and full stack engineering pedagogy:
              </p>
              <div className="hackathon-highlights">
                <div className="hack-badge"><i className="ri-layout-line"></i> <strong>Frontend UI:</strong> Responsive, high-performance React web applications</div>
                <div className="hack-badge"><i className="ri-cpu-line"></i> <strong>Backend Services:</strong> Scalable server APIs and business logic execution</div>
                <div className="hack-badge"><i className="ri-robot-2-line"></i> <strong>AI Agent Building:</strong> Autonomous agents trained for workflow automation</div>
                <div className="hack-badge"><i className="ri-database-line"></i> <strong>Database Management:</strong> Relational data models and optimized SQL queries</div>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"><i className="ri-award-line"></i></div>
            <div className="timeline-content glass-card">
              <h3 className="exp-role"><i className="ri-verified-badge-fill color-accent"></i> Professional Certifications</h3>
              <div className="cert-grid">
                <div className="cert-card">
                  <div className="cert-icon"><i className="ri-amazon-line"></i></div>
                  <div>
                    <h4>AWS Academy Cloud Foundation</h4>
                    <p>Amazon Web Services (AWS) Cloud Concepts, Security, and Core Services</p>
                  </div>
                </div>
                <div className="cert-card">
                  <div className="cert-icon"><i className="ri-google-line"></i></div>
                  <div>
                    <h4>Data-Driven Decisions</h4>
                    <p>Google Professional Certification on Data Analysis and Decision Making</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
