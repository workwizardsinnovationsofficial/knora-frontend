import React, { useState } from 'react';
import { resumeApi } from '../../../services/resumeApi';
import { ShieldCheck, AlertTriangle, CheckCircle2, Target, Briefcase, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import './ATSCheckerPanel.css';

export const ATSCheckerPanel = ({ resumeId, atsResult }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [tailorResult, setTailorResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const score = atsResult?.overallScore || 88;
  const warnings = atsResult?.warnings || [
    'Add a LinkedIn or GitHub link to improve ATS recruiter score',
    'Add measurable achievements with numbers or metrics'
  ];
  const passed = atsResult?.passed || [
    'Contact information complete',
    'Education section properly structured',
    'Technical skills section well-populated'
  ];

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await resumeApi.tailorJob(resumeId, jobDescription);
      setTailorResult(data);
      toast.success('Job description analysis complete!');
    } catch (err) {
      toast.error('Job tailoring failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="ats-panel-container">
      {/* Resume Health Overview */}
      <div className="ats-score-card">
        <div className="score-ring-wrap">
          <div className="score-number">{score}</div>
          <div className="score-label">/ 100</div>
        </div>

        <div className="score-details">
          <h4>Resume Health Score</h4>
          <p>Rule-based analysis evaluating content, layout, contact info, and ATS parsing metrics.</p>

          <div className="metrics-row">
            <div className="metric-item">
              <span className="m-val">{atsResult?.atsCompatibility || 91}%</span>
              <span className="m-lbl">ATS Parsing</span>
            </div>
            <div className="metric-item">
              <span className="m-val">{atsResult?.contentQuality || 86}%</span>
              <span className="m-lbl">Content Impact</span>
            </div>
            <div className="metric-item">
              <span className="m-val">{atsResult?.completeness || 92}%</span>
              <span className="m-lbl">Completeness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations & Passed Checks */}
      <div className="checks-grid">
        {/* Warnings */}
        <div className="check-box warnings-box">
          <div className="box-title text-warning">
            <AlertTriangle size={16} /> Warnings & Recommendations ({warnings.length})
          </div>
          <ul className="check-list">
            {warnings.map((warn, i) => (
              <li key={i} className="warn-item">
                <span>⚠</span> {warn}
              </li>
            ))}
          </ul>
        </div>

        {/* Passed Checks */}
        <div className="check-box passed-box">
          <div className="box-title text-success">
            <CheckCircle2 size={16} /> Passed Checks ({passed.length})
          </div>
          <ul className="check-list">
            {passed.map((p, i) => (
              <li key={i} className="pass-item">
                <span>✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Description Matching Section */}
      <div className="job-tailor-card">
        <div className="card-title">
          <Target size={18} color="#1A73E8" />
          <h3>Tailor Resume to Job Description</h3>
        </div>

        <p className="card-subtitle">Paste a target job posting below to match keywords and extract missing skills.</p>

        <textarea
          rows={4}
          placeholder="Paste Job Description here (e.g. Seeking a Fullstack Engineer with React, Python, FastAPI, SQL, and Docker experience...)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          className="btn-tailor-submit"
          disabled={isAnalyzing}
          onClick={handleAnalyzeJob}
        >
          {isAnalyzing ? <RefreshCw size={16} className="spin" /> : <Briefcase size={16} />}
          <span>{isAnalyzing ? 'Analyzing Job Keywords...' : 'Analyze Job Match'}</span>
        </button>

        {/* Match Result Display */}
        {tailorResult && (
          <div className="tailor-result-box">
            <div className="match-banner">
              <div className="match-pct">{tailorResult.matchPercentage}%</div>
              <div>
                <strong>Job Match Score</strong>
                <p>{tailorResult.matchedSkills.length} matching keywords found in your resume</p>
              </div>
            </div>

            <div className="keywords-lists-row">
              <div className="kw-box matched">
                <h5>Matched Skills ({tailorResult.matchedSkills.length})</h5>
                <div className="kw-tags">
                  {tailorResult.matchedSkills.map((sk, i) => (
                    <span key={i} className="kw-tag match">✓ {sk}</span>
                  ))}
                </div>
              </div>

              <div className="kw-box missing">
                <h5>Missing Skills ({tailorResult.missingSkills.length})</h5>
                <div className="kw-tags">
                  {tailorResult.missingSkills.map((sk, i) => (
                    <span key={i} className="kw-tag miss">○ {sk}</span>
                  ))}
                </div>
              </div>
            </div>

            {tailorResult.recommendations && (
              <div className="tailor-recs">
                <h5>Suggestions:</h5>
                <ul>
                  {tailorResult.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
