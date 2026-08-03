import React from 'react';

export default function EducationAndVolunteering() {
  return (
    <section id="education" className="section bg-alt">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Academic & Social Impact</span>
          <h2 className="section-title">Education & Volunteering</h2>
          <div className="title-underline"></div>
        </div>

        <div className="edu-grid">
          <div className="edu-column">
            <h3 className="column-title"><i className="ri-graduation-cap-line"></i> Education</h3>
            <div className="edu-timeline">
              <div className="edu-card glass-card">
                <span className="edu-year">2024 – Pursuing</span>
                <h3>M.Tech in Computer Science & Engineering</h3>
                <h4>KL University, Vijayawada</h4>
                <p>Advanced studies in Artificial Intelligence, Machine Learning algorithms, Data Structures, and Software Engineering.</p>
              </div>

              <div className="edu-card glass-card">
                <span className="edu-year">2020 – 2024</span>
                <h3>B.Tech in Electronics & Communication Engineering</h3>
                <h4>Vasireddy Venkatadri Institute of Technology (VVIT), Guntur</h4>
                <p>Core engineering foundations in signal processing, hardware biometrics, embedded microcontrollers, and programming.</p>
              </div>

              <div className="edu-card glass-card">
                <span className="edu-year">2018 – 2020</span>
                <h3>Intermediate (MPC - Maths, Physics, Chemistry)</h3>
                <h4>Bhashyam Junior College, Guntur</h4>
                <p>Pre-university higher secondary education with strong analytical and mathematical focus.</p>
              </div>

              <div className="edu-card glass-card">
                <span className="edu-year">2017 – 2018</span>
                <h3>Secondary School Certificate (SSC)</h3>
                <h4>Oxford EM High School, Guntur</h4>
                <p>Foundational secondary schooling with distinction.</p>
              </div>
            </div>
          </div>

          <div className="edu-column">
            <h3 className="column-title"><i className="ri-heart-line"></i> Volunteering & Leadership</h3>
            <div className="vol-grid">
              <div className="vol-card glass-card">
                <div className="vol-icon"><i className="ri-hand-heart-line"></i></div>
                <div>
                  <h3>NSS VVIT Volunteer</h3>
                  <p>National Service Scheme volunteer organizing community welfare drives, blood donation camps, and social awareness programs.</p>
                </div>
              </div>

              <div className="vol-card glass-card">
                <div className="vol-icon"><i className="ri-water-flash-line"></i></div>
                <div>
                  <h3>Aquaculture Innovation Tech Volunteer</h3>
                  <p>Contributed to technology initiatives exploring sustainable aquaculture monitoring systems and data collection techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
