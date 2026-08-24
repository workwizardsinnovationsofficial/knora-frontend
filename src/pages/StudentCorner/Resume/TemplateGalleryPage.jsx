import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../../../data/resumeTemplates';
import { MiniResumePreview } from '../../../components/Resume/MiniResumePreview';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { Sparkles, Check, Search, ShieldCheck, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import './TemplateGalleryPage.css';

export const TemplateGalleryPage = ({ onBack, onSelectTemplate, currentTemplateId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

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
    <div className="template-gallery-page-container">
      {/* Top Banner & Navigation */}
      <div className="tpl-page-header">
        <div className="header-top-row">
          {onBack && (
            <button className="btn-back-dash" onClick={onBack}>
              <ArrowLeft size={18} />
              <span>Back to My Resumes</span>
            </button>
          )}
          <div className="page-badge-pill">
            <Sparkles size={14} color="#1A73E8" /> KNORA TEMPLATE GALLERY
          </div>
        </div>

        <h1 className="page-hero-title">Choose a Resume Template</h1>
        <p className="page-hero-subtext">
          Select from 20 ATS-conscious professional templates. Your resume data stays 100% intact when switching templates.
        </p>

        {/* Toolbar & Filters */}
        <div className="page-gallery-toolbar">
          <div className="page-search-box">
            <Search size={18} color="#64748B" />
            <input
              type="text"
              placeholder="Search templates (e.g. ATS, Tech, Modern...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="page-category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`p-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Resume Templates Grid */}
      <div className="tpl-page-grid-container">
        <div className="tpl-page-grid">
          {filteredTemplates.map(template => {
            const isSelected = template.id === currentTemplateId;
            return (
              <div key={template.id} className={`tpl-page-card ${isSelected ? 'selected' : ''}`}>
                {template.badge && <span className="tpl-top-badge">{template.badge}</span>}

                {/* Thumbnail Preview Box */}
                <div className="tpl-card-preview-box" onClick={() => setPreviewTemplate(template)}>
                  <MiniResumePreview templateId={template.id} scale={0.35} height="380px" />
                  <div className="hover-zoom-overlay">
                    <Eye size={20} /> Quick Zoom Preview
                  </div>
                </div>

                {/* Card Meta & Use Template Button */}
                <div className="tpl-card-footer">
                  <div className="tpl-title-row">
                    <h3 className="tpl-name">{template.name}</h3>
                    {template.atsFriendly && (
                      <span className="ats-safe-badge">
                        <ShieldCheck size={13} color="#10B981" /> ATS Safe
                      </span>
                    )}
                  </div>

                  <p className="tpl-desc-text">{template.description}</p>

                  <button
                    className={`btn-use-template-page ${isSelected ? 'active' : ''}`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} /> Currently Using
                      </>
                    ) : (
                      <>
                        <span>Use This Template</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
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
        }}
        onNavigateTemplate={handleNavigatePreview}
      />
    </div>
  );
};
