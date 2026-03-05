'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface Props {
  show: boolean;
}

export default function ConfettiAnimation({ show }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!show) return;

    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    setActive(true);

    // Stop confetti after 7 seconds
    const timer = setTimeout(() => setActive(false), 7000);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [show]);

  if (!show || !active || dimensions.width === 0) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={220}
      recycle={active}
      colors={['#f4a0bb', '#e04f7a', '#c9a84c', '#d4b96a', '#b5c9a8', '#9cba8d', '#fdf6ec', '#f9c7d4']}
      gravity={0.12}
      tweenDuration={5000}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
    />
  );
}
