import React, { useState, useEffect } from 'react';

export default function Navbar({ theme, accentColor, onToggleTheme, onChangeAccent, onUploadPhoto, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'frontend', 'skills', 'experience', 'projects', 'ai-agent', 'education', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            setActiveNav(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-logo">
          <span className="logo-badge">PDS</span>
          <span className="logo-name">Divya Sri</span>
        </a>

        <nav className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          <a href="#hero" className={`nav-link ${activeNav === 'hero' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#about" className={`nav-link ${activeNav === 'about' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>About</a>
          <a href="#frontend" className={`nav-link highlight-link ${activeNav === 'frontend' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-layout-masonry-line"></i> Full Stack UI & APIs
          </a>
          <a href="#skills" className={`nav-link ${activeNav === 'skills' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Skills</a>
          <a href="#experience" className={`nav-link ${activeNav === 'experience' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Experience</a>
          <a href="#projects" className={`nav-link ${activeNav === 'projects' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Projects</a>
          <a href="#ai-agent" className={`nav-link ${activeNav === 'ai-agent' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>AI Assistant</a>
          <a href="#education" className={`nav-link ${activeNav === 'education' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Education</a>
          <a href="#contact" className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Contact</a>
        </nav>

        <div className="nav-actions">
          <div style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setShowPalette(!showPalette)} title="Customize UI Theme Colors">
              <i className="ri-palette-line"></i>
            </button>
            {showPalette && (
              <div className="palette-dropdown glass-card" style={{ position: 'absolute', top: '50px', right: '0', padding: '10px', display: 'flex', gap: '8px', zIndex: 1100 }}>
                <button className="color-dot dot-cyan" onClick={() => { onChangeAccent('cyan'); setShowPalette(false); }} title="Cyan Theme"></button>
                <button className="color-dot dot-purple" onClick={() => { onChangeAccent('purple'); setShowPalette(false); }} title="Purple Theme"></button>
                <button className="color-dot dot-emerald" onClick={() => { onChangeAccent('emerald'); setShowPalette(false); }} title="Emerald Theme"></button>
                <button className="color-dot dot-orange" onClick={() => { onChangeAccent('orange'); setShowPalette(false); }} title="Orange Theme"></button>
              </div>
            )}
          </div>

          <button className="btn btn-outline btn-sm" onClick={onOpenResume} title="View Digital Resume">
            <i className="ri-file-pdf-line"></i> <span>Resume</span>
          </button>

          <button className="icon-btn" onClick={onToggleTheme} title="Toggle Dark/Light Mode">
            <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
          </button>

          <label htmlFor="nav-photo-input" className="btn btn-outline btn-sm photo-upload-btn" title="Upload Photo">
            <i className="ri-image-add-line"></i> <span>Upload Photo</span>
          </label>
          <input type="file" id="nav-photo-input" accept="image/*" onChange={onUploadPhoto} style={{ display: 'none' }} />

          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
