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
    year: '2015',
    title: 'How It All Started',
    description:
      'Bernadette and Nicowel were college blockmates taking up BS Medical Technology in 2015. They didn\'t get along at first and often argued — especially over one chemistry homework. But in March 2017, Nicowel finally confessed that he liked Bernadette, turning their story from enemies to lovers.',
    emoji: '🔬',
  },
  {
    year: '2019',
    title: 'Trust in the Process',
    description:
      'Nicowel courted Bernadette for two years before they became a couple. Together, they supported each other through college and passed the board exam in 2019. In 2023, Bernadette moved to Canada, testing their relationship with distance — but their love only grew stronger.',
    emoji: '🩺',
  },
  {
    year: '2025',
    title: 'The Proposal',
    description:
      'After nearly two years apart, Bernadette returned to the Philippines. On March 11, 2025, during their trip to Boracay, Nicowel surprised Bernadette with a proposal during their photoshoot — and Bernadette said yes. 🤍\n\n"Sa hinahaba-haba man ng prusisyon, sa simbahan pa rin ang tuloy." 🤍',
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
        <p className="font-sans text-gray-600 leading-relaxed whitespace-pre-line">{milestone.description}</p>
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
            From blockmates to lovers — here is a glimpse of the journey that brought Bernadette and Nicowel to forever.
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
