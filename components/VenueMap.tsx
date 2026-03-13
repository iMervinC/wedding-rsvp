'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const GOOGLE_MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
  'https://maps.google.com/maps?q=Arzobispado+De+Pampanga+San+Fernando+Pampanga+Philippines&output=embed&z=16';

interface DetailItem {
  label: string;
  value: string;
  icon: string;
}

const venueDetails: DetailItem[] = [
  { label: 'Venue', value: 'Chancery (Arzobispado De Pampanga)', icon: '🏛️' },
  { label: 'Address', value: 'San Fernando, Pampanga, Philippines', icon: '📍' },
  { label: 'Date', value: 'May 10, 2026', icon: '📅' },
];

export default function VenueMap() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });

  return (
    <section id="venue" className="py-24 bg-blush-50" aria-label="Venue and location">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-serif italic text-gold-500 text-lg mb-2">Find Us</p>
          <h2 className="section-title">The Venue</h2>
          <div className="divider w-48 mx-auto mt-4">
            <span className="text-gold-400 text-lg select-none">&#x2665;</span>
          </div>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-10 items-start transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-blush-100">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding venue location on Google Maps"
            />
          </div>

          {/* Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-blush-100 p-8 md:p-10">
            <h3 className="font-serif text-3xl text-blush-700 mb-6">Venue Details</h3>

            <ul className="space-y-5">
              {venueDetails.map((detail) => (
                <li key={detail.label} className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{detail.icon}</span>
                  <div>
                    <span className="block font-sans text-xs uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
                      {detail.label}
                    </span>
                    <span className="font-sans text-gray-700">{detail.value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-blush-100 flex items-center gap-4">
              <Image
                src="/images/qr-code.png"
                alt="QR Code for venue directions"
                width={90}
                height={90}
                className="rounded-lg border border-blush-200 flex-shrink-0"
              />
              <div>
                <span className="block font-sans text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Scan for Directions</span>
                <p className="font-sans text-gray-600 text-sm leading-relaxed">Point your camera at this QR code to open the venue in Google Maps.</p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Arzobispado+De+Pampanga+San+Fernando+Pampanga+Philippines"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-6 inline-block text-sm py-2"
            >
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
