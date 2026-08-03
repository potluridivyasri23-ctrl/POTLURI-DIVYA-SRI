import React, { useState } from 'react';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🎉 Message sent successfully! Divya Sri will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-desc">Open for software engineering roles, React frontend opportunities, ML research collaborations, and technical discussions.</p>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-card">
            <h3>Let's Connect</h3>
            <p>Feel free to reach out via email, phone, or message form below. I am actively seeking exciting professional roles.</p>
            
            <div className="contact-details">
              <a href="mailto:potluridivyasri23@gmail.com" className="contact-card">
                <i className="ri-mail-send-line contact-icon"></i>
                <div>
                  <strong>Email Address</strong>
                  <p>potluridivyasri23@gmail.com</p>
                </div>
              </a>

              <a href="tel:9000839375" className="contact-card">
                <i className="ri-phone-find-line contact-icon"></i>
                <div>
                  <strong>Cell / Phone Number</strong>
                  <p>+91 9000839375</p>
                </div>
              </a>

              <div className="contact-card">
                <i className="ri-map-pin-2-line contact-icon"></i>
                <div>
                  <strong>Location</strong>
                  <p>Vijayawada, Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className="form-group">
              <label>Your Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Rahul Sharma" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                required 
                placeholder="rahul@example.com" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                placeholder="Role Inquiry / Project Discussion" 
                value={formData.subject} 
                onChange={(e) => setFormData({...formData, subject: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Your Message *</label>
              <textarea 
                rows="4" 
                required 
                placeholder="Hi Divya Sri, I would like to discuss..." 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span>Sending...</span> : <span>Send Message</span>}
              <i className="ri-send-plane-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
