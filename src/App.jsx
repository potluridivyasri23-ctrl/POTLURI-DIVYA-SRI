import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import FrontendShowcase from './components/FrontendShowcase';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AiAgent from './components/AiAgent';
import EducationAndVolunteering from './components/EducationAndVolunteering';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('cyan');
  const [profilePhoto, setProfilePhoto] = useState('assets/profile.jpeg');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.body.className = `${theme}-theme accent-${accentColor}`;
  }, [theme, accentColor]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

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

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {showResumeModal && (
        <ResumeModal 
          onClose={() => setShowResumeModal(false)}
          showToast={showToast}
        />
      )}

      {toast && <Toast message={toast} />}
    </React.Fragment>
  );
}
