import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, SearchCheck, Globe, Briefcase, Trophy, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import './StudentCorner.css';

const studentCornerCards = [
  {
    id: 'resume-maker-card',
    icon: FileText,
    title: '📄 Resume Maker',
    subtitle: 'Build a Resume That Gets Noticed',
    description: 'Create clean, ATS-friendly resumes with live section previews and templates.',
    link: '/student-corner/resume/maker',
    buttonText: 'Build Resume →',
    badge: 'ATS Templates'
  },
  {
    id: 'ats-checker-card',
    icon: SearchCheck,
    title: '🎯 ATS Checker',
    subtitle: 'Analyze & Score Your Resume',
    description: 'Get instant ATS compatibility scores, keyword match analysis & formatting recommendations.',
    link: '/student-corner/ats-checker',
    buttonText: 'Check ATS Score →',
    badge: 'AI Analyzer'
  },
  {
    id: 'portfolio-builder-card',
    icon: Globe,
    title: '🌐 Portfolio Builder',
    subtitle: 'Build Your Portfolio With AI',
    description: 'Generate and publish a professional developer portfolio website in less than 2 minutes.',
    link: '/student-corner/portfolio',
    buttonText: 'Build Portfolio →',
    badge: 'AI Host'
  },
  {
    id: 'job-portal-card',
    icon: Briefcase,
    title: '💼 Jobs & Internships',
    subtitle: 'Discover Fresher Opportunities',
    description: 'Explore verified internships and software engineering roles from top tech companies.',
    link: '/student-corner/jobs',
    buttonText: 'Explore Jobs →',
    badge: 'Verified Opportunities'
  },
  {
    id: 'hackathons-card',
    icon: Trophy,
    title: '🏆 Hackathons',
    subtitle: 'Pan-India Coding & AI Contests',
    description: 'Participate in national hackathons, compete in teams, and win prizes & cloud credits.',
    link: '/student-corner/hackathons',
    buttonText: 'View Contests →',
    badge: 'Live Hackathons'
  },
  {
    id: 'events-card',
    icon: Calendar,
    title: '📅 Events & Summits',
    subtitle: 'Developer Conferences & Masterclasses',
    description: 'Attend live technical webinars, placement strategy masterclasses, and AI summits.',
    link: '/student-corner/events',
    buttonText: 'Explore Events →',
    badge: 'Live Webinars'
  }
];

const StudentCorner = () => {
  const navigate = useNavigate();

  return (
    <div className="student-corner-container">
      {/* Header Banner */}
      <section className="corner-banner">
        <div className="corner-badge-pill">
          <Sparkles size={14} color="#1A73E8" />
          <span>STUDENT CAREER SUITE</span>
        </div>
        <h1 className="corner-hero-title">Your Career Starts Beyond the Classroom</h1>
        <p className="corner-hero-subtext">
          Everything you need to build your professional identity, discover opportunities and prepare for your career.
        </p>
      </section>

      {/* Editorial Grid (Section 22) */}
      <div className="corner-cards-grid">
        {studentCornerCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => navigate(card.link)}
              className="card-motion-wrapper"
            >
              <div className="main-feature-card">
                <div className="card-top-bar">
                  <div className="feature-icon-wrapper">
                    <Icon size={24} color="#1A73E8" />
                  </div>
                  <span className="feature-badge">{card.badge}</span>
                </div>

                <h2 className="feature-title">{card.title}</h2>
                <h3 className="feature-subtitle">{card.subtitle}</h3>
                <p className="feature-desc">{card.description}</p>

                <div className="card-cta-wrapper">
                  <div className="corner-cta-btn">
                    <span>{card.buttonText}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCorner;
