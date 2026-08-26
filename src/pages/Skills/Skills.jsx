import React from 'react';
import { Sparkles, Clock } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  return (
    <div className="skills-coming-soon-wrapper">
      <div className="skills-coming-soon-card">
        <div className="skills-badge-glow">
          <Sparkles size={16} color="#2563eb" />
          <span>SKILLS ROADMAP</span>
        </div>

        <h1 className="skills-cs-title">Coming Soon</h1>

        <p className="skills-cs-desc">
          We are building an interactive skill assessment & personalized learning roadmap experience to help you master industry-ready tech skills.
        </p>

        <div className="skills-cs-footer-pill">
          <Clock size={14} color="#64748b" />
          <span>Stay tuned for updates</span>
        </div>
      </div>
    </div>
  );
};

export default Skills;
