import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  return (
    <section className="knora-hero-section">
      <div className="knora-hero-container">
        {/* Pill Badge */}
        <div className="hero-pill-badge">
          <Sparkles size={14} color="#1A73E8" />
          <span>OFFICIAL STUDENT PLATFORM</span>
        </div>

        {/* Main Heading */}
        <h1 className="knora-hero-title">
          Learn. Build. Grow.<br />
          <span className="hero-highlight-blue">Get Hired.</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="knora-hero-subtext">
          KNORA brings academics, skill development, AI-powered career tools, projects, jobs, internships, hackathons and more into one platform built for students.
        </p>

        {/* Action Buttons */}
        <div className="knora-hero-actions">
          <button 
            className="btn-hero-primary" 
            onClick={() => isAuthenticated ? navigate('/profile') : openAuthModal('signup')}
          >
            <span>Get Started</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn-hero-secondary" 
            onClick={() => navigate('/academics')}
          >
            <BookOpen size={18} />
            <span>Explore Academics</span>
          </button>
        </div>

        {/* Ecosystem Preview Composition (Section 12) */}
        <div className="hero-visual-composition">
          <div className="composition-header">
            <div className="comp-badge"><Cpu size={14} /> KNORA ECOSYSTEM</div>
          </div>
          
          <div className="composition-grid">
            <div className="comp-card academic-col">
              <div className="comp-card-badge">ACADEMICS</div>
              <h4>B.Tech Academic Dashboard</h4>
              <p>University Regulations, Notes, Video Lectures & Question Papers</p>
            </div>

            <div className="comp-card career-col">
              <div className="comp-card-badge">CAREER</div>
              <h4>ATS Resume & Portfolio</h4>
              <p>AI Score Analyzer, Live Templates & Internship Jobs</p>
            </div>

            <div className="comp-card ai-col">
              <div className="comp-card-badge ai">GURU.AI</div>
              <h4>24/7 AI Student Assistant</h4>
              <p>Instant Doubt Resolution & Interview Prep</p>
            </div>
          </div>
        </div>

        {/* Trust Row */}
        <div className="hero-trust-row">
          <div className="trust-item">
            <CheckCircle2 size={16} color="#1A73E8" />
            <span>All B.Tech Branches</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} color="#1A73E8" />
            <span>ATS Resume & Portfolio</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} color="#1A73E8" />
            <span>24/7 Guru.AI Assistant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
