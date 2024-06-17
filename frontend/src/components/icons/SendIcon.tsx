import React from 'react';

interface SendIconProps {
  className?: string;
}

const SendIcon: React.FC<SendIconProps> = ({ className }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
};

export default SendIcon;
