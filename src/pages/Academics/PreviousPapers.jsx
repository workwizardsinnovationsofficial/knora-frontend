import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { academicSubjects } from '../../mock/academics';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import './PreviousPapers.css';

const DEFAULT_R2_PDF_URL = 'https://pub-0c055114eb164ec7a79e688c66abb160.r2.dev/jntuk-r23/subjects-syllabus/ENGINEERING%20GRAPHICS%20SYLLABUS.pdf';

const previousPapersSampleData = [
  {
    paperNumber: 1,
    title: 'Regular End-Semester Exam Paper (Nov 2023)',
    year: '2023',
    regulation: 'R22 / R23',
    examType: 'Regular Examination',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    paperNumber: 2,
    title: 'Supplementary Semester Exam Paper (May 2023)',
    year: '2023',
    regulation: 'R22',
    examType: 'Supplementary Examination',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    paperNumber: 3,
    title: 'Regular End-Semester Exam Paper (Nov 2022)',
    year: '2022',
    regulation: 'R18',
    examType: 'Regular Examination',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    paperNumber: 4,
    title: 'Regular End-Semester Exam Paper (May 2022)',
    year: '2022',
    regulation: 'R18',
    examType: 'Supplementary Examination',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    paperNumber: 5,
    title: 'Mid-Term & End-Semester Model Paper (2021)',
    year: '2021',
    regulation: 'R18 / R16',
    examType: 'Model Examination',
    pdfUrl: DEFAULT_R2_PDF_URL
  }
];

const PreviousPapers = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const currentSubject = academicSubjects.find(s => s.id === subjectId) || academicSubjects[0];
  const [activePaperIdx, setActivePaperIdx] = useState(0);

  const activePaper = previousPapersSampleData[activePaperIdx] || previousPapersSampleData[0];
  const activePdfUrl = activePaper.pdfUrl || DEFAULT_R2_PDF_URL;

  const handlePaperSelect = (idx) => {
    setActivePaperIdx(idx);
    toast.success(`Loaded Paper ${idx + 1} (${previousPapersSampleData[idx].year})`);
  };

  const handleDownloadPDF = () => {
    toast.success(`Downloading ${activePaper.title}...`);
    window.open(activePdfUrl, '_blank');
  };

  return (
    <div className="previous-papers-page-container">
      {/* Top Navigation & Header Bar */}
      <div className="papers-top-nav-bar">
        <div className="nav-left-group">
          <button className="btn-back-subject" onClick={() => navigate(`/academics/subject/${currentSubject.id}`)}>
            <ArrowLeft size={16} />
            <span>Back to {currentSubject.name}</span>
          </button>
          <div className="header-titles">
            <h1 className="papers-main-title">{currentSubject.name} – Previous Question Papers</h1>
            <span className="active-paper-badge">
              Paper {activePaper.paperNumber}: {activePaper.title}
            </span>
          </div>
        </div>

        {/* Top Download Option */}
        <a 
          href={activePdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-download-top-pdf"
          onClick={handleDownloadPDF}
        >
          <Download size={16} />
          <span>Download Paper PDF</span>
        </a>
      </div>

      {/* Main Split Layout: Left Side Menu + Right Cloudflare R2 PDF Viewer */}
      <div className="papers-main-split-grid">
        {/* LEFT SIDE MENU: Question Papers 1, 2, 3, 4, 5 */}
        <div className="papers-sidebar-card">
          <div className="sidebar-header">
            <FileText size={18} className="sidebar-header-icon" />
            <h3>Previous Papers</h3>
          </div>

          <div className="sidebar-papers-list">
            {previousPapersSampleData.map((paper, idx) => {
              const isActive = idx === activePaperIdx;
              return (
                <div
                  key={paper.paperNumber}
                  className={`sidebar-paper-item ${isActive ? 'active' : ''}`}
                  onClick={() => handlePaperSelect(idx)}
                >
                  <span className="paper-number-pill">{paper.paperNumber}</span>
                  <div className="paper-item-text">
                    <span className="paper-item-title">Paper {paper.paperNumber}</span>
                    <span className="paper-item-sub">{paper.year} • {paper.regulation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT AREA: Direct Cloudflare R2 PDF Document Viewer */}
        <div className="paper-sheet-container-wrapper">
          <div className="pdf-iframe-container-card">
            <iframe
              key={activePdfUrl + activePaper.paperNumber}
              src={`${activePdfUrl}#toolbar=1&navpanes=0`}
              title={activePaper.title}
              className="pdf-iframe-element"
              width="100%"
              height="750px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousPapers;
