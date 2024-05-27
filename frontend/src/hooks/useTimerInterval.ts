import { useEffect } from 'react';

const useTimerInterval = (ms: number, action: () => void) => {
  useEffect(() => {
    const interval = setInterval(() => {
      action();
    }, ms);

    return () => {
      clearInterval(interval);
    };
  }, [action]);
};

export default useTimerInterval;
