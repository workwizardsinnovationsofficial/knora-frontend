import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { resumeApi } from '../services/resumeApi';
import toast from 'react-hot-toast';

const ResumeContext = createContext();

const defaultResumeState = {
  id: null,
  title: 'Software Developer Resume',
  template_id: 'knora-modern',
  personalInfo: {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/rahulsharma',
    github: 'github.com/rahulsharma',
    portfolio: 'rahulsharma.dev'
  },
  summary: 'Motivated B.Tech Computer Science student with expertise in full-stack web development, Python, React, and FastAPI. Experienced in designing scalable REST APIs and building modern web applications.',
  education: [
    {
      id: 'edu-1',
      institution: 'JNTUH College of Engineering',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      location: 'Hyderabad',
      startDate: '2022',
      endDate: '2026',
      currentlyStudying: true,
      grade: '8.7 / 10'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Solutions',
      position: 'Software Engineering Intern',
      location: 'Hyderabad',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      currentlyWorking: false,
      description: 'Engineered responsive frontend interfaces and optimized backend API response time by 35%.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'KNORA — Student Academic & Career Platform',
      role: 'Full Stack Developer',
      description: 'Built a production FastAPI & React platform connecting academics, ATS resume tools, and AI tutors.',
      technologies: 'React, FastAPI, MongoDB, Cloudflare R2'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Python', category: 'Backend' },
    { id: 'sk-2', name: 'React', category: 'Frontend' },
    { id: 'sk-3', name: 'FastAPI', category: 'Backend' },
    { id: 'sk-4', name: 'MongoDB', category: 'Database' },
    { id: 'sk-5', name: 'Git & GitHub', category: 'Tools' },
    { id: 'sk-6', name: 'Cloudflare R2', category: 'Cloud' }
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: '2025' }
  ],
  achievements: [
    { id: 'ach-1', title: '1st Place — National Student Hackathon 2025', organization: 'JNTUH' }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Telugu', proficiency: 'Native' }
  ],
  custom_sections: [],
  formatting: {
    templateId: 'knora-modern',
    font: 'Inter',
    fontSize: 'normal',
    headingSize: 'normal',
    lineHeight: 'normal',
    margin: 'normal',
    sectionSpacing: 'normal',
    accentColor: '#1A73E8',
    paperSize: 'A4'
  },
  ats_score: 88,
  completion_score: 92
};

