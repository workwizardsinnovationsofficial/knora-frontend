import React, { useState, useEffect } from 'react';
import { jobService } from '../../../services/jobService';
import { eventService } from '../../../services/eventService';
import { Briefcase, Search, MapPin, Building, Trophy, Calendar, Bookmark, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import './JobPortal.css';

const JobPortal = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    jobService.getJobs({ search: searchTerm }).then(setJobs);
    eventService.getHackathons().then(setEvents);
  }, [searchTerm]);

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        toast.success('Removed from saved items');
        return prev.filter(i => i !== id);
      } else {
        toast.success('Opportunity saved!');
        return [...prev, id];
      }
    });
  };

  return (
    <div className="job-portal-container">
      <div className="portal-header">
        <span className="portal-badge"><Briefcase size={14} color="#1A73E8" /> OPPORTUNITY MARKETPLACE</span>
        <h1>Jobs, Internships, Hackathons & Events</h1>
        <p>Discover student internships, fresher engineering roles, national hackathons, and developer conferences.</p>
      </div>

      {/* Tabs & Search Bar (Section 26 & 27) */}
      <div className="portal-filter-bar">
        <div className="tab-pill-group">
          <button className={`pill-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase size={16} /> All Jobs
          </button>
          <button className={`pill-btn ${activeTab === 'internships' ? 'active' : ''}`} onClick={() => setActiveTab('internships')}>
            <Building size={16} /> Internships
          </button>
          <button className={`pill-btn ${activeTab === 'hackathons' ? 'active' : ''}`} onClick={() => setActiveTab('hackathons')}>
            <Trophy size={16} /> Hackathons
          </button>
          <button className={`pill-btn ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            <Calendar size={16} /> Events
          </button>
        </div>

        <div className="search-input-box">
          <Search size={18} color="#888888" />
          <input
            type="text"
            placeholder="Search roles, companies, or skills (Python, React, AWS...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="opportunities-grid">
        {(activeTab === 'jobs' || activeTab === 'internships') && (
          jobs
            .filter(j => activeTab === 'jobs' || j.type === 'Internship')
            .map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-top">
                  <div className="company-logo-box">
                    <Building size={22} color="#1A73E8" />
                  </div>
                  <span className="match-pill">{job.matchPercentage}% Match</span>
                </div>

                <h3 className="job-title">{job.title}</h3>
                <h4 className="job-company">{job.company} • {job.location}</h4>

                <div className="job-tags-row">
                  {job.skills.map((s, idx) => (
                    <span key={idx} className="j-tag">{s}</span>
                  ))}
                </div>

                <div className="job-card-footer">
                  <span className="stipend-val">{job.stipend}</span>
                  <div className="action-btn-group">
                    <button 
                      className={`btn-icon-save ${savedIds.includes(job.id) ? 'saved' : ''}`}
                      onClick={() => toggleSave(job.id)}
                    >
                      <Bookmark size={16} />
                    </button>
                    <button className="btn-apply-now" onClick={() => toast.success(`Applied to ${job.title} at ${job.company}!`)}>
                      <span>Apply</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}

        {(activeTab === 'hackathons' || activeTab === 'events') && (
          events.map((evt) => (
            <div key={evt.id} className="job-card event-type">
              <div className="job-card-top">
                <div className="company-logo-box">
                  <Trophy size={22} color="#1A73E8" />
                </div>
                <span className="match-pill event">{evt.category}</span>
              </div>

              <h3 className="job-title">{evt.title}</h3>
              <h4 className="job-company">{evt.organizer} • {evt.mode}</h4>
              <p className="event-date-text">{evt.date}</p>

              <div className="job-card-footer">
                <span className="stipend-val">{evt.prize || evt.type}</span>
                <button className="btn-apply-now" onClick={() => toast.success(`Registered for ${evt.title}!`)}>
                  <span>Register</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPortal;
