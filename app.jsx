/* ==========================================================================
   Potluri Divya Sri - React Web Application Component Architecture
   Framework: React 18 (JSX Runtime)
   Features: Full-Stack & Dedicated Frontend Engineering Showcase,
             Live Interactive React Component Playground, Voice AI Assistant,
             Theme Accent Customizer, Code Inspector & Digital Resume Modal
   ========================================================================== */

const { useState, useEffect, useRef } = React;

// Main React App Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('cyan'); // cyan, purple, emerald, orange
  const [profilePhoto, setProfilePhoto] = useState('assets/profile.jpeg');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Theme Mode & Accent Class Effect
  useEffect(() => {
    document.body.className = `${theme}-theme accent-${accentColor}`;
  }, [theme, accentColor]);

  // Show Toast Notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Custom Photo Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target.result);
        showToast('Profile photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Theme`);
  };

  return (
    <React.Fragment>
      <ParticleCanvas />
      <Navbar 
        theme={theme} 
        accentColor={accentColor}
        onToggleTheme={toggleTheme} 
        onChangeAccent={(color) => { setAccentColor(color); showToast(`Applied ${color.toUpperCase()} Accent Theme`); }}
        onUploadPhoto={handlePhotoUpload} 
        onOpenResume={() => setShowResumeModal(true)}
      />
      <main>
        <Hero 
          profilePhoto={profilePhoto} 
          onUploadPhoto={handlePhotoUpload} 
          onOpenResume={() => setShowResumeModal(true)}
        />
        <StatsBar />
        <About />
        <FrontendShowcase showToast={showToast} />
        <Skills />
        <Experience />
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        <AiAgent showToast={showToast} />
        <EducationAndVolunteering />
        <Contact showToast={showToast} />
      </main>
      <Footer />

      {/* Project Case Study & Code Viewer Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Digital Resume Modal */}
      {showResumeModal && (
        <ResumeModal 
          onClose={() => setShowResumeModal(false)}
          showToast={showToast}
        />
      )}

      {/* Toast Alert */}
      {toast && <Toast message={toast} />}
    </React.Fragment>
  );
}

/* --- Particle Canvas Background Component --- */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const count = Math.floor(width / 22);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(127, 0, 255, 0.4)'
      });
    }

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
}

