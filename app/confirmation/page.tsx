import type { Metadata } from 'next';
import Link from 'next/link';
import ConfettiAnimation from '@/components/ConfettiAnimation';

export const metadata: Metadata = {
  title: 'Thank You!',
  description: 'Your RSVP has been received. We cannot wait to celebrate with you!',
};

interface Props {
  searchParams: { name?: string; attending?: string };
}

export default function ConfirmationPage({ searchParams }: Props) {
  const name = searchParams.name ?? 'Friend';
  const attending = searchParams.attending === 'yes';

  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center relative overflow-hidden px-4">
      <ConfettiAnimation show={attending} />

      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-80 h-80 bg-blush-100 rounded-full opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-80 h-80 bg-gold-300 rounded-full opacity-30 blur-3xl"
      />

      <div className="relative text-center max-w-lg mx-auto animate-fade-up">
        {/* Icon */}
        <div className="w-24 h-24 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-float">
          {attending ? (
            <svg
              className="w-12 h-12 text-blush-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ) : (
            <svg
              className="w-12 h-12 text-sage-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Heading */}
        <p className="font-serif italic text-gold-500 text-xl mb-2">
          {attending ? 'See you there!' : 'You will be missed!'}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-blush-700 mb-4">
          Thank You, {name}!
        </h1>

        <div className="divider my-6">
          <span className="text-gold-400 text-xl select-none">&#x2665;</span>
        </div>

        {attending ? (
          <p className="text-gray-600 font-sans text-lg leading-relaxed mb-8">
            We are so excited to celebrate with you! A confirmation email has been sent
            to your inbox with all the details. We cannot wait to see you on{' '}
            <strong>June 15, 2026</strong>.
          </p>
        ) : (
          <p className="text-gray-600 font-sans text-lg leading-relaxed mb-8">
            We completely understand and we will miss you dearly. Thank you for letting
            us know. We will be thinking of you on our special day.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Our Story
          </Link>
        </div>

        <p className="mt-10 font-serif italic text-blush-400 text-2xl">
          Bernadette &amp; Nicowel
        </p>
      </div>
    </main>
  );
}
