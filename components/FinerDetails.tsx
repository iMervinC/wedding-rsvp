'use client';

import { useInView } from 'react-intersection-observer';

const menColors = ['#f2c4ce', '#b07080', '#6b1a2a', '#1a1a1a'];
const womenColors = ['#f5c6d0', '#c9a0ac', '#8b1a2e', '#7a5560'];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}

export default function FinerDetails() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });

  return (
    <section id="finer-details" className="py-24 bg-blush-50" aria-label="The finer details">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="font-serif italic text-gold-500 text-lg mb-2">The Finer</p>
          <h2 className="section-title">Details</h2>
          <div className="divider w-48 mx-auto mt-4">
            <span className="text-gold-400 text-lg select-none">&#x2665;</span>
          </div>
        </div>

        <div className="flex flex-col gap-16">

          {/* Dress Code */}
          <Section delay={0}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-blush-200">
              <h3 className="font-sans font-bold uppercase tracking-widest text-blush-700 text-xl mb-3">Dress Code</h3>
              <p className="font-sans text-gray-600 leading-relaxed mb-8">
                We appreciate your effort in dressing appropriately for our special day and look forward to celebrating
                with you in style. Feel free to incorporate subtle colors that complement the wedding theme.
              </p>

              {/* Illustrations + Color swatches */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">

                {/* Men's palette + figure */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2 mb-1">
                    {menColors.slice(0, 2).map((c) => (
                      <span key={c} className="w-7 h-7 rounded-full inline-block border border-white shadow-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {menColors.slice(2).map((c) => (
                      <span key={c} className="w-9 h-9 rounded-full inline-block border border-white shadow-sm" style={{ background: c }} />
                    ))}
                  </div>
                  {/* Gentleman SVG */}
                  <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Head */}
                    <ellipse cx="40" cy="18" rx="13" ry="14" fill="#f5cba7" />
                    {/* Hair */}
                    <ellipse cx="40" cy="8" rx="13" ry="7" fill="#3b2314" />
                    {/* Neck */}
                    <rect x="35" y="30" width="10" height="8" fill="#f5cba7" />
                    {/* Shirt / tie */}
                    <rect x="28" y="36" width="24" height="6" fill="white" />
                    <polygon points="40,38 38,44 42,44" fill="#8b1a2e" />
                    {/* Suit jacket */}
                    <path d="M20 42 Q28 38 40 40 Q52 38 60 42 L62 100 H18 Z" fill="#1a1a1a" />
                    {/* Lapels */}
                    <path d="M40 40 L30 55 L20 42 Z" fill="#2a2a2a" />
                    <path d="M40 40 L50 55 L60 42 Z" fill="#2a2a2a" />
                    {/* Arms */}
                    <path d="M20 44 Q10 60 12 90 L20 90 Q20 65 26 50 Z" fill="#1a1a1a" />
                    <path d="M60 44 Q70 60 68 90 L60 90 Q60 65 54 50 Z" fill="#1a1a1a" />
                    {/* Hands */}
                    <ellipse cx="16" cy="93" rx="5" ry="6" fill="#f5cba7" />
                    <ellipse cx="64" cy="93" rx="5" ry="6" fill="#f5cba7" />
                    {/* Trousers */}
                    <rect x="22" y="98" width="16" height="55" rx="4" fill="#2c2c2c" />
                    <rect x="42" y="98" width="16" height="55" rx="4" fill="#2c2c2c" />
                    {/* Shoes */}
                    <ellipse cx="30" cy="155" rx="10" ry="5" fill="#111" />
                    <ellipse cx="50" cy="155" rx="10" ry="5" fill="#111" />
                  </svg>
                  <p className="font-sans text-xs text-gray-500 text-center">Gentlemen<br/>Suit & Tie / Polo</p>
                </div>

                <div className="hidden md:block w-px h-40 bg-blush-200" />

                {/* Lady SVG + Women's palette */}
                <div className="flex flex-col items-center gap-3">
                  {/* Lady SVG */}
                  <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Head */}
                    <ellipse cx="40" cy="18" rx="12" ry="13" fill="#f5cba7" />
                    {/* Hair */}
                    <ellipse cx="40" cy="10" rx="12" ry="9" fill="#3b2314" />
                    <ellipse cx="29" cy="20" rx="4" ry="10" fill="#3b2314" />
                    <ellipse cx="51" cy="20" rx="4" ry="10" fill="#3b2314" />
                    {/* Neck */}
                    <rect x="36" y="29" width="8" height="7" fill="#f5cba7" />
                    {/* Bodice */}
                    <path d="M26 35 Q40 30 54 35 L56 72 H24 Z" fill="#DCB2B4" />
                    {/* Arms */}
                    <path d="M26 37 Q16 52 18 78 L24 76 Q22 55 30 44 Z" fill="#f5cba7" />
                    <path d="M54 37 Q64 52 62 78 L56 76 Q58 55 50 44 Z" fill="#f5cba7" />
                    {/* Midi skirt - flared */}
                    <path d="M24 70 Q16 100 10 155 H70 Q64 100 56 70 Z" fill="#DCB2B4" />
                    {/* Skirt overlay for depth */}
                    <path d="M30 70 Q26 100 22 140 H58 Q54 100 50 70 Z" fill="#DCB2B4" opacity="0.4" />
                    {/* Shoes */}
                    <ellipse cx="28" cy="156" rx="8" ry="4" fill="#3b1a20" />
                    <ellipse cx="52" cy="156" rx="8" ry="4" fill="#3b1a20" />
                  </svg>
                  <div className="flex gap-2 mb-1">
                    {womenColors.slice(0, 2).map((c) => (
                      <span key={c} className="w-7 h-7 rounded-full inline-block border border-white shadow-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {womenColors.slice(2).map((c) => (
                      <span key={c} className="w-9 h-9 rounded-full inline-block border border-white shadow-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-gray-500 text-center">Ladies<br/>Midi or Long Dress</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Gift Note */}
          <Section delay={100}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-blush-200">
              <h3 className="font-sans font-bold uppercase tracking-widest text-blush-700 text-xl mb-3">Gift Note</h3>
              <p className="font-sans text-gray-600 leading-relaxed">
                As love is what the night is all about, your presence is one we can&apos;t celebrate without.
                But should you still believe that a gift is worth giving, a small envelope for our future
                is a delightful blessing.
              </p>
            </div>
          </Section>

          {/* With Respect */}
          <Section delay={200}>
            <div className="bg-blush-700 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
              <h3 className="font-sans font-bold uppercase tracking-widest text-white text-xl mb-4">With Respect..</h3>
              <p className="font-sans text-white leading-relaxed max-w-lg">
                Although we love your children, this is going to be an adults only kind of day.
                We hope you can join us anyway and enjoy a relaxed evening with family and friends.
              </p>
            </div>
          </Section>

        </div>
      </div>
    </section>
  );
}
