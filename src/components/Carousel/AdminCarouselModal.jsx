import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Check, Sparkles, Image, Link, Type, Palette, Eye, EyeOff } from 'lucide-react';
import { carouselApi } from '../../services/carouselApi';
import toast from 'react-hot-toast';
import './AdminCarouselModal.css';

const ICON_OPTIONS = [
  { name: 'BookOpen', label: 'Book / Academics' },
  { name: 'FileText', label: 'Resume' },
  { name: 'SearchCheck', label: 'ATS Score' },
  { name: 'Globe', label: 'Portfolio' },
  { name: 'Briefcase', label: 'Jobs / Internships' },
  { name: 'Sparkles', label: 'Guru.AI Assistant' },
  { name: 'Trophy', label: 'Events & Hackathons' }
];

const AdminCarouselModal = ({ isOpen, onClose, slides, onRefreshSlides }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    badge: 'NEW ANNOUNCEMENT',
    ctaText: 'Explore Now',
    targetPath: '/academics',
    isPublic: true,
    featureName: '',
    iconName: 'Sparkles',
    accentColor: '#1A73E8',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    order: slides.length + 1,
    isActive: true
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      badge: 'NEW ANNOUNCEMENT',
      ctaText: 'Explore Now',
      targetPath: '/academics',
      isPublic: true,
      featureName: '',
      iconName: 'Sparkles',
      accentColor: '#1A73E8',
      bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
      order: slides.length + 1,
      isActive: true
    });
    setIsAdding(true);
  };

  const handleStartEdit = (slide) => {
    setIsAdding(false);
    setEditingId(slide.id || slide._id);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      badge: slide.badge || '',
      ctaText: slide.ctaText || slide.cta_text || 'Explore',
      targetPath: slide.targetPath || slide.target_path || '/academics',
      isPublic: slide.isPublic !== undefined ? slide.isPublic : true,
      featureName: slide.featureName || '',
      iconName: slide.iconName || 'BookOpen',
      accentColor: slide.accentColor || '#1A73E8',
      bgImage: slide.bgImage || '',
      order: slide.order || 1,
      isActive: slide.isActive !== undefined ? slide.isActive : true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await carouselApi.updateSlide(editingId, formData);
        toast.success('Carousel slide updated successfully!');
      } else {
        await carouselApi.createSlide(formData);
        toast.success('New carousel slide added successfully!');
      }
      setIsAdding(false);
      setEditingId(null);
      await onRefreshSlides();
    } catch (err) {
      toast.error('Failed to save slide to backend database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slideId) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    try {
      await carouselApi.deleteSlide(slideId);
      toast.success('Slide deleted.');
      await onRefreshSlides();
    } catch (err) {
      toast.error('Could not delete slide.');
    }
  };

  const handleToggleActive = async (slide) => {
    const id = slide.id || slide._id;
    try {
      await carouselApi.updateSlide(id, { isActive: !slide.isActive });
      toast.success(`Slide ${!slide.isActive ? 'activated' : 'hidden'}.`);
      await onRefreshSlides();
    } catch (err) {
      toast.error('Failed to toggle status.');
    }
  };

  return (
    <div className="admin-carousel-overlay">
      <div className="admin-carousel-card">
        {/* Header */}
        <div className="admin-carousel-header">
          <div className="admin-carousel-title-wrap">
            <Sparkles size={20} color="#1A73E8" />
            <div>
              <h3>Admin Carousel Controller</h3>
              <p>Add custom banners, upload background images, edit position & toggle slides</p>
            </div>
          </div>
          <button className="admin-carousel-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="admin-carousel-body">
          {/* Action Bar */}
          {!isAdding && !editingId && (
            <div className="admin-carousel-actions">
              <button className="btn-add-slide" onClick={handleStartCreate}>
                <Plus size={16} />
                <span>Add New Slide Banner</span>
              </button>
              <span className="slide-count-tag">{slides.length} Slides Configured</span>
            </div>
          )}

          {/* List of Existing Slides */}
          {!isAdding && !editingId && (
            <div className="admin-slides-list">
              {slides.map((slide, idx) => (
                <div key={slide.id || idx} className={`admin-slide-row ${!slide.isActive ? 'inactive' : ''}`}>
                  <div 
                    className="slide-row-thumb" 
                    style={{ backgroundImage: `url(${slide.bgImage})` }}
                  />
                  
                  <div className="slide-row-info">
                    <div className="slide-row-badge-wrap">
                      <span className="slide-row-badge" style={{ color: slide.accentColor, borderColor: slide.accentColor }}>
                        {slide.badge}
                      </span>
                      {!slide.isActive && <span className="hidden-badge">HIDDEN</span>}
                    </div>
                    <h4 className="slide-row-title">{slide.title}</h4>
                    <p className="slide-row-sub">{slide.subtitle}</p>
                  </div>

                  <div className="slide-row-actions">
                    <button 
                      className={`btn-row-icon ${slide.isActive ? 'active' : ''}`}
                      onClick={() => handleToggleActive(slide)}
                      title={slide.isActive ? 'Hide slide' : 'Activate slide'}
                    >
                      {slide.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    
                    <button 
                      className="btn-row-icon edit"
                      onClick={() => handleStartEdit(slide)}
                      title="Edit slide"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button 
                      className="btn-row-icon delete"
                      onClick={() => handleDelete(slide.id || slide._id)}
                      title="Delete slide"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form for Add/Edit */}
          {(isAdding || editingId) && (
            <form className="admin-slide-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                
                {/* Title */}
                <div className="form-group full">
                  <label><Type size={14} /> Slide Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Special B.Tech Placement Masterclass"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div className="form-group full">
                  <label>Subtitle / Description</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Join live 3-day coding bootcamp with Google engineers."
                    required
                  />
                </div>

                {/* Badge */}
                <div className="form-group">
                  <label>Badge Tag</label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g. HACKATHON 2026"
                    required
                  />
                </div>

                {/* CTA Text */}
                <div className="form-group">
                  <label>Button CTA Text</label>
                  <input
                    type="text"
                    name="ctaText"
                    value={formData.ctaText}
                    onChange={handleInputChange}
                    placeholder="e.g. Register Now"
                    required
                  />
                </div>

                {/* Target Path */}
                <div className="form-group">
                  <label><Link size={14} /> Target Route / URL</label>
                  <input
                    type="text"
                    name="targetPath"
                    value={formData.targetPath}
                    onChange={handleInputChange}
                    placeholder="e.g. /student-corner/events"
                    required
                  />
                </div>

                {/* Accent Color */}
                <div className="form-group">
                  <label><Palette size={14} /> Accent Color</label>
                  <div className="color-picker-wrap">
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                    />
                    <span>{formData.accentColor}</span>
                  </div>
                </div>

                {/* Icon Selection */}
                <div className="form-group">
                  <label>Icon Style</label>
                  <select
                    name="iconName"
                    value={formData.iconName}
                    onChange={handleInputChange}
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Background Image URL */}
                <div className="form-group full">
                  <label><Image size={14} /> Background Image URL</label>
                  <input
                    type="url"
                    name="bgImage"
                    value={formData.bgImage}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-save" disabled={loading}>
                  <Check size={16} />
                  <span>{loading ? 'Saving...' : editingId ? 'Update Slide' : 'Add Slide'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCarouselModal;
