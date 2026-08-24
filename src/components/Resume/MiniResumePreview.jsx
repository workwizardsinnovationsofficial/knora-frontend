import React from 'react';
import { TemplateRenderer } from './TemplateRenderers';

const sampleResumeData = {
  id: 'sample-resume',
  title: 'Professional Resume',
  template_id: 'knora-modern',
  personalInfo: {
    firstName: 'Harper',
    lastName: 'Russo',
    email: 'harper.russo@knora.in',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/harperrusso',
    github: 'github.com/harperrusso',
    portfolio: 'harperrusso.dev'
  },
  summary: 'Results-driven Senior Full Stack Developer & Product Engineer with 4+ years of experience designing scalable microservices, building modern React interfaces, and leading high-performing technical teams.',
  education: [
    {
      id: 's-edu-1',
      institution: 'JNTUH College of Engineering',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      startDate: '2021',
      endDate: '2025',
      grade: '8.9 / 10'
    }
  ],
  experience: [
    {
      id: 's-exp-1',
      company: 'TechCorp Innovations',
      position: 'Senior Software Developer',
      startDate: '2025',
      endDate: 'Present',
      description: 'Architected cloud services handling 1M+ daily active requests. Reduced API latency by 45% using FastAPI and Redis caching.'
    }
  ],
  projects: [
    {
      id: 's-proj-1',
      title: 'KNORA — Student AI Platform',
      role: 'Lead Architect',
      description: 'Engineered an interactive student learning and ATS resume builder suite with real-time PDF generation and Cloudflare R2 storage.',
      technologies: 'React, FastAPI, MongoDB, Cloudflare R2'
    }
  ],
  skills: [
    { id: 's-sk-1', name: 'Python', category: 'Backend' },
    { id: 's-sk-2', name: 'React.js', category: 'Frontend' },
    { id: 's-sk-3', name: 'FastAPI', category: 'Backend' },
    { id: 's-sk-4', name: 'MongoDB', category: 'Database' },
    { id: 's-sk-5', name: 'Docker', category: 'DevOps' },
    { id: 's-sk-6', name: 'TypeScript', category: 'Language' }
  ],
  certifications: [
    { id: 's-cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', issueDate: '2025' }
  ],
  languages: [
    { id: 's-lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 's-lang-2', language: 'Telugu', proficiency: 'Native' }
  ],
  formatting: {
    font: 'Inter',
    paperSize: 'A4'
  }
};

export const MiniResumePreview = ({ templateId, customData, scale = 0.35, height = '370px' }) => {
  const data = customData || sampleResumeData;

  return (
    <div
      className="mini-resume-outer-box"
      style={{
        width: '100%',
        height: height,
        overflow: 'hidden',
        position: 'relative',
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <div
        className="mini-resume-scaled-inner"
        style={{
          width: '794px',
          minHeight: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <TemplateRenderer resumeData={data} templateId={templateId} />
      </div>
    </div>
  );
};
