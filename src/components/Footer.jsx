import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">
            <span className="logo-badge">PDS</span>
            <span className="logo-name">Potluri Divya Sri</span>
          </a>
          <p>Full-Stack React Developer & AI Engineer passionate about creating intuitive UI systems, machine learning models, and autonomous software.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#frontend">Frontend UI</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Information</h4>
          <p><i className="ri-map-pin-line"></i> Vijayawada, AP, India</p>
          <p><i className="ri-mail-line"></i> potluridivyasri23@gmail.com</p>
          <p><i className="ri-phone-line"></i> +91 9000839375</p>
        </div>
      </div>

      <div className="footer-bottom text-center">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Potluri Divya Sri. Built with React & Vite.</p>
        </div>
      </div>
    </footer>
  );
}
