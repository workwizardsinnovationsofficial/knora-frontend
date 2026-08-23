const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/auth';

export const authApi = {
  // 1. Check Email Availability
  checkEmail: async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Email check failed');
      return json.data; // { email, exists, available }
    } catch (err) {
      console.warn('Check email fallback:', err.message);
      return { email, exists: false, available: true };
    }
  },

  // 2. Signup with Email + Mobile + Password
  signupPassword: async (data) => {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        confirm_password: data.confirmPassword || data.password
      })
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMsg = json.detail || (json.error ? json.error.message : 'Signup failed');
      throw new Error(errorMsg);
    }
    return json.data || json;
  },

  // 3. Send Email Verification OTP
  sendEmailOtp: async (email) => {
    const res = await fetch(`${API_BASE_URL}/verification/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail || 'Failed to send verification OTP');
    return json.data || json;
  },

  // 4. Verify Email Verification OTP
  verifyEmailOtp: async (email, otp) => {
    const res = await fetch(`${API_BASE_URL}/verification/email/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMsg = json.detail || (json.error ? json.error.message : 'Invalid or expired 6-digit OTP code');
      throw new Error(errorMsg);
    }
    return json.data || json;
  },

  // 5. Password Login (Email or Mobile)
  loginPassword: async (loginInput, password) => {
    const isEmail = loginInput.includes('@');
    const endpoint = isEmail ? `${API_BASE_URL}/login/email-password` : `${API_BASE_URL}/login/mobile-password`;
    const payload = isEmail ? { email: loginInput, password } : { mobile: loginInput, password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMsg = json.detail || (json.error ? json.error.message : 'Invalid login credentials');
      throw new Error(errorMsg);
    }
    return json.data || json; // TokenResponse
  },

  // 6. Refresh Token
  refreshToken: async (refreshToken) => {
    const res = await fetch(`${API_BASE_URL}/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail || 'Token refresh failed');
    return json.data || json;
  },

  // 7. Get Current User Profile
  getMe: async (accessToken) => {
    const res = await fetch(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.detail || 'Failed to fetch profile');
    return json.data || json;
  },

  // 8. Google OAuth Consent Redirect URL
  getGoogleAuthUrl: async () => {
    const res = await fetch(`${API_BASE_URL}/google/login`);
    const json = await res.json();
    if (json.data && json.data.auth_url) {
      return json.data.auth_url;
    }
    return `${API_BASE_URL}/google/callback?code=mock_code_google_user`;
  }
};
