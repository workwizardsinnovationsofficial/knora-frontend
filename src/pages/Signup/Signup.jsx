import React, { useEffect } from 'react';
import { useAuthModal } from '../../context/AuthModalContext';
import LandingLayout from '../../layouts/LandingLayout';
import Landing from '../Landing/Landing';

const Signup = () => {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('signup');
  }, [openAuthModal]);

  return (
    <LandingLayout>
      <Landing />
    </LandingLayout>
  );
};

export default Signup;
