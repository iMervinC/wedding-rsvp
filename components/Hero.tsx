'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Hero image */}
      <Image
        src="/images/KneelShot.jpg"
        alt="The proposal"
        fill
        priority
        className="object-cover object-[center_20%] md:object-top"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-serif italic text-gold-300 text-base md:text-2xl mb-4 animate-fade-in">
          Together with their families
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-4 animate-fade-up">
          Nicowel
          <span className="block text-3xl sm:text-4xl md:text-6xl text-gold-300 font-normal italic my-2 md:my-4">
            &amp;
          </span>
          Bernadette
        </h1>

        <div className="divider my-8 animate-fade-up-delay">
          <span className="text-gold-300 text-2xl select-none">&#10022;</span>
        </div>

        <p className="font-sans text-white/80 text-sm md:text-xl tracking-widest uppercase font-light mb-2 animate-fade-up-delay">
          Sunday, May 10, 2026
        </p>
        <p className="font-sans text-white/60 text-sm md:text-lg tracking-wider animate-fade-up-delay">
          Chancery, San Fernando, Pampanga
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
          <Link href="/rsvp" className="btn-primary">
            Kindly RSVP
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
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
