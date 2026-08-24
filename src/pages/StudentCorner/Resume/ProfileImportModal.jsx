import React, { useState } from 'react';
import { useStudent } from '../../../context/StudentContext';
import { Download, User, GraduationCap, CheckSquare, Square, X } from 'lucide-react';
import toast from 'react-hot-toast';
import './ProfileImportModal.css';

export const ProfileImportModal = ({ isOpen, onClose, onImportData }) => {
  const { profileData } = useStudent();
  const [selectedFields, setSelectedFields] = useState({
    personalInfo: true,
    education: true,
    skills: true
  });

  if (!isOpen) return null;

  const personal = profileData.personalInfo || {};
  const academic = profileData.academicInfo || {};

  const handleToggle = (field) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleConfirmImport = () => {
    const importedData = {};

    if (selectedFields.personalInfo) {
      importedData.personalInfo = {
        firstName: personal.fullName ? personal.fullName.split(' ')[0] : '',
        lastName: personal.fullName ? personal.fullName.split(' ').slice(1).join(' ') : '',
        email: personal.email || '',
        phone: personal.phone || '',
        location: personal.location || ''
      };
    }

    if (selectedFields.education) {
      importedData.education = [
        {
          id: `edu-imported-${Date.now()}`,
          institution: academic.college || academic.university || 'JNTUH',
          degree: 'B.Tech',
          field: academic.branch || 'Computer Science & Engineering',
          location: 'Hyderabad',
          startDate: '2022',
          endDate: '2026',
          currentlyStudying: true
        }
      ];
    }

    if (selectedFields.skills) {
      importedData.skills = [
        { id: `sk-imp-1`, name: 'Data Structures', category: 'Core' },
        { id: `sk-imp-2`, name: 'Python', category: 'Programming' },
        { id: `sk-imp-3`, name: 'React', category: 'Frontend' },
        { id: `sk-imp-4`, name: 'MongoDB', category: 'Database' }
      ];
    }

    onImportData(importedData);
    toast.success('Profile details imported into resume!');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="import-modal-container">
        <div className="import-modal-header">
          <div>
            <h2>Import from Knora Student Profile</h2>
            <p>Select which profile sections to copy into your current resume draft.</p>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="import-sections-list">
          {/* Personal Info Box */}
          <div className={`import-option-card ${selectedFields.personalInfo ? 'selected' : ''}`} onClick={() => handleToggle('personalInfo')}>
            <div className="checkbox-wrap">
              {selectedFields.personalInfo ? <CheckSquare size={20} color="#1A73E8" /> : <Square size={20} color="#94A3B8" />}
            </div>
            <div className="option-info">
              <div className="option-title"><User size={16} /> Personal Information</div>
              <div className="option-preview">
                <strong>{personal.fullName || 'Rahul Sharma'}</strong> • {personal.email} • {personal.phone}
              </div>
            </div>
          </div>

          {/* Education Box */}
          <div className={`import-option-card ${selectedFields.education ? 'selected' : ''}`} onClick={() => handleToggle('education')}>
            <div className="checkbox-wrap">
              {selectedFields.education ? <CheckSquare size={20} color="#1A73E8" /> : <Square size={20} color="#94A3B8" />}
            </div>
            <div className="option-info">
              <div className="option-title"><GraduationCap size={16} /> Education & Academic Details</div>
              <div className="option-preview">
                B.Tech in {academic.branch || 'CSE'} — {academic.college || 'JNTUH College of Engineering'}
              </div>
            </div>
          </div>

          {/* Core Skills Box */}
          <div className={`import-option-card ${selectedFields.skills ? 'selected' : ''}`} onClick={() => handleToggle('skills')}>
            <div className="checkbox-wrap">
              {selectedFields.skills ? <CheckSquare size={20} color="#1A73E8" /> : <Square size={20} color="#94A3B8" />}
            </div>
            <div className="option-info">
              <div className="option-title">Core Skills</div>
              <div className="option-preview">
                Data Structures • Python • React • MongoDB
              </div>
            </div>
          </div>
        </div>

        <div className="import-modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm-import" onClick={handleConfirmImport}>
            <Download size={16} /> Import Selected Fields
          </button>
        </div>
      </div>
    </div>
  );
};
