import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../../context/ResumeContext';
import {
  UploadCloud,
  FileText,
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart2,
  Code,
  Edit3,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Briefcase
} from 'lucide-react';
import './ATSChecker.css';

/* ====================================================
   ULTRA-COMPACT ATS CHECKER (FITS IN 1 SINGLE SCREEN)
   ==================================================== */

const ATSChecker = () => {
  const navigate = useNavigate();
  const { setResumeData } = useResume() || {};

  // Input states
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Dropzone drag state & ref
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Accordion state for detailed analysis
  const [openAccIdx, setOpenAccIdx] = useState(null);

  // Analysis display state & Animated counts
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [animScores, setAnimScores] = useState({
    overallScore: 0,
    keywordMatch: 0,
    skillsMatch: 0,
    formattingScore: 0
  });

  const handleEditInResumeMaker = () => {
    if (resumeText.trim() && setResumeData) {
      setResumeData(prev => ({
        ...prev,
        summary: resumeText.trim()
      }));
    }
    // Redirect directly to the editor page view
    navigate('/student-corner/resume/maker?view=editor');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = (e) => {
    e.preventDefault();
    setHasAnalyzed(true);
    const targetData = {
      overallScore: 72,
      keywordMatch: 68,
      skillsMatch: 70,
      formattingScore: 65,
      matchedKeywords: [
        'Computer Science', 'Design', 'REST APIs', 'Software Engineering',
        'JavaScript', 'Algorithms', 'Python', '+8 more'
      ],
      missingKeywords: [
        'Google Job Description', 'Currently', 'Participate', 'Scale',
        'SQL', 'Linux', 'AWS', 'Docker', 'Problem Solving', '+6 more'
      ],
      recommendations: [
        'Add more relevant keywords from the job description',
        'Include quantifiable achievements with metrics',
        'Use more action verbs in your bullet points',
        'Improve formatting for better ATS compatibility'
      ]
    };

    setAnalysisData(targetData);

    // Number count-up animation
    let step = 0;
    const totalSteps = 35;
    setAnimScores({ overallScore: 0, keywordMatch: 0, skillsMatch: 0, formattingScore: 0 });

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      setAnimScores({
        overallScore: Math.round(72 * progress),
        keywordMatch: Math.round(68 * progress),
        skillsMatch: Math.round(70 * progress),
        formattingScore: Math.round(65 * progress)
      });
      if (step >= totalSteps) clearInterval(timer);
    }, 20);
  };

  // SVG Gauge Calculations (Prominent Larger Gauge)
  const radius = 65;
  const strokeWidth = 12;
  const circumference = Math.PI * radius; // ~204.2
  const scoreVal = Math.min(100, Math.max(0, animScores.overallScore));
  const strokeDashoffset = circumference - (circumference * scoreVal) / 100;

  const accordionItems = [
    { title: 'Keyword Analysis', score: animScores.keywordMatch, detail: 'Strong coverage of core technical keywords.' },
    { title: 'Skills Analysis', score: animScores.skillsMatch, detail: 'High alignment with required frontend & backend tools.' },
    { title: 'Content & Experience', score: animScores.formattingScore, detail: 'Good section structure and role descriptions.' },
    { title: 'Formatting & ATS Check', score: animScores.formattingScore, detail: 'Clean standard fonts and section headings.' },
    { title: 'Overall Assessment', score: animScores.overallScore, detail: 'Resume is competitive and ready for application.' }
  ];

  return (
    <div className="ats-fit-page">
      {/* PAGE HEADER — ULTRA COMPACT */}
      <header className="ats-fit-header">
        <h1 className="ats-fit-title">ATS Resume Checker & Score Analyzer</h1>
        <p className="ats-fit-subtitle">
          Compare your resume against any job description to discover your ATS match score, identify missing keywords, and get action recommendations.
        </p>
      </header>

      {/* MAIN TWO-COLUMN GRID */}
      <main className="ats-fit-grid">
        {/* LEFT COLUMN: RESUME INPUTS */}
        <section className="ats-fit-left">
          <div className="ats-input-unified-card">
            {/* 1. IMPORT RESUME */}
            <div className="ats-input-group">
              <div className="ats-group-head">
                <div className="ats-icon-badge">
                  <FileText size={13} color="#2563eb" />
                </div>
                <h3>1. Import Resume</h3>
              </div>

              {!selectedFile ? (
                <div
                  className={`ats-compact-dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className="ats-file-hidden"
                  />
                  <UploadCloud size={16} color="#2563eb" className="ats-up-icon" />
                  <span className="ats-dz-text">
                    Drag & drop your resume here <span className="ats-dz-sub">or click to upload</span>
                  </span>
                  <button
                    type="button"
                    className="ats-btn-small-choose"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose File
                  </button>
                  <span className="ats-dz-formats">PDF, DOCX, TXT (Max 5MB)</span>
                </div>
              ) : (
                <div className="ats-compact-file-box">
                  <div className="ats-file-left-info">
                    <FileCheck size={16} color="#2563eb" />
                    <span className="ats-file-name-text">{selectedFile.name}</span>
                    <span className="ats-file-size-badge">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <button type="button" className="ats-btn-remove-compact" onClick={() => setSelectedFile(null)}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* 2. PASTE RESUME TEXT */}
            <div className="ats-input-group flexible">
              <div className="ats-group-head">
                <div className="ats-icon-badge">
                  <FileText size={13} color="#2563eb" />
                </div>
                <h3>2. Paste Resume Text</h3>
              </div>
              <textarea
                className="ats-fit-textarea"
                rows={2}
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            {/* 3. JOB DETAILS */}
            <div className="ats-input-group flexible">
              <div className="ats-group-head">
                <div className="ats-icon-badge">
                  <Briefcase size={13} color="#2563eb" />
                </div>
                <h3>3. Job Details</h3>
              </div>
              <textarea
                className="ats-fit-textarea"
                rows={2}
                placeholder="Paste target job description or requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* ANALYZE BUTTON */}
            <button
              type="button"
              className="ats-fit-btn-submit"
              onClick={handleAnalyzeClick}
              disabled={!selectedFile && !resumeText.trim()}
            >
              <Search size={15} />
              <span>Analyze Resume Score</span>
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: ATS RESULTS PANEL */}
        <section className="ats-fit-right">
          {!hasAnalyzed ? (
            /* INITIAL BLANK / UNANALYZED CARD */
            <div className="ats-fit-blank-panel">
              <div className="ats-fit-blank-icon">
                <BarChart2 size={26} color="#94a3b8" />
              </div>
              <h3 className="ats-fit-blank-title">No Analysis Yet</h3>
              <p className="ats-fit-blank-text">
                Upload or paste your resume and add a target job description to analyze your resume.
              </p>
            </div>
          ) : (
            /* PIC 2 RESULTS DASHBOARD PANEL WITH PROMINENT ANIMATED GAUGE */
            <div className="ats-fit-dashboard-panel">
              {/* TOP HEADER */}
              <div className="ats-fit-top-bar">
                <div className="ats-fit-bar-title">
                  <BarChart2 size={16} color="#2563eb" />
                  <h2>ATS Analysis Results</h2>
                </div>
                <div className="ats-fit-badge-complete">
                  <CheckCircle2 size={13} color="#16a34a" />
                  <span>Analysis Complete</span>
                </div>
              </div>

              {/* ROW 1: PROMINENT SCORE GAUGE + 4 STAT CARDS */}
              <div className="ats-fit-row-1">
                {/* Prominent Score Gauge Box */}
                <div className="ats-fit-gauge-box prominent">
                  <div className="ats-fit-svg-wrap prominent">
                    <svg viewBox="0 0 160 95" className="ats-fit-gauge-svg">
                      <path
                        d="M 15 85 A 65 65 0 0 1 145 85"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                      />
                      <path
                        d="M 15 85 A 65 65 0 0 1 145 85"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="ats-gauge-arc-anim"
                      />
                    </svg>

                    <div className="ats-fit-gauge-val prominent">
                      <span className="ats-fit-gauge-num prominent">{animScores.overallScore}</span>
                      <span className="ats-fit-gauge-den prominent">/100</span>
                    </div>
                  </div>
                  <div className="ats-fit-gauge-status">
                    <span className="ats-fit-status-lbl prominent">Good Match</span>
                    <p className="ats-fit-status-desc">Resume matches well with job requirements.</p>
                  </div>
                </div>

                {/* 4 Mini Stat Cards */}
                <div className="ats-fit-4-stats">
                  <div className="ats-fit-mini-card">
                    <div className="ats-mini-icon green">
                      <Search size={12} color="#16a34a" />
                    </div>
                    <span className="ats-fit-stat-num">{animScores.keywordMatch}%</span>
                    <span className="ats-fit-stat-lbl">Keyword Match</span>
                  </div>

                  <div className="ats-fit-mini-card">
                    <div className="ats-mini-icon purple">
                      <Code size={12} color="#9333ea" />
                    </div>
                    <span className="ats-fit-stat-num">{animScores.skillsMatch}%</span>
                    <span className="ats-fit-stat-lbl">Skills Match</span>
                  </div>

                  <div className="ats-fit-mini-card">
                    <div className="ats-mini-icon orange">
                      <FileText size={12} color="#ea580c" />
                    </div>
                    <span className="ats-fit-stat-num">{animScores.formattingScore}%</span>
                    <span className="ats-fit-stat-lbl">Formatting & ATS</span>
                  </div>

                  <div className="ats-fit-mini-card">
                    <div className="ats-mini-icon blue">
                      <BarChart2 size={12} color="#2563eb" />
                    </div>
                    <span className="ats-fit-stat-num">{animScores.overallScore}%</span>
                    <span className="ats-fit-stat-lbl">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* ROW 2: 3 COLUMNS (Matched, Missing, Recommended) */}
              <div className="ats-fit-row-2">
                <div className="ats-fit-col-card green">
                  <div className="ats-fit-col-head green">
                    <CheckCircle2 size={13} color="#16a34a" />
                    <h4>Matched Keywords ({analysisData?.matchedKeywords?.length})</h4>
                  </div>
                  <div className="ats-fit-chips">
                    {analysisData?.matchedKeywords?.map((kw, i) => (
                      <span key={i} className="ats-fit-chip green">✓ {kw}</span>
                    ))}
                  </div>
                </div>

                <div className="ats-fit-col-card orange">
                  <div className="ats-fit-col-head orange">
                    <AlertTriangle size={13} color="#d97706" />
                    <h4>Missing Keywords ({analysisData?.missingKeywords?.length})</h4>
                  </div>
                  <div className="ats-fit-chips">
                    {analysisData?.missingKeywords?.map((kw, i) => (
                      <span key={i} className="ats-fit-chip orange">○ {kw}</span>
                    ))}
                  </div>
                </div>

                <div className="ats-fit-col-card blue">
                  <div className="ats-fit-col-head blue">
                    <Lightbulb size={13} color="#2563eb" />
                    <h4>Recommended Improvements</h4>
                  </div>
                  <ul className="ats-fit-recs">
                    {analysisData?.recommendations?.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ROW 3: ACCORDION & CTA */}
              <div className="ats-fit-row-3">
                <div className="ats-fit-accordion-box">
                  <div className="ats-fit-acc-head">
                    <FileText size={14} color="#64748b" />
                    <h4>Detailed Analysis</h4>
                  </div>
                  <div className="ats-fit-acc-list">
                    {accordionItems.map((item, idx) => (
                      <div key={idx} className="ats-fit-acc-item">
                        <button
                          type="button"
                          className="ats-fit-acc-btn"
                          onClick={() => setOpenAccIdx(openAccIdx === idx ? null : idx)}
                        >
                          <span>{item.title}</span>
                          <div className="ats-fit-acc-val">
                            <span>{item.score}%</span>
                            {openAccIdx === idx ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </div>
                        </button>
                        {openAccIdx === idx && (
                          <div className="ats-fit-acc-body">{item.detail}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ats-fit-feedback-cta">
                  <h4>Overall Feedback</h4>
                  <p>Your resume matches well! Add missing keywords to boost your score.</p>
                  <button
                    type="button"
                    className="ats-fit-btn-edit"
                    onClick={handleEditInResumeMaker}
                  >
                    <Edit3 size={14} />
                    <span>Edit Resume</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ATSChecker;
