'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SIX_STOPS } from '@/lib/data';
import { MEDIA_ASSETS } from '@/lib/media';

export default function SixStopRoute() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentStop = SIX_STOPS[selectedIndex];
  const currentMedia = MEDIA_ASSETS[currentStop.imageKey];

  return (
    <section
      id="route"
      aria-labelledby="route-heading"
      className="scroll-mt-16 border-y border-[#E2E8EC] bg-[#F5F7F8]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium text-[#0E6B74]">
            The Signature 5-Hour Route
          </p>
          <h2
            id="route-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] [text-wrap:balance]"
          >
            Six distinct stops across the North Sound.
          </h2>
          <p className="text-base leading-relaxed text-[#475B66]">
            Select any chapter below to explore water depth, marine ecology, and
            accessibility notes for every stop along our signature eco-tour.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Interactive chapter list + route pacing note */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div
              role="tablist"
              aria-label="Signature six-stop itinerary"
              className="flex flex-col divide-y divide-[#E2E8EC] overflow-hidden rounded-xl border border-[#E2E8EC] bg-white"
            >
              {SIX_STOPS.map((stop, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={stop.number}
                    type="button"
                    role="tab"
                    id={`route-tab-${stop.number}`}
                    aria-selected={isSelected}
                    aria-controls={`route-panel-${stop.number}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex min-h-[68px] w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0E6B74] ${
                      isSelected
                        ? 'bg-[#0B1F2A] text-white'
                        : 'bg-white text-[#0B1F2A] hover:bg-[#F5F7F8]'
                    }`}
                  >
                    <div className="flex items-baseline gap-3.5 min-w-0">
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isSelected ? 'text-[#7DD3DC]' : 'text-[#0E6B74]'
                        }`}
                      >
                        {stop.number}.
                      </span>
                      <span className="font-serif text-xl font-medium tracking-tight truncate">
                        {stop.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs whitespace-nowrap shrink-0 tabular-nums ${
                        isSelected ? 'text-[#D7E6EE]' : 'text-[#475B66]'
                      }`}
                    >
                      {stop.duration}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-[#E2E8EC] bg-white p-6 space-y-2">
              <p className="text-xs font-semibold text-[#0B1F2A]">
                Dynamic Tide &amp; Crowd Timing
              </p>
              <p className="text-sm leading-relaxed text-[#475B66]">
                Captain PJ adapts stop order each day to North Sound wind, reef
                visibility, and cruise-ship schedules—ensuring your group reaches
                Stingray City Sandbar when the water is quietest.
              </p>
            </div>
          </div>

          {/* Synchronized editorial stop spotlight */}
          <div
            role="tabpanel"
            id={`route-panel-${currentStop.number}`}
            aria-labelledby={`route-tab-${currentStop.number}`}
            className="flex flex-col overflow-hidden rounded-xl border border-[#E2E8EC] bg-white lg:col-span-7"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9EFF2]">
              <Image
                src={currentMedia.src}
                alt={currentMedia.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-xs font-medium text-[#475B66] tabular-nums">
                  <span>Stop {currentStop.number} of 06</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{currentStop.duration}</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{currentStop.waterDepth}</span>
                </p>

                <h3 className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A]">
                  {currentStop.name}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#475B66]">
                  {currentStop.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[#E2E8EC] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-[#0B1F2A]">
                    Marine Ecology Focus
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#475B66]">
                    {currentStop.ecologyNote}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#0B1F2A]">
                    Accessibility &amp; Swim Level
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#475B66]">
                    {currentStop.accessibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