/* --- Navbar Component --- */
function Navbar({ theme, accentColor, onToggleTheme, onChangeAccent, onUploadPhoto, onOpenResume }) {
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
          {/* Accent Color Palette Selector */}
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

/* --- Hero Component --- */
function Hero({ profilePhoto, onUploadPhoto, onOpenResume }) {
  const [rotatingText, setRotatingText] = useState('');
  const words = ["Frontend React Engineering", "Machine Learning", "AI Agent Building", "Computer Vision Systems"];

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
            <span>Full Stack Instructor Training at NxtWave | M.Tech CSE</span>
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

/* --- Dedicated Frontend Showcase Component --- */
function FrontendShowcase({ showToast }) {
  // Live Interactive React Component Demos
  const [activeDemoTab, setActiveDemoTab] = useState('card-generator');
  
  // Interactive UI Widget Demo States
  const [cardTitle, setCardTitle] = useState('Interactive React UI Component');
  const [cardCategory, setCardCategory] = useState('Frontend Development');
  const [cardGlow, setCardGlow] = useState(true);

  // Form State Demo
  const [demoEmail, setDemoEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const handleEmailChange = (val) => {
    setDemoEmail(val);
    setEmailValid(val.includes('@') && val.includes('.'));
  };

  return (
    <section id="frontend" className="section bg-alt">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle"><i className="ri-code-line"></i> Core Expertise</span>
          <h2 className="section-title">Full Stack Engineering Showcase</h2>
          <p className="section-desc">Interactive demonstration of full stack web applications, React frontend architecture, Node REST APIs, live state management, and SQL databases built during NxtWave training & hackathons.</p>
          <div className="title-underline"></div>
        </div>

        {/* Full Stack Core Pillar Cards */}
        <div className="about-grid" style={{ marginBottom: '50px' }}>
          <div className="about-card glass-card">
            <div className="card-icon" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)' }}>
              <i className="ri-reactjs-line"></i>
            </div>
            <h3>React Component Architecture</h3>
            <p>Developing modular, reusable, and stateful functional components utilizing <code>useState</code>, <code>useEffect</code>, <code>useRef</code>, custom hooks, and JSX rendering.</p>
            <div className="skill-tag-group">
              <span className="skill-tag">React Hooks</span>
              <span className="skill-tag">JSX Engine</span>
              <span className="skill-tag">State Management</span>
            </div>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon" style={{ background: 'rgba(127, 0, 255, 0.1)', color: 'var(--accent-purple)' }}>
              <i className="ri-server-line"></i>
            </div>
            <h3>Node APIs & SQL Databases</h3>
            <p>Building RESTful backend services, routing logic, server authentication, and relational SQL database schemas for full stack applications.</p>
            <div className="skill-tag-group">
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">Node / Express</span>
              <span className="skill-tag">SQL Databases</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Full Stack Component Sandbox */}
        <div className="glass-card" style={{ padding: '35px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', margin: 0 }}>⚡ Live Full Stack Component Sandbox</h3>
              <small style={{ color: 'var(--text-muted)' }}>Interact with live stateful React & API component widgets built in real-time code</small>
            </div>
            <div className="skill-filters" style={{ margin: 0 }}>
              <button className={`skill-tab ${activeDemoTab === 'card-generator' ? 'active' : ''}`} onClick={() => setActiveDemoTab('card-generator')}>
                🎨 UI Card Generator
              </button>
              <button className={`skill-tab ${activeDemoTab === 'form-validator' ? 'active' : ''}`} onClick={() => setActiveDemoTab('form-validator')}>
                ✅ Form Validation Hook
              </button>
            </div>
          </div>

          {activeDemoTab === 'card-generator' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
              <div>
                <h4 style={{ marginBottom: '15px', color: 'var(--accent-cyan)' }}>Component State Controls</h4>
                <div className="form-group">
                  <label>Card Heading Text</label>
                  <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="Type card title..." />
                </div>
                <div className="form-group">
                  <label>Badge Category</label>
                  <input type="text" value={cardCategory} onChange={(e) => setCardCategory(e.target.value)} placeholder="Type category..." />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="glowCheck" checked={cardGlow} onChange={(e) => setCardGlow(e.target.checked)} style={{ width: 'auto' }} />
                  <label htmlFor="glowCheck" style={{ cursor: 'pointer', margin: 0 }}>Enable Neon Glow Shadow</label>
                </div>
              </div>

              {/* Live Render Output */}
              <div>
                <h4 style={{ marginBottom: '15px', color: 'var(--accent-cyan)' }}>Live React Output</h4>
                <div className="glass-card" style={{ padding: '25px', border: '1px solid var(--glass-border)', boxShadow: cardGlow ? 'var(--shadow-neon)' : 'none', transition: 'all 0.3s ease' }}>
                  <span className="project-category" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>{cardCategory}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{cardTitle}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                    This component updates instantly in DOM whenever you type into the state controls on the left.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={() => showToast(`Clicked interactive demo card: "${cardTitle}"`)}>
                    Interact <i className="ri-cursor-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '550px', margin: '0 auto' }}>
              <h4 style={{ marginBottom: '15px', color: 'var(--accent-cyan)' }}>Real-Time Hook Validation Demo</h4>
              <div className="form-group">
                <label>Test Email Address Input</label>
                <input 
                  type="email" 
                  value={demoEmail} 
                  onChange={(e) => handleEmailChange(e.target.value)} 
                  placeholder="name@example.com" 
                  style={{ borderColor: emailValid === true ? '#10b981' : emailValid === false ? '#ef4444' : 'var(--glass-border)' }}
                />
              </div>

              {emailValid === true && (
                <div style={{ color: '#10b981', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="ri-checkbox-circle-fill"></i> Valid email address structure! React state validated cleanly.
                </div>
              )}
              {emailValid === false && (
                <div style={{ color: '#ef4444', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="ri-error-warning-fill"></i> Invalid email format (missing '@' or domain extension).
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* --- Stats Bar Component --- */
function StatsBar() {
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

/* --- About Component --- */
function About() {
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
              I am a driven software developer currently pursuing my <strong>M.Tech in Computer Science & Engineering</strong> at KL University, Vijayawada, with a strong background in Electronics & Communication Engineering (B.Tech from VVIT).
            </p>
            <p>
              My expertise spans across <strong>Frontend React Web Engineering</strong>, <strong>Machine Learning</strong>, <strong>AI Agent Building</strong>, <strong>Security Systems</strong>, and <strong>Full-Stack Web Development</strong>. I thrive on translating theoretical concepts into real-world applications that create tangible impact.
            </p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon"><i className="ri-focus-3-line"></i></div>
            <h3>What I Do Best</h3>
            <ul className="check-list">
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Frontend UI & React:</strong> Building stateful UIs, responsive web design, glassmorphism, and SPA architecture.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>AI & ML Development:</strong> Model training, preprocessing, classification, and computer vision recognition.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>AI Agent Building:</strong> Designing prompt-based agents, workflow automation, and conversational tools.</li>
              <li><i className="ri-checkbox-circle-fill"></i> <strong>Embedded & IoT:</strong> Hardware security integrations using microcontrollers & biometric sensors.</li>
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

/* --- Skills Component (LinkedIn Pill Grid with Icons) --- */
function Skills() {
  const skillCategories = [
    {
      title: "Full Stack & Web Engineering",
      icon: "ri-layout-masonry-line",
      skills: [
        { name: "React 18", icon: "ri-reactjs-line" },
        { name: "React Hooks", icon: "ri-code-s-slash-line" },
        { name: "JavaScript (ES6+)", icon: "ri-javascript-line" },
        { name: "Node.js", icon: "ri-nodejs-line" },
        { name: "Express.js", icon: "ri-server-line" },
        { name: "RESTful APIs", icon: "ri-links-line" },
        { name: "HTML5 & CSS3", icon: "ri-html5-line" },
        { name: "Glassmorphic UI", icon: "ri-palette-line" },
        { name: "SPA Architecture", icon: "ri-window-line" }
      ]
    },
    {
      title: "Autonomous AI Agents & Workflows",
      icon: "ri-robot-2-line",
      skills: [
        { name: "Autonomous AI Agents", icon: "ri-robot-line" },
        { name: "Prompt Engineering", icon: "ri-chat-voice-line" },
        { name: "LLM Workflows", icon: "ri-sparkles-line" },
        { name: "Agent Automation Pipelines", icon: "ri-flow-chart" },
        { name: "Python", icon: "ri-python-line" },
        { name: "OOP Design", icon: "ri-node-tree" }
      ]
    },
    {
      title: "Machine Learning & Data",
      icon: "ri-brain-line",
      skills: [
        { name: "Classification Algorithms", icon: "ri-brain-line" },
        { name: "Model Training", icon: "ri-cpu-line" },
        { name: "Computer Vision", icon: "ri-eye-line" },
        { name: "Image Recognition", icon: "ri-scan-line" },
        { name: "Relational SQL", icon: "ri-database-2-line" },
        { name: "Data Preprocessing", icon: "ri-bar-chart-fill" }
      ]
    },
    {
      title: "Cloud, Tools & Platforms",
      icon: "ri-terminal-box-line",
      skills: [
        { name: "VS Code IDE", icon: "ri-code-box-line" },
        { name: "Git & GitHub", icon: "ri-git-branch-line" },
        { name: "AWS Academy Cloud", icon: "ri-amazon-line" },
        { name: "Google Data Analytics", icon: "ri-google-line" },
        { name: "MS Excel", icon: "ri-file-excel-line" }
      ]
    }
  ];

  return (
    <section id="skills" className="section bg-alt">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle"><i className="ri-tools-line"></i> Core Competencies</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-desc">Key technical proficiencies and frameworks mastered during M.Tech CSE & NxtWave Full Stack Training.</p>
          <div className="title-underline"></div>
        </div>

        <div className="simple-skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="simple-skill-card glass-card">
              <div className="simple-skill-header">
                <div className="simple-skill-icon"><i className={cat.icon}></i></div>
                <h3>{cat.title}</h3>
              </div>
              <div className="simple-skill-pills">
                {cat.skills.map((skillObj, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    <i className={skillObj.icon}></i> {skillObj.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Experience Component --- */
function Experience() {
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

/* --- Projects Component --- */
function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const projectsData = [
    {
      id: "billing",
      title: "AI Powered Auto Billing System",
      subtitle: "Fast Checkout in Retail Stores",
      category: "ai-ml hackathon",
      categoryName: "AI / Computer Vision",
      bannerClass: "",
      icon: "ri-shopping-cart-2-line",
      desc: "Developed an intelligent retail billing solution using image recognition to automatically detect products at checkout. Eliminates manual scanning, minimizes human error, and drastically reduces checkout wait times.",
      tech: ["Python", "Computer Vision", "Image Recognition", "Auto Billing"],
      details: {
        title: "AI Powered Auto Billing System for Fast Checkout",
        category: "AI & Computer Vision | Retail Tech",
        description: "An automated checkout solution using image recognition to streamline retail billing operations.",
        features: [
          "Real-time product identification using computer vision",
          "Automated cart calculation eliminating manual bar-code scanning",
          "Reduction in customer waiting time during peak store hours",
          "Minimization of cashier error and manual inventory mismatch"
        ],
        techList: ["Python", "OpenCV", "Machine Learning", "Image Classification", "GUI Interface"],
        sampleCode: `# AI Retail Product Detection & Auto-Billing Snippet
import cv2
import numpy as np

class AutoBillingScanner:
    def __init__(self, model_weights):
        self.net = cv2.dnn.readNet(model_weights)
        self.catalog = {"apple": 1.50, "milk": 2.99, "bread": 2.20}
        
    def scan_item(self, frame):
        blob = cv2.dnn.blobFromImage(frame, 1/255.0, (224, 224), swapRB=True)
        self.net.setInput(blob)
        preds = self.net.forward()
        item_id = np.argmax(preds)
        return item_id, self.catalog.get(item_id, 0.0)`
      }
    },
    {
      id: "cancer",
      title: "Breast Cancer Prediction & Detection",
      subtitle: "Early Tumor Classification System",
      category: "ai-ml",
      categoryName: "Machine Learning / Healthcare",
      bannerClass: "banner-medical",
      icon: "ri-health-book-line",
      desc: "Built a machine learning classification model using Python to classify breast cancer tumors as benign or malignant based on feature extraction from medical datasets. Achieved high accuracy to assist early clinical diagnosis.",
      tech: ["Python", "Classification Algorithms", "Data Preprocessing", "Model Evaluation"],
      details: {
        title: "Breast Cancer Prediction & Detection",
        category: "Healthcare AI | Machine Learning",
        description: "Supervised ML model designed to assist healthcare professionals in early tumor classification.",
        features: [
          "Classifies medical dataset features into Benign or Malignant tumors",
          "Data preprocessing, handling missing values, and normalization",
          "Feature selection using correlation matrix & importance ranking",
          "Evaluated with Precision, Recall, F1-Score, and ROC-AUC curves"
        ],
        techList: ["Python", "Scikit-Learn", "Pandas & NumPy", "Matplotlib / Seaborn", "ML Classification"],
        sampleCode: `# Machine Learning Breast Cancer Tumor Classifier
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

def train_tumor_classifier(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, max_depth=8)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred, target_names=['Benign', 'Malignant']))
    return model`
      }
    },
    {
      id: "fingerprint",
      title: "Fingerprint Door Lock System",
      subtitle: "Hardware Biometric Authentication",
      category: "iot",
      categoryName: "Biometrics / IoT Security",
      bannerClass: "banner-security",
      icon: "ri-fingerprint-line",
      desc: "Designed and implemented a keyless door access control system integrating an optical fingerprint sensor with a microcontroller. Matches fingerprint templates to grant instant access to authorized users while logging attempts.",
      tech: ["Microcontroller", "Fingerprint Sensor", "C / Embedded", "Hardware Security"],
      details: {
        title: "Fingerprint Door Lock System",
        category: "Hardware Security | Biometric Access Control",
        description: "Keyless physical access control system using optical fingerprint biometric sensors and microcontrollers.",
        features: [
          "Optical fingerprint template enrolment and high-speed matching",
          "Microcontroller circuit driving solenoid lock relay actuators",
          "Eliminates physical key requirement and unauthorized access vulnerabilities",
          "Visual LED indicators & LCD status display for user feedback"
        ],
        techList: ["Microcontroller (Arduino/PIC)", "Fingerprint Sensor R307", "Embedded C/C++", "Relay Control"],
        sampleCode: `// Fingerprint Biometric Access Verification Routine
#include <Adafruit_Fingerprint.h>

HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void check_access() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return;
  
  p = finger.image2Tz();
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    digitalWrite(SOLENOID_RELAY_PIN, HIGH); // Unlock Door
    delay(5000);
    digitalWrite(SOLENOID_RELAY_PIN, LOW);  // Lock Door
  }
}`
      }
    },
    {
      id: "nxtwave",
      title: "NxtWave Hackathon Innovations",
      subtitle: "AI Agents & Web Applications",
      category: "hackathon ai-ml",
      categoryName: "Full-Stack & AI Agents",
      bannerClass: "banner-hackathon",
      icon: "ri-robot-2-line",
      desc: "A series of intensive hackathon builds including autonomous AI agent workflows, responsive web frontend interfaces, backend REST APIs, and database schemas developed during the NxtWave internship program.",
      tech: ["AI Agent Building", "Frontend UI", "Backend APIs", "SQL Management"],
      details: {
        title: "NxtWave Hackathon Innovations & AI Agents",
        category: "Full-Stack Development & AI Workflows",
        description: "Collection of intensive hackathon builds produced during the NxtWave internship program (April 2026 – Present).",
        features: [
          "Built responsive, interactive frontend user interfaces using modern CSS & JS",
          "Engineered backend RESTful API services and routing logic",
          "Designed autonomous AI Agents for automated prompt handling and task parsing",
          "Structured relational database schemas and performed optimized SQL queries"
        ],
        techList: ["AI Agent Frameworks", "Node/Express & Python", "React UI", "SQL & Database Design"],
        sampleCode: `// Autonomous React AI Agent Task Pipeline
class ResumeAgent {
  constructor(resumeContext) {
    this.context = resumeContext;
  }
  
  processQuery(userInput) {
    const prompt = \`Context: \${JSON.stringify(this.context)}\\nUser Question: \${userInput}\`;
    return this.evaluateAgentPrompt(prompt);
  }
  
  evaluateAgentPrompt(prompt) {
    // Parse intent & return structured response
    return { status: 'success', parsedIntent: 'skills_inquiry' };
  }
}`
      }
    }
  ];

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(p => p.category.includes(filter));

  return (
    <section id="projects" className="section bg-alt">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Featured Work</span>
          <h2 className="section-title">Projects & Innovations</h2>
          <div className="title-underline"></div>
        </div>

        <div className="project-filters">
          <button className={`project-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
          <button className={`project-tab ${filter === 'ai-ml' ? 'active' : ''}`} onClick={() => setFilter('ai-ml')}>AI & Machine Learning</button>
          <button className={`project-tab ${filter === 'iot' ? 'active' : ''}`} onClick={() => setFilter('iot')}>IoT & Hardware Security</button>
          <button className={`project-tab ${filter === 'hackathon' ? 'active' : ''}`} onClick={() => setFilter('hackathon')}>Hackathon Projects</button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card glass-card">
              <div className={`project-banner ${p.bannerClass}`}>
                <div className="banner-icon"><i className={p.icon}></i></div>
                <span className="project-category">{p.categoryName}</span>
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t, idx) => <span key={idx}>{t}</span>)}
                </div>
                <button className="btn btn-outline btn-sm open-modal-btn" onClick={() => onSelectProject(p.details)}>
                  <span>View Case Study & Code</span> <i className="ri-code-s-slash-line"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Interactive AI Agent Component with Speech Synthesis --- */
function AiAgent({ showToast }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am <strong>Potluri Divya Sri's React AI Assistant</strong>. I can answer any question regarding her education (M.Tech CSE @ KL University), skills (React Frontend, Machine Learning, AI Agent Building, SQL), projects, or NxtWave internship. What would you like to know?" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (htmlText) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in your browser');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = htmlText.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
    showToast('🔊 Speaking response aloud...');
  };

  const generateResponse = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes('skill') || lower.includes('know') || lower.includes('technology') || lower.includes('frontend')) {
      return "<strong>Divya's Technical & Frontend Skills:</strong><br>• <strong>Frontend UI:</strong> React 18, JSX, State Hooks, Modern CSS Grid/Flex, Glassmorphic UI<br>• <strong>Programming:</strong> Python, OOP Concepts, JavaScript ES6+<br>• <strong>AI & ML:</strong> Model Training, Classification, Computer Vision, AI Agent Building<br>• <strong>Web & DB:</strong> REST APIs, SQL Database Management<br>• <strong>Tools:</strong> VS Code, Git, MS Excel, AWS Cloud, Google Data Analytics";
    }
    if (lower.includes('nxtwave') || lower.includes('intern') || lower.includes('hackathon') || lower.includes('work') || lower.includes('job') || lower.includes('training') || lower.includes('instructor') || lower.includes('fullstack')) {
      return "Divya Sri is currently working at <strong>NxtWave in Full Stack Instructor Training</strong>. She specializes in:<br>1. <strong>React Component Architecture:</strong> Stateful functional components & hooks<br>2. <strong>Backend & REST APIs:</strong> Server-side logic, routing, & database endpoints<br>3. <strong>Database Management:</strong> Relational SQL schemas & query optimization<br>4. <strong>Full Stack Pedagogy:</strong> Guiding trainees in modern web development best practices";
    }
    if (lower.includes('project') || lower.includes('built') || lower.includes('work')) {
      return "<strong>Divya's Key Projects:</strong><br>1. 🛒 <strong>AI Powered Auto Billing System:</strong> Image recognition for automated store checkout.<br>2. 🩺 <strong>Breast Cancer Prediction & Detection:</strong> ML model classifying benign vs malignant tumors.<br>3. 🔒 <strong>Fingerprint Door Lock System:</strong> Biometric microcontroller access security.<br>4. ⚡ <strong>NxtWave Hackathons:</strong> Full-stack applications & AI Agents.";
    }
    if (lower.includes('education') || lower.includes('college') || lower.includes('degree') || lower.includes('m.tech') || lower.includes('b.tech')) {
      return "<strong>Educational Qualifications:</strong><br>• 🎓 <strong>M.Tech in CSE (2024–Pursuing):</strong> KL University, Vijayawada<br>• 🎓 <strong>B.Tech in ECE (2020–2024):</strong> Vasireddy Venkatadri Institute of Technology (VVIT), Guntur<br>• 🏫 <strong>Intermediate MPC (2018–2020):</strong> Bhashyam Junior College<br>• 🏫 <strong>SSC (2017–2018):</strong> Oxford EM High School";
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
      return "You can reach <strong>Potluri Divya Sri</strong> via:<br>📧 <strong>Email:</strong> potluridivyasri23@gmail.com<br>📞 <strong>Phone:</strong> +91 9000839375<br>📍 <strong>Location:</strong> Vijayawada, Andhra Pradesh, India";
    }
    if (lower.includes('certification') || lower.includes('aws') || lower.includes('google')) {
      return "<strong>Certifications & Training:</strong><br>• ☁️ <strong>AWS Academy Cloud Foundation</strong> (AWS)<br>• 📊 <strong>Data-Driven Decisions</strong> (Google)";
    }
    return "Thank you for asking! Divya Sri is an M.Tech CSE student & NxtWave intern specializing in <strong>Frontend React Engineering</strong>, <strong>Machine Learning</strong>, <strong>AI Agent Building</strong>, and <strong>Full-Stack Development</strong>. Feel free to click any of the question chips above or ask about her skills, projects, or contact info!";
  };

  const handleSend = (text) => {
    const query = text || inputVal.trim();
    if (!query) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    if (!text) setInputVal('');

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: generateResponse(query) }]);
    }, 450);
  };

  return (
    <section id="ai-agent" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle"><i className="ri-sparkles-line"></i> Live React & Speech Feature</span>
          <h2 className="section-title">Divya's Portfolio AI Assistant</h2>
          <p className="section-desc">Experience my AI Agent building skills firsthand! Ask questions about my background, skills, projects, and training below.</p>
          <div className="title-underline"></div>
        </div>

        <div className="ai-agent-container glass-card">
          <div className="chat-header">
            <div className="chat-bot-info">
              <div className="bot-avatar"><i className="ri-robot-2-fill"></i></div>
              <div>
                <h4>Divya's Resume AI Agent</h4>
                <span className="online-status"><span className="status-dot"></span> Active & Voice Enabled</span>
              </div>
            </div>
            <button className="icon-btn-sm" onClick={() => setMessages([{ sender: 'bot', text: 'Chat history reset! Ask me anything about Potluri Divya Sri.' }])} title="Reset Chat">
              <i className="ri-refresh-line"></i>
            </button>
          </div>

          <div className="quick-chips">
            <button className="chip-btn" onClick={() => handleSend("What are Divya's core skills?")}>💡 What are Divya's skills?</button>
            <button className="chip-btn" onClick={() => handleSend("Tell me about her NxtWave internship.")}>🚀 Tell me about NxtWave</button>
            <button className="chip-btn" onClick={() => handleSend("What projects has she built?")}>📁 What projects has she built?</button>
            <button className="chip-btn" onClick={() => handleSend("What is her educational background?")}>🎓 Education history</button>
            <button className="chip-btn" onClick={() => handleSend("How can I contact Divya?")}>📩 How to contact her?</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-message ${m.sender}-message`}>
                <div className="msg-avatar">
                  <i className={m.sender === 'user' ? 'ri-user-3-line' : 'ri-robot-2-line'}></i>
                </div>
                <div className="msg-bubble">
                  <div dangerouslySetInnerHTML={{ __html: m.text }}></div>
                  {m.sender === 'bot' && (
                    <button className="speech-btn" onClick={() => speakText(m.text)} title="Read Aloud">
                      <i className="ri-volume-up-line"></i> Speak Response
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text" 
              placeholder="Ask a question about Divya's portfolio..." 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)} 
              autoComplete="off" 
            />
            <button type="submit" className="btn btn-primary btn-icon"><i className="ri-send-plane-2-fill"></i></button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* --- Education and Volunteering Component --- */
function EducationAndVolunteering() {
  return (
    <section id="education" className="section bg-alt">
      <div className="container">
        <div className="grid-2-col">
          <div className="edu-col">
            <div className="section-header">
              <span className="section-subtitle">Academic Credentials</span>
              <h2 className="section-title">Education</h2>
              <div className="title-underline left-aligned"></div>
            </div>

            <div className="edu-timeline">
              <div className="edu-card glass-card">
                <div className="edu-year">2024 – Pursuing</div>
                <h3>M.Tech in Computer Science & Engineering</h3>
                <h4 className="institute-name"><i className="ri-building-line"></i> KL University</h4>
                <p className="location-tag"><i className="ri-map-pin-line"></i> Vijayawada, Andhra Pradesh</p>
                <p>Advanced studies in Computer Science, Machine Learning algorithms, Software Architecture, and AI engineering.</p>
              </div>

              <div className="edu-card glass-card">
                <div className="edu-year">2020 – 2024</div>
                <h3>B.Tech in Electronics & Communication Engineering</h3>
                <h4 className="institute-name"><i className="ri-building-line"></i> Vasireddy Venkatadri Institute of Technology (VVIT)</h4>
                <p className="location-tag"><i className="ri-map-pin-line"></i> Guntur, Andhra Pradesh</p>
                <p>Core engineering fundamentals in signal processing, microcontrollers, embedded systems, and hardware security.</p>
              </div>

              <div className="edu-card glass-card">
                <div className="edu-year">2018 – 2020</div>
                <h3>Intermediate (MPC)</h3>
                <h4 className="institute-name"><i className="ri-building-line"></i> Bhashyam Junior College</h4>
                <p className="location-tag"><i className="ri-map-pin-line"></i> Guntur, Andhra Pradesh</p>
                <p>Focus on Mathematics, Physics, and Chemistry (MPC).</p>
              </div>

              <div className="edu-card glass-card">
                <div className="edu-year">2017 – 2018</div>
                <h3>Secondary School Certificate (SSC)</h3>
                <h4 className="institute-name"><i className="ri-building-line"></i> Oxford EM High School</h4>
                <p className="location-tag"><i className="ri-map-pin-line"></i> Guntur, Andhra Pradesh</p>
                <p>Secondary school education with distinction.</p>
              </div>
            </div>
          </div>

          <div className="volunteer-col">
            <div className="section-header">
              <span className="section-subtitle">Leadership & Community</span>
              <h2 className="section-title">Organizations & Volunteering</h2>
              <div className="title-underline left-aligned"></div>
            </div>

            <div className="volunteer-list">
              <div className="vol-card glass-card">
                <div className="vol-icon"><i className="ri-hand-heart-line"></i></div>
                <div>
                  <h3>NSS VVIT – Volunteer</h3>
                  <span className="vol-badge">Community Service</span>
                  <p>Organized awareness drives, blood donation camps, and social initiatives at VVIT campus.</p>
                </div>
              </div>

              <div className="vol-card glass-card">
                <div className="vol-icon"><i className="ri-seedling-line"></i></div>
                <div>
                  <h3>Aquaculture Innovation Tech – Volunteer</h3>
                  <span className="vol-badge">Technology & Agri-Tech</span>
                  <p>Assisted in technical outreach programs applying technology solutions for sustainable aquaculture practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Contact Component --- */
function Contact({ showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied to clipboard: ${text}`);
    });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-card">
            <h3>Let's Connect & Collaborate</h3>
            <p>I am seeking exciting career opportunities in growth-oriented tech companies where I can apply my skills in Frontend React Engineering, Machine Learning, and AI Agent Building.</p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><i className="ri-mail-fill"></i></div>
                <div>
                  <small>Email Address</small>
                  <p><a href="mailto:potluridivyasri23@gmail.com">potluridivyasri23@gmail.com</a></p>
                  <button className="copy-btn" onClick={() => copyToClipboard('potluridivyasri23@gmail.com')}><i className="ri-file-copy-line"></i> Copy Email</button>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><i className="ri-phone-fill"></i></div>
                <div>
                  <small>Phone Number</small>
                  <p><a href="tel:9000839375">+91 9000839375</a></p>
                  <button className="copy-btn" onClick={() => copyToClipboard('9000839375')}><i className="ri-file-copy-line"></i> Copy Phone</button>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><i className="ri-map-pin-fill"></i></div>
                <div>
                  <small>Location</small>
                  <p>Vijayawada, Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card glass-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" required placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" required placeholder="Job opportunity / Project inquiry / General message" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" required placeholder="Write your message here..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <span>Send Message</span> <i className="ri-send-plane-fill"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Project Case Study & Code Viewer Modal Component --- */
function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-content glass-card">
        <button className="modal-close" onClick={onClose}><i className="ri-close-line"></i></button>
        <div>
          <span className="project-category" style={{ marginBottom: '12px', display: 'inline-block' }}>{project.category}</span>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{project.title}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{project.description}</p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            <button className={`skill-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <i className="ri-file-text-line"></i> Case Study Overview
            </button>
            <button className={`skill-tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
              <i className="ri-code-s-slash-line"></i> Code Implementation Snippet
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent-cyan)' }}>Key Highlights & Features</h3>
              <ul className="check-list" style={{ marginBottom: '25px' }}>
                {project.features.map((f, idx) => (
                  <li key={idx}><i className="ri-checkbox-circle-fill"></i> {f}</li>
                ))}
              </ul>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent-cyan)' }}>Technologies Used</h3>
              <div className="skill-tag-group">
                {project.techList.map((t, idx) => (
                  <span key={idx} className="skill-tag" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>{t}</span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent-cyan)' }}>Code Snippet Preview</h3>
              <pre style={{ background: '#070a11', padding: '16px', borderRadius: '8px', color: '#00f2fe', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto', border: '1px solid var(--glass-border)' }}>
                <code>{project.sampleCode || '// Code implementation available upon request'}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Digital Resume Modal Component --- */
function ResumeModal({ onClose, showToast }) {
  const handlePrint = () => {
    window.print();
    showToast('Printing / Saving PDF of Potluri Divya Sri Resume');
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-content glass-card" style={{ maxWidth: '800px' }}>
        <button className="modal-close" onClick={onClose}><i className="ri-close-line"></i></button>

        <div className="resume-paper" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-cyan)', paddingBottom: '15px', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>POTLURI DIVYA SRI</h1>
              <p style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>M.Tech CSE Student & Frontend React / AI Engineer</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <i className="ri-printer-line"></i> Print / Download PDF
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.88rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
            <div>📧 <strong>Email:</strong> potluridivyasri23@gmail.com</div>
            <div>📞 <strong>Cell:</strong> 9000839375</div>
            <div>📍 <strong>Location:</strong> Vijayawada, Andhra Pradesh</div>
            <div>🚀 <strong>Role:</strong> Full Stack Instructor Training at NxtWave</div>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>PROFILE</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Experienced in developing frontend React web applications, academic & hackathon projects related to security systems, data handling, and AI agent building. Seeking a challenging role in a growth-oriented organization to apply skills and continuously learn and grow professionally.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>EDUCATION</h3>
          <ul style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>KL University:</strong> M.Tech (CSE) | 2024 – Pursuing | Vijayawada</li>
            <li><strong>Vasireddy Venkatadri Institute of Technology:</strong> B.Tech (ECE) | 2020 – 2024 | Guntur</li>
            <li><strong>Bhashyam Junior College:</strong> MPC | 2018 – 2020 | Guntur</li>
            <li><strong>Oxford EM High School:</strong> SSC | 2017 – 2018 | Guntur</li>
          </ul>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>TECHNICAL SKILLS</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Frontend React Web Development (React 18, Hooks, JSX, Component Architecture) | Modern HTML5 / CSS3 (Flexbox, Grid, Glassmorphism) | JavaScript (ES6+) | Python | Object-Oriented Programming (OOP) | Machine Learning (Model Training, Classification, Evaluation, Preprocessing) | AI Agent Building | Computer Vision | REST APIs | SQL Database Management | VS Code | Git | MS Excel | AWS Academy Cloud | Google Data Analytics
          </p>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>PROJECTS</h3>
          <ul style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>Fingerprint Door Lock System:</strong> Biometric access system using fingerprint sensor & microcontroller.</li>
            <li><strong>Breast Cancer Prediction and Detection:</strong> Machine learning model classifying tumors as benign or malignant.</li>
            <li><strong>AI Powered Auto Billing System:</strong> Retail fast checkout system using computer vision product recognition.</li>
            <li><strong>NxtWave Hackathon Projects:</strong> Full-stack web applications, frontend UI dashboards, database management, and autonomous AI agents.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* --- Toast Notification Component --- */
function Toast({ message }) {
  return (
    <div className="toast-container">
      <div className="toast">
        <i className="ri-checkbox-circle-fill" style={{ color: 'var(--accent-cyan)' }}></i>
        <span>{message}</span>
      </div>
    </div>
  );
}

/* --- Footer Component --- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">
            <span className="logo-badge">PDS</span>
            <span className="logo-name">Potluri Divya Sri</span>
          </a>
          <p>M.Tech CSE Student & Frontend React / AI Engineer</p>
        </div>

        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Potluri Divya Sri. Built with React.</p>
        </div>

        <a href="#hero" className="back-to-top" title="Back to Top">
          <i className="ri-arrow-up-line"></i>
        </a>
      </div>
    </footer>
  );
}

// Render React App into DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
