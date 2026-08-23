import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { academicSubjects } from '../../mock/academics';
import { ArrowLeft, ArrowRight, Download, Star, X, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './SubjectDetails.css';

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  // Find subject by ID or fallback to first subject
  const currentSubject = academicSubjects.find(s => s.id === subjectId) || academicSubjects[0];

  const [showPapersModal, setShowPapersModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const handleUnitClick = (unitNumber) => {
    navigate(`/academics/subject/${currentSubject.id}/unit/${unitNumber}/topic/1`);
  };

  const handleDownloadPaper = (paperTitle) => {
    toast.success(`Downloading ${paperTitle}...`);
  };

  return (
    <div className="subject-details-wrapper">
      {/* Top Breadcrumb Link */}
      <button className="btn-back-subjects" onClick={() => navigate('/academics')}>
        <ArrowLeft size={16} />
        <span>Back to Subjects</span>
      </button>

      {/* Main Subject Title Header (Matching Pic 3) */}
      <div className="subject-title-block">
        <h1 className="subject-main-heading">{currentSubject.name}</h1>
        <p className="subject-main-subtext">{currentSubject.description || 'Complete study material for this subject'}</p>
      </div>

      {/* Units Section */}
      <div className="subject-units-section">
        <div className="units-buttons-list">
          {currentSubject.units?.map((unit) => (
            <button
              key={unit.unitNumber}
              className="unit-banner-btn"
              onClick={() => handleUnitClick(unit.unitNumber)}
            >
              <span className="unit-title-text">{unit.title}</span>
              <ArrowRight size={18} className="unit-arrow-icon" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Previous Papers & Important Questions */}
      <div className="resources-bottom-grid">
        {/* Card 1: Previous Papers */}
        <div className="resource-box-card">
          <div className="resource-box-header">
            <Download size={18} className="icon-papers" />
            <h3>Previous Papers</h3>
          </div>

          <div className="resource-content-paper-box">
            <h4 className="paper-subject-label">{currentSubject.name}</h4>
            <button 
              className="btn-view-papers"
              onClick={() => navigate(`/academics/subject/${currentSubject.id}/previous-papers`)}
            >
              View Papers ({currentSubject.previousPapers?.length || 1})
            </button>
          </div>
        </div>

        {/* Card 2: Important Questions */}
        <div className="resource-box-card">
          <div className="resource-box-header">
            <Star size={18} className="icon-questions" />
            <h3>Important Questions</h3>
          </div>

          <div className="resource-content-questions-box">
            <h4 className="questions-subject-label">{currentSubject.name}</h4>
            <button 
              className="btn-view-questions"
              onClick={() => navigate(`/academics/subject/${currentSubject.id}/important-questions`)}
            >
              View Questions ({currentSubject.importantQuestions?.length || 3})
            </button>
          </div>
        </div>
      </div>

      {/* Previous Papers Modal */}
      {showPapersModal && (
        <div className="modal-backdrop" onClick={() => setShowPapersModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-title-row">
                <Download size={18} color="#007DFF" />
                <h3>Previous Question Papers – {currentSubject.name}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setShowPapersModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-inner-body">
              <div className="papers-list-items">
                {(currentSubject.previousPapers || []).map((paper) => (
                  <div key={paper.id} className="paper-item-card">
                    <div className="paper-info">
                      <FileText size={18} color="#007DFF" />
                      <div>
                        <h5>{paper.title}</h5>
                        <span className="paper-year-badge">Exam Year: {paper.year}</span>
                      </div>
                    </div>
                    <button className="btn-download-item" onClick={() => handleDownloadPaper(paper.title)}>
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Questions Modal */}
      {showQuestionsModal && (
        <div className="modal-backdrop" onClick={() => setShowQuestionsModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-title-row">
                <Star size={18} color="#007DFF" />
                <h3>Important Questions – {currentSubject.name}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setShowQuestionsModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-inner-body">
              <div className="questions-list-items">
                {(currentSubject.importantQuestions || []).map((imp) => (
                  <div key={imp.id} className="question-item-card">
                    <div className="imp-info">
                      <CheckCircle2 size={18} color="#007DFF" />
                      <div>
                        <h5>{imp.title}</h5>
                        <span className="imp-count-tag">{imp.count} Selected Questions</span>
                      </div>
                    </div>
                    <button className="btn-view-imp-item" onClick={() => toast.success(`Viewing ${imp.title}...`)}>
                      View PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
