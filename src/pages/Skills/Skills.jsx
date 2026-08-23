import React from 'react';
import { skillsMockData } from '../../mock/skills';
import { Code, Cpu, Database, Cloud, ShieldCheck, Layers, ArrowRight, Sparkles } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  return (
    <div className="skills-page-container">
      <div className="skills-page-header">
        <span className="skills-pill"><Sparkles size={14} color="#1A73E8" /> ROADMAP VISION</span>
        <h1>Build Skills That Matter in Tech</h1>
        <p>Go beyond your college syllabus and build high-demand engineering skills aligned with software career paths.</p>
      </div>

      {/* Goal Vision Box (Section 20) */}
      <div className="roadmap-flow-banner">
        <h3>Career Goal → Skill Assessment → Skill Gap → Learning Roadmap → Practice → Projects → Career Ready</h3>
      </div>

      {/* Skills Grid */}
      <div className="skills-category-grid">
        {skillsMockData.map((skill) => (
          <div key={skill.id} className="skill-card-box">
            <div className="card-top-row">
              <span className="skill-cat-name">{skill.category}</span>
              <span className={`status-badge ${skill.status === 'Available Now' ? 'active' : 'soon'}`}>
                {skill.status}
              </span>
            </div>

            <h3 className="skill-card-title">{skill.title}</h3>
            <p className="skill-card-desc">{skill.description}</p>
            <div className="skill-card-footer">
              <span>{skill.level}</span> • <span>{skill.modulesCount} Modules</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
