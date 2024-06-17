import React from 'react';

interface ResetIconProps {
  className?: string;
}

const ResetIcon: React.FC<ResetIconProps> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 A 1.0001 1.0001 0 1 0 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 C 31.692686 4 37.635193 7.130711 41.480469 12 L 35 12 A 1.0001 1.0001 0 1 0 35 14 L 43.449219 14 L 45 14 L 45 4 A 1.0001 1.0001 0 0 0 43.984375 2.9863281 A 1.0001 1.0001 0 0 0 43 4 L 43 10.699219 C 38.785186 5.4020866 32.287796 2 25 2 z"
      ></path>
    </svg>
  );
};

export default ResetIcon;
