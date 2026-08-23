import React, { useState } from 'react';
import { guruAiService } from '../../services/guruAiService';
import { Sparkles, Send, Plus, Paperclip, MessageSquare, RefreshCw, User, Bot, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './GuruAI.css';

const initialHistory = [
  { id: 'chat-1', title: 'B.Tech Unit 1 DSA Doubts' },
  { id: 'chat-2', title: 'ATS Resume Keyword Feedback' },
  { id: 'chat-3', title: 'System Design Interview Prep' }
];

const GuruAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 'init-msg',
      sender: 'guru',
      text: "Hello! I am **Guru.AI**, your 24/7 student learning assistant on KNORA. Ask me anything about B.Tech syllabus, DSA problem solving, resume feedback, or interview preparation!",
      timestamp: '10:00 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState(initialHistory);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const guruReply = await guruAiService.sendMessage(userText);
      setMessages(prev => [...prev, guruReply]);
    } catch (err) {
      toast.error('Guru.AI encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'guru',
        text: "New session started! What topic would you like to explore with Guru.AI?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="guru-ai-page-container">
      {/* Desktop Left Sidebar (Section 29) */}
      <aside className="guru-sidebar">
        <button className="btn-new-chat" onClick={handleNewChat}>
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="history-section">
          <h4>Recent Conversations</h4>
          <div className="history-list">
            {chatHistory.map((item) => (
              <button key={item.id} className="history-item">
                <MessageSquare size={16} />
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Conversation Thread */}
      <main className="guru-chat-main">
        <div className="guru-chat-header">
          <div className="guru-header-badge">
            <Sparkles size={18} color="#1A73E8" />
            <h2>Guru.AI Assistant</h2>
          </div>
          <span className="ai-status-online">Online & Ready</span>
        </div>

        {/* Message List */}
        <div className="guru-messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'guru-row'}`}>
              <div className="avatar-icon">
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} color="#1A73E8" />}
              </div>
              <div className="bubble-text-box">
                <p>{msg.text}</p>
                <span className="time-stamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-bubble-row guru-row">
              <div className="avatar-icon"><Bot size={18} color="#1A73E8" /></div>
              <div className="bubble-text-box typing">
                <RefreshCw className="animate-spin" size={16} />
                <span>Guru.AI is generating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="guru-input-form">
          <button type="button" className="btn-attach" onClick={() => toast.success('Attachment selected')}>
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            placeholder="Ask Guru.AI about B.Tech topics, DSA questions, resume tips..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-send-message" disabled={!input.trim() || loading}>
            <Send size={18} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default GuruAI;
