import { useEffect, useCallback } from 'react';

const useClickAway = <T extends HTMLElement>(ref: React.RefObject<T>, onClickAway: () => void): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    },
    [ref, onClickAway]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickAway;
