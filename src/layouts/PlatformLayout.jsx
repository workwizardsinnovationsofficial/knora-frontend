import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PlatformLayout = () => {
  const location = useLocation();

  // Hide footer on Topic Learning page and Resume pages as requested by user
  const hideFooter = location.pathname.includes('/topic/') || location.pathname.includes('/student-corner/resume');

  return (
    <div className="platform-layout-wrapper">
      <Navbar />
      <main className="platform-main-content">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PlatformLayout;
