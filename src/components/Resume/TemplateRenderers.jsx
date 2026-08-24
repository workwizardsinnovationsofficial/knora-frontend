import React from 'react';
import './TemplateRenderers.css';

export const TemplateRenderer = ({ resumeData, templateId = 'knora-modern' }) => {
  const p = resumeData.personalInfo || {};
  const f = resumeData.formatting || {};

  const font = f.font || 'Inter';
  const accentColor = f.accentColor || '#1A73E8';
  const paperSize = f.paperSize || 'A4';

  const containerStyle = {
    fontFamily: `${font}, sans-serif`,
    '--accent-color': accentColor
  };

  const isTwoColumn = ['knora-modern', 'knora-tech', 'knora-aiml', 'knora-twocolumn', 'knora-elegant'].includes(templateId);
  const isATS = templateId === 'knora-ats';
  const isClassic = templateId === 'knora-classic';

  return (
    <div className={`resume-paper-canvas ${paperSize.toLowerCase()} template-${templateId}`} style={containerStyle}>
      {/* HEADER SECTION */}
      <header className={`res-header ${isClassic ? 'classic-center' : ''} ${isATS ? 'ats-header' : ''}`}>
        <h1 style={{ color: isClassic ? '#111827' : accentColor }}>
          {p.firstName} {p.lastName}
        </h1>
        <div className="res-contact-info">
          {[p.email, p.phone, p.location].filter(Boolean).join(' • ')}
          {p.linkedin && ` • ${p.linkedin}`}
          {p.github && ` • ${p.github}`}
          {p.portfolio && ` • ${p.portfolio}`}
        </div>
      </header>

      {/* BODY CONTENT */}
      {isTwoColumn ? (
        <div className="two-column-layout">
          {/* LEFT SIDEBAR */}
          <aside className="res-sidebar">
            {resumeData.skills && resumeData.skills.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">TECHNICAL SKILLS</h3>
                <div className="skills-tags-wrap">
                  {resumeData.skills.map((sk, idx) => (
                    <span key={sk.id || idx} className="skill-pill" style={{ borderColor: accentColor, color: accentColor }}>
                      {sk.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {resumeData.languages && resumeData.languages.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">LANGUAGES</h3>
                <ul className="res-plain-list">
                  {resumeData.languages.map((l, idx) => (
                    <li key={l.id || idx}>
                      <strong>{l.language}</strong> ({l.proficiency})
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">CERTIFICATIONS</h3>
                {resumeData.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="res-entry-sm">
                    <strong>{cert.name}</strong>
                    {cert.issuer && <div>{cert.issuer}</div>}
                  </div>
                ))}
              </section>
            )}
          </aside>

          {/* MAIN CONTENT PANE */}
          <main className="res-main-pane">
            {resumeData.summary && (
              <section className="res-block">
                <h3 className="res-sec-title">SUMMARY</h3>
                <p className="res-summary-text">{resumeData.summary}</p>
              </section>
            )}

            {resumeData.education && resumeData.education.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">EDUCATION</h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="res-entry">
                    <div className="res-entry-head">
                      <strong>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</strong>
                      <span className="res-date">{edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                    </div>
                    <div className="res-subhead">{edu.institution} {edu.grade ? `| CGPA: ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </section>
            )}

            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">PROJECTS</h3>
                {resumeData.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="res-entry">
                    <div className="res-entry-head">
                      <strong>{proj.title}</strong>
                      {proj.startDate && <span className="res-date">{proj.startDate} - {proj.endDate}</span>}
                    </div>
                    {proj.technologies && <div className="res-tech">Tech: {proj.technologies}</div>}
                    <p className="res-desc">{proj.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.experience && resumeData.experience.length > 0 && (
              <section className="res-block">
                <h3 className="res-sec-title">EXPERIENCE</h3>
                {resumeData.experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="res-entry">
                    <div className="res-entry-head">
                      <strong>{exp.position}</strong>
                      <span className="res-date">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="res-subhead">{exp.company}</div>
                    {exp.description && <p className="res-desc">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      ) : (
        /* SINGLE COLUMN LAYOUT (ATS / Classic / Professional / Technical) */
        <div className="single-column-layout">
          {resumeData.summary && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>PROFESSIONAL SUMMARY</h3>
              <p className="res-summary-text">{resumeData.summary}</p>
            </section>
          )}

          {resumeData.education && resumeData.education.length > 0 && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>EDUCATION</h3>
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id || idx} className="res-entry">
                  <div className="res-entry-head">
                    <strong>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</strong>
                    <span className="res-date">{edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                  </div>
                  <div className="res-subhead">{edu.institution} {edu.grade ? `| Grade: ${edu.grade}` : ''}</div>
                </div>
              ))}
            </section>
          )}

          {resumeData.projects && resumeData.projects.length > 0 && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>TECHNICAL PROJECTS</h3>
              {resumeData.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="res-entry">
                  <div className="res-entry-head">
                    <strong>{proj.title}</strong>
                    {proj.startDate && <span className="res-date">{proj.startDate} - {proj.endDate}</span>}
                  </div>
                  {proj.technologies && <div className="res-tech">Tech Stack: {proj.technologies}</div>}
                  <p className="res-desc">{proj.description}</p>
                </div>
              ))}
            </section>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>EXPERIENCE</h3>
              {resumeData.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="res-entry">
                  <div className="res-entry-head">
                    <strong>{exp.position} — {exp.company}</strong>
                    <span className="res-date">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="res-desc">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>SKILLS & TECHNOLOGIES</h3>
              <p className="res-skills-line">
                {resumeData.skills.map(s => s.name).join(' • ')}
              </p>
            </section>
          )}

          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section className="res-block">
              <h3 className="res-sec-title" style={{ color: isClassic ? '#111827' : accentColor }}>CERTIFICATIONS</h3>
              {resumeData.certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="res-entry-inline">
                  <strong>{cert.name}</strong> {cert.issuer ? `— ${cert.issuer}` : ''} {cert.issueDate ? `(${cert.issueDate})` : ''}
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
