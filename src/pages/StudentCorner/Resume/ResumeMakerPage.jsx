import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResume } from '../../../context/ResumeContext';
import { ResumeDashboard } from './ResumeDashboard';
import ResumeMaker from './ResumeMaker';
import { TemplateGalleryPage } from './TemplateGalleryPage';

const ResumeMakerPage = () => {
  const { createNewResume, setResumeData } = useResume();
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('view') === 'editor' || searchParams.get('edit') === 'true' ? 'editor' : 'dashboard';
  const [view, setView] = useState(initialView); // 'dashboard' | 'templates' | 'editor'
  const [previousView, setPreviousView] = useState('dashboard');


  const handleOpenTemplateGallery = () => {
    setPreviousView(view);
    setView('templates');
  };

  const handleOpenEditorFromDash = () => {
    setPreviousView('dashboard');
    setView('editor');
  };

  const handleSelectTemplateAndCreate = async (templateId) => {
    await createNewResume('Software Developer Resume', templateId);
    setPreviousView('templates');
    setView('editor');
  };

  const handleBack = () => {
    setView(previousView || 'dashboard');
  };

  return (
    <div className="resume-maker-page-wrapper">
      {view === 'dashboard' && (
        <ResumeDashboard
          onOpenEditor={handleOpenEditorFromDash}
          onOpenTemplateGallery={handleOpenTemplateGallery}
        />
      )}

      {view === 'templates' && (
        <TemplateGalleryPage
          onBack={() => setView('dashboard')}
          onSelectTemplate={handleSelectTemplateAndCreate}
          currentTemplateId="knora-modern"
        />
      )}

      {view === 'editor' && (
        <ResumeMaker
          onBackToDashboard={handleBack}
          onChangeTemplateClick={() => {
            setPreviousView('editor');
            setView('templates');
          }}
        />
      )}
    </div>
  );
};

export default ResumeMakerPage;
