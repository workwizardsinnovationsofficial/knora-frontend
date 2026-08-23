import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, FileText, SearchCheck, Globe, Briefcase, Sparkles, Trophy, Play, Pause, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { carouselApi } from '../../services/carouselApi';
import AdminCarouselModal from './AdminCarouselModal';
import toast from 'react-hot-toast';
import './PromotionalCarousel.css';

// Map icon names from backend strings to Lucide Components
const ICON_MAP = {
  BookOpen,
  FileText,
  SearchCheck,
  Globe,
  Briefcase,
  Sparkles,
  Trophy
};

const DEFAULT_SLIDES = [
  {
    id: '1',
    title: '1,000+ Academic Videos & Notes',
    subtitle: 'Structured learning content for university engineering students across all B.Tech branches.',
    badge: 'ACADEMICS',
    ctaText: 'Explore Academics',
    targetPath: '/academics',
    isPublic: true,
    iconName: 'BookOpen',
    accentColor: '#1A73E8',
    bgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    order: 1,
    isActive: true
  },
  {
    id: '2',
    title: 'Build Your ATS-Friendly Resume',
    subtitle: 'Create a professional, recruiter-approved resume formatted for top tech companies.',
    badge: 'RESUME BUILDER',
    ctaText: 'Build Resume',
    targetPath: '/student-corner/resume/maker',
    isPublic: false,
    featureName: 'Resume Builder',
    iconName: 'FileText',
    accentColor: '#1A73E8',
    bgImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1400&q=80',
    order: 2,
    isActive: true
  },
  {
    id: '3',
    title: 'Check Your ATS Score with AI',
    subtitle: 'Compare your resume with real job descriptions to identify missing keywords and boost match score.',
    badge: 'ATS SCORE ANALYZER',
    ctaText: 'Check Resume',
    targetPath: '/student-corner/ats-checker',
    isPublic: false,
    featureName: 'ATS Resume Checker',
    iconName: 'SearchCheck',
    accentColor: '#0052cc',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    order: 3,
    isActive: true
  },
  {
    id: '4',
    title: 'Build Your Developer Portfolio with AI',
    subtitle: 'Publish your personalized developer portfolio site in less than 2 minutes.',
    badge: 'AI PORTFOLIO BUILDER',
    ctaText: 'Build Portfolio',
    targetPath: '/student-corner/portfolio',
    isPublic: false,
    featureName: 'Portfolio Builder',
    iconName: 'Globe',
    accentColor: '#2563eb',
    bgImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80',
    order: 4,
    isActive: true
  },
  {
    id: '5',
    title: 'Discover Top Jobs & Internships',
    subtitle: 'Find software engineering internships and fresher roles tailored to your B.Tech branch.',
    badge: 'CAREER MARKETPLACE',
    ctaText: 'Explore Jobs',
    targetPath: '/student-corner/jobs',
    isPublic: false,
    featureName: 'Job Portal',
    iconName: 'Briefcase',
    accentColor: '#1A73E8',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    order: 5,
    isActive: true
  },
  {
    id: '6',
    title: 'Meet Guru.AI — Your 24/7 AI Student Assistant',
    subtitle: 'Solve doubts, explain complex code, generate study notes, and prepare for interviews.',
    badge: 'GURU.AI TUTOR',
    ctaText: 'Try Guru.AI',
    targetPath: '/guru-ai',
    isPublic: false,
    featureName: 'Guru.AI Assistant',
    iconName: 'Sparkles',
    accentColor: '#1A73E8',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    order: 6,
    isActive: true
  },
  {
    id: '7',
    title: 'Discover Hackathons & Tech Events',
    subtitle: 'Find AI summits, coding competitions, developer conferences, and placement masterclasses.',
    badge: 'HACKATHONS & EVENTS',
    ctaText: 'Explore Events',
    targetPath: '/student-corner/events',
    isPublic: false,
    featureName: 'Hackathons & Events',
    iconName: 'Trophy',
    accentColor: '#0052cc',
    bgImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    order: 7,
    isActive: true
  }
];

