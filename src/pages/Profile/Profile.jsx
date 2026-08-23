import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Award, Bookmark, BookOpen, Layers, LogOut, Sparkles, CheckCircle2, User, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { profileData, updateProfile } = useStudent();
  const { handleLogout, user } = useAuth();
  const { personalInfo, academicInfo } = profileData;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || personalInfo.fullName,
    email: user?.email || personalInfo.email,
    phone: user?.mobile || personalInfo.phone,
    college: academicInfo.college,
    branch: academicInfo.branch,
    year: academicInfo.year
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(
      { fullName: formData.fullName, email: formData.email, phone: formData.phone },
      { college: formData.college, branch: formData.branch, year: formData.year }
    );
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="profile-page-container">
      {/* Top Banner Card */}
      <div className="profile-hero-card">
        <div className="profile-avatar">
          <img src={personalInfo.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'} alt={formData.fullName} />
        </div>

        <div className="profile-details-col">
          <div className="name-action-row">
            <div>
              <h1 className="user-name">{formData.fullName}</h1>
              <p className="user-college">{formData.college} • {formData.branch} ({formData.year})</p>
            </div>
            <div className="action-btns">
              <button className="btn-edit" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
              <button className="btn-logout" onClick={() => { handleLogout(); toast.success('Logged out'); }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          <div className="contact-row">
            <span className="c-chip"><Mail size={14} /> {formData.email}</span>
            <span className="c-chip"><Phone size={14} /> {formData.phone}</span>
            <span className="c-chip"><MapPin size={14} /> Hyderabad, India</span>
          </div>
        </div>
      </div>

      {/* Edit Form Modal/Box */}
      {editMode && (
        <form onSubmit={handleSave} className="edit-profile-box">
          <h3>Edit Profile Details</h3>
          <div className="edit-grid">
            <div className="f-block">
              <label>Full Name</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
            <div className="f-block">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="f-block">
              <label>College</label>
              <input type="text" value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn-save-profile">
            <Save size={16} /> Save Changes
          </button>
        </form>
      )}

      {/* CAREER READINESS SCORE: 78 / 100 (Section 31 Specification) */}
      <div className="career-readiness-card">
        <div className="readiness-header">
          <div className="readiness-title-group">
            <Sparkles size={22} color="#1A73E8" />
            <h2>CAREER READINESS INDEX</h2>
          </div>
          <div className="readiness-score-badge">
            <span className="score-num">78</span>
            <span className="score-denom">/ 100</span>
          </div>
        </div>

        <div className="recommended-next-step">
          <strong>Recommended Next Step:</strong> Improve your technical interview preparation.
        </div>

        <div className="readiness-bars-grid">
          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Academics</span> <span>82%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '82%' }}></div></div>
          </div>

          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Skills</span> <span>74%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '74%' }}></div></div>
          </div>

          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Projects</span> <span>85%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}></div></div>
          </div>

          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Resume</span> <span>90%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '90%' }}></div></div>
          </div>

          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Portfolio</span> <span>80%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '80%' }}></div></div>
          </div>

          <div className="readiness-bar-item">
            <div className="bar-label-row"><span>Interview</span> <span>68%</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '68%' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
