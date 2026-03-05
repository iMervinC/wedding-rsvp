'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush-50 via-ivory to-sage-300/20" />
      <div
        aria-hidden="true"
        className="absolute top-20 right-10 w-72 h-72 bg-blush-200 rounded-full mix-blend-multiply opacity-40 blur-3xl animate-pulse-slow"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-10 w-64 h-64 bg-gold-300 rounded-full mix-blend-multiply opacity-30 blur-3xl animate-pulse-slow"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-48 h-48 bg-sage-300 rounded-full mix-blend-multiply opacity-25 blur-2xl"
      />

      {/* Floral corner decorations */}
      <div aria-hidden="true" className="absolute top-24 left-6 opacity-20 text-blush-400 text-7xl select-none rotate-12">
        ❀
      </div>
      <div aria-hidden="true" className="absolute bottom-24 right-6 opacity-20 text-blush-400 text-7xl select-none -rotate-12">
        ❀
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-serif italic text-gold-500 text-xl md:text-2xl mb-6 animate-fade-in">
          Together with their families
        </p>

        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-blush-700 leading-none mb-4 animate-fade-up">
        Nicowell
          <span className="block text-4xl sm:text-5xl md:text-6xl text-gold-500 font-normal italic my-3 md:my-4">
            &amp;
          </span>
          Bernadette
        </h1>

        <div className="divider my-8 animate-fade-up-delay">
          <span className="text-gold-400 text-2xl select-none">&#10022;</span>
        </div>

        <p className="font-sans text-gray-500 text-lg md:text-xl tracking-widest uppercase font-light mb-2 animate-fade-up-delay">
          Sunday, May 10, 2026
        </p>
        <p className="font-sans text-gray-400 text-base md:text-lg tracking-wider animate-fade-up-delay">
          Chancery, San Fernando, Pampanga
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
          <Link href="/rsvp" className="btn-primary">
            Kindly RSVP
          </Link>
          <button
            onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-blush-400 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
