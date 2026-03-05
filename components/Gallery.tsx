'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Couple walking in vineyard',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    alt: 'Wedding rings on flowers',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794079-73b1f3de9753?w=800&q=80',
    alt: 'Couple at sunset',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    alt: 'Wedding table setting',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    alt: 'Bouquet of flowers',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    alt: 'Couple dancing',
    span: 'md:col-span-2',
  },
];

interface PhotoCardProps {
  src: string;
  alt: string;
  span: string;
  index: number;
  onClick: () => void;
}

function PhotoCard({ src, alt, span, index, onClick }: PhotoCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 ${span} ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        transition: `opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${alt}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="relative w-full h-full min-h-[200px] md:min-h-[240px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blush-900/0 group-hover:bg-blush-900/20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-10 h-10 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });

  return (
    <section id="gallery" className="py-24 bg-white" aria-label="Photo gallery">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-serif italic text-gold-500 text-lg mb-2">Memories</p>
          <h2 className="section-title">Gallery</h2>
          <div className="divider w-48 mx-auto mt-4">
            <span className="text-gold-400 text-lg select-none">&#x2665;</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {photos.map((photo, i) => (
            <PhotoCard
              key={photo.src}
              {...photo}
              index={i}
              onClick={() => setLightboxSrc(photo.src)}
            />
          ))}
        </div>

        <p className="text-center mt-8 font-sans text-sm text-gray-400 italic">
          More photos coming soon — stay tuned!
        </p>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl leading-none"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Gallery photo"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
