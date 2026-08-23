import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FileText, Download, Save, Sparkles, User, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import './ResumeMaker.css';

const ResumeMaker = () => {
  const { resumeData, setResumeData } = useResume();
  const [activeTab, setActiveTab] = useState('personal');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Resume saved successfully!');
  };

  return (
    <div className="resume-maker-container">
      <div className="maker-header">
        <div>
          <span className="maker-badge"><Sparkles size={14} color="#1A73E8" /> ATS RESUME BUILDER</span>
          <h1>Build a Resume That Gets Noticed</h1>
        </div>
        <button className="btn-export-pdf" onClick={() => toast.success('Exporting ATS Resume PDF...')}>
          <Download size={16} />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Editor + Live Preview Grid (Section 23) */}
      <div className="maker-editor-grid">
        {/* Left Column: Editor Sections */}
        <div className="editor-col">
          <div className="section-tabs">
            <button className={`tab-item ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
              <User size={16} /> Personal
            </button>
            <button className={`tab-item ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
              <GraduationCap size={16} /> Education
            </button>
            <button className={`tab-item ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
              <Code size={16} /> Skills
            </button>
            <button className={`tab-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              <Briefcase size={16} /> Projects
            </button>
          </div>

          <form onSubmit={handleSave} className="editor-form">
            {activeTab === 'personal' && (
              <div className="form-fields-group">
                <div className="f-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, fullName: e.target.value } })}
                  />
                </div>
                <div className="f-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, email: e.target.value } })}
                  />
                </div>
                <div className="f-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, phone: e.target.value } })}
                  />
                </div>
                <div className="f-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, location: e.target.value } })}
                  />
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="form-fields-group">
                <div className="f-group">
                  <label>Degree & Branch</label>
                  <input
                    type="text"
                    value={resumeData.education[0]?.degree || ''}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[0] = { ...updated[0], degree: e.target.value };
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                </div>
                <div className="f-group">
                  <label>Institution / College</label>
                  <input
                    type="text"
                    value={resumeData.education[0]?.institution || ''}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[0] = { ...updated[0], institution: e.target.value };
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="form-fields-group">
                <div className="f-group">
                  <label>Technical Skills (Comma separated)</label>
                  <textarea
                    rows={4}
                    value={resumeData.skills.join(', ')}
                    onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value.split(',').map(s => s.trim()) })}
                  />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="form-fields-group">
                <div className="f-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={resumeData.projects[0]?.title || ''}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[0] = { ...updated[0], title: e.target.value };
                      setResumeData({ ...resumeData, projects: updated });
                    }}
                  />
                </div>
                <div className="f-group">
                  <label>Project Description</label>
                  <textarea
                    rows={3}
                    value={resumeData.projects[0]?.description || ''}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[0] = { ...updated[0], description: e.target.value };
                      setResumeData({ ...resumeData, projects: updated });
                    }}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn-save-resume">
              <Save size={16} />
              <span>Save Section Changes</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Resume Preview */}
        <div className="preview-col">
          <div className="resume-paper-document">
            <div className="res-header">
              <h2>{resumeData.personalInfo.fullName}</h2>
              <p>{resumeData.personalInfo.email} • {resumeData.personalInfo.phone} • {resumeData.personalInfo.location}</p>
            </div>

            <div className="res-section">
              <h4>EDUCATION</h4>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="res-item">
                  <strong>{edu.degree}</strong> — <span>{edu.institution}</span> ({edu.year})
                </div>
              ))}
            </div>

            <div className="res-section">
              <h4>TECHNICAL SKILLS</h4>
              <p>{resumeData.skills.join(' • ')}</p>
            </div>

            <div className="res-section">
              <h4>PROJECTS</h4>
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="res-item">
                  <strong>{proj.title}</strong>
                  <p>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;
