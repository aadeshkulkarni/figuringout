declare module 'react-confetti' {
  import { ComponentType } from 'react';

  interface ConfettiProps {
    width: number;
    height: number;
    numberOfPieces?: number;
    recycle?: boolean;
    run?: boolean;
    tweenDuration?: number;
    onConfettiComplete?: (confetti: any) => void;
  }

  const Confetti: ComponentType<ConfettiProps>;

  export default Confetti;
}
