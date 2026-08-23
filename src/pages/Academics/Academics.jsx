import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { academicMockData, academicSubjects } from '../../mock/academics';
import { BookOpen, FileText, Video, FileDown, Star, Search, X, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import './Academics.css';

const Academics = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';

  // Form selection states matching Pic 2
  const [university, setUniversity] = useState('jntuk');
  const [regulation, setRegulation] = useState('R23');
  const [college, setCollege] = useState('ists');
  const [branch, setBranch] = useState('cse-aids');
  const [year, setYear] = useState('1st Year');
  const [semester, setSemester] = useState('1st Semester');

  // Submission state - subjects ONLY show after submit as requested
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedConfig, setSubmittedConfig] = useState(null);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedConfig({
      university,
      regulation,
      college,
      branch,
      year,
      semester
    });
    setIsSubmitted(true);
    toast.success(`Academic curriculum loaded for ${year} - ${semester}!`);
  };

  // Always display the same subjects for all filter selections as requested
  const displaySubjects = academicSubjects.filter(sub =>
    !searchFilter ||
    sub.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleResourceClick = (subject, resourceType, e) => {
    if (e) e.stopPropagation();
    if (resourceType === 'Study Materials') {
      navigate(`/academics/subject/${subject.id}`);
      toast.success(`Opening Study Materials for ${subject.name}`);
    } else if (resourceType === 'Video Lectures') {
      navigate(`/academics/subject/${subject.id}/unit/1/topic/1`);
      toast.success(`Loading Video Lectures for ${subject.name}`);
    } else if (resourceType === 'Previous Papers') {
      navigate(`/academics/subject/${subject.id}/previous-papers`);
    } else if (resourceType === 'IMP Questions') {
      navigate(`/academics/subject/${subject.id}/important-questions`);
    }
  };

  const handleDownloadSyllabus = () => {
    toast.success(`Downloading ${submittedConfig?.regulation || regulation} Syllabus PDF...`);
  };

  return (
    <div className="academics-page-wrapper">
      {/* Header Title & Subtitle (Matching Pic 2) */}
      <div className="academics-hero-header">
        <h1 className="academics-title">Academics</h1>
        <p className="academics-subtitle">
          Select your details to access course materials, video lectures, and previous papers.
        </p>

        {searchFilter && (
          <div className="search-badge">
            <Search size={14} />
            <span>Search filter active: "<strong>{searchFilter}</strong>"</span>
          </div>
        )}
      </div>

      {/* Filter Form Controls (6 Dropdowns + Submit Button - Matching Pic 2) */}
      <form className="academics-filter-form" onSubmit={handleSubmit}>
        <div className="filters-flex-row">
          {/* 1. University */}
          <div className="filter-select-group">
            <select 
              value={university} 
              onChange={(e) => setUniversity(e.target.value)}
              className="filter-select"
            >
              {academicMockData.universities.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* 2. Regulation */}
          <div className="filter-select-group">
            <select 
              value={regulation} 
              onChange={(e) => setRegulation(e.target.value)}
              className="filter-select"
            >
              {academicMockData.regulations.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* 3. College / Institution */}
          <div className="filter-select-group">
            <select 
              value={college} 
              onChange={(e) => setCollege(e.target.value)}
              className="filter-select"
            >
              {academicMockData.colleges.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 4. Branch */}
          <div className="filter-select-group">
            <select 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)}
              className="filter-select"
            >
              {academicMockData.branches.map(b => (
                <option key={b.id} value={b.id}>{b.code}</option>
              ))}
            </select>
          </div>

          {/* 5. Year */}
          <div className="filter-select-group">
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              className="filter-select"
            >
              {academicMockData.years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* 6. Semester */}
          <div className="filter-select-group">
            <select 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)}
              className="filter-select"
            >
              {academicMockData.semesters.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit-filters">
            Submit
          </button>
        </div>
      </form>

      {/* Main Content Area - Rendered ONLY after submit as requested */}
      {!isSubmitted ? (
        <div className="academic-prompt-card">
          <div className="prompt-content">
            <Filter size={32} className="prompt-icon" />
            <h3>Select Academic Details Above</h3>
            <p>Choose your University, Regulation, College, Branch, Year, and Semester, then click <strong>Submit</strong> to view your syllabus and subject materials.</p>
          </div>
        </div>
      ) : (
        <div className="academic-results-container">
          {/* Syllabus Header Bar (Matching Pic 3) */}
          <div className="syllabus-banner-box">
            <div className="syllabus-left-info">
              <BookOpen size={20} className="syllabus-book-icon" />
              <h2 className="syllabus-heading">Syllabus</h2>
            </div>
            <div className="syllabus-right-actions">
              <button 
                type="button" 
                className="btn-syllabus-btn"
                onClick={() => setShowSyllabusModal(true)}
              >
                View
              </button>
              <button 
                type="button" 
                className="btn-syllabus-btn"
                onClick={handleDownloadSyllabus}
              >
                Download
              </button>
            </div>
          </div>

          {/* Subject Cards Grid (Matching Pic 3) */}
          <div className="subjects-cards-grid">
            {displaySubjects.map((subject) => (
              <div 
                key={subject.id} 
                className="subject-card-item"
                onClick={() => navigate(`/academics/subject/${subject.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="subject-card-title-row">
                  <BookOpen size={18} className="sub-book-icon" />
                  <h3 className="subject-name-heading">{subject.name}</h3>
                </div>

                <div className="subject-resources-list">
                  <button 
                    type="button" 
                    className="resource-item-btn"
                    onClick={(e) => handleResourceClick(subject, 'Study Materials', e)}
                  >
                    <FileText size={16} className="res-icon" />
                    <span>Study Materials</span>
                  </button>

                  <button 
                    type="button" 
                    className="resource-item-btn"
                    onClick={(e) => handleResourceClick(subject, 'Video Lectures', e)}
                  >
                    <Video size={16} className="res-icon" />
                    <span>Video Lectures</span>
                  </button>

                  <button 
                    type="button" 
                    className="resource-item-btn"
                    onClick={(e) => handleResourceClick(subject, 'Previous Papers', e)}
                  >
                    <FileDown size={16} className="res-icon" />
                    <span>Previous Papers</span>
                  </button>

                  <button 
                    type="button" 
                    className="resource-item-btn"
                    onClick={(e) => handleResourceClick(subject, 'IMP Questions', e)}
                  >
                    <Star size={16} className="res-icon" />
                    <span>IMP Questions</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Syllabus Modal */}
      {showSyllabusModal && (
        <div className="modal-backdrop" onClick={() => setShowSyllabusModal(false)}>
          <div className="syllabus-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-flex">
                <BookOpen size={20} color="#007DFF" />
                <h3>{submittedConfig?.regulation || regulation} Official Curriculum Syllabus</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setShowSyllabusModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-meta-tag">
                {submittedConfig?.university?.toUpperCase()} • {submittedConfig?.year} • {submittedConfig?.semester} • {submittedConfig?.branch?.toUpperCase()}
              </p>

              <div className="syllabus-topics-preview">
                <h4>Core Curriculum Modules & Credits</h4>
                <ul>
                  {displaySubjects.map(sub => (
                    <li key={sub.id}>
                      <strong>{sub.code}: {sub.name}</strong>
                      <span className="credits-badge">4 Credits</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowSyllabusModal(false)}>Close</button>
              <button className="btn-primary" onClick={handleDownloadSyllabus}>Download Syllabus PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;
