import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourweddingsite.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bernadette & Nicowell — Wedding | June 15, 2026',
    template: '%s | Bernadette & Nicowell Wedding',
  },
  description:
    'Join us to celebrate the wedding of Bernadette and Nicowell on June 15, 2026 in Tuscany, Italy. RSVP now.',
  keywords: ['wedding', 'RSVP', 'Bernadette', 'Nicowell', 'celebration'],
  authors: [{ name: 'Bernadette & Nicowell' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bernadette & Nicowell Wedding',
    title: 'Bernadette & Nicowell — Getting Married!',
    description:
      'We are tying the knot on June 15, 2026. Join us for the celebration of a lifetime.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bernadette & Nicowell Wedding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bernadette & Nicowell — Getting Married!',
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
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
