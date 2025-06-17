import React, { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

export default function Confetti() {
  const refInstance = useRef(null);
  const getInstance = useCallback(inst => {
    refInstance.current = inst;
    fire();
  }, []);
  const fire = useCallback(() => {
    if (refInstance.current) refInstance.current({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.5 }
    });
  }, []);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{ position: 'fixed', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}