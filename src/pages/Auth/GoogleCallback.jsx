import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthSuccess } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const userId = searchParams.get('user_id');
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    if (accessToken && refreshToken) {
      const authData = {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: { 
          id: userId, 
          email: email || '', 
          full_name: name || 'Google User', 
          name: name || 'Google User' 
        }
      };

      handleAuthSuccess(authData);

      // Handle popup window flow
      if (window.opener && window.opener !== window) {
        try {
          window.opener.postMessage(
            { type: 'KNORA_GOOGLE_AUTH_SUCCESS', authData },
            window.location.origin
          );
        } catch (e) {
          console.error('Failed to send message to parent window:', e);
        }
        toast.success('Successfully authenticated with Google!');
        setTimeout(() => {
          window.close();
        }, 300);
      } else {
        toast.success('Successfully authenticated with Google!');
        navigate('/profile', { replace: true });
      }
    } else {
      toast.error('Google OAuth callback parameters missing.');
      if (window.opener && window.opener !== window) {
        window.close();
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [searchParams, navigate, handleAuthSuccess]);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <RefreshCw className="animate-spin" size={32} color="#1A73E8" />
      <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Completing Google Sign In to KNORA...</h2>
    </div>
  );
};

export default GoogleCallback;