const PromotionalCarousel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { openAuthModal } = useAuthModal();
  
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedHover, setIsPausedHover] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const timerRef = useRef(null);

  // Swipe / Drag gesture states
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [touchEndPos, setTouchEndPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);

  // Fetch dynamic slides from FastAPI backend
  const loadBackendSlides = async () => {
    try {
      const backendSlides = await carouselApi.getSlides();
      if (backendSlides && backendSlides.length > 0) {
        setSlides(backendSlides);
      }
    } catch (err) {
      console.log('Using fallback default carousel slides.');
    }
  };

  useEffect(() => {
    loadBackendSlides();
  }, []);

  // Auto-play sliding effect (Flipkart / Amazon style every 3.8s)
  useEffect(() => {
    if (!isPlaying || isPausedHover || slides.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPausedHover, slides.length]);

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch Swipe Handlers (2-Finger / Touchpad / Mobile Touch Swipe)
  const handleTouchStart = (e) => {
    setIsPausedHover(true);
    setTouchStartPos(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndPos(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPausedHover(false);
    if (!touchStartPos || !touchEndPos) return;
    const distance = touchStartPos - touchEndPos;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    setTouchStartPos(null);
    setTouchEndPos(null);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPausedHover(true);
    setDragStartPos(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPausedHover(false);
    if (dragStartPos === null) return;
    const distance = dragStartPos - e.clientX;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    setDragStartPos(null);
  };

  const handleCtaClick = (slide) => {
    if (slide.isPublic || slide.is_public || isAuthenticated) {
      navigate(slide.targetPath || slide.target_path);
    } else {
      toast.error(`Please sign in to access ${slide.featureName || slide.feature_name || 'this feature'}`);
      openAuthModal('signup');
    }
  };

  // Check if current user is Admin (Admin Settings button shows ONLY for authenticated Admins)
  const isAdmin = isAuthenticated && (user?.role === 'admin' || user?.is_admin || user?.email?.includes('admin'));

  return (
    <section 
      className="promo-carousel-section"
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => { setIsPausedHover(false); setIsDragging(false); }}
    >
      <div className="promo-carousel-container">
        
        {/* Viewport & Sliding Track Container */}
        <div 
          className="promo-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div 
            className="promo-carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, idx) => {
              const iconKey = slide.iconName || slide.icon_name || 'BookOpen';
              const IconComp = ICON_MAP[iconKey] || BookOpen;
              const accentColor = slide.accentColor || slide.accent_color || '#1A73E8';
              const ctaText = slide.ctaText || slide.cta_text || 'Explore';
              const bgImage = slide.bgImage || slide.bg_image || '';

              return (
                <div 
                  key={slide.id || slide._id || idx} 
                  className="promo-slide-card"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.75) 60%, rgba(15, 23, 42, 0.45) 100%), url(${bgImage})`
                  }}
                >
                  <div className="promo-slide-content">
                    <div 
                      className="promo-slide-badge" 
                      style={{ borderColor: accentColor, color: accentColor }}
                    >
                      <IconComp size={13} />
                      <span>{slide.badge}</span>
                    </div>

                    <h2 className="promo-slide-title">{slide.title}</h2>
                    <p className="promo-slide-subtitle">{slide.subtitle}</p>

                    <button 
                      className="promo-slide-btn"
                      style={{ background: accentColor }}
                      onClick={() => handleCtaClick(slide)}
                    >
                      <span>{ctaText}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="promo-slide-visual">
                    <div 
                      className="visual-icon-glow" 
                      style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
                    >
                      <IconComp size={64} color="#ffffff" opacity={0.95} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator Dots INSIDE the Banner Container */}
          <div className="carousel-dots-inside">
            {slides.map((slide, idx) => (
              <button
                key={slide.id || slide._id || idx}
                className={`dot-indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Controls Bar: Admin Settings (Only for Admins) */}
        {isAdmin && (
          <div className="carousel-toolbar">
            <div className="carousel-controls-group">
              <button 
                className="admin-carousel-trigger-btn"
                onClick={() => setIsAdminModalOpen(true)}
                title="Admin Carousel Controller"
              >
                <Settings size={14} />
                <span>Admin Settings</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Admin Controller Modal */}
      <AdminCarouselModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        slides={slides}
        onRefreshSlides={loadBackendSlides}
      />
    </section>
  );
};

export default PromotionalCarousel;
