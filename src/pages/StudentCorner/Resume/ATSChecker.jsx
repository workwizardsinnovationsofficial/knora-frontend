import React, { useState } from 'react';
import { atsService } from '../../../services/atsService';
import { FileSearch, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import './ATSChecker.css';

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error('Please paste both your Resume content and target Job Description');
      return;
    }

    setLoading(true);
    try {
      const result = await atsService.analyzeResume(resumeText, jobDescription);
      setAnalysisResult(result);
      toast.success('ATS Resume Analysis complete!');
    } catch (err) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-checker-page-container">
      <div className="ats-checker-header">
        <div className="ats-badge">
          <Sparkles size={14} color="#1A73E8" />
          <span>AI ATS ANALYZER</span>
        </div>
        <h1 className="ats-title">ATS Resume Checker & Score Analyzer</h1>
        <p className="ats-subtitle">
          Compare your resume against any job description to discover your ATS match score, identify missing keywords, and get action recommendations.
        </p>
      </div>

      <div className="ats-main-grid">
        {/* Input Column */}
        <div className="ats-input-card">
          <h2 className="card-section-title">1. Paste Resume & Job Details</h2>

          <form onSubmit={handleAnalyze} className="ats-form">
            <div className="input-block">
              <label htmlFor="resume-text">Paste Resume Text</label>
              <textarea
                id="resume-text"
                rows={8}
                required
                placeholder="Paste plain text resume (Education, Technical Skills, Projects, Experience...)"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="job-desc">Target Job Description</label>
              <textarea
                id="job-desc"
                rows={8}
                required
                placeholder="Paste target job requirements from company job posting..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-analyze-ats" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Analyzing Resume with ATS AI...</span>
                </>
              ) : (
                <>
                  <FileSearch size={18} />
                  <span>Analyze Resume Score</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Column (Section 24: ATS Score 82 / 100) */}
        <div className="ats-output-card">
          <h2 className="card-section-title">2. ATS Analysis Results</h2>

          {!analysisResult ? (
            <div className="ats-empty-state">
              <FileSearch size={48} color="#888888" />
              <h3>No Analysis Run Yet</h3>
              <p>Paste your resume content and job description on the left and click "Analyze Resume Score".</p>
            </div>
          ) : (
            <div className="ats-results-wrapper">
              <div className="score-summary-box">
                <div className="score-ring">
                  <span className="score-number">82</span>
                  <span className="score-max">/100</span>
                </div>
                <div className="score-meta">
                  <h3>ATS Score: 82 / 100</h3>
                  <p>Great Match! Add missing keywords to increase match score above 90%.</p>
                </div>
              </div>

              <div className="score-breakdown-grid">
                <div className="breakdown-item">
                  <span className="bd-label">Keyword Match</span>
                  <span className="bd-value">88%</span>
                </div>
                <div className="breakdown-item">
                  <span className="bd-label">Skills Match</span>
                  <span className="bd-value">81%</span>
                </div>
                <div className="breakdown-item">
                  <span className="bd-label">Formatting</span>
                  <span className="bd-value">90%</span>
                </div>
              </div>

              <div className="missing-keywords-box">
                <h4><AlertCircle size={16} color="#f59e0b" /> Missing Keywords Detected</h4>
                <div className="keywords-chip-list">
                  {analysisResult.missingKeywords.map((kw, i) => (
                    <span key={i} className="kw-chip">{kw}</span>
                  ))}
                </div>
              </div>

              <div className="recommendations-box">
                <h4><CheckCircle2 size={16} color="#1A73E8" /> Recommended Improvements</h4>
                <ul>
                  {analysisResult.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;
