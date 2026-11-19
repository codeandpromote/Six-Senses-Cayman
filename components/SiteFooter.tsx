import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/data';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#1D3542] bg-[#0B1F2A] text-[#E6EEF2]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="font-serif text-2xl font-semibold tracking-tight text-white">
              {BUSINESS_INFO.brandFull}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-[#B6C7D1]">
              Locally owned and operated in Grand Cayman by {BUSINESS_INFO.founder}.
              Small-group eco-tours and custom private charters departing Cayman Islands
              Yacht Club—paced around natural tides and marine conservation.
            </p>
            <p className="text-xs text-[#9BB1BD]">
              WCAG 2.1 AA accessible digital experience · Family &amp; mobility-conscious boarding available on all charters.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="space-y-2.5 text-sm text-[#B6C7D1]">
              <li>
                <a
                  href="#excursions"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  Excursions &amp; Private Charters
                </a>
              </li>
              <li>
                <a
                  href="#route"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  The Signature 6 Stops
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  North Sound Photography
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  Vessel &amp; Accessibility
                </a>
              </li>
              <li>
                <a
                  href="#inquire"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  Reserve a Charter
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-sm font-semibold text-white">Departure Dock &amp; Direct Contact</h2>
            <ul className="space-y-3 text-sm text-[#B6C7D1]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#67C2CC]" aria-hidden="true" />
                <span>
                  {BUSINESS_INFO.addressLine1}
                  <br />
                  {BUSINESS_INFO.addressLine2}
                </span>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#67C2CC]" aria-hidden="true" />
                  <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#67C2CC]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-[#D1DFE6]">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
              >
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
              >
                Facebook
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C2CC]"
              >
                Google Business Profile
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#1D3542] pt-8 text-xs text-[#9BB1BD] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.brandFull}. All rights reserved.</p>
          <p>Grand Cayman, Cayman Islands · Small-Group Marine Eco-Tours</p>
        </div>
      </div>
    </footer>
  );
}
