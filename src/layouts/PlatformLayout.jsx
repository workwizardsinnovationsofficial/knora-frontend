import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PlatformLayout = () => {
  const location = useLocation();

  // Hide footer on Topic Learning page as requested by user
  const isTopicLearningPage = location.pathname.includes('/topic/');

  return (
    <div className="platform-layout-wrapper">
      <Navbar />
      <main className="platform-main-content">
        <Outlet />
      </main>
      {!isTopicLearningPage && <Footer />}
    </div>
  );
};

export default PlatformLayout;
