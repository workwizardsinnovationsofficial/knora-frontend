import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '6rem 1.5rem', textAling: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <Compass size={64} color="#1A73E8" />
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>404 — Page Not Found</h1>
      <p style={{ color: '#666666', maxWidth: '500px', textAlign: 'center' }}>
        The KNORA resource or page you are looking for doesn't exist or has been moved.
      </p>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: '#1A73E8', color: '#ffffff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeft size={18} />
        <span>Return to KNORA Home</span>
      </button>
    </div>
  );
};

export default NotFound;
