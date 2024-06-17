import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import 'animate.css';
import { useWindowSize } from 'react-use';
// Messages and animations arrays
const messages = [
  "🎉 You've reached the end of the feed, but not the end of your journey! 🎉",
  "👏 You've successfully surfed the infinite wave of content. Time to ride the next one! 👏",
  "🚀 You've made it to the center of the content universe. Now, let's explore new galaxies! 🚀",
  '🌟 No more content to load, but infinite possibilities await! Keep chasing your dreams..🌟',
  "🎁 Bravo! You've reached the depths of the feed. Now, let's dive into something new! 🎁",
];

const animations = [
  'animate__fadeInUp',
  'animate__fadeInDown',
  'animate__fadeIn',
  'animate__bounce',
  'animate__headShake',
];

// Utility function to get random message and animation
const getRandomMessageAndAnimation = () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
  return { randomMessage, randomAnimation };
};

// Define props interface
interface AnimatedMessageProps {
  showConfetti: boolean;
  onConfettiComplete: () => void;
}

const AnimatedMessage = ({ showConfetti, onConfettiComplete }: AnimatedMessageProps) => {
  const [confettiVisible, setConfettiVisible] = useState(showConfetti);
  const { randomMessage, randomAnimation } = getRandomMessageAndAnimation();
  const { width } = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      setConfettiVisible(true);
      const timer = setTimeout(() => {
        setConfettiVisible(false);
        onConfettiComplete(); // Notify parent to stop confetti
      }, 5000); // Duration for confetti effect
      return () => clearTimeout(timer);
    }
  }, [showConfetti, onConfettiComplete]);

  return (
    <div style={{ position: 'relative', textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
      {confettiVisible && (
        <div style={{ position: 'absolute', top: -30, transform: 'translateX(-20%)' }}>
          <Confetti width={width} height={100} recycle={false} />
        </div>
      )}
      <div className={`animate__animated ${randomAnimation}`}>
        <p className="text-l pt-4 text-slate-700">{randomMessage}</p>
      </div>
    </div>
  );
};
export default AnimatedMessage;
