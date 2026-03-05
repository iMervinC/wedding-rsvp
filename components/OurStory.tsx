'use client';

import { useInView } from 'react-intersection-observer';

interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  emoji: string;
}

const milestones: StoryMilestone[] = [
  {
    year: '2019',
    title: 'The First Meeting',
    description:
      'We met at a mutual friend\'s art gallery opening in Florence. James was admiring a painting Sophie had recommended — neither of them knew yet that the real masterpiece that evening was their conversation.',
    emoji: '🎨',
  },
  {
    year: '2020',
    title: 'Our First Date',
    description:
      'A candlelit dinner at a tiny trattoria in the backstreets of Rome. James got completely lost trying to find it, but Sophie says the hour she spent waiting was worth every minute.',
    emoji: '🕯️',
  },
  {
    year: '2022',
    title: 'Moving In Together',
    description:
      'We found a little apartment in Trastevere with a rooftop terrace overlooking the city. Our neighbour gifted us an olive tree that we still tend to this day.',
    emoji: '🏡',
  },
  {
    year: '2025',
    title: 'The Proposal',
    description:
      'Under a Tuscan sunset, beside the very vineyard where we will be married, James got down on one knee. Sophie said yes before he had even finished the question.',
    emoji: '💍',
  },
];

function MilestoneCard({ milestone, index }: { milestone: StoryMilestone; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Text */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <span className="inline-block font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2 bg-gold-300/30 px-3 py-1 rounded-full">
          {milestone.year}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-blush-700 mb-3">{milestone.title}</h3>
        <p className="font-sans text-gray-600 leading-relaxed">{milestone.description}</p>
      </div>

      {/* Center icon */}
      <div className="flex-shrink-0 w-16 h-16 bg-white border-2 border-blush-200 rounded-full flex items-center justify-center shadow-md text-2xl z-10">
        {milestone.emoji}
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function OurStory() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });

  return (
    <section id="our-story" className="py-24 bg-white" aria-label="Our story">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-serif italic text-gold-500 text-lg mb-2">How it all began</p>
          <h2 className="section-title">Our Story</h2>
          <div className="divider w-48 mx-auto mt-4">
            <span className="text-gold-400 text-lg select-none">&#x2665;</span>
          </div>
          <p className="mt-6 text-gray-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Two hearts, one journey. From a chance meeting in Florence to a lifetime commitment
            in the Tuscan hills — here is a glimpse of the moments that brought us here.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-blush-200 hidden md:block"
          />

          <div className="flex flex-col gap-16">
            {milestones.map((milestone, i) => (
              <MilestoneCard key={milestone.year} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
