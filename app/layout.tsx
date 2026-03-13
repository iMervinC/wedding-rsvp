import type { Metadata } from 'next';
import { Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourweddingsite.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bernadette & Nicowel — Wedding | June 15, 2026',
    template: '%s | Bernadette & Nicowel Wedding',
  },
  description:
    'Join us to celebrate the wedding of Bernadette and Nicowel on June 15, 2026. RSVP now.',
  keywords: ['wedding', 'RSVP', 'Bernadette', 'Nicowel', 'celebration'],
  authors: [{ name: 'Bernadette & Nicowel' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bernadette & Nicowel Wedding',
    title: 'Bernadette & Nicowel — Getting Married!',
    description:
      'We are tying the knot on June 15, 2026. Join us for the celebration of a lifetime.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bernadette & Nicowel Wedding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bernadette & Nicowel — Getting Married!',
    description: 'Join us on June 15, 2026 for our special day.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