export const ResumeProvider = ({ children }) => {
  const [resumesList, setResumesList] = useState([]);
  
  // Load local draft from localStorage if available
  const [activeResume, setActiveResume] = useState(() => {
    try {
      const saved = localStorage.getItem('knora_resume_draft');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { ...defaultResumeState, id: `local-${Date.now()}` };
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'offline', 'error'
  const [atsScoreResult, setAtsScoreResult] = useState({ overallScore: 88, completeness: 92, warnings: [], passed: [] });
  const [loading, setLoading] = useState(false);

  const autosaveTimerRef = useRef(null);

  // Fetch list of resumes from backend
  const refreshResumesList = useCallback(async () => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) {
      setResumesList([]);
      return [];
    }
    try {
      const data = await resumeApi.listResumes();
      setResumesList(data);
      if (data && data.length > 0 && (!activeResume.id || activeResume.id.startsWith('local-'))) {
        const fullDoc = {
          ...defaultResumeState,
          ...data[0],
          personalInfo: data[0].personal_info || defaultResumeState.personalInfo,
          formatting: data[0].formatting || defaultResumeState.formatting
        };
        setActiveResume(fullDoc);
      }
      return data;
    } catch (err) {
      return [];
    }
  }, [activeResume.id]);

  useEffect(() => {
    refreshResumesList();
  }, [refreshResumesList]);

  // Always save backup copy to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('knora_resume_draft', JSON.stringify(activeResume));
    } catch (e) {}
  }, [activeResume]);

  // Save resume to backend (debounced)
  const saveResumeToBackend = useCallback(async (updatedResume) => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) {
      setSaveStatus('offline');
      return;
    }

    setSaveStatus('saving');
    try {
      const payload = {
        title: updatedResume.title,
        template_id: updatedResume.formatting?.templateId || updatedResume.template_id,
        personal_info: updatedResume.personalInfo,
        summary: updatedResume.summary,
        education: updatedResume.education,
        experience: updatedResume.experience,
        projects: updatedResume.projects,
        skills: updatedResume.skills,
        certifications: updatedResume.certifications,
        achievements: updatedResume.achievements,
        languages: updatedResume.languages,
        custom_sections: updatedResume.custom_sections,
        formatting: updatedResume.formatting
      };
      
      const res = await resumeApi.updateResume(updatedResume.id, payload);
      setSaveStatus('saved');
      if (res && res._id) {
        setActiveResume(prev => ({
          ...prev,
          id: res._id || res.id,
          ats_score: res.ats_score || prev.ats_score,
          completion_score: res.completion_score || prev.completion_score
        }));
      }
    } catch (err) {
      if (err.message === 'UNAUTHENTICATED') {
        setSaveStatus('offline');
      } else {
        console.error('Autosave failed:', err);
        setSaveStatus('error');
      }
    }
  }, []);

  // Set active resume data and trigger autosave
  const setResumeData = (updater) => {
    setActiveResume(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      
      // Debounced autosave (800ms)
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = setTimeout(() => {
        saveResumeToBackend(next);
      }, 800);
      
      return next;
    });
  };

  // Create a new resume
  const createNewResume = async (title = 'New Professional Resume', templateId = 'knora-modern') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('knora_access_token');
      if (!token) throw new Error('UNAUTHENTICATED');

      const newDoc = await resumeApi.createResume(title, templateId);
      const fullDoc = {
        ...defaultResumeState,
        ...newDoc,
        id: newDoc._id || newDoc.id,
        personalInfo: newDoc.personal_info || defaultResumeState.personalInfo,
        formatting: { ...defaultResumeState.formatting, templateId }
      };
      setActiveResume(fullDoc);
      await refreshResumesList();
      toast.success('New resume created!');
      return fullDoc;
    } catch (err) {
      if (err.message === 'UNAUTHENTICATED') {
        toast('Working in local draft mode. Sign in to save to your cloud account.', { icon: 'ℹ️' });
      } else {
        toast.error(err.message || 'Failed to create resume on cloud');
      }
      const localDoc = { ...defaultResumeState, id: `local-${Date.now()}`, title };
      setActiveResume(localDoc);
      return localDoc;
    } finally {
      setLoading(false);
    }
  };

  // Load a resume by ID
  const loadResume = async (id) => {
    setLoading(true);
    try {
      if (!id || id.startsWith('local-')) return activeResume;

      const fetched = await resumeApi.getResume(id);
      const fullDoc = {
        ...defaultResumeState,
        ...fetched,
        id: fetched._id || fetched.id,
        personalInfo: fetched.personal_info || defaultResumeState.personalInfo,
        formatting: fetched.formatting || defaultResumeState.formatting
      };
      setActiveResume(fullDoc);
      return fullDoc;
    } catch (err) {
      toast.error('Could not load cloud resume details');
    } finally {
      setLoading(false);
    }
  };

  // Delete resume
  const deleteResume = async (id) => {
    try {
      await resumeApi.deleteResume(id);
      toast.success('Resume deleted');
      await refreshResumesList();
    } catch (err) {
      toast.error(err.message || 'Failed to delete resume');
    }
  };

  // Duplicate resume
  const duplicateResume = async (id) => {
    try {
      const dup = await resumeApi.duplicateResume(id);
      toast.success('Resume duplicated');
      await refreshResumesList();
      return dup;
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate resume');
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData: activeResume,
        setResumeData,
        activeResume,
        resumesList,
        saveStatus,
        setSaveStatus,
        loading,
        atsScoreResult,
        setAtsScoreResult,
        refreshResumesList,
        createNewResume,
        loadResume,
        deleteResume,
        duplicateResume,
        saveResumeToBackend
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
