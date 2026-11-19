'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  filterExcursions,
  type ExcursionCategory,
  type ExcursionSpec,
} from '@/lib/charter';
import { EXCURSIONS } from '@/lib/data';
import { MEDIA_ASSETS } from '@/lib/media';

interface ExcursionsSectionProps {
  onSelectExcursion: (excursion: ExcursionSpec) => void;
}

const FILTER_OPTIONS: { id: ExcursionCategory; label: string }[] = [
  { id: 'all', label: 'All Excursions' },
  { id: 'eco', label: 'Small-Group Eco' },
  { id: 'private', label: 'Private Charters' },
  { id: 'evening', label: 'Evening & Bio Bay' },
];

export default function ExcursionsSection({
  onSelectExcursion,
}: ExcursionsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ExcursionCategory>('all');
  const [detailExcursion, setDetailExcursion] = useState<ExcursionSpec | null>(
    null
  );

  const visibleExcursions = filterExcursions(EXCURSIONS, activeFilter);

  useEffect(() => {
    if (!detailExcursion) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDetailExcursion(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailExcursion]);

  const handleReserveClick = (excursion: ExcursionSpec) => {
    setDetailExcursion(null);
    onSelectExcursion(excursion);
    const target = document.getElementById('inquire');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="excursions"
      aria-labelledby="excursions-heading"
      className="scroll-mt-16 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="flex flex-col justify-between gap-6 border-b border-[#E2E8EC] pb-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium text-[#0E6B74]">
            Curated North Sound Excursions
          </p>
          <h2
            id="excursions-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] [text-wrap:balance]"
          >
            Small boats, unhurried routes, and room to breathe.
          </h2>
          <p className="text-base leading-relaxed text-[#475B66]">
            Every excursion departs directly from the Cayman Islands Yacht Club
            aboard our stable tri-hulled pontoon—strictly capped at 15 guests so
            you experience Grand Cayman’s waters without crowds.
          </p>
        </div>

        {/* Interactive segmented filter controls */}
        <div
          role="group"
          aria-label="Filter excursions by category"
          className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F5F7F8] p-1 border border-[#E2E8EC]"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(option.id)}
                className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74] ${
                  isActive
                    ? 'bg-white text-[#0B1F2A] shadow-xs'
                    : 'text-[#475B66] hover:text-[#0B1F2A]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {visibleExcursions.map((excursion) => {
          const media = MEDIA_ASSETS[excursion.imageKey];
          const isFeaturedLayout =
            activeFilter === 'all' && Boolean(excursion.featured);
          const priceLabel =
            excursion.pricingMode === 'private'
              ? `From $${excursion.basePriceUsd.toLocaleString()} private vessel`
              : `$${excursion.basePriceUsd} adult · $${excursion.childPriceUsd} child`;

          if (isFeaturedLayout) {
            return (
              <article
                key={excursion.id}
                className="group overflow-hidden rounded-xl border border-[#E2E8EC] bg-white lg:col-span-12"
              >
                <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9EFF2] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                    <div className="space-y-4">
                      <p className="text-xs font-medium text-[#475B66] tabular-nums">
                        <span>{excursion.categoryLabel}</span>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span>{excursion.durationLabel}</span>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span>Max {excursion.maxGuests} guests</span>
                      </p>

                      <h3 className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A]">
                        {excursion.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed text-[#475B66]">
                        {excursion.summary}
                      </p>

                      <div className="border-t border-[#E2E8EC] pt-4">
                        <p className="text-xs font-medium text-[#0B1F2A]">
                          Departure windows
                        </p>
                        <p className="mt-1 text-sm text-[#475B66]">
                          {excursion.departureTiming}
                        </p>
                      </div>

                      <div className="border-t border-[#E2E8EC] pt-4">
                        <p className="text-xs font-medium text-[#0B1F2A]">
                          Accessibility &amp; comfort
                        </p>
                        <p className="mt-1 text-sm text-[#475B66]">
                          {excursion.accessibilityNote}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-[#E2E8EC] pt-6">
                      <p className="text-sm font-semibold text-[#0B1F2A] tabular-nums">
                        {priceLabel}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleReserveClick(excursion)}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0E6B74] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
                        >
                          Select &amp; Inquire
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDetailExcursion(excursion)}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#CBD6DC] bg-white px-4 py-2.5 text-sm font-medium text-[#0B1F2A] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                        >
                          View Itinerary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={excursion.id}
              className={`group flex flex-col overflow-hidden rounded-xl border border-[#E2E8EC] bg-white ${
                activeFilter === 'all'
                  ? 'lg:col-span-4'
                  : visibleExcursions.length === 1
                    ? 'lg:col-span-8'
                    : 'lg:col-span-6'
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9EFF2]">
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#475B66] tabular-nums">
                    <span>{excursion.categoryLabel}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{excursion.durationLabel}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>Max {excursion.maxGuests}</span>
                  </p>

                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-[#0B1F2A]">
                    {excursion.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#475B66]">
                    {excursion.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t border-[#E2E8EC] pt-5">
                  <p className="text-sm font-semibold text-[#0B1F2A] tabular-nums">
                    {priceLabel}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleReserveClick(excursion)}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#0B1F2A] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#163445] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                    >
                      Select &amp; Inquire
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailExcursion(excursion)}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-[#0E6B74] whitespace-nowrap shrink-0 transition-colors hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Accessible Itinerary Detail Modal */}
      <AnimatePresence>
        {detailExcursion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F2A]/70 p-4 backdrop-blur-xs"
            onClick={() => setDetailExcursion(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="itinerary-modal-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#E2E8EC] bg-white p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#E2E8EC] pb-5">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#0E6B74] tabular-nums">
                    {detailExcursion.categoryLabel} · {detailExcursion.durationLabel} · Up to{' '}
                    {detailExcursion.maxGuests} Guests
                  </p>
                  <h3
                    id="itinerary-modal-title"
                    className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A]"
                  >
                    {detailExcursion.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setDetailExcursion(null)}
                  aria-label="Close itinerary details"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#E2E8EC] text-[#0B1F2A] transition-colors hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <p className="text-sm sm:text-base leading-relaxed text-[#475B66]">
                  {detailExcursion.summary}
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0B1F2A]">
                      Route Stops
                    </h4>
                    <ol className="mt-3 space-y-2 text-sm text-[#475B66]">
                      {detailExcursion.stops.map((stop, idx) => (
                        <li key={stop} className="flex items-baseline gap-2.5">
                          <span className="font-medium text-[#0E6B74] tabular-nums">
                            0{idx + 1}.
                          </span>
                          <span>{stop}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#0B1F2A]">
                      Included Onboard
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#475B66]">
                      {detailExcursion.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#0E6B74]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-[#E2E8EC] bg-[#F5F7F8] p-4">
                  <h4 className="text-xs font-semibold text-[#0B1F2A]">
                    Accessibility &amp; Boarding Comfort
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#475B66]">
                    {detailExcursion.accessibilityNote}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8EC] pt-5">
                  <div>
                    <p className="text-xs text-[#475B66]">Departure timing</p>
                    <p className="text-sm font-medium text-[#0B1F2A]">
                      {detailExcursion.departureTiming}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReserveClick(detailExcursion)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0E6B74] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
                  >
                    Reserve This Excursion
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
