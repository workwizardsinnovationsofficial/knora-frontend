import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Share2, Code, Video } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="knora-footer-black">
      <div className="footer-container">
        {/* Main Columns Grid */}
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="brand-badge-box">
                <GraduationCap size={22} color="#ffffff" />
              </div>
              <span className="footer-logo-title">KNORA<span className="brand-dot">.in</span></span>
            </Link>
            <p className="footer-tagline">
              Learn. Build. Grow. Get Hired.
            </p>
            <p className="footer-desc">
              The official student platform connecting academics, skill development, AI career tools, projects, internships, and job opportunities across India.
            </p>
            <div className="footer-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Globe size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Share2 size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Video size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Code size={18} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/student-corner">Student Corner</Link></li>
              <li><Link to="/guru-ai">Guru.AI</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>

          {/* Student Corner Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Student Corner</h4>
            <ul>
              <li><Link to="/student-corner/resume/maker">Resume Maker</Link></li>
              <li><Link to="/student-corner/ats-checker">ATS Checker</Link></li>
              <li><Link to="/student-corner/portfolio">Portfolio Builder</Link></li>
              <li><Link to="/student-corner/jobs">Jobs</Link></li>
              <li><Link to="/student-corner/internships">Internships</Link></li>
              <li><Link to="/student-corner/hackathons">Hackathons</Link></li>
              <li><Link to="/student-corner/events">Events</Link></li>
            </ul>
          </div>

          {/* Company / Resources Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Resources</h4>
            <ul>
              <li><a href="#about">About KNORA</a></li>
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#faq">FAQ & Help</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 KNORA. All rights reserved.</p>
          <p className="built-tag">Official Student Education & Career Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
