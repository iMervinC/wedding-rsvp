'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function RSVPCta() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="rsvp-cta"
      className="py-28 bg-gradient-to-br from-blush-600 via-blush-500 to-blush-700 relative overflow-hidden"
      aria-label="RSVP call to action"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-80 h-80 bg-gold-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"
      />

      <div
        ref={ref}
        className={`relative max-w-2xl mx-auto px-4 text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="font-serif italic text-gold-300 text-xl mb-3">You are invited</p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-5">
          Will You Join Us?
        </h2>
        <div className="divider w-56 mx-auto text-white/40 my-6">
          <span className="text-gold-300 text-xl select-none">&#x2665;</span>
        </div>
        <p className="font-sans text-white/80 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          We would be honoured to have you celebrate this momentous occasion with us.
          Please RSVP by <strong className="text-white">May 1, 2026</strong>.
        </p>
        <Link
          href="/rsvp"
          className="inline-block bg-white text-blush-600 hover:bg-blush-50 font-sans font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
        >
          Send Your RSVP
        </Link>
      </div>
    </section>
  );
}
