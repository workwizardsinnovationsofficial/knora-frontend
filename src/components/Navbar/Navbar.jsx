import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Sparkles, User, LogOut, Menu, X, ArrowRight, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, handleLogout } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const handleProtectedClick = (path, name) => {
    setMobileDrawerOpen(false);
    setProfileDropdownOpen(false);
    if (isAuthenticated) {
      navigate(path);
    } else {
      toast.error(`Please sign in to access ${name}`);
      openAuthModal('login');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/academics?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userAvatarSrc = user?.profile_image || user?.google?.picture;

  return (
    <header className="knora-navbar">
      <div className="knora-navbar-container">
        {/* Left Section: Brand Logo & Search Bar */}
        <div className="knora-nav-left">
          <Link to="/" className="knora-brand-logo" onClick={() => setMobileDrawerOpen(false)}>
            <div className="brand-badge-box">
              <GraduationCap size={22} color="#ffffff" />
            </div>
            <span className="brand-title-text">
              KNORA<span className="brand-dot">.in</span>
            </span>
          </Link>

          {/* Coursera-Style Search Bar on Left */}
          <form className="knora-header-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="knora-header-search-input"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="knora-header-search-btn" aria-label="Search">
              <Search size={16} color="#ffffff" />
            </button>
          </form>
        </div>

        {/* Right Section: Inline Nav Links + Round Profile Avatar */}
        <div className="knora-nav-right">
          {/* Desktop Nav Links */}
          <nav className="knora-nav-links">
            <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>

            <Link to="/academics" className={`nav-link ${isActive('/academics') ? 'active' : ''}`}>
              Academics
            </Link>

            <button
              type="button"
              className={`nav-link btn-nav ${isActive('/skills') ? 'active' : ''}`}
              onClick={() => handleProtectedClick('/skills', 'Skills')}
            >
              Skills
            </button>

            <button
              type="button"
              className={`nav-link btn-nav ${isActive('/student-corner') ? 'active' : ''}`}
              onClick={() => handleProtectedClick('/student-corner', 'Student Corner')}
            >
              Student Corner
            </button>

            {/* Ultra-Premium AI Badge Guru.AI */}
            <button
              type="button"
              className={`guru-ai-pill-badge ${isActive('/guru-ai') ? 'active' : ''}`}
              onClick={() => handleProtectedClick('/guru-ai', 'Guru.AI')}
            >
              <Sparkles size={15} className="guru-ai-sparkle-icon" />
              <span>Guru.AI</span>
            </button>
          </nav>

          {isAuthenticated ? (
            <div className="user-profile-menu-wrapper" ref={dropdownRef}>
              <button
                className="user-avatar-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="User profile menu"
                title={user?.full_name || user?.email || 'Profile'}
              >
                <div className="user-avatar-inner">
                  {userAvatarSrc ? (
                    <img src={userAvatarSrc} alt={user?.full_name || 'User'} className="round-avatar-img" />
                  ) : (
                    <span className="round-avatar-initials">
                      {getInitials(user?.full_name || user?.name || user?.email)}
                    </span>
                  )}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="user-profile-dropdown">
                  <div className="dropdown-user-header">
                    <p className="dropdown-user-name">{user?.full_name || user?.name || 'Student Account'}</p>
                    <p className="dropdown-user-email">{user?.email}</p>
                  </div>

                  <button
                    className="dropdown-item-btn"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/profile');
                    }}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </button>

                  <button
                    className="dropdown-item-btn"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/student-corner');
                    }}
                  >
                    <GraduationCap size={16} />
                    <span>Student Corner</span>
                  </button>

                  <button
                    className="dropdown-item-btn logout-item"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <button className="btn-knora-login" onClick={() => openAuthModal('login')}>
                Log In
              </button>

              <button className="btn-knora-getstarted" onClick={() => openAuthModal('signup')}>
                <span>Join for Free</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            aria-label="Open Navigation Menu"
          >
            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="brand-badge-box small">
                <GraduationCap size={18} color="#ffffff" />
              </div>
              <span className="brand-title-text">KNORA</span>
              <button className="drawer-close-btn" onClick={() => setMobileDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <form className="mobile-search-form" onSubmit={(e) => { handleSearchSubmit(e); setMobileDrawerOpen(false); }}>
              <input
                type="text"
                className="mobile-search-input"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="mobile-search-btn">
                <Search size={16} color="#ffffff" />
              </button>
            </form>

            <nav className="mobile-menu-list">
              <Link to="/" onClick={() => setMobileDrawerOpen(false)} className={`mobile-item ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/academics" onClick={() => setMobileDrawerOpen(false)} className={`mobile-item ${isActive('/academics') ? 'active' : ''}`}>
                Academics & Syllabus
              </Link>
              <button onClick={() => handleProtectedClick('/skills', 'Skills')} className="mobile-item">
                Skills & Courses
              </button>
              <button onClick={() => handleProtectedClick('/student-corner', 'Student Corner')} className="mobile-item">
                Student Corner
              </button>
              <button onClick={() => handleProtectedClick('/guru-ai', 'Guru.AI')} className="mobile-item ai-item">
                ✨ Guru.AI
              </button>
              <button onClick={() => handleProtectedClick('/profile', 'Profile')} className="mobile-item">
                My Profile
              </button>

              <div className="mobile-auth-section">
                {!isAuthenticated ? (
                  <>
                    <button className="btn-knora-login full" onClick={() => { setMobileDrawerOpen(false); openAuthModal('login'); }}>
                      Log In
                    </button>
                    <button className="btn-knora-getstarted full" onClick={() => { setMobileDrawerOpen(false); openAuthModal('signup'); }}>
                      Join for Free
                    </button>
                  </>
                ) : (
                  <button className="btn-knora-logout full" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
