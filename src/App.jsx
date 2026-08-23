import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { StudentProvider } from './context/StudentContext';

// Layouts
import LandingLayout from './layouts/LandingLayout';
import PlatformLayout from './layouts/PlatformLayout';

// Home, Login, Signup & Google Callback Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import GoogleCallback from './pages/Auth/GoogleCallback';

// Main Platform Pages
import Academics from './pages/Academics/Academics';
import SubjectDetails from './pages/Academics/SubjectDetails';
import TopicLearning from './pages/Academics/TopicLearning';
import PreviousPapers from './pages/Academics/PreviousPapers';
import ImportantQuestions from './pages/Academics/ImportantQuestions';

// Student Corner Suite Pages
import StudentCorner from './pages/StudentCorner/StudentCorner';
import ResumeMaker from './pages/StudentCorner/Resume/ResumeMaker';
import ATSChecker from './pages/StudentCorner/Resume/ATSChecker';
import Portfolio from './pages/StudentCorner/Portfolio/Portfolio';
import JobPortal from './pages/StudentCorner/JobPortal/JobPortal';

// Skills, Guru AI, Profile & 404 Pages
import Skills from './pages/Skills/Skills';
import GuruAI from './pages/GuruAI/GuruAI';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

import { AuthModalProvider } from './context/AuthModalContext';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AuthModalProvider>
            <ResumeProvider>
              <StudentProvider>
                <div className="knora-app-container">
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3500,
                      style: {
                        background: 'var(--bg-secondary, #111111)',
                        color: 'var(--text-primary, #ffffff)',
                        border: '1px solid var(--border-primary, rgba(255,255,255,0.1))',
                        borderRadius: '12px',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem'
                      }
                    }}
                  />

                  <Routes>
                    {/* LANDING LAYOUT */}
                    <Route element={<LandingLayout />}>
                      <Route path="/" element={<Home />} />
                    </Route>

                    {/* STANDALONE AUTH ROUTES (NO NAVBAR / FOOTER) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Google OAuth Callback Handler */}
                    <Route path="/auth/google/success" element={<GoogleCallback />} />

                    {/* MAIN PLATFORM LAYOUT */}
                    <Route element={<PlatformLayout />}>
                      <Route path="/academics" element={<Academics />} />
                      <Route path="/academics/subjects" element={<Academics />} />
                      <Route path="/academics/subject/:subjectId" element={<SubjectDetails />} />
                      <Route path="/academics/subject/:subjectId/previous-papers" element={<PreviousPapers />} />
                      <Route path="/academics/subject/:subjectId/important-questions" element={<ImportantQuestions />} />
                      <Route path="/academics/subject/:subjectId/unit/:unitId/topic/:topicId" element={<TopicLearning />} />
                      <Route path="/playlist/:subject/:id" element={<TopicLearning />} />

                      {/* Student Corner Suite Routes */}
                      <Route path="/student-corner" element={<StudentCorner />} />
                      <Route path="/student-corner/resume" element={<ResumeMaker />} />
                      <Route path="/student-corner/resume/maker" element={<ResumeMaker />} />
                      <Route path="/student-corner/ats-checker" element={<ATSChecker />} />
                      <Route path="/student-corner/portfolio" element={<Portfolio />} />
                      <Route path="/student-corner/jobs" element={<JobPortal />} />
                      <Route path="/student-corner/internships" element={<JobPortal />} />
                      <Route path="/student-corner/hackathons" element={<JobPortal />} />
                      <Route path="/student-corner/events" element={<JobPortal />} />

                      {/* Skills, Guru.AI & Profile Routes */}
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/guru-ai" element={<GuruAI />} />
                      <Route path="/profile" element={<Profile />} />

                      {/* Fallback 404 Page */}
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </div>
              </StudentProvider>
            </ResumeProvider>
          </AuthModalProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
