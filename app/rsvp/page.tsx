import type { Metadata } from 'next';
import Link from 'next/link';
import RSVPForm from '@/components/RSVPForm';

export const metadata: Metadata = {
  title: 'RSVP',
  description: 'Kindly reply to the wedding invitation of Bernadette & Nicowel.',
};

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-blush-600 hover:text-blush-800 font-sans text-sm font-semibold transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <div className="relative overflow-hidden">
        {/* Decorative background blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-96 h-96 bg-blush-100 rounded-full mix-blend-multiply opacity-60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-sage-300 rounded-full mix-blend-multiply opacity-40 blur-3xl"
        />

        <div className="relative max-w-2xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-serif italic text-gold-500 text-lg mb-2">Kindly Reply</p>
            <h1 className="font-serif text-5xl md:text-6xl text-blush-700 mb-4">RSVP</h1>
            <div className="divider">
              <span className="text-gold-400 text-xl select-none">&#x2665;</span>
            </div>
            <p className="text-gray-600 font-sans mt-4 leading-relaxed">
              We would be delighted to have you join us on our special day.
              <br className="hidden sm:block" />
              Please respond by <strong>May 1, 2026</strong>.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-blush-100 p-8 md:p-12">
            <RSVPForm />
          </div>
        </div>
      </div>
    </main>
  );
}
