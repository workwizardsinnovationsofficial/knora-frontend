import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('knora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('knora_access_token') || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem('knora_refresh_token') || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('knora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('knora_user');
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('knora_access_token', accessToken);
    } else {
      localStorage.removeItem('knora_access_token');
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('knora_refresh_token', refreshToken);
    } else {
      localStorage.removeItem('knora_refresh_token');
    }
  }, [refreshToken]);

  const handleAuthSuccess = useCallback((authResponse) => {
    const { user: userObj, access_token, refresh_token } = authResponse;
    setUser(userObj);
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('knora_user');
    localStorage.removeItem('knora_access_token');
    localStorage.removeItem('knora_refresh_token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!user && !!accessToken,
        loading,
        setLoading,
        handleAuthSuccess,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
