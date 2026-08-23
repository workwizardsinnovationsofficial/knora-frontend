import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

const initialProfileData = {
  personalInfo: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, Telangana',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    role: 'B.Tech Student (CSE)'
  },
  academicInfo: {
    university: 'JNTUH',
    college: 'JNTUH College of Engineering, Hyderabad',
    branch: 'Computer Science & Engineering (CSE)',
    year: '4th Year',
    semester: '1st Semester',
    regulation: 'R22'
  }
};

export const StudentProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('knora_student_profile');
    return saved ? JSON.parse(saved) : initialProfileData;
  });

  const [skillsProgressMap, setSkillsProgressMap] = useState({
    'prog-dsa': { progress: 75, completedModules: 18 },
    'web-fullstack': { progress: 80, completedModules: 24 },
    'ai-genai': { progress: 40, completedModules: 7 }
  });

  const updateProfile = (personal, academic) => {
    setProfileData(prev => {
      const updated = {
        personalInfo: { ...prev.personalInfo, ...personal },
        academicInfo: { ...prev.academicInfo, ...academic }
      };
      localStorage.setItem('knora_student_profile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StudentContext.Provider value={{ profileData, updateProfile, skillsProgressMap, setSkillsProgressMap }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
