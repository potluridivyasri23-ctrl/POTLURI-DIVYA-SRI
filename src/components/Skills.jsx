import React from 'react';

export default function Skills() {
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
