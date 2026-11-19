import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import {
  ACCESSIBILITY_PILLARS,
  BUSINESS_INFO,
  GUEST_REVIEWS,
} from '@/lib/data';
import { MEDIA_ASSETS } from '@/lib/media';

export default function EthosAndReviews() {
  const vesselMedia = MEDIA_ASSETS.pontoon;

  return (
    <>
      {/* Brand Story, Vessel & Accessibility Commitment */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-16 border-t border-[#E2E8EC] bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
            <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#0E6B74]">
                  Our Ethos &amp; Vessel Accessibility
                </p>
                <h2
                  id="about-heading"
                  className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] [text-wrap:balance]"
                >
                  Built for stay-over travelers who value calm water over crowds.
                </h2>
                <p className="text-base leading-relaxed text-[#475B66]">
                  Founded locally by {BUSINESS_INFO.founder}, Six Senses Cayman
                  Adventures was created as an antidote to high-capacity cruise
                  excursions. Our tri-hulled pontoon rides smoothly over shallow
                  North Sound shoals, reaching living mangrove channels and
                  sandbars that deep-draft catamarans cannot enter—while keeping
                  every guest shaded, steady, and unhurried.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-[#E2E8EC] pt-8 sm:grid-cols-2">
                {ACCESSIBILITY_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-[#0B1F2A]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#475B66]">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:col-span-6">
              <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-xl bg-[#E9EFF2] lg:aspect-auto lg:min-h-[460px]">
                <Image
                  src={vesselMedia.src}
                  alt={vesselMedia.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-[#475B66]">
                {vesselMedia.title} · {vesselMedia.location} · {vesselMedia.timing}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adjacent Proof: Attributable Guest Stories */}
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="scroll-mt-16 border-t border-[#E2E8EC] bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8EC] pb-8 sm:flex-row sm:items-end">
            <div className="max-w-xl space-y-2">
              <p className="text-sm font-medium text-[#0E6B74]">
                Guest Perspectives
              </p>
              <h2
                id="reviews-heading"
                className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl [text-wrap:balance]"
              >
                Why families return to the Yacht Club dock year after year.
              </h2>
            </div>

            <a
              href={BUSINESS_INFO.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#0E6B74] whitespace-nowrap shrink-0 hover:text-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6B74]"
            >
              Read Google Business Reviews
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {GUEST_REVIEWS.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-[#E2E8EC] bg-[#FAFCFD] p-6 sm:p-7"
              >
                <div className="space-y-4">
                  <p className="text-xs font-medium text-[#475B66]">
                    {review.excursion} · {review.dateLabel}
                  </p>
                  <blockquote className="text-sm sm:text-[15px] leading-relaxed text-[#0B1F2A]">
                    “{review.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-6 border-t border-[#E2E8EC] pt-4">
                  <p className="text-sm font-semibold text-[#0B1F2A]">
                    {review.guestName}
                  </p>
                  <p className="mt-0.5 text-xs text-[#475B66]">
                    {review.origin} · {review.outcome}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
