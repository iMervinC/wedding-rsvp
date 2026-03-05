'use client';

import { useInView } from 'react-intersection-observer';

interface Event {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const events: Event[] = [
  {
    time: '3:00 PM',
    title: 'Guest Arrival',
    description: 'Guests arrive and are welcomed with prosecco and canapés in the villa gardens.',
    icon: '🥂',
  },
  {
    time: '4:00 PM',
    title: 'Wedding Ceremony',
    description:
      'The ceremony takes place in the estate chapel, followed by a blessing under the olive trees.',
    icon: '💒',
  },
  {
    time: '5:00 PM',
    title: 'Cocktail Hour',
    description:
      'Celebrate with cocktails, live acoustic music, and stunning vineyard views.',
    icon: '🎸',
  },
  {
    time: '6:30 PM',
    title: 'Wedding Dinner',
    description:
      'A lavish Tuscan feast served al fresco as the sun sets over the rolling hills.',
    icon: '🍽️',
  },
  {
    time: '8:30 PM',
    title: 'First Dance',
    description:
      'The bride and groom take to the floor for their first dance, followed by the wedding party.',
    icon: '💃',
  },
  {
    time: '9:00 PM',
    title: 'Dancing & Celebration',
    description: 'Dance the night away with live music and a curated DJ set until midnight.',
    icon: '🎉',
  },
];

function EventCard({ event, index }: { event: Event; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`flex gap-5 transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 bg-blush-100 border-2 border-blush-200 rounded-full flex items-center justify-center text-xl shadow-sm">
          {event.icon}
        </div>
        {index < events.length - 1 && (
          <div className="w-px flex-1 bg-blush-200 mt-2" aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <span className="inline-block font-sans text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 bg-gold-300/30 px-2.5 py-0.5 rounded-full">
          {event.time}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-blush-700 mb-1.5">{event.title}</h3>
        <p className="font-sans text-gray-600 leading-relaxed text-sm md:text-base">
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });

  return (
    <section id="timeline" className="py-24 bg-blush-50" aria-label="Event timeline">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-serif italic text-gold-500 text-lg mb-2">June 15, 2026</p>
          <h2 className="section-title">Day of Events</h2>
          <div className="divider w-48 mx-auto mt-4">
            <span className="text-gold-400 text-lg select-none">&#x2665;</span>
          </div>
        </div>

        {/* Events */}
        <div>
          {events.map((event, i) => (
            <EventCard key={event.time} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
