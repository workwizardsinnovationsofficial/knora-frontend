import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { academicMockData } from '../../mock/academics';
import { BookOpen, Layers, Filter, CheckCircle2, ArrowRight, PlayCircle, FileText, Search } from 'lucide-react';
import './Academics.css';

const Academics = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';

  const [selectedUniversity, setSelectedUniversity] = useState('jntuh');
  const [selectedRegulation, setSelectedRegulation] = useState('R22');
  const [selectedBranch, setSelectedBranch] = useState('cse');
  const [selectedYear, setSelectedYear] = useState('3rd Year');
  const [selectedSemester, setSelectedSemester] = useState('1st Semester');

  const filteredSubjects = academicMockData.subjectsSample.filter(subject =>
    !searchFilter ||
    subject.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="academics-page-container">
      {/* Header Banner */}
      <section className="academics-hero-banner">
        <span className="banner-pill">UNIVERSITY ACADEMICS</span>
        <h1 className="banner-title">B.Tech Academic Curriculum & Resources</h1>
        <p className="banner-subtitle">
          Select your university, regulation, branch, year, and semester to view structured unit topics, video lectures, PDF notes, and previous question papers.
        </p>
        {searchFilter && (
          <div className="search-query-badge">
            <Search size={14} />
            <span>Search results for: "<strong>{searchFilter}</strong>"</span>
          </div>
        )}
      </section>

      {/* Filter Selection Controls */}
      <div className="academic-filters-card">
        <div className="filter-group">
          <label>University</label>
          <select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
            {academicMockData.universities.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Regulation</label>
          <select value={selectedRegulation} onChange={(e) => setSelectedRegulation(e.target.value)}>
            {academicMockData.regulations.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Branch</label>
          <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
            {academicMockData.branches.map(b => (
              <option key={b.id} value={b.id}>{b.code} — {b.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {academicMockData.years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Semester</label>
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            {academicMockData.semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resulting Subjects List */}
      <div className="subjects-section">
        <div className="subjects-header-row">
          <h2>Subject Syllabus & Lecture Modules ({selectedRegulation})</h2>
          <span className="selected-tag">{selectedBranch.toUpperCase()} • {selectedYear} • {selectedSemester}</span>
        </div>

        <div className="subjects-grid">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <div key={subject.id} className="subject-card">
                <div className="sub-top-bar">
                  <span className="sub-code">{subject.code}</span>
                  <span className="sub-units">{subject.units} Units</span>
                </div>

                <h3 className="sub-title">{subject.name}</h3>
                <p className="sub-meta">{subject.topicsCount} Detailed Topics • Video Lectures + PDF Notes</p>

                <div className="sub-action-btns">
                  <button 
                    className="btn-start-learning"
                    onClick={() => navigate(`/academics/subject/${subject.id}`)}
                  >
                    <PlayCircle size={16} />
                    <span>Start Learning</span>
                  </button>

                  <button 
                    className="btn-view-notes"
                    onClick={() => navigate(`/academics/subject/${subject.id}`)}
                  >
                    <FileText size={16} />
                    <span>View Notes</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-subjects-found">No subjects found matching "{searchFilter}". Try searching another subject or clearing the search filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;
