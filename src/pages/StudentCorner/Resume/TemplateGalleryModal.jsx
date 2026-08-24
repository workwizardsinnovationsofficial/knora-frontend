import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../../../data/resumeTemplates';
import { MiniResumePreview } from '../../../components/Resume/MiniResumePreview';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { Sparkles, Check, Search, ShieldCheck, X, Eye, ArrowRight } from 'lucide-react';
import './TemplateGalleryModal.css';

export const TemplateGalleryModal = ({ isOpen, onClose, onSelectTemplate, currentTemplateId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  if (!isOpen) return null;

  const categories = ['All', 'ATS Friendly', 'Modern', 'Tech', 'Professional', 'Entry Level', 'Academic', 'Creative'];

  const filteredTemplates = RESUME_TEMPLATES.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory || (selectedCategory === 'ATS Friendly' && t.atsFriendly);
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.careerType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleNavigatePreview = (direction) => {
    if (!previewTemplate) return;
    const currentIndex = filteredTemplates.findIndex(t => t.id === previewTemplate.id);
    if (currentIndex === -1) return;

    if (direction === 'prev') {
      const prevIdx = (currentIndex - 1 + filteredTemplates.length) % filteredTemplates.length;
      setPreviewTemplate(filteredTemplates[prevIdx]);
    } else {
      const nextIdx = (currentIndex + 1) % filteredTemplates.length;
      setPreviewTemplate(filteredTemplates[nextIdx]);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="template-modal-container" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="modal-header">
            <div>
              <div className="modal-badge"><Sparkles size={14} color="#1A73E8" /> KNORA TEMPLATE GALLERY</div>
              <h2>Choose a Resume Template</h2>
              <p>Select from 20 ATS-conscious professional templates. Data stays 100% intact when switching templates.</p>
            </div>
            <button className="btn-close-modal" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="gallery-toolbar">
            <div className="search-box">
              <Search size={16} color="#6B7280" />
              <input
                type="text"
                placeholder="Search templates (e.g. ATS, Tech, Modern...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-pills">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Resume Showcase Grid */}
          <div className="templates-grid">
            {filteredTemplates.map(template => {
              const isSelected = template.id === currentTemplateId;
              return (
                <div key={template.id} className={`visual-template-card ${isSelected ? 'selected' : ''}`}>
                  {template.badge && <span className="card-top-badge">{template.badge}</span>}
                  
                  {/* Full Visual Resume Card Thumbnail */}
                  <div className="card-preview-wrapper" onClick={() => setPreviewTemplate(template)}>
                    <MiniResumePreview templateId={template.id} scale={0.35} height="370px" />
                    <div className="hover-zoom-overlay">
                      <Eye size={18} /> Quick Zoom Preview
                    </div>
                  </div>

                  {/* Bottom Info & Action Bar */}
                  <div className="card-bottom-bar">
                    <div className="template-meta-info">
                      <span className="template-title">{template.name}</span>
                      {template.atsFriendly && (
                        <span className="ats-mini-tag">
                          <ShieldCheck size={12} color="#10B981" /> ATS Safe
                        </span>
                      )}
                    </div>

                    <button
                      className={`btn-use-this-tpl ${isSelected ? 'using' : ''}`}
                      onClick={() => {
                        onSelectTemplate(template.id);
                        onClose();
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check size={14} /> Currently Using
                        </>
                      ) : (
                        <>
                          <span>Use This Template</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TemplatePreviewModal
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        template={previewTemplate}
        allTemplates={filteredTemplates}
        onSelectTemplate={(tplId) => {
          onSelectTemplate(tplId);
          setPreviewTemplate(null);
          onClose();
        }}
        onNavigateTemplate={handleNavigatePreview}
      />
    </>
  );
};
