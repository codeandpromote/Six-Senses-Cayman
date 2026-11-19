import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, KEY_FACTS } from '@/lib/data';
import { MEDIA_ASSETS } from '@/lib/media';

export default function HeroSection() {
  const heroMedia = MEDIA_ASSETS.sandbar;

  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-white">
      {/* Full-bleed editorial photographic hero */}
      <div className="relative isolate flex min-h-[74vh] items-end overflow-hidden bg-[#0B1F2A] lg:min-h-[82vh]">
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
        />

        {/* Measured directional scrim ensuring > 8:1 WCAG contrast on overlay typography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071720]/90 via-[#071720]/40 to-[#071720]/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#071720]/70 via-[#071720]/25 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="max-w-2xl space-y-5">
            <p className="text-xs sm:text-sm font-medium tracking-[0.04em] text-[#D7E8F0]">
              {BUSINESS_INFO.locationShort}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] font-medium leading-[1.06] tracking-tight text-white [text-wrap:balance]"
            >
              Private waters, unhurried horizons.
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#E4EEF3]">
              Small-group eco-tours and custom private charters across Grand
              Cayman’s North Sound—timed around the tides, never the cruise
              crowds.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#inquire"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#0E6B74] px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Plan Your Excursion
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#route"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-white underline decoration-white/50 underline-offset-4 whitespace-nowrap shrink-0 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the 6-Stop Eco Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width editorial fact bar below hero */}
      <div className="border-b border-[#E2E8EC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 divide-y divide-[#E2E8EC] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {KEY_FACTS.map((fact, idx) => (
              <div
                key={fact.value}
                className={`py-5 sm:py-6 ${
                  idx > 0 ? 'sm:pl-6 lg:pl-8' : ''
                } ${idx % 2 === 1 ? 'pl-4 sm:pl-6 lg:pl-8' : 'pr-4'}`}
              >
                <dt className="text-xs text-[#475B66]">{fact.label}</dt>
                <dd className="mt-1 font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1F2A] tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
