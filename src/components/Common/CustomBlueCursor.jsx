import React, { useState, useEffect } from 'react';
import './CustomBlueCursor.css';

const CustomBlueCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const target = e.target;
      if (!target) return;

      const isInputArea =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable ||
        Boolean(target.closest('input, textarea, select, [contenteditable="true"], .knora-header-search-form, .page-search-box, .search-box, .search-input-box'));

      if (isInputArea) {
        setPos({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="custom-blue-cursor-follower"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Contrast Outline */}
        <path
          d="M6 2H14M10 2V22M6 22H14"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Royal Blue I-Beam Cursor */}
        <path
          d="M6 2H14M10 2V22M6 22H14"
          stroke="#1A73E8"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CustomBlueCursor;
