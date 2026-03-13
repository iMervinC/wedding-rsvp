'use client';

import { useState, useEffect } from 'react';

const WEDDING_DATE = new Date('2026-06-15T16:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-white/80 backdrop-blur-sm border border-blush-100 rounded-2xl shadow-md px-4 py-4 sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[90px] text-center">
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-blush-700 tabular-nums leading-none">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-3 font-sans text-xs uppercase tracking-widest text-gray-500 font-semibold">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="font-serif text-3xl md:text-4xl text-blush-300 pb-6 select-none">
      :
    </span>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    // SSR skeleton
    return (
      <section className="bg-blush-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif italic text-gold-500 text-lg mb-2">Counting down to</p>
          <h2 className="section-title">Our Big Day</h2>
          <div className="h-24" />
        </div>
      </section>
    );
  }

  const weddingPassed = WEDDING_DATE <= new Date();

  return (
    <section className="bg-blush-50 py-20" aria-label="Wedding countdown">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-serif italic text-gold-500 text-lg mb-2">Counting down to</p>
        <h2 className="section-title">Our Big Day</h2>
        <p className="section-subtitle">June 15, 2026</p>

        {weddingPassed ? (
          <p className="font-serif italic text-2xl text-blush-600">
            We are married! Thank you for celebrating with us.
          </p>
        ) : (
          <div className="flex items-end justify-center gap-3 sm:gap-5 flex-wrap">
            <Digit value={timeLeft.days} label="Days" />
            <Colon />
            <Digit value={timeLeft.hours} label="Hours" />
            <Colon />
            <Digit value={timeLeft.minutes} label="Minutes" />
            <Colon />
            <Digit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  );
}
