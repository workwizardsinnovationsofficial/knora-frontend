import React, { useState } from 'react';
import { resumeApi } from '../../../services/resumeApi';
import { Sparkles, Check, RefreshCw, Edit3, X, Wand2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import './AIAssistantDrawer.css';

export const AIAssistantDrawer = ({ isOpen, onClose, resumeId, currentSummary, onApplyText }) => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'bullet', 'project', 'skills'
  const [inputText, setInputText] = useState(currentSummary || '');
  const [projectTitle, setProjectTitle] = useState('');
  const [technologies, setTechnologies] = useState('');
  
  const [generatedResult, setGeneratedResult] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (action) => {
    setIsGenerating(true);
    try {
      const payload = {
        action,
        text: inputText,
        title: projectTitle,
        technologies
      };
      
      const data = await resumeApi.enhanceAI(resumeId || 'draft', payload);
      if (action === 'suggest_skills') {
        setSuggestedSkills(data.suggestedSkills || []);
      } else {
        setGeneratedResult(data.enhancedText || '');
      }
      toast.success('AI suggestions generated!');
    } catch (err) {
      toast.error('AI assistant failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (onApplyText && generatedResult) {
      onApplyText(generatedResult);
      toast.success('Applied AI text to resume!');
      onClose();
    }
  };

  return (
    <div className="ai-drawer-backdrop" onClick={onClose}>
      <div className="ai-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-drawer-header">
          <div className="ai-title-wrap">
            <Sparkles size={18} color="#1A73E8" />
            <h3>Knora AI Writing Assistant</h3>
          </div>
          <button className="btn-close-drawer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="ai-tabs">
          <button className={`ai-tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => { setActiveTab('summary'); setGeneratedResult(''); }}>
            Summary
          </button>
          <button className={`ai-tab ${activeTab === 'bullet' ? 'active' : ''}`} onClick={() => { setActiveTab('bullet'); setGeneratedResult(''); }}>
            Bullet Point
          </button>
          <button className={`ai-tab ${activeTab === 'project' ? 'active' : ''}`} onClick={() => { setActiveTab('project'); setGeneratedResult(''); }}>
            Project Desc
          </button>
          <button className={`ai-tab ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => { setActiveTab('skills'); setGeneratedResult(''); }}>
            Suggest Skills
          </button>
        </div>

        {/* Drawer Body */}
        <div className="ai-drawer-body">
          {activeTab === 'summary' && (
            <div className="ai-form-group">
              <label>Your Current Summary / Key Highlights</label>
              <textarea
                rows={4}
                value={inputText}
                placeholder="e.g. Computer Science student passionate about web development and building APIs..."
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className="btn-ai-submit"
                disabled={isGenerating}
                onClick={() => handleGenerate('summary')}
              >
                {isGenerating ? <RefreshCw size={16} className="spin" /> : <Wand2 size={16} />}
                <span>{isGenerating ? 'Enhancing Summary...' : 'Improve Summary'}</span>
              </button>
            </div>
          )}

          {activeTab === 'bullet' && (
            <div className="ai-form-group">
              <label>Basic Bullet Point</label>
              <textarea
                rows={3}
                value={inputText}
                placeholder="e.g. Worked on the frontend using React and fixed bugs."
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className="btn-ai-submit"
                disabled={isGenerating}
                onClick={() => handleGenerate('bullet')}
              >
                {isGenerating ? <RefreshCw size={16} className="spin" /> : <Wand2 size={16} />}
                <span>{isGenerating ? 'Polishing Bullet...' : 'Make Action-Oriented'}</span>
              </button>
            </div>
          )}

          {activeTab === 'project' && (
            <div className="ai-form-group">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="e.g. E-Commerce Platform"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <label>Technologies Used</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, MongoDB"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <label>Key Features / Raw Description</label>
              <textarea
                rows={3}
                value={inputText}
                placeholder="Built authentication and payment checkout system..."
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className="btn-ai-submit"
                disabled={isGenerating}
                onClick={() => handleGenerate('project')}
              >
                {isGenerating ? <RefreshCw size={16} className="spin" /> : <Wand2 size={16} />}
                <span>{isGenerating ? 'Generating...' : 'Generate Project Description'}</span>
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="ai-form-group">
              <p className="ai-hint">AI will analyze your profile and target job role to suggest high-impact technical skills.</p>
              <button
                className="btn-ai-submit"
                disabled={isGenerating}
                onClick={() => handleGenerate('suggest_skills')}
              >
                {isGenerating ? <RefreshCw size={16} className="spin" /> : <Wand2 size={16} />}
                <span>{isGenerating ? 'Analyzing Skills...' : 'Suggest Related Skills'}</span>
              </button>

              {suggestedSkills.length > 0 && (
                <div className="suggested-skills-box">
                  <h4>Recommended Skills:</h4>
                  <div className="skill-chips">
                    {suggestedSkills.map((sk, i) => (
                      <span key={i} className="ai-skill-chip">{sk}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Generated Result Box */}
          {generatedResult && (
            <div className="ai-result-box">
              <div className="result-header">
                <span>AI SUGGESTION RESULT</span>
                <button className="btn-edit-result" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 size={14} /> {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  rows={4}
                  value={generatedResult}
                  onChange={(e) => setGeneratedResult(e.target.value)}
                />
              ) : (
                <p className="result-text">{generatedResult}</p>
              )}

              <div className="result-actions">
                <button className="btn-regenerate" onClick={() => handleGenerate(activeTab)}>
                  <RefreshCw size={14} /> Regenerate
                </button>
                <button className="btn-accept" onClick={handleApply}>
                  <Check size={14} /> Accept & Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
