import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

const initialResumeData = {
  personalInfo: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    github: 'github.com/rahulsharma',
    linkedin: 'linkedin.in/rahulsharma'
  },
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'JNTUH College of Engineering',
      year: '2022 - 2026',
      cgpa: '8.7 / 10'
    }
  ],
  skills: ['Data Structures', 'Python', 'React', 'Node.js', 'MongoDB', 'C++', 'Git'],
  projects: [
    {
      title: 'KNORA — Student Academic & Career Platform',
      description: 'Built a production FastAPI & React platform connecting academics, ATS resume tools, and AI tutors.',
      technologies: 'React, FastAPI, MongoDB, Tailwind CSS'
    }
  ]
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [atsScoreResult, setAtsScoreResult] = useState({ score: 90, matches: 88 });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, atsScoreResult, setAtsScoreResult }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
