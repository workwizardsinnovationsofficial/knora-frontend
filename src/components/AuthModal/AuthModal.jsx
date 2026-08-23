import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Mail, Lock, User, Phone, Eye, EyeOff, 
  ArrowRight, RefreshCw, CheckCircle2, AlertCircle,
  LogIn, UserPlus
} from 'lucide-react';
import { authApi } from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const navigate = useNavigate();
  const { handleAuthSuccess } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  // Login form state
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Verification state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setSuccessMessage('');
  }, [initialMode, isOpen]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Listen for Google OAuth popup callback message
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'KNORA_GOOGLE_AUTH_SUCCESS') {
        const authData = event.data.authData;
        handleAuthSuccess(authData);
        toast.success('Successfully authenticated with Google!');
        if (onClose) onClose();
        navigate('/profile');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleAuthSuccess, onClose, navigate]);

  if (!isOpen) return null;

  // Handle Google OAuth (Centered Popup Window)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const authUrl = await authApi.getGoogleAuthUrl();
      
      const width = 500;
      const height = 620;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;

      const popup = window.open(
        authUrl,
        'GoogleSignInPopup',
        `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Fallback to full page redirect if popups are blocked
        window.location.href = authUrl;
      } else {
        setLoading(false);
      }
    } catch (err) {
      toast.error('Google Sign In error.');
      setLoading(false);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginInput.trim() || !loginPassword) {
      setErrorMessage('Please enter both email/mobile and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.loginPassword(loginInput.trim(), loginPassword);
      handleAuthSuccess({
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        user: res.user
      });

      setSuccessMessage('Welcome back to KNORA!');
      toast.success('Signed in successfully!');
      
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 400);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email/mobile or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (!signupEmail || !/\S+@\S+\.\S+/.test(signupEmail)) {
      setErrorMessage('Please enter a valid email address first.');
      return;
    }

    setSendingOtp(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await authApi.sendEmailOtp(signupEmail.trim());
      setOtpSent(true);
      setSuccessMessage('OTP code sent to your email!');
      toast.success('OTP sent to your email!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.trim().length < 4) {
      setErrorMessage('Please enter the OTP code.');
      return;
    }

    setVerifyingOtp(true);
    setErrorMessage('');

    try {
      await authApi.verifyEmailOtp(signupEmail.trim(), otpCode.trim());
      setIsEmailVerified(true);
      setSuccessMessage('Email verified successfully! ✓');
      toast.success('Email verified!');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid OTP code. Please check and try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !/\S+@\S+\.\S+/.test(signupEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isEmailVerified) {
      setErrorMessage('Please verify your email address with OTP before creating account.');
      return;
    }
    if (!mobileNumber || mobileNumber.replace(/\D/g, '').length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.signupPassword({
        fullName: fullName.trim(),
        email: signupEmail.trim(),
        mobile: mobileNumber.replace(/\D/g, ''),
        password: signupPassword,
        confirmPassword: confirmPassword
      });

      handleAuthSuccess({
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        user: res.user
      });

      setSuccessMessage('Account created successfully!');
      toast.success('Welcome to KNORA!');

      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 400);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Email or Mobile may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-card">
        
        {/* Top-Right Close Button */}
        <button className="auth-modal-close-btn" onClick={onClose} title="Close Modal">
          <X size={18} />
        </button>

        {/* Sliding Tabs Bar */}
        <div className="auth-modal-tabs">
          <div 
            className="tab-slider-pill" 
            style={{ transform: mode === 'login' ? 'translateX(0)' : 'translateX(100%)' }} 
          />
          <button
            className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setErrorMessage('');
              setSuccessMessage('');
            }}
          >
            <LogIn size={16} className="tab-icon" />
            <span>Sign In</span>
          </button>
          <button
            className={`tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
              setSuccessMessage('');
            }}
          >
            <UserPlus size={16} className="tab-icon" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="auth-alert error-alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert success-alert">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button className="btn-google-auth-modal" onClick={handleGoogleLogin} disabled={loading}>
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="auth-modal-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form className="auth-modal-form" onSubmit={handleLoginSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="modal-login-input">Email or Mobile Number</label>
              <div className="input-wrap">
                <Mail size={18} className="input-icon" />
                <input
                  id="modal-login-input"
                  type="text"
                  placeholder="Enter your email or mobile number"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <div className="label-row">
                <label htmlFor="modal-login-pass">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.success('Password reset link sent to your email!'); }} className="forgot-link">
                  Forgot Password?
                </a>
              </div>
              <div className="input-wrap">
                <Lock size={18} className="input-icon" />
                <input
                  id="modal-login-pass"
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="button" className="eye-btn" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-modal-primary active" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form className="auth-modal-form" onSubmit={handleSignupSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="modal-signup-name">Full Name</label>
              <div className="input-wrap">
                <User size={18} className="input-icon" />
                <input
                  id="modal-signup-name"
                  type="text"
                  placeholder="e.g. Boppudi Santhosh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="modal-signup-email">Email Address (OTP Verification)</label>
              <div className="input-wrap email-otp-wrap">
                <Mail size={18} className="input-icon" />
                <input
                  id="modal-signup-email"
                  type="email"
                  placeholder="e.g. santhosh@gmail.com"
                  value={signupEmail}
                  disabled={isEmailVerified}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                {!isEmailVerified && (
                  <button
                    type="button"
                    className="btn-send-otp"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !signupEmail}
                  >
                    {sendingOtp ? <RefreshCw className="animate-spin" size={14} /> : (otpSent ? 'Resend' : 'Send OTP')}
                  </button>
                )}
                {isEmailVerified && (
                  <span className="verified-badge">✓ Verified</span>
                )}
              </div>
            </div>

            {/* OTP Input box */}
            {otpSent && !isEmailVerified && (
              <div className="form-field otp-input-group">
                <label>Enter 6-Digit OTP Code</label>
                <div className="input-wrap email-otp-wrap">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-verify-otp"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || !otpCode}
                  >
                    {verifyingOtp ? <RefreshCw className="animate-spin" size={14} /> : 'Verify'}
                  </button>
                </div>
              </div>
            )}

            <div className="form-field">
              <label htmlFor="modal-signup-mobile">Mobile Number (10 Digits)</label>
              <div className="input-wrap">
                <Phone size={18} className="input-icon" />
                <input
                  id="modal-signup-mobile"
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="modal-signup-pass">Password (Min 6 Characters)</label>
              <div className="input-wrap">
                <Lock size={18} className="input-icon" />
                <input
                  id="modal-signup-pass"
                  type={showSignupPassword ? 'text' : 'password'}
                  placeholder="Create password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button type="button" className="eye-btn" onClick={() => setShowSignupPassword(!showSignupPassword)}>
                  {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="modal-signup-confirm">Confirm Password</label>
              <div className="input-wrap">
                <Lock size={18} className="input-icon" />
                <input
                  id="modal-signup-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-modal-primary active" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}



      </div>
    </div>
  );
};

export default AuthModal;
