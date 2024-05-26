import React, { useState, useEffect } from 'react';
import '../index.css';
import ClapIcon, { ClapIconBlack } from './icons/Clap';

interface SparkleProps {
  id: number;
  left: string;
  top: string;
  scale: number;
  delay: string;
  color: string;
}

interface ClapButtonProps {
  clapCount: number;
  handleClap: () => void;
}

const ClapButton: React.FC<ClapButtonProps> = ({ clapCount, handleClap }) => {
  const [isClapping, setIsClapping] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  const [clapped, setClapped] = useState<boolean>(false);

  const handleClapColour = () => {
    if (!clapped) {
      setClapped(true);
    }
  };

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];

  const onClap = () => {
    setIsClapping(true);
    handleClap();
    setTimeout(() => {
      setIsClapping(false);
    }, 300);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isClapping) {
      intervalId = setInterval(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const numberOfStars = Math.floor(Math.random() * 2) + 5;
        for (let i = 0; i < numberOfStars; i++) {
          setSparkles((prevSparkles) => [
            ...prevSparkles,
            {
              id: Math.random(),
              left: `${Math.random() * 60 - 30}px`,
              top: `${Math.random() * 60 - 30}px`,
              scale: Math.random() * 0.5 + 0.5,
              delay: Math.random() * 0.3 + 's',
              color: color,
            },
          ]);
        }
      }, 30);

      // Clear sparkles after some time to avoid accumulation
      setTimeout(() => {
        setSparkles([]);
      }, 1000); // Sparkles stay visible for longer
    }

    return () => clearInterval(intervalId);
  }, [isClapping]);

  return (
    <div className="relative inline-block">
      <div className="flex items-center cursor-pointer" onClick={onClap}>
        <div className={`clap-button ${isClapping ? 'clapping' : ''}`} onClick={handleClapColour}>
          {clapped ? <ClapIconBlack /> : <ClapIcon />}
        </div>
        <span className="ml-2">{clapCount}</span>
      </div>
      <div className="absolute inset-0 pointer-events-none w-[100px] h-[100px] overflow-visible">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              position: 'absolute',
              left: `calc(10% + ${sparkle.left})`,
              top: `calc(5% + ${sparkle.top})`,
              transform: `scale(${sparkle.scale})`,
              animationDelay: sparkle.delay,
              backgroundColor: sparkle.color,
            }}
          >
            <div className="star" style={{ borderBottomColor: sparkle.color }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClapButton;
