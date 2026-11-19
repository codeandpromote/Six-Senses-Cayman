import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Six Senses Cayman Adventures | Small-Group Eco-Tours & Private Charters',
  description:
    'Small-group eco-tours and private boat charters in Grand Cayman. Departing Cayman Islands Yacht Club for Stingray City, Mangrove Forests, Coral Reefs, Starfish Point, and Bio Bay.',
  openGraph: {
    title: 'Six Senses Cayman Adventures | Grand Cayman Eco-Tours & Private Charters',
    description:
      'Unhurried small-group eco-tours and custom private charters across Grand Cayman’s North Sound. Timed around the tides, never the cruise crowds.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Six Senses Cayman Adventures | Grand Cayman',
    description:
      'Boutique small-group eco-tours and private tri-hull pontoon charters departing Cayman Islands Yacht Club.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-white text-[#0B1F2A] antialiased selection:bg-[#0E6B74]/15 selection:text-[#0B1F2A]"
      >
        {children}
      </body>
    </html>
  );
}
