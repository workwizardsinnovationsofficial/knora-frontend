import React, { useEffect } from 'react';
import { useAuthModal } from '../../context/AuthModalContext';
import LandingLayout from '../../layouts/LandingLayout';
import Landing from '../Landing/Landing';

const Login = () => {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('login');
  }, [openAuthModal]);

  return (
    <LandingLayout>
      <Landing />
    </LandingLayout>
  );
};

export default Login;
