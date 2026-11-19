'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_ORDER } from '@/lib/data';
import { MEDIA_ASSETS } from '@/lib/media';

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const galleryItems = GALLERY_ORDER.map((key) => MEDIA_ASSETS[key]);
  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null;

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length
    );
  }, [galleryItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryItems.length
    );
  }, [galleryItems.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowLeft') {
        showPrev();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, showPrev, showNext]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-16 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium text-[#0E6B74]">
            Field Photography
          </p>
          <h2
            id="gallery-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] [text-wrap:balance]"
          >
            Light, depth, and quiet waters across Grand Cayman.
          </h2>
        </div>

        <p className="text-sm text-[#475B66]">
          Select any photograph to inspect full frame
        </p>
      </div>

      {/* Asymmetric photography-first editorial bento grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {galleryItems.map((item, index) => {
          const spanClass =
            index === 0
              ? 'sm:col-span-2 lg:col-span-7 aspect-[16/10]'
              : index === 1
                ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[340px]'
                : index === 4
                  ? 'sm:col-span-2 lg:col-span-7 aspect-[16/10]'
                  : index === 5
                    ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[320px]'
                    : 'lg:col-span-6 aspect-[4/3]';

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open full view: ${item.title}`}
              className={`group relative overflow-hidden rounded-xl bg-[#E9EFF2] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6B74] ${spanClass}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                referrerPolicy="no-referrer"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B1F2A]/80 via-[#0B1F2A]/20 to-transparent opacity-90 transition-opacity duration-200 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-[#D6E6EE]">
                  {item.location}
                </p>
                <p className="mt-1 font-serif text-xl sm:text-2xl font-medium text-white">
                  {item.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Accessible Lightbox */}
      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07141B]/95 p-4 sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs font-medium text-[#B6C7D1] tabular-nums">
                {activeIndex + 1} / {galleryItems.length} · {activeItem.location}
              </p>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close photograph viewer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative mx-auto my-4 flex w-full max-w-5xl flex-1 items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="absolute left-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-[#0B1F2A]/80 text-white transition-colors hover:bg-[#0B1F2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-left-14"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="relative h-[55vh] w-full overflow-hidden rounded-lg sm:h-[66vh]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="90vw"
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="absolute right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-[#0B1F2A]/80 text-white transition-colors hover:bg-[#0B1F2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-right-14"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="mx-auto w-full max-w-4xl border-t border-white/15 pt-4 text-left sm:flex sm:items-end sm:justify-between sm:gap-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <h3
                  id="lightbox-title"
                  className="font-serif text-2xl font-medium text-white"
                >
                  {activeItem.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#CFE0E8]">
                  {activeItem.caption}
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9BB1BD] whitespace-nowrap sm:mt-0">
                {activeItem.timing}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
