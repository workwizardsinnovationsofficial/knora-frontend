import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../Landing/Hero';
import PromotionalCarousel from '../../components/Carousel/PromotionalCarousel';
import { academicMockData } from '../../mock/academics';
import { skillsMockData } from '../../mock/skills';
import { testimonialsMockData } from '../../mock/testimonials';
import { BookOpen, Code, FileText, SearchCheck, Globe, Briefcase, Sparkles, CheckCircle2, ArrowRight, Video, FileCheck, Award, Layers, Trophy, Calendar, Compass, ShieldCheck, PlayCircle, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProtectedAction = (path, name) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      toast.error(`Please sign in to access ${name}`);
    }
  };

  return (
    <div className="knora-landing-wrapper">
      {/* 02 HERO (Shown ONLY for logged out visitors) */}
      {!isAuthenticated && <Hero />}

      {/* 03 PROMOTIONAL CAROUSEL */}
      <PromotionalCarousel />

      {/* 04 PLATFORM STATS */}
      <section className="knora-stats-section">
        <div className="knora-stats-container">
          <div className="stat-card">
            <Video size={28} color="#1A73E8" />
            <h3 className="stat-value">1,000+</h3>
            <p className="stat-label">Academic Videos</p>
          </div>
          <div className="stat-card">
            <Layers size={28} color="#1A73E8" />
            <h3 className="stat-value">Multiple</h3>
            <p className="stat-label">B.Tech Branches</p>
          </div>
          <div className="stat-card">
            <FileCheck size={28} color="#1A73E8" />
            <h3 className="stat-value">University</h3>
            <p className="stat-label">Focused Learning</p>
          </div>
          <div className="stat-card">
            <Award size={28} color="#1A73E8" />
            <h3 className="stat-value">AI Powered</h3>
            <p className="stat-label">Career Tools</p>
          </div>
        </div>
      </section>

      {/* 05 ACADEMICS INTRO */}
      <section className="knora-section academics-intro-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">B.TECH ACADEMICS</span>
            <h2 className="section-title">Everything You Need for Your Academics</h2>
            <p className="section-subtitle">
              Access university-specific syllabus, study materials, video lectures and previous papers — organized around your regulation, college, branch, year and semester.
            </p>
          </div>

          <div className="academics-cards-grid">
            <div className="academic-feature-card">
              <div className="feat-icon"><PlayCircle size={24} color="#ffffff" /></div>
              <h3>1,000+ Academic Videos</h3>
              <p>Structured unit-wise and topic-wise video lectures aligned with syllabus.</p>
            </div>
            <div className="academic-feature-card">
              <div className="feat-icon"><BookOpen size={24} color="#ffffff" /></div>
              <h3>Study Materials & Notes</h3>
              <p>Comprehensive PDF notes and lab manuals prepared by top faculty.</p>
            </div>
            <div className="academic-feature-card">
              <div className="feat-icon"><GraduationCap size={24} color="#ffffff" /></div>
              <h3>Previous Question Papers</h3>
              <p>10+ years of university question papers with solution hints for exam prep.</p>
            </div>
            <div className="academic-feature-card">
              <div className="feat-icon"><Layers size={24} color="#ffffff" /></div>
              <h3>All B.Tech Branches</h3>
              <p>CSE, AI/ML, Data Science, ECE, EEE, Mechanical and Civil engineering subjects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 & 07 ACADEMICS PRODUCT & VIDEO SCREENSHOT PREVIEWS */}
      <section className="knora-section academics-previews-section">
        <div className="section-container">
          <div className="academics-product-preview">
            <div className="preview-info-col">
              <span className="preview-badge">SMART SELECTION</span>
              <h3>Choose Your B.Tech Path</h3>
              <p>Filter content by Regulation (R22/R18), University (JNTUH, OU, Anna, VTU), Branch, Year and Semester.</p>
              
              <div className="branch-tags-list">
                {academicMockData.branches.map(b => (
                  <span key={b.id} className="branch-tag">{b.code}</span>
                ))}
              </div>

              <button className="btn-explore-academics" onClick={() => navigate('/academics')}>
                <span>Explore Academics Now</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="preview-mockup-col">
              <div className="mockup-window">
                <div className="mockup-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="mockup-title">knora.in/academics/subjects</span>
                </div>
                <div className="mockup-body">
                  <div className="mockup-nav-preview">
                    <span>JNTUH</span> • <span>R22</span> • <span>CSE</span> • <span>3rd Year</span>
                  </div>
                  <div className="mockup-subject-card">
                    <h4>Data Structures & Algorithms (CS301PC)</h4>
                    <p>Unit 1: Linear Data Structures & Stack/Queue Implementations</p>
                    <div className="mockup-progress-bar">
                      <div className="bar-fill" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="mockup-subject-card">
                    <h4>Database Management Systems (CS302PC)</h4>
                    <p>Unit 2: Relational Algebra & SQL Normalization Forms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 07 SUBJECT / VIDEO LEARNING PREVIEW */}
          <div className="video-player-preview-row">
            <div className="video-info-col">
              <span className="preview-badge">LEARNING PLAYER</span>
              <h3>Learn Every Topic, Step by Step</h3>
              <p>Explore structured unit topics alongside faculty video lessons and downloadable study notes.</p>
            </div>

            <div className="video-player-mockup">
              <div className="video-screen">
                <Video size={48} color="#1A73E8" />
                <div className="play-pulse"></div>
                <p>Engineering Physics — Unit 1: Wave Optics (Interference of Light)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 SKILLS */}
      <section className="knora-section skills-home-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">SKILLS ROADMAP</span>
            <h2 className="section-title">Build Skills That Matter</h2>
            <p className="section-subtitle">
              Go beyond your classroom syllabus and build the technical skills companies are looking for.
            </p>
          </div>

          <div className="skills-roadmap-grid">
            {skillsMockData.map((skill) => (
              <div key={skill.id} className="skill-card">
                <div className="skill-card-top">
                  <span className="skill-cat">{skill.category}</span>
                  <span className={`status-tag ${skill.status === 'Available Now' ? 'active' : 'soon'}`}>
                    {skill.status}
                  </span>
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-desc">{skill.description}</p>
                <div className="skill-meta">
                  <span>{skill.level}</span> • <span>{skill.modulesCount} Modules</span>
                </div>
              </div>
            ))}
          </div>

          {/* Future Learning Roadmap Vision (Section 20) */}
          <div className="roadmap-vision-box">
            <h4>Goal → Skill Assessment → Skill Gap → Learning Roadmap → Practice → Projects → Career Ready</h4>
          </div>

          <div className="section-cta-center">
            <button className="btn-explore-skills" onClick={() => handleProtectedAction('/skills', 'Skills')}>
              <span>Explore Skills Roadmap</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 09 STUDENT CORNER */}
      <section className="knora-section corner-home-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">STUDENT CORNER</span>
            <h2 className="section-title">Your Career Starts Beyond the Classroom</h2>
            <p className="section-subtitle">
              Everything you need to build your professional identity, discover opportunities and prepare for your career.
            </p>
          </div>

          <div className="corner-editorial-grid">
            <div className="editorial-card large" onClick={() => handleProtectedAction('/student-corner/resume/maker', 'Resume Maker')}>
              <div className="card-top-icon"><FileText size={26} color="#ffffff" /></div>
              <h3>Resume Maker & ATS Checker</h3>
              <p>Build a professional ATS-friendly resume and score your document against target job descriptions.</p>
              <span className="card-action-link">Explore Resume Suite →</span>
            </div>

            <div className="editorial-card" onClick={() => handleProtectedAction('/student-corner/portfolio', 'Portfolio Builder')}>
              <div className="card-top-icon"><Globe size={26} color="#ffffff" /></div>
              <h3>Portfolio Builder</h3>
              <p>Create and publish your personal developer portfolio site with AI.</p>
              <span className="card-action-link">Build Site →</span>
            </div>

            <div className="editorial-card" onClick={() => handleProtectedAction('/student-corner/jobs', 'Job Portal')}>
              <div className="card-top-icon"><Briefcase size={26} color="#ffffff" /></div>
              <h3>Jobs & Internships</h3>
              <p>Discover student internships and fresher engineering roles.</p>
              <span className="card-action-link">Find Opportunities →</span>
            </div>

            <div className="editorial-card" onClick={() => handleProtectedAction('/student-corner/events', 'Hackathons')}>
              <div className="card-top-icon"><Trophy size={26} color="#ffffff" /></div>
              <h3>Hackathons & Events</h3>
              <p>Join national coding hackathons and developer summits.</p>
              <span className="card-action-link">View Contests →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10 GURU.AI */}
      <section className="knora-section guru-home-section">
        <div className="section-container">
          <div className="guru-preview-card">
            <div className="guru-info">
              <span className="section-pill ai-pill"><Sparkles size={14} /> 24/7 AI ASSISTANT</span>
              <h2>Meet Guru.AI — Your AI Student Assistant</h2>
              <p>
                Guru.AI helps students understand academic concepts, generate study notes, prepare for exams, learn programming, debug code, and improve resumes.
              </p>
              <button className="btn-guru-cta" onClick={() => handleProtectedAction('/guru-ai', 'Guru.AI Assistant')}>
                <span>Try Guru.AI Chat</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11 CAREER JOURNEY */}
      <section className="knora-section journey-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">STUDENT ROADMAP</span>
            <h2 className="section-title">From Classroom to Career</h2>
          </div>

          <div className="journey-steps-grid">
            <div className="j-step"><span>01</span> <h4>Learn</h4></div>
            <div className="j-step"><span>02</span> <h4>Build Skills</h4></div>
            <div className="j-step"><span>03</span> <h4>Practice</h4></div>
            <div className="j-step"><span>04</span> <h4>Build Projects</h4></div>
            <div className="j-step"><span>05</span> <h4>Create Resume</h4></div>
            <div className="j-step"><span>06</span> <h4>Build Portfolio</h4></div>
            <div className="j-step"><span>07</span> <h4>Interview Prep</h4></div>
            <div className="j-step"><span>08</span> <h4>Discover Jobs</h4></div>
            <div className="j-step highlight"><span>09</span> <h4>Get Hired</h4></div>
          </div>
        </div>
      </section>

      {/* 12 WHY KNORA */}
      <section className="knora-section why-knora-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">WHY KNORA</span>
            <h2 className="section-title">Built Specially for Engineering Students</h2>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><Compass size={24} color="#ffffff" /></div>
              <h3>One Student Platform</h3>
              <p>Academics, skills, AI assistance, and career tools in one place.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Layers size={24} color="#ffffff" /></div>
              <h3>Personalized</h3>
              <p>Designed around your regulation, college, branch, year and semester.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Sparkles size={24} color="#ffffff" /></div>
              <h3>AI Powered</h3>
              <p>Guru.AI helps you learn topics and optimize career resumes.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FileText size={24} color="#ffffff" /></div>
              <h3>Career Focused</h3>
              <p>ATS resume building, portfolio creation, and interview prep.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Briefcase size={24} color="#ffffff" /></div>
              <h3>Opportunity Driven</h3>
              <p>Access verified fresher jobs, internships, and hackathons.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><ShieldCheck size={24} color="#ffffff" /></div>
              <h3>Built for Students</h3>
              <p>Simple, practical, minimal, and focused on actual outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13 TESTIMONIALS */}
      <section className="knora-section testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">STUDENT REVIEWS</span>
            <h2 className="section-title">Trusted by B.Tech Students</h2>
          </div>

          <div className="testimonials-grid">
            {testimonialsMockData.map((t) => (
              <div key={t.id} className="testimonial-card">
                <p className="test-quote">"{t.quote}"</p>
                <div className="test-author">
                  <img src={t.avatar} alt={t.name} className="author-img" />
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                    <p className="author-branch">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 FINAL CTA */}
      <section className="knora-final-cta-section">
        <div className="section-container">
          <div className="cta-banner-box">
            <h2>Ready to Excel in Academics & Launch Your Tech Career?</h2>
            <p>Join engineering students mastering academics, building skills, and getting hired with KNORA.</p>
            <button className="btn-cta-blue" onClick={() => navigate(isAuthenticated ? '/profile' : '/signup')}>
              <span>Get Started with KNORA Free</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
