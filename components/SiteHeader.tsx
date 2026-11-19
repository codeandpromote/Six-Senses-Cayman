'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/data';

const NAV_LINKS = [
  { href: '#excursions', label: 'Excursions' },
  { href: '#route', label: 'The 6 Stops' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'Our Ethos' },
  { href: '#reviews', label: 'Reviews' },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#0B1F2A] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0E6B74]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#E2E8EC] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single clean text wordmark */}
          <a
            href="#top"
            className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1F2A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6B74]"
          >
            {BUSINESS_INFO.brandShort}
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475B66]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0B1F2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6B74] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#0E6B74] after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary CTA (plus accessible mobile menu toggle on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#inquire"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#0E6B74] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
            >
              Reserve Charter
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#E2E8EC] text-[#0B1F2A] transition-colors hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile navigation"
            className="border-t border-[#E2E8EC] bg-white px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-[#0B1F2A] transition-colors hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-[#0E6B74]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#inquire"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex min-h-[44px] items-center justify-center rounded-md bg-[#0E6B74] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
              >
                Reserve Charter
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
