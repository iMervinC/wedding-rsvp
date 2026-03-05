'use client';

import { useInView } from 'react-intersection-observer';

const GOOGLE_MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.123456789!2d11.255!3d43.745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ0JzQyLjAiTiAxMcKwMTUnMTguMCJF!5e0!3m2!1sen!2sit!4v1680000000000!5m2!1sen!2sit';

interface DetailItem {
  label: string;
  value: string;
  icon: string;
}

const venueDetails: DetailItem[] = [
  { label: 'Venue', value: 'Villa Medicea di Lilliano', icon: '🏛️' },
  { label: 'Address', value: 'Via di Lilliano 8, 50012 Tuscany, Italy', icon: '📍' },
  { label: 'Date', value: 'Saturday, June 15, 2026', icon: '📅' },
  { label: 'Ceremony', value: '4:00 PM (doors open at 3:00 PM)', icon: '💒' },
  { label: 'Dress Code', value: 'Garden formal — think florals & pastels!', icon: '👗' },
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

            <div className="mt-8 pt-6 border-t border-blush-100">
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                <strong className="text-blush-600">Parking</strong> is available on site.
                Shuttle buses will run between the venue and nearby hotels from 3:00 PM
                and last drop-off at 1:00 AM.
              </p>
            </div>

            <a
              href="https://maps.google.com"
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
