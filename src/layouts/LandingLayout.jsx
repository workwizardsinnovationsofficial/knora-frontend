import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const LandingLayout = () => {
  return (
    <div className="landing-layout-wrapper">
      <Navbar />
      <main className="landing-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
