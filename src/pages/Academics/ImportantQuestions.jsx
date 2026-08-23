import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { academicSubjects } from '../../mock/academics';
import { ArrowLeft, Download, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import './ImportantQuestions.css';

const DEFAULT_R2_PDF_URL = 'https://pub-0c055114eb164ec7a79e688c66abb160.r2.dev/jntuk-r23/subjects-syllabus/ENGINEERING%20GRAPHICS%20SYLLABUS.pdf';

const importantQuestionsSampleData = [
  {
    setNumber: 1,
    title: 'Unit 1 & Unit 2 Most Repeated Exam Questions',
    category: 'High Weightage',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    setNumber: 2,
    title: 'Unit 3 & Unit 4 Numericals & Derivations Guide',
    category: 'Derivations & Numericals',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    setNumber: 3,
    title: 'Unit 5 Semiconductors & Lasers Top Exam Questions',
    category: 'Core Concepts',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    setNumber: 4,
    title: 'High Weightage Expected Semester Questions',
    category: 'Predicted Exam Paper',
    pdfUrl: DEFAULT_R2_PDF_URL
  },
  {
    setNumber: 5,
    title: 'Unit-Wise Expected Short Answer Bank',
    category: 'Short Answer Bank',
    pdfUrl: DEFAULT_R2_PDF_URL
  }
];

const ImportantQuestions = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const currentSubject = academicSubjects.find(s => s.id === subjectId) || academicSubjects[0];
  const [activeSetIdx, setActiveSetIdx] = useState(0);

  const activeSet = importantQuestionsSampleData[activeSetIdx] || importantQuestionsSampleData[0];
  const activePdfUrl = activeSet.pdfUrl || DEFAULT_R2_PDF_URL;

  const handleSetSelect = (idx) => {
    setActiveSetIdx(idx);
    toast.success(`Loaded Module ${idx + 1}: ${importantQuestionsSampleData[idx].title}`);
  };

  const handleDownloadPDF = () => {
    toast.success(`Downloading PDF for ${activeSet.title}...`);
    window.open(activePdfUrl, '_blank');
  };

  return (
    <div className="important-questions-page-container">
      {/* Top Navigation Header */}
      <div className="questions-top-nav-bar">
        <div className="nav-left-group">
          <button className="btn-back-subject" onClick={() => navigate(`/academics/subject/${currentSubject.id}`)}>
            <ArrowLeft size={16} />
            <span>Back to {currentSubject.name}</span>
          </button>
          <div className="header-titles">
            <h1 className="questions-main-title">{currentSubject.name} – Important Questions</h1>
            <span className="active-set-badge">
              Module {activeSet.setNumber}: {activeSet.title}
            </span>
          </div>
        </div>

        {/* Top Download Option */}
        <a 
          href={activePdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-download-top-pdf blue-btn"
          onClick={handleDownloadPDF}
        >
          <Download size={16} />
          <span>Download Questions PDF</span>
        </a>
      </div>

      {/* Main Split Layout: Left Side Menu + Right Cloudflare R2 PDF Viewer */}
      <div className="questions-main-split-grid">
        {/* LEFT SIDE MENU: Question Modules 1, 2, 3, 4, 5 */}
        <div className="questions-sidebar-card">
          <div className="sidebar-header blue-header">
            <Star size={18} className="sidebar-header-icon blue-icon" />
            <h3>Important Questions</h3>
          </div>

          <div className="sidebar-sets-list">
            {importantQuestionsSampleData.map((set, idx) => {
              const isActive = idx === activeSetIdx;
              return (
                <div
                  key={set.setNumber}
                  className={`sidebar-set-item ${isActive ? 'active-blue' : ''}`}
                  onClick={() => handleSetSelect(idx)}
                >
                  <span className="set-number-pill">{set.setNumber}</span>
                  <div className="set-item-text">
                    <span className="set-item-title">Module {set.setNumber}</span>
                    <span className="set-item-sub">{set.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT AREA: Direct Cloudflare R2 PDF Viewer */}
        <div className="question-sheet-container-wrapper">
          <div className="pdf-iframe-container-card">
            <iframe
              key={activePdfUrl + activeSet.setNumber}
              src={`${activePdfUrl}#toolbar=1&navpanes=0`}
              title={activeSet.title}
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

export default ImportantQuestions;
