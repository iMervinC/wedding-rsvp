import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import OurStory from '@/components/OurStory';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import VenueMap from '@/components/VenueMap';
import RSVPCta from '@/components/RSVPCta';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navigation />
      <Hero />
      <Countdown />
      <OurStory />
      <Timeline />
      <Gallery />
      <VenueMap />
      <RSVPCta />
      <footer className="bg-blush-700 text-blush-100 text-center py-8 font-sans text-sm">
        <p className="font-serif italic text-lg text-white mb-1">Bernadette &amp; Nicowell</p>
        <p className="opacity-70">May 10, 2026 · San Fernando, Pampanga</p>
        <p className="mt-4 opacity-50 text-xs">Made with love &hearts;</p>
      </footer>
    </main>
  );
}
