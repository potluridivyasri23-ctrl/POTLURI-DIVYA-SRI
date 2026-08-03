import React, { useState } from 'react';

export default function Projects({ onSelectProject }) {
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
