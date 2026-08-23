import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { academicSubjects } from '../../mock/academics';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  X, 
  PlayCircle, 
  Sparkles, 
  FileCheck, 
  Target, 
  HelpCircle, 
  ChevronUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import './TopicLearning.css';

const DEFAULT_R2_PDF_URL = 'https://pub-0c055114eb164ec7a79e688c66abb160.r2.dev/jntuk-r23/subjects-syllabus/ENGINEERING%20GRAPHICS%20SYLLABUS.pdf';
const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/watch?v=mKlAfGNnF5o&list=RD19QqXTmH0HM&index=6';

// Converts any YouTube watch URL into embed URL
const formatYouTubeEmbedUrl = (url) => {
  if (!url) return 'https://www.youtube.com/embed/mKlAfGNnF5o';
  if (url.includes('youtube.com/embed/')) return url;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return 'https://www.youtube.com/embed/mKlAfGNnF5o';
};

const TopicLearning = () => {
  const navigate = useNavigate();
  const { subjectId, unitId, topicId } = useParams();
  const chatMessagesEndRef = useRef(null);

  // Find subject or default to Engineering Physics
  const currentSubject = academicSubjects.find(s => s.id === subjectId) || academicSubjects[0];
  
  const currentUnitNum = parseInt(unitId, 10) || 1;
  const currentUnit = currentSubject.units?.find(u => u.unitNumber === currentUnitNum) || currentSubject.units[0];

  const topicsList = currentUnit.topics || [
    'Interference: Introduction',
    'Principle of Superposition',
    'Interference of Light',
    'Interference in Thin Films (Reflection Geometry) & Applications',
    'Colours in Thin Films',
    'Newton\'s Rings – Determination of Wavelength & Refractive Index',
    'Diffraction: Introduction',
    'Fresnel Diffraction',
    'Fraunhofer Diffraction'
  ];

  const initialTopicIdx = Math.max(0, Math.min((parseInt(topicId, 10) || 1) - 1, topicsList.length - 1));
  const [activeTopicIdx, setActiveTopicIdx] = useState(initialTopicIdx);
  const [showFullNotesModal, setShowFullNotesModal] = useState(false);

  // Dynamic Chat & Focus States
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isAiReplying, setIsAiReplying] = useState(false);

  const activeTopicTitle = topicsList[activeTopicIdx];
  const activePdfUrl = currentSubject.pdfUrl || DEFAULT_R2_PDF_URL;
  const rawVideoUrl = currentSubject.videoUrl || DEFAULT_YOUTUBE_URL;
  const activeVideoEmbed = formatYouTubeEmbedUrl(rawVideoUrl);

  // Auto-scroll chat feed
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiReplying]);

  // When user clicks on the video player iframe (window blur event), automatically restore normal frame size!
  useEffect(() => {
    const handleWindowBlur = () => {
      setIsChatFocused(false);
    };
    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, []);

  const handleSelectTopic = (idx) => {
    setActiveTopicIdx(idx);
    setChatMessages([]);
    setIsChatFocused(false);
    navigate(`/academics/subject/${currentSubject.id}/unit/${currentUnitNum}/topic/${idx + 1}`, { replace: true });
  };

  const handleNextTopic = () => {
    setIsChatFocused(false);
    if (activeTopicIdx < topicsList.length - 1) {
      handleSelectTopic(activeTopicIdx + 1);
    }
  };

  const handlePrevTopic = () => {
    setIsChatFocused(false);
    if (activeTopicIdx > 0) {
      handleSelectTopic(activeTopicIdx - 1);
    }
  };

  const handleDownloadNotes = () => {
    toast.success(`Opening PDF for ${activeTopicTitle}...`);
    window.open(activePdfUrl, '_blank');
  };

  // AI Chat Submission
  const submitUserMessage = (userText) => {
    if (!userText.trim()) return;

    setIsChatFocused(true);
    const newMsg = { sender: 'user', text: userText };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setIsAiReplying(true);

    setTimeout(() => {
      let aiText = '';
      const lower = userText.toLowerCase();

      if (lower.includes('explain') || lower.includes('simple')) {
        aiText = `Here is a simple explanation of **${activeTopicTitle}**:\n\nWhen two light waves of the same frequency meet in a medium, their amplitudes combine to create bright and dark regions (constructive & destructive interference). This forms the core of wave optics!`;
      } else if (lower.includes('summary')) {
        aiText = `**Quick Summary for ${activeTopicTitle}**:\n• Superposition of coherent light waves.\n• Constructive Interference: Path diff Δ = nλ (Bright fringes).\n• Destructive Interference: Path diff Δ = (2n+1)λ/2 (Dark fringes).`;
      } else if (lower.includes('exam') || lower.includes('important')) {
        aiText = `🎯 **Key University Exam Points**:\n1. State Brewster's & Snell's Law.\n2. Derive path difference equation 2μt cos(r) = nλ.\n3. Newton's rings diameter derivation (7 Marks question).`;
      } else if (lower.includes('practice') || lower.includes('question')) {
        aiText = `❓ **Practice Questions for ${activeTopicTitle}**:\n1. Why are Newton's rings circular in shape? [2M]\n2. A thin film of thickness 4x10^-5 cm is illuminated by white light. Calculate visible wavelengths reflected. [5M]`;
      } else {
        aiText = `Regarding **${activeTopicTitle}** in ${currentSubject.name}:\n\n${userText} relates to the wave superposition principle and boundary condition derivations. Refer to Section 2 of your Units PDF for step-by-step mathematical proofs!`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsAiReplying(false);
    }, 800);
  };

  const handlePromptClick = (promptText) => {
    submitUserMessage(promptText);
  };

  return (
    <div className="topic-learning-wrapper-compact">
      {/* 1. PERMANENTLY FIXED TOP NAVIGATION BAR (Only Subject Name) */}
      <div className="compact-learning-topbar">
        <div className="topbar-left-group">
          <button 
            className="btn-back-learning-compact"
            onClick={() => navigate(`/academics/subject/${currentSubject.id}`)}
          >
            <ChevronLeft size={15} />
            <span>Back to Units</span>
          </button>
          <div className="subject-unit-breadcrumbs">
            <span className="crumb-subject">{currentSubject.name}</span>
          </div>
        </div>

        <div className="active-topic-inline-title">
          <PlayCircle size={15} color="#007DFF" />
          <span>Topic {activeTopicIdx + 1}: <strong>{activeTopicTitle}</strong></span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className={`learning-main-container-compact ${isChatFocused ? 'chat-expanded-mode' : ''}`}>
        {/* 2. PERMANENTLY FIXED LEFT SIDEBAR (Topics List) */}
        <div className="topics-sidebar-card-compact">
          <div className="sidebar-topics-scroll">
            {topicsList.map((topic, idx) => {
              const isActive = idx === activeTopicIdx;
              return (
                <div
                  key={idx}
                  className={`sidebar-topic-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectTopic(idx)}
                >
                  <span className="topic-number-circle">{idx + 1}</span>
                  <span className="topic-name-text">{topic}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CENTER COLUMN: VIDEO & PDF */}
        <div 
          className="viewport-center-column-compact"
          onClick={() => setIsChatFocused(false)}
        >
          {/* SECTION 2: YouTube Video Viewport */}
          <div 
            className="video-section-block-compact"
            onClick={() => setIsChatFocused(false)}
            onMouseEnter={() => {
              if (document.activeElement !== document.querySelector('.chat-text-input')) {
                setIsChatFocused(false);
              }
            }}
          >
            <div 
              className="perfect-video-aspect-box"
              onClick={() => setIsChatFocused(false)}
            >
              <iframe
                key={activeVideoEmbed + activeTopicIdx}
                src={activeVideoEmbed}
                title={activeTopicTitle}
                className="youtube-video-iframe-perfect"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Controls Bar */}
            <div className="video-nav-controls-compact" onClick={() => setIsChatFocused(false)}>
              <button 
                className="btn-topic-nav" 
                onClick={handlePrevTopic}
                disabled={activeTopicIdx === 0}
              >
                <ChevronLeft size={15} />
                <span>Previous Topic</span>
              </button>

              <div className="video-counter-info">
                <span>Watching Topic {activeTopicIdx + 1} of {topicsList.length}</span>
              </div>

              <button 
                className="btn-topic-nav primary" 
                onClick={handleNextTopic}
                disabled={activeTopicIdx === topicsList.length - 1}
              >
                <span>Next Topic</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* SECTION 3: Units PDF Notes Viewport */}
          <div className="pdf-section-block-compact" onClick={() => setIsChatFocused(false)}>
            <div className="notes-header-row-compact">
              <h3 className="notes-title-compact">Units PDF Notes</h3>
              <div className="notes-action-buttons">
                <button className="btn-notes-view" onClick={() => setShowFullNotesModal(true)}>
                  <FileText size={14} />
                  <span>View Full Screen</span>
                </button>
                <a 
                  href={activePdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-notes-download"
                  onClick={handleDownloadNotes}
                  title="Download PDF Notes"
                >
                  <Download size={14} />
                </a>
              </div>
            </div>

            {/* Direct Units PDF Iframe Viewer */}
            <div className="pdf-iframe-wrapper-compact">
              <iframe
                key={activePdfUrl + activeTopicIdx}
                src={`${activePdfUrl}#toolbar=1&navpanes=0`}
                title={`${activeTopicTitle} Units PDF`}
                className="units-pdf-iframe-compact"
                width="100%"
                height="520px"
              />
            </div>
          </div>
        </div>

        {/* 4. PERMANENTLY FIXED RIGHT SIDEBAR (Guru AI Bot Panel) */}
        <div className={`right-guru-ai-sidebar-fixed ${isChatFocused ? 'expanded' : ''}`}>
          <div className="guru-ai-card">
            {/* Header */}
            <div className="guru-ai-header">
              <div className="guru-title-group">
                <Sparkles size={18} className="guru-bot-icon-sparkle" />
                <h3>Guru AI</h3>
                <span className="beta-tag">BETA</span>
              </div>
              <ChevronUp size={18} className="guru-toggle-icon" onClick={() => setIsChatFocused(false)} />
            </div>

            <p className="guru-sub-caption">Your Study Assistant</p>

            {/* Current Context Card */}
            <div className="guru-context-box">
              <span className="context-label">CURRENT CONTEXT</span>
              <div className="context-row">
                <span className="ctx-key">Subject:</span>
                <span className="ctx-val">{currentSubject.name}</span>
              </div>
              <div className="context-row">
                <span className="ctx-key">Unit:</span>
                <span className="ctx-val">{currentUnit.title}</span>
              </div>
              <div className="context-row">
                <span className="ctx-key">Topic:</span>
                <span className="ctx-val topic-highlight">{activeTopicTitle}</span>
              </div>
            </div>

            {/* AI Chat Conversation Feed */}
            {chatMessages.length > 0 && (
              <div className="guru-chat-messages-container">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message-bubble ${msg.sender}`}>
                    <div className="message-content">
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {isAiReplying && (
                  <div className="chat-message-bubble ai typing">
                    <span className="typing-dots">Guru AI is thinking...</span>
                  </div>
                )}
                <div ref={chatMessagesEndRef} />
              </div>
            )}

            {/* Quick Action Prompts */}
            <div className="guru-prompts-section">
              <h4 className="guru-help-title">How can I help you?</h4>
              
              <button className="guru-action-btn" onClick={() => handlePromptClick('Explain in simple words')}>
                <Sparkles size={15} className="guru-btn-icon spark" />
                <div className="guru-btn-text">
                  <strong>Explain in simple words</strong>
                </div>
              </button>

              <button className="guru-action-btn" onClick={() => handlePromptClick('Give me a quick summary')}>
                <FileCheck size={15} className="guru-btn-icon summary" />
                <div className="guru-btn-text">
                  <strong>Give me a quick summary</strong>
                </div>
              </button>

              <button className="guru-action-btn" onClick={() => handlePromptClick('Important exam points')}>
                <Target size={15} className="guru-btn-icon target" />
                <div className="guru-btn-text">
                  <strong>Important exam points</strong>
                </div>
              </button>

              <button className="guru-action-btn" onClick={() => handlePromptClick('Give practice questions')}>
                <HelpCircle size={15} className="guru-btn-icon help" />
                <div className="guru-btn-text">
                  <strong>Give practice questions</strong>
                </div>
              </button>
            </div>

            {/* Interactive Chat Input Form */}
            <div className="guru-interactive-chat-box">
              <span className="ask-input-label">Ask anything about this topic...</span>
              <form 
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitUserMessage(chatInput);
                }}
              >
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onFocus={() => setIsChatFocused(true)}
                  className="chat-text-input"
                />
                <button type="submit" className="btn-send-message" title="Send Question">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Footer Information Badges */}
            <div className="guru-footer-meta">
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Full Notes Modal Viewer */}
      {showFullNotesModal && (
        <div className="modal-backdrop" onClick={() => setShowFullNotesModal(false)}>
          <div className="notes-modal-card-full" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div className="modal-title-group">
                <FileText size={20} color="#007DFF" />
                <h3>{activeTopicTitle} – Units PDF Document</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setShowFullNotesModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-notes-body-pdf">
              <iframe
                src={`${activePdfUrl}#toolbar=1&navpanes=0`}
                title={activeTopicTitle}
                className="modal-pdf-iframe"
                width="100%"
                height="75vh"
              />
            </div>

            <div className="modal-bottom-actions">
              <button className="btn-secondary" onClick={() => setShowFullNotesModal(false)}>Close</button>
              <a 
                href={activePdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                onClick={handleDownloadNotes}
              >
                <Download size={15} /> Download Units PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicLearning;
