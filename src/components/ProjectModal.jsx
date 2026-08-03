import React, { useState } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        <div className="modal-header">
          <span className="project-category">{project.category}</span>
          <h2>{project.title}</h2>
        </div>

        <div className="skill-filters" style={{ margin: '15px 0 25px 0' }}>
          <button className={`skill-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <i className="ri-file-text-line"></i> Overview & Features
          </button>
          <button className={`skill-tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
            <i className="ri-code-s-slash-line"></i> Code Implementation Snippet
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div className="modal-body">
            <p className="modal-desc">{project.description}</p>
            
            <h4 style={{ margin: '20px 0 10px 0', color: 'var(--accent-cyan)' }}>Key Technical Highlights</h4>
            <ul className="modal-features">
              {project.features.map((f, idx) => (
                <li key={idx}><i className="ri-checkbox-circle-fill"></i> {f}</li>
              ))}
            </ul>

            <h4 style={{ margin: '20px 0 10px 0', color: 'var(--accent-cyan)' }}>Tech Stack</h4>
            <div className="skill-tag-group">
              {project.techList.map((t, idx) => (
                <span key={idx} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="modal-body">
            <h4 style={{ marginBottom: '10px', color: 'var(--accent-cyan)' }}>Source Code Implementation</h4>
            <pre style={{ 
              background: '#0d1117', 
              padding: '18px', 
              borderRadius: 'var(--radius-md)', 
              color: '#e6edf3', 
              fontFamily: "'Fira Code', monospace", 
              fontSize: '0.85rem', 
              overflowX: 'auto',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <code>{project.sampleCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
