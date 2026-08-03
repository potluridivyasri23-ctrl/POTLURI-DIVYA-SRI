import React, { useState } from 'react';

export default function FrontendShowcase({ showToast }) {
  const [activeDemoTab, setActiveDemoTab] = useState('card-generator');
  const [cardTitle, setCardTitle] = useState('Interactive React UI Component');
  const [cardCategory, setCardCategory] = useState('Frontend Development');
  const [cardGlow, setCardGlow] = useState(true);

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
          <span className="section-subtitle"><i className="ri-code-line"></i> Technical Expertise</span>
          <h2 className="section-title">Full Stack Engineering Showcase</h2>
          <p className="section-desc">Interactive demonstration of full stack web applications, React frontend architecture, Node REST APIs, live state management, and SQL databases built during NxtWave training & hackathons.</p>
          <div className="title-underline"></div>
        </div>

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
