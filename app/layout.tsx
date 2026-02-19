import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

// Google Fonts configuration
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://taneaspa.com'),
  title: {
    default: 'Tanea Spa — Resort Level Relaxation di Jakarta Timur',
    template: '%s | Tanea Spa',
  },
  description:
    'Tanea Spa — Resort Level Relaxation di Duren Sawit, Jakarta Timur. ' +
    'Nikmati Tanea Signature Massage, Sundara Massage, Agni Watu, Refleksi, ' +
    'dan Spa Ritual tradisional Bali. Booking online sekarang.',
  keywords: [
    'tanea spa', 'spa duren sawit', 'spa jakarta timur',
    'pijat duren sawit', 'resort level relaxation',
    'tanea signature massage', 'spa tradisional bali jakarta',
    'spa pondok bambu', 'pijat batu panas jakarta',
    'spa packages jakarta', 'reflexology jakarta timur',
    'lulur bali jakarta', 'hot stone massage jakarta',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://taneaspa.com',
    siteName: 'Tanea Spa Jakarta',
    title: 'Tanea Spa — Resort Level Relaxation',
    description:
      'Spa premium di Duren Sawit, Jakarta Timur. ' +
      'Massage, Refleksi, Spa Packages & Ritual tradisional Bali.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tanea Spa Resort Level Relaxation' }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://taneaspa.com' },
};

// JSON-LD Structured Data for DaySpa
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DaySpa',
  name: 'Tanea Spa',
  description: 'Resort Level Relaxation — Spa premium di Duren Sawit, Jakarta Timur.',
  slogan: 'Resort Level Relaxation',
  url: 'https://taneaspa.com',
  image: 'https://taneaspa.com/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Laut Arafuru Blok C2 No.1',
    addressLocality: 'Pondok Bambu, Kec. Duren Sawit',
    addressRegion: 'Jakarta Timur',
    postalCode: '13430',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2215,
    longitude: 106.9015,
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  }],
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/tanea.spa/'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
