import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PlatformLayout = () => {
  return (
    <div className="platform-layout-wrapper">
      <Navbar />
      <main className="platform-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PlatformLayout;
