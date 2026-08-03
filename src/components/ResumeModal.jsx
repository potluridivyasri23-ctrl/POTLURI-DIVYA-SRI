import React from 'react';

export default function ResumeModal({ onClose, showToast }) {
  const handlePrint = () => {
    showToast('🖨️ Opening print dialog for PDF saving...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-content glass-card resume-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        <div className="resume-printable">
          <div className="resume-header" style={{ borderBottom: '2px solid var(--accent-cyan)', paddingBottom: '15px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>POTLURI DIVYA SRI</h1>
            <p style={{ margin: '5px 0', color: 'var(--accent-cyan)', fontWeight: 600 }}>M.Tech (CSE) | React Frontend Developer & AI Specialist</p>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <span><i className="ri-mail-line"></i> potluridivyasri23@gmail.com</span>
              <span><i className="ri-phone-line"></i> 9000839375</span>
              <span><i className="ri-map-pin-line"></i> Vijayawada, Andhra Pradesh</span>
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-sec-title">PROFILE</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Experienced in developing academic projects related to security systems, data handling, and React frontend applications. Seeking a challenging role in a growth-oriented organization to apply my skills and continuously learn and grow professionally.
            </p>
          </div>

          <div className="resume-section">
            <h3 className="resume-sec-title">EXPERIENCE & INTERNSHIP</h3>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Full Stack Instructor Training — NxtWave</strong>
                <span>Present</span>
              </div>
              <ul style={{ fontSize: '0.88rem', paddingLeft: '20px', margin: '5px 0' }}>
                <li>Currently working at NxtWave in Full Stack Instructor Training, specializing in React UI engineering, RESTful APIs, database design, and full stack pedagogy.</li>
                <li>Participates in hackathons, builds end-to-end full stack web applications, and models component best practices.</li>
              </ul>
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-sec-title">EDUCATION</h3>
            <ul style={{ fontSize: '0.88rem', paddingLeft: '20px' }}>
              <li><strong>M.Tech (CSE)</strong> — KL University, Vijayawada (2024 – Pursuing)</li>
              <li><strong>B.Tech (ECE)</strong> — Vasireddy Venkatadri Institute of Technology (VVIT), Guntur (2020 – 2024)</li>
              <li><strong>Intermediate (MPC)</strong> — Bhashyam Junior College, Guntur (2018 – 2020)</li>
              <li><strong>SSC</strong> — Oxford EM High School, Guntur (2017 – 2018)</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3 className="resume-sec-title">TECHNICAL SKILLS</h3>
            <p style={{ fontSize: '0.88rem' }}>
              <strong>Programming & Frameworks:</strong> React 18, JavaScript (ES6+), HTML5, CSS3, Python, OOP Concepts.<br/>
              <strong>Machine Learning & AI:</strong> Model Training, Classification Algorithms, Computer Vision, AI Agent Building.<br/>
              <strong>Tools & Databases:</strong> VS Code, Git, SQL, MS Excel, AWS Cloud Basics.
            </p>
          </div>

          <div className="resume-section">
            <h3 className="resume-sec-title">CERTIFICATIONS</h3>
            <ul style={{ fontSize: '0.88rem', paddingLeft: '20px' }}>
              <li>AWS Academy Cloud Foundation — Amazon Web Services</li>
              <li>Data-Driven Decisions — Google</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '25px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }} className="no-print">
          <button className="btn btn-primary" onClick={handlePrint}>
            <i className="ri-printer-line"></i> <span>Print / Save as PDF</span>
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
