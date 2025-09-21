
import React from 'react';

const HangerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18.5 6.5a2.5 2.5 0 1 0-5 0V9h10v0a2.5 2.5 0 1 0-5 0V6.5" />
    <path d="M4 9h16" />
    <path d="M8 18a4 4 0 1 0 8 0" />
  </svg>
);

export default HangerIcon;
