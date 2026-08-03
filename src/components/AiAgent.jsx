import React, { useState, useEffect, useRef } from 'react';

export default function AiAgent({ showToast }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm Divya Sri's AI Portfolio Assistant. Ask me anything about her React frontend experience, M.Tech education, projects, skills, or internship training!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const kb = [
    { keywords: ['skills', 'tech', 'stack', 'languages', 'react', 'frontend'], answer: "Divya Sri specializes in React 18, React Hooks, Frontend Component Architecture, JavaScript (ES6+), HTML5/CSS3 (Grid/Flexbox/Glassmorphism), Python, Machine Learning, AI Agent Building, Computer Vision, SQL, and AWS Cloud Fundamentals." },
    { keywords: ['education', 'degree', 'college', 'mtech', 'btech', 'kl', 'vvit'], answer: "Divya Sri is pursuing M.Tech in CSE at KL University, Vijayawada (2024–Present). She completed her B.Tech in ECE from Vasireddy Venkatadri Institute of Technology (VVIT), Guntur (2020–2024), Intermediate from Bhashyam Junior College (2018–2020), and SSC from Oxford EM High School (2017–2018)." },
    { keywords: ['projects', 'fingerprint', 'cancer', 'billing', 'auto', 'hackathon'], answer: "Her key projects include: 1) AI Powered Auto Billing System for Fast Checkout (Computer Vision), 2) Breast Cancer Prediction & Detection ML Model, 3) Hardware Fingerprint Door Lock System (IoT Security), and 4) NxtWave Hackathon AI Agents & Frontend Web Apps." },
    { keywords: ['nxtwave', 'internship', 'experience', 'work', 'job', 'role', 'training', 'instructor', 'fullstack'], answer: "Divya Sri is currently working at NxtWave in Full Stack Instructor Training. She specializes in React frontend UI development, Node/Express backend APIs, database management (SQL), and full stack web architecture." },
    { keywords: ['contact', 'email', 'phone', 'location', 'call', 'reach', 'address'], answer: "You can reach Potluri Divya Sri via Email at potluridivyasri23@gmail.com, Phone at +91 9000839375, or meet her in Vijayawada, Andhra Pradesh, India." },
    { keywords: ['certifications', 'aws', 'google', 'certificates'], answer: "Divya Sri holds AWS Academy Cloud Foundation certification (Amazon Web Services) and Data-Driven Decisions certification from Google." }
  ];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let match = kb.find(k => k.keywords.some(kw => lower.includes(kw)));
      let reply = match 
        ? match.answer 
        : "Thank you for asking! Potluri Divya Sri is a skilled Frontend React & AI Developer. Feel free to ask about her React UI skills, M.Tech at KL University, or NxtWave internship projects!";
      
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Playing Voice AI Response...');
    } else {
      showToast('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <section id="ai-agent" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle"><i className="ri-robot-2-line"></i> Interactive Assistant</span>
          <h2 className="section-title">Ask Divya Sri's AI Agent</h2>
          <p className="section-desc">Trained on Divya Sri's background, React skills, projects, and credentials. Type a question below or trigger voice synthesis!</p>
          <div className="title-underline"></div>
        </div>

        <div className="chat-window glass-card">
          <div className="chat-header">
            <div className="bot-avatar"><i className="ri-robot-line"></i></div>
            <div>
              <h3>Divya Sri Portfolio Agent</h3>
              <small className="status-online"><span className="pulse-dot"></span> Online & Ready</small>
            </div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender}`}>
                <p>{m.text}</p>
                {m.sender === 'bot' && (
                  <button className="speech-btn" onClick={() => speakText(m.text)} title="Listen to response">
                    <i className="ri-volume-up-line"></i> <span>Speak</span>
                  </button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot typing">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          <form className="chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about React skills, M.Tech degree, projects..." 
            />
            <button type="submit" className="btn btn-primary btn-icon">
              <i className="ri-send-plane-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
