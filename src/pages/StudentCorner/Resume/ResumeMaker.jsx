import React, { useState, useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { resumeApi } from '../../../services/resumeApi';
import { TemplateRenderer } from '../../../components/Resume/TemplateRenderers';
import { TemplateGalleryModal } from './TemplateGalleryModal';
import { ProfileImportModal } from './ProfileImportModal';
import { AIAssistantDrawer } from './AIAssistantDrawer';
import { ATSCheckerPanel } from './ATSCheckerPanel';
import { useAuth } from '../../../context/AuthContext';
import { useAuthModal } from '../../../context/AuthModalContext';
import {
  Sparkles, Download, Save, User, GraduationCap, Briefcase, Code, Award,
  Globe, Layout, Wand2, ShieldCheck, Plus, Trash2, Copy, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, FileSpreadsheet, CloudOff, Check, Pencil, ZoomIn, ZoomOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import './ResumeMaker.css';

const ResumeMaker = ({ onBackToDashboard, onChangeTemplateClick }) => {
  const { resumeData, setResumeData, saveStatus, saveResumeToBackend, atsScoreResult, setAtsScoreResult } = useResume();
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState('personal'); // 'personal', 'summary', 'education', 'experience', 'projects', 'skills', 'certifications', 'achievements', 'languages', 'ats'
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' | 'preview'
  const [previewZoom, setPreviewZoom] = useState(1.0);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Section completion helpers
  const isPersonalComplete = Boolean(resumeData.personalInfo?.firstName && resumeData.personalInfo?.email);
  const isSummaryComplete = Boolean(resumeData.summary?.trim());
  const isEducationComplete = Boolean(resumeData.education?.length > 0);
  const isProjectsComplete = Boolean(resumeData.projects?.length > 0);
  const isSkillsComplete = Boolean(resumeData.skills?.length > 0);
  const isExperienceComplete = Boolean(resumeData.experience?.length > 0);
  const isCertificationsComplete = Boolean(resumeData.certifications?.length > 0);

  // Trigger ATS calculation on load
  useEffect(() => {
    if (resumeData && resumeData.id) {
      resumeApi.analyzeATS(resumeData.id).then(res => {
        if (res) setAtsScoreResult(res);
      }).catch(() => { });
    }
  }, [resumeData?.id, setAtsScoreResult]);

  // Section item handlers
  const handleAddArrayItem = (key, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newItem]
    }));
  };

  const handleUpdateArrayItem = (key, index, updatedItem) => {
    setResumeData(prev => {
      const list = [...(prev[key] || [])];
      list[index] = updatedItem;
      return { ...prev, [key]: list };
    });
  };

  const handleDeleteArrayItem = (key, index) => {
    setResumeData(prev => {
      const list = [...(prev[key] || [])];
      list.splice(index, 1);
      return { ...prev, [key]: list };
    });
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      toast.loading('Generating PDF & uploading to Cloudflare R2...', { id: 'r2-pdf' });
      const res = await resumeApi.generatePdf(resumeData.id || 'draft');
      toast.success('PDF stored in R2! Downloading...', { id: 'r2-pdf' });
      if (res.download_url) {
        window.open(res.download_url, '_blank');
      }
    } catch (err) {
      if (err.message === 'UNAUTHENTICATED') {
        toast.error('Sign in required to export cloud PDF', { id: 'r2-pdf' });
        openAuthModal('login');
      } else {
        toast.error('PDF export failed: ' + err.message, { id: 'r2-pdf' });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Download DOCX
  const handleDownloadDocx = async () => {
    setIsDownloading(true);
    try {
      toast.loading('Generating Word DOCX & uploading to Cloudflare R2...', { id: 'r2-docx' });
      const res = await resumeApi.generateDocx(resumeData.id || 'draft');
      toast.success('DOCX stored in R2! Downloading...', { id: 'r2-docx' });
      if (res.download_url) {
        window.open(res.download_url, '_blank');
      }
    } catch (err) {
      if (err.message === 'UNAUTHENTICATED') {
        toast.error('Sign in required to export cloud DOCX', { id: 'r2-docx' });
        openAuthModal('login');
      } else {
        toast.error('DOCX export failed: ' + err.message, { id: 'r2-docx' });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resume-maker-app-container">
      {/* 1. STANDALONE SUB-HEADER BAR FOR BACK BUTTON */}
      <div className="maker-sub-header-bar">
        {onBackToDashboard && (
          <button className="btn-standalone-corner-back" onClick={onBackToDashboard} title="Go back to previous page">
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
      </div>

      {/* 2. MAIN WORKSPACE HEADER BAR (TITLE & ACTIONS) */}
      <div className="maker-nav-bar">
        <div className="nav-left-group">
          <div className="title-and-status-inline">
            <input
              type="text"
              className="resume-title-input"
              value={resumeData.title || 'Software Developer Resume'}
              onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resume Title"
              title="Click to edit resume title"
            />
            <Pencil size={14} className="title-edit-icon" color="#94A3B8" />

            <span className="autosave-status">
              {saveStatus === 'saving' && <><RefreshCw size={12} className="spin" /> Saving...</>}
              {saveStatus === 'saved' && <><CheckCircle size={12} color="#10B981" /> Saved just now</>}
              {saveStatus === 'offline' && (
                <span className="offline-badge" onClick={() => openAuthModal('login')}>
                  <CloudOff size={12} color="#F59E0B" /> Local Draft Mode <strong className="link-sync">[Sign In to Sync]</strong>
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="error-badge" onClick={() => saveResumeToBackend(resumeData)}>
                  <AlertCircle size={12} color="#EF4444" /> Save failed <strong className="link-sync">[Retry]</strong>
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="nav-actions-group">
          <button className="btn-nav-secondary" onClick={() => setIsImportOpen(true)}>
            <User size={15} /> Import Profile
          </button>
          <button className="btn-nav-secondary" onClick={onChangeTemplateClick ? onChangeTemplateClick : () => setIsGalleryOpen(true)}>
            <Layout size={15} /> Change Template
          </button>
          <button className="btn-nav-ai" onClick={() => setIsAIDrawerOpen(true)}>
            <Wand2 size={15} /> AI Assistant
          </button>
          <button className="btn-nav-download" onClick={handleDownloadPdf} disabled={isDownloading}>
            <Download size={15} /> PDF
          </button>
          <button className="btn-nav-download-docx" onClick={handleDownloadDocx} disabled={isDownloading}>
            <FileSpreadsheet size={15} /> DOCX
          </button>
        </div>
      </div>

      {/* MOBILE TABS (Section 32) */}
      <div className="mobile-view-tabs">
        <button className={`m-tab ${mobileTab === 'edit' ? 'active' : ''}`} onClick={() => setMobileTab('edit')}>
          Edit Sections
        </button>
        <button className={`m-tab ${mobileTab === 'preview' ? 'active' : ''}`} onClick={() => setMobileTab('preview')}>
          Live Preview
        </button>
      </div>

      {/* THREE-COLUMN EDITOR WORKSPACE (Section 8) */}
      <div className="maker-3col-workspace">
        {/* COLUMN 1: SECTION NAV & FORM EDITOR */}
        <div className={`col-section-editor ${mobileTab === 'preview' ? 'mobile-hide' : ''}`}>
          <div className="editor-section-nav">
            <button className={`sec-nav-btn ${activeSection === 'personal' ? 'active' : ''}`} onClick={() => setActiveSection('personal')}>
              <User size={15} /> Personal {isPersonalComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'summary' ? 'active' : ''}`} onClick={() => setActiveSection('summary')}>
              <Sparkles size={15} /> Summary {isSummaryComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'education' ? 'active' : ''}`} onClick={() => setActiveSection('education')}>
              <GraduationCap size={15} /> Education {isEducationComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>
              <Briefcase size={15} /> Projects {isProjectsComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setActiveSection('skills')}>
              <Code size={15} /> Skills {isSkillsComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSection('experience')}>
              <Briefcase size={15} /> Experience {isExperienceComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'certifications' ? 'active' : ''}`} onClick={() => setActiveSection('certifications')}>
              <Award size={15} /> Certifications {isCertificationsComplete && <Check size={12} color="#10B981" className="badge-check" />}
            </button>
            <button className={`sec-nav-btn ${activeSection === 'ats' ? 'active' : ''}`} onClick={() => setActiveSection('ats')}>
              <ShieldCheck size={15} /> ATS & Job Match
            </button>
          </div>

          <div className="editor-form-scroll">
            {/* PERSONAL INFO FORM */}
            {activeSection === 'personal' && (
              <div className="form-card">
                <h3>Personal Information</h3>
                <div className="form-grid-2col">
                  <div className="f-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.firstName || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="f-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.lastName || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="f-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="f-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="f-group">
                  <label>Location (City, Country)</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location || ''}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value }
                    }))}
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="f-group">
                    <label>LinkedIn URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedin || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="f-group">
                    <label>GitHub URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.github || ''}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, github: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUMMARY FORM */}
            {activeSection === 'summary' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Professional Summary</h3>
                  <button className="btn-inline-ai" onClick={() => setIsAIDrawerOpen(true)}>
                    <Wand2 size={13} /> Improve with AI
                  </button>
                </div>
                <textarea
                  rows={6}
                  placeholder="Write 2-3 impact sentences summarizing your background, technical skills, and achievements..."
                  value={resumeData.summary || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                />
              </div>
            )}

            {/* EDUCATION FORM */}
            {activeSection === 'education' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Education</h3>
                  <button className="btn-add-item" onClick={() => handleAddArrayItem('education', {
                    id: `edu-${Date.now()}`,
                    institution: '',
                    degree: 'B.Tech',
                    field: 'CSE',
                    startDate: '2022',
                    endDate: '2026'
                  })}>
                    <Plus size={14} /> Add Education
                  </button>
                </div>

                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="item-edit-box">
                    <div className="item-box-head">
                      <strong>{edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}</strong>
                      <button className="btn-del-item" onClick={() => handleDeleteArrayItem('education', idx)}>
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="form-grid-2col">
                      <div className="f-group">
                        <label>Degree</label>
                        <input
                          type="text"
                          value={edu.degree || ''}
                          onChange={(e) => handleUpdateArrayItem('education', idx, { ...edu, degree: e.target.value })}
                        />
                      </div>
                      <div className="f-group">
                        <label>Field of Study</label>
                        <input
                          type="text"
                          value={edu.field || ''}
                          onChange={(e) => handleUpdateArrayItem('education', idx, { ...edu, field: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="f-group">
                      <label>Institution / College</label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => handleUpdateArrayItem('education', idx, { ...edu, institution: e.target.value })}
                      />
                    </div>

                    <div className="form-grid-2col">
                      <div className="f-group">
                        <label>Start Date / Year</label>
                        <input
                          type="text"
                          value={edu.startDate || ''}
                          onChange={(e) => handleUpdateArrayItem('education', idx, { ...edu, startDate: e.target.value })}
                        />
                      </div>
                      <div className="f-group">
                        <label>End Date / Year</label>
                        <input
                          type="text"
                          value={edu.endDate || ''}
                          onChange={(e) => handleUpdateArrayItem('education', idx, { ...edu, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS FORM */}
            {activeSection === 'projects' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Projects</h3>
                  <button className="btn-add-item" onClick={() => handleAddArrayItem('projects', {
                    id: `proj-${Date.now()}`,
                    title: 'New Technical Project',
                    role: 'Developer',
                    description: '',
                    technologies: 'React, Node.js'
                  })}>
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                {resumeData.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="item-edit-box">
                    <div className="item-box-head">
                      <strong>{proj.title || 'Project Title'}</strong>
                      <button className="btn-del-item" onClick={() => handleDeleteArrayItem('projects', idx)}>
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="f-group">
                      <label>Project Title</label>
                      <input
                        type="text"
                        value={proj.title || ''}
                        onChange={(e) => handleUpdateArrayItem('projects', idx, { ...proj, title: e.target.value })}
                      />
                    </div>

                    <div className="f-group">
                      <label>Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies || ''}
                        onChange={(e) => handleUpdateArrayItem('projects', idx, { ...proj, technologies: e.target.value })}
                      />
                    </div>

                    <div className="f-group">
                      <label>Description</label>
                      <textarea
                        rows={3}
                        value={proj.description || ''}
                        onChange={(e) => handleUpdateArrayItem('projects', idx, { ...proj, description: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS FORM */}
            {activeSection === 'skills' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Skills & Technologies</h3>
                  <button className="btn-add-item" onClick={() => handleAddArrayItem('skills', {
                    id: `sk-${Date.now()}`,
                    name: 'New Skill',
                    category: 'Technical'
                  })}>
                    <Plus size={14} /> Add Skill
                  </button>
                </div>

                <div className="skills-edit-grid">
                  {resumeData.skills.map((sk, idx) => (
                    <div key={sk.id || idx} className="skill-item-row">
                      <input
                        type="text"
                        value={sk.name || ''}
                        onChange={(e) => handleUpdateArrayItem('skills', idx, { ...sk, name: e.target.value })}
                      />
                      <button className="btn-del-skill" onClick={() => handleDeleteArrayItem('skills', idx)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCE FORM */}
            {activeSection === 'experience' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Work Experience</h3>
                  <button className="btn-add-item" onClick={() => handleAddArrayItem('experience', {
                    id: `exp-${Date.now()}`,
                    company: 'Company Name',
                    position: 'Role / Title',
                    startDate: '2025',
                    endDate: 'Present',
                    description: ''
                  })}>
                    <Plus size={14} /> Add Experience
                  </button>
                </div>

                {resumeData.experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="item-edit-box">
                    <div className="item-box-head">
                      <strong>{exp.position || 'Position'} at {exp.company || 'Company'}</strong>
                      <button className="btn-del-item" onClick={() => handleDeleteArrayItem('experience', idx)}>
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="form-grid-2col">
                      <div className="f-group">
                        <label>Company</label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => handleUpdateArrayItem('experience', idx, { ...exp, company: e.target.value })}
                        />
                      </div>
                      <div className="f-group">
                        <label>Position / Role</label>
                        <input
                          type="text"
                          value={exp.position || ''}
                          onChange={(e) => handleUpdateArrayItem('experience', idx, { ...exp, position: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="f-group">
                      <label>Description & Achievements</label>
                      <textarea
                        rows={3}
                        value={exp.description || ''}
                        onChange={(e) => handleUpdateArrayItem('experience', idx, { ...exp, description: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CERTIFICATIONS FORM */}
            {activeSection === 'certifications' && (
              <div className="form-card">
                <div className="card-top-head">
                  <h3>Certifications</h3>
                  <button className="btn-add-item" onClick={() => handleAddArrayItem('certifications', {
                    id: `cert-${Date.now()}`,
                    name: 'Certification Title',
                    issuer: 'Issuing Organization'
                  })}>
                    <Plus size={14} /> Add Certification
                  </button>
                </div>

                {resumeData.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="item-edit-box">
                    <div className="item-box-head">
                      <strong>{cert.name || 'Certification'}</strong>
                      <button className="btn-del-item" onClick={() => handleDeleteArrayItem('certifications', idx)}>
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="form-grid-2col">
                      <div className="f-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={cert.name || ''}
                          onChange={(e) => handleUpdateArrayItem('certifications', idx, { ...cert, name: e.target.value })}
                        />
                      </div>
                      <div className="f-group">
                        <label>Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer || ''}
                          onChange={(e) => handleUpdateArrayItem('certifications', idx, { ...cert, issuer: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ATS CHECK & JOB MATCH TAB */}
            {activeSection === 'ats' && (
              <ATSCheckerPanel
                resumeId={resumeData.id}
                atsResult={atsScoreResult}
              />
            )}
          </div>
        </div>

        {/* COLUMN 2: LIVE A4 PREVIEW WITH ZOOM CONTROLS (Section 10) */}
        <div className={`col-live-preview ${mobileTab === 'edit' ? 'mobile-hide' : ''}`}>
          <div className="preview-toolbar">
            <span className="preview-toolbar-title">LIVE PREVIEW ({resumeData.formatting?.paperSize || 'A4'})</span>

            <div className="preview-toolbar-actions">
              {/* ZOOM CONTROLS */}
              <div className="preview-zoom-bar">
                <button
                  className="btn-zoom-btn"
                  onClick={() => setPreviewZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                  title="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="zoom-val-display">{Math.round(previewZoom * 100)}%</span>
                <button
                  className="btn-zoom-btn"
                  onClick={() => setPreviewZoom(z => Math.min(1.5, +(z + 0.1).toFixed(2)))}
                  title="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
                {previewZoom !== 1.0 && (
                  <button className="btn-zoom-reset" onClick={() => setPreviewZoom(1.0)} title="Reset to 100%">
                    Reset
                  </button>
                )}
              </div>

              <div className="paper-toggle">
                <button
                  className={`paper-btn ${(resumeData.formatting?.paperSize || 'A4') === 'A4' ? 'active' : ''}`}
                  onClick={() => setResumeData(prev => ({
                    ...prev,
                    formatting: { ...prev.formatting, paperSize: 'A4' }
                  }))}
                >
                  A4
                </button>
                <button
                  className={`paper-btn ${resumeData.formatting?.paperSize === 'Letter' ? 'active' : ''}`}
                  onClick={() => setResumeData(prev => ({
                    ...prev,
                    formatting: { ...prev.formatting, paperSize: 'Letter' }
                  }))}
                >
                  Letter
                </button>
              </div>
            </div>
          </div>

          <div className="preview-paper-wrapper">
            <div
              className="paper-zoom-scaler"
              style={{
                transform: `scale(${previewZoom})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <TemplateRenderer
                resumeData={resumeData}
                templateId={resumeData.formatting?.templateId || resumeData.template_id || 'knora-modern'}
              />
            </div>
          </div>
        </div>

        {/* COLUMN 3: DESIGN & FORMATTING CONTROLS (Section 11) */}
        <div className="col-design-controls">
          <div className="controls-card">
            <h4>Design & Formatting</h4>

            {/* Font Picker */}
            <div className="ctrl-group">
              <label>Typography</label>
              <select
                value={resumeData.formatting?.font || 'Inter'}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  formatting: { ...prev.formatting, font: e.target.value }
                }))}
              >
                <option value="Inter">Inter (Modern Clean)</option>
                <option value="Roboto">Roboto (Standard Sans)</option>
                <option value="Helvetica">Helvetica (Classic Clean)</option>
                <option value="Georgia">Georgia (Professional Serif)</option>
              </select>
            </div>

            {/* Accent Color Picker */}
            <div className="ctrl-group">
              <label>Accent Color</label>
              <div className="color-swatches">
                {['#1A73E8', '#2563EB', '#0D9488', '#10B981', '#7C3AED', '#EC4899', '#0F172A'].map(color => (
                  <button
                    key={color}
                    className={`swatch ${resumeData.formatting?.accentColor === color ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => setResumeData(prev => ({
                      ...prev,
                      formatting: { ...prev.formatting, accentColor: color }
                    }))}
                  />
                ))}
              </div>
            </div>

            <button className="btn-gallery-trigger" onClick={() => setIsGalleryOpen(true)}>
              <Layout size={15} /> 20 Knora Templates
            </button>
          </div>

          {/* ATS Score Card */}
          <div className="ats-mini-widget">
            <div className="ats-score-badge">
              <ShieldCheck size={18} color="#10B981" />
              <span>ATS Score: {atsScoreResult?.overallScore || 88}/100</span>
            </div>
            <p>Your resume passes ATS structural guidelines.</p>
            <button className="btn-view-ats" onClick={() => setActiveSection('ats')}>
              View Health Analysis
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <TemplateGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        currentTemplateId={resumeData.formatting?.templateId || resumeData.template_id}
        onSelectTemplate={(templateId) => {
          setResumeData(prev => ({
            ...prev,
            template_id: templateId,
            formatting: { ...prev.formatting, templateId }
          }));
          toast.success('Template updated!');
        }}
      />

      <ProfileImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportData={(importedData) => {
          setResumeData(prev => ({
            ...prev,
            ...importedData,
            personalInfo: { ...prev.personalInfo, ...(importedData.personalInfo || {}) }
          }));
        }}
      />

      <AIAssistantDrawer
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        resumeId={resumeData.id}
        currentSummary={resumeData.summary}
        onApplyText={(enhancedText) => {
          setResumeData(prev => ({ ...prev, summary: enhancedText }));
        }}
      />
    </div>
  );
};

export default ResumeMaker;
