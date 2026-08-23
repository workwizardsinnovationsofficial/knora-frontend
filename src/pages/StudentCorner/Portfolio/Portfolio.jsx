import React, { useState } from 'react';
import { Sparkles, Globe, ArrowRight, CheckCircle2, Layout, Layers, Send, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import './Portfolio.css';

const Portfolio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [template, setTemplate] = useState('minimal');

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
    else toast.success('Portfolio Published to knora.in/portfolio/rahulsharma!');
  };

  return (
    <div className="portfolio-builder-container">
      <div className="builder-header">
        <span className="builder-badge"><Sparkles size={14} color="#1A73E8" /> AI WEBSITE BUILDER</span>
        <h1>Build Your Portfolio With AI</h1>
        <p>Flow: Your Profile → Projects → Skills → Choose Template → AI Generate & Publish</p>
      </div>

      {/* Step Indicator Flow (Section 25) */}
      <div className="flow-step-bar">
        <div className={`step-node ${currentStep >= 1 ? 'active' : ''}`}><span>01 Profile</span></div>
        <div className={`step-node ${currentStep >= 2 ? 'active' : ''}`}><span>02 Projects</span></div>
        <div className={`step-node ${currentStep >= 3 ? 'active' : ''}`}><span>03 Skills</span></div>
        <div className={`step-node ${currentStep >= 4 ? 'active' : ''}`}><span>04 Template</span></div>
        <div className={`step-node ${currentStep >= 5 ? 'active' : ''}`}><span>05 Publish</span></div>
      </div>

      {/* Interactive Builder Body */}
      <div className="builder-card-body">
        {currentStep === 1 && (
          <div className="step-content">
            <h3>Step 1: Confirm Profile Information</h3>
            <p>Your B.Tech details, social links, and bio will be automatically structured into your portfolio.</p>
            <div className="info-preview-box">
              <p><strong>Name:</strong> Rahul Sharma</p>
              <p><strong>Role:</strong> Full-Stack React & Python Developer</p>
              <p><strong>College:</strong> JNTUH College of Engineering (CSE 4th Year)</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <h3>Step 2: Featured B.Tech Projects</h3>
            <p>Select which GitHub repos and projects to display on your developer site.</p>
            <div className="project-select-box">
              <label><input type="checkbox" defaultChecked /> KNORA — Student Education & Career Platform</label>
              <label><input type="checkbox" defaultChecked /> AI Resume Keyword Analyzer (Python + FastAPI)</label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <h3>Step 3: Highlight Technical Skills</h3>
            <p>Your verified skills will be rendered as interactive skill badges.</p>
            <div className="skills-tags-box">
              <span>Python</span> <span>React 19</span> <span>FastAPI</span> <span>MongoDB</span> <span>Tailwind CSS</span>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step-content">
            <h3>Step 4: Choose Template Design</h3>
            <div className="template-grid">
              <div className={`tpl-card ${template === 'minimal' ? 'selected' : ''}`} onClick={() => setTemplate('minimal')}>
                <h4>Minimal Dark</h4>
                <p>Clean black & white editorial layout for software engineers.</p>
              </div>
              <div className={`tpl-card ${template === 'modern' ? 'selected' : ''}`} onClick={() => setTemplate('modern')}>
                <h4>KNORA Blue Accent</h4>
                <p>Modern card design with custom blue gradients & glass cards.</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="step-content">
            <h3>Step 5: Live Site Preview & Publishing</h3>
            <div className="live-portfolio-preview">
              <div className="p-header">
                <h2>Rahul Sharma</h2>
                <p>Full-Stack Engineer • JNTUH CSE 2026</p>
              </div>
              <div className="p-body">
                <h5>Featured Projects</h5>
                <p>KNORA Platform • AI Resume Analyzer</p>
              </div>
            </div>
          </div>
        )}

        <div className="builder-footer-btns">
          {currentStep > 1 && (
            <button className="btn-prev-step" onClick={() => setCurrentStep(prev => prev - 1)}>
              Back
            </button>
          )}

          <button className="btn-next-step" onClick={handleNext}>
            <span>{currentStep === 5 ? 'Publish Portfolio Live' : 'Next Step'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
