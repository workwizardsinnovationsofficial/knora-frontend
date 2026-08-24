import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { MiniResumePreview } from '../../../components/Resume/MiniResumePreview';
import './TemplatePreviewModal.css';

export const TemplatePreviewModal = ({
  isOpen,
  onClose,
  template,
  onSelectTemplate
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !template) return null;

  return (
    <div className="clean-preview-backdrop" onClick={onClose}>
      <div className="clean-preview-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="clean-preview-header">
          <h3 className="clean-preview-title">{template.name}</h3>
          <button className="clean-btn-close" onClick={onClose} title="Close Preview">
            <X size={20} />
          </button>
        </div>

        {/* Pure Resume Template Overview Container */}
        <div className="clean-preview-body">
          <div className="clean-paper-wrapper">
            <MiniResumePreview templateId={template.id} scale={0.72} height="810px" />
          </div>
        </div>

        {/* Footer: ONLY Close & Use This Template Buttons */}
        <div className="clean-preview-footer">
          <button className="btn-clean-close" onClick={onClose}>
            Close
          </button>
          <button
            className="btn-clean-use"
            onClick={() => {
              onSelectTemplate(template.id);
              onClose();
            }}
          >
            <span>Use This Template</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
