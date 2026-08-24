import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { resumeApi } from '../../../services/resumeApi';
import { Plus, FileText, Download, Copy, Trash2, Edit3, Sparkles, Clock, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import './ResumeDashboard.css';

export const ResumeDashboard = ({ onOpenEditor, onOpenTemplateGallery }) => {
  const { resumesList, createNewResume, deleteResume, duplicateResume, loadResume } = useResume();
  const [downloadingId, setDownloadingId] = useState(null);

  const handleCreateNew = () => {
    onOpenTemplateGallery();
  };

  const handleEdit = async (id) => {
    await loadResume(id);
    onOpenEditor(id);
  };

  const handleDownloadPdf = async (id, title) => {
    setDownloadingId(id);
    try {
      toast.loading('Generating PDF and storing in Cloudflare R2...', { id: 'pdf-toast' });
      const res = await resumeApi.generatePdf(id);
      toast.success('PDF Generated! Downloading file...', { id: 'pdf-toast' });
      if (res.download_url) {
        window.open(res.download_url, '_blank');
      }
    } catch (err) {
      toast.error('PDF generation failed: ' + err.message, { id: 'pdf-toast' });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadDocx = async (id, title) => {
    setDownloadingId(id);
    try {
      toast.loading('Generating Word DOCX and storing in Cloudflare R2...', { id: 'docx-toast' });
      const res = await resumeApi.generateDocx(id);
      toast.success('DOCX Generated! Downloading file...', { id: 'docx-toast' });
      if (res.download_url) {
        window.open(res.download_url, '_blank');
      }
    } catch (err) {
      toast.error('DOCX generation failed: ' + err.message, { id: 'docx-toast' });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="resume-dashboard-container">
      {/* Main Content Area: My Resumes */}
      <div className="dash-content-section">
        <div className="section-head">
          <h2>My Resumes ({resumesList.length})</h2>
          {resumesList.length > 0 && (
            <button className="btn-create-primary" onClick={handleCreateNew}>
              <Plus size={18} />
              <span>Create New Resume</span>
            </button>
          )}
        </div>

        {resumesList.length === 0 ? (
          /* EMPTY STATE (Section 3) */
          <div className="empty-state-card">
            <div className="empty-icon-wrap">
              <FileText size={48} color="#1A73E8" />
            </div>
            <h3>Build your first professional resume</h3>
            <p>Choose from 20 ATS-friendly templates, import your Knora profile, and export PDF/DOCX stored in Cloudflare R2.</p>
            <button className="btn-create-primary" onClick={handleCreateNew}>
              <Plus size={18} />
              <span>Create Resume</span>
            </button>
          </div>
        ) : (
          /* RESUMES GRID (Section 3 & 4) */
          <div className="resumes-grid">
            {resumesList.map((resume) => {
              const formattedDate = new Date(resume.updated_at || resume.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div key={resume._id || resume.id} className="resume-card">
                  <div className="resume-card-header">
                    <div className="resume-icon">
                      <FileText size={20} color="#1A73E8" />
                    </div>
                    <span className="status-badge complete">
                      <ShieldCheck size={12} /> {resume.ats_score ? `ATS Score: ${resume.ats_score}` : 'Complete'}
                    </span>
                  </div>

                  <div className="resume-card-body">
                    <h3>{resume.title}</h3>
                    <div className="resume-meta">
                      <span><Clock size={12} /> Updated: {formattedDate}</span>
                      <span className="meta-template">Template: {resume.template_id || 'Knora Modern'}</span>
                    </div>
                  </div>

                  <div className="resume-card-actions">
                    <button className="btn-action edit" onClick={() => handleEdit(resume._id || resume.id)}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button className="btn-action duplicate" onClick={() => duplicateResume(resume._id || resume.id)}>
                      <Copy size={14} /> Duplicate
                    </button>
                    <button
                      className="btn-action download"
                      disabled={downloadingId === (resume._id || resume.id)}
                      onClick={() => handleDownloadPdf(resume._id || resume.id, resume.title)}
                    >
                      <Download size={14} /> PDF
                    </button>
                    <button
                      className="btn-action download-docx"
                      disabled={downloadingId === (resume._id || resume.id)}
                      onClick={() => handleDownloadDocx(resume._id || resume.id, resume.title)}
                    >
                      <FileSpreadsheet size={14} /> DOCX
                    </button>
                    <button className="btn-action delete" onClick={() => deleteResume(resume._id || resume.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
