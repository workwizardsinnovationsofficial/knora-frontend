import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Video, FileText, CheckCircle2, ChevronLeft, ChevronRight, Download, Share2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './TopicLearning.css';

const TopicLearning = () => {
  const navigate = useNavigate();
  const { subjectId, unitId, topicId } = useParams();
  const [activeTab, setActiveTab] = useState('video');

  return (
    <div className="topic-learning-container">
      {/* Top Breadcrumb Header */}
      <div className="learning-breadcrumb">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ChevronLeft size={18} />
          <span>Back to Subject Units</span>
        </button>
        <span className="crumb-title">Data Structures & Algorithms • Unit {unitId || 1}</span>
      </div>

      {/* Main Video & Notes Player Grid */}
      <div className="player-main-grid">
        {/* Video Player Column */}
        <div className="player-col">
          <div className="video-viewport-box">
            <Video size={64} color="#007DFF" />
            <div className="player-overlay-info">
              <h3>Topic {topicId || 1}: Abstract Data Types & Stack ADT</h3>
              <p>Lecture Video • 24:15 min • Faculty: Prof. V. Krishna (JNTUH)</p>
            </div>
          </div>

          <div className="player-control-bar">
            <div className="tab-switcher">
              <button className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`} onClick={() => setActiveTab('video')}>
                <Video size={16} /> Video Lesson
              </button>
              <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
                <FileText size={16} /> Lecture Notes (PDF)
              </button>
            </div>

            <button className="btn-download-pdf" onClick={() => toast.success('Downloading PDF Notes...')}>
              <Download size={16} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Sidebar Topic Navigation */}
        <div className="topics-sidebar">
          <h3>Unit {unitId || 1} Topics</h3>
          <div className="topic-list-items">
            <div className="sidebar-topic-card active">
              <span className="t-num">1</span>
              <div>
                <h5>Abstract Data Types & Stack ADT</h5>
                <p>24 mins • Active Lesson</p>
              </div>
            </div>
            <div className="sidebar-topic-card">
              <span className="t-num">2</span>
              <div>
                <h5>Arrays & Sparse Matrix Representation</h5>
                <p>18 mins</p>
              </div>
            </div>
            <div className="sidebar-topic-card">
              <span className="t-num">3</span>
              <div>
                <h5>Singly and Doubly Linked Lists</h5>
                <p>32 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicLearning;
