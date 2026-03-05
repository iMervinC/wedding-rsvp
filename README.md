# Wedding RSVP Website

A modern, elegant wedding RSVP website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Resend.

## Features

- Elegant hero section with animated countdown timer
- Our Story section with scroll-triggered animations
- Event timeline for the wedding day
- Lazy-loaded photo gallery with lightbox
- Google Maps venue embed
- Accessible, mobile-responsive RSVP form with validation
- Honeypot spam protection
- Formatted HTML emails sent via Resend (to couple + guest confirmation)
- Confetti animation on confirmation page
- SEO metadata + OpenGraph tags
- Deployable to Vercel in one click

---

## Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
COUPLE_EMAIL=your@email.com
FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourweddingsite.com
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Resend Setup

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key
3. Add your sending domain under **Domains** (or use `onboarding@resend.dev` for testing — only sends to your own verified email)
4. Paste the API key into `RESEND_API_KEY`

---

## Personalisation Checklist

| File | What to change |
|------|---------------|
| `app/layout.tsx` | Couple names, wedding date, venue, meta description |
| `components/Hero.tsx` | Couple names, date, venue |
| `components/Countdown.tsx` | `WEDDING_DATE` constant |
| `components/OurStory.tsx` | Story milestones |
| `components/Timeline.tsx` | Event times and descriptions |
| `components/Gallery.tsx` | Replace Unsplash URLs with your own photos |
| `components/VenueMap.tsx` | Venue name, address, map URL, details |
| `components/RSVPCta.tsx` | RSVP deadline date |
| `app/rsvp/page.tsx` | RSVP deadline text |
| `app/confirmation/page.tsx` | Confirmation messages |
| `lib/email.ts` | Email content, couple names |
| `app/page.tsx` | Footer text |

---

## Google Maps Embed URL

1. Open [Google Maps](https://maps.google.com)
2. Search for your venue
3. Click **Share** → **Embed a map**
4. Copy the `src` URL from the `<iframe>` code
5. Paste it into `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`

---

## Folder Structure

```
wedding-rsvp/
├── app/
│   ├── layout.tsx          # Root layout, fonts, global metadata
│   ├── globals.css         # Tailwind + custom CSS
│   ├── page.tsx            # Landing page (all sections)
│   ├── rsvp/
│   │   └── page.tsx        # RSVP form page
│   └── confirmation/
│       └── page.tsx        # Thank-you page with confetti
├── components/
│   ├── Navigation.tsx      # Sticky responsive nav
│   ├── Hero.tsx            # Full-screen hero section
│   ├── Countdown.tsx       # Live countdown timer (client)
│   ├── OurStory.tsx        # Story milestones with timeline
│   ├── Timeline.tsx        # Wedding day schedule
│   ├── Gallery.tsx         # Lazy photo grid + lightbox
│   ├── VenueMap.tsx        # Google Maps embed + details
│   ├── RSVPCta.tsx         # RSVP call-to-action banner
│   ├── RSVPForm.tsx        # Full form with validation (client)
│   └── ConfettiAnimation.tsx # react-confetti wrapper (client)
├── lib/
│   ├── validations.ts      # Zod schema for RSVP form
│   └── email.ts            # HTML email templates
├── actions/
│   └── rsvp.ts             # Server Action — validates & sends emails
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add environment variables in the Vercel dashboard (same as `.env.local`)
4. Click **Deploy**

That is it — Vercel handles everything automatically for Next.js projects.

---

## Adding Real Photos

Replace the Unsplash URLs in `components/Gallery.tsx` with:
- Your own images in the `public/` folder (e.g. `/photos/1.jpg`)
- Or a cloud image host (Cloudinary, imgix, etc.)

Update `next.config.ts` → `images.remotePatterns` if using an external host.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** react-hook-form + Zod
- **Email:** Resend
- **Animations:** CSS keyframes + react-intersection-observer + react-confetti
- **Fonts:** Google Fonts (Playfair Display + Lato)
- **Deployment:** Vercel
