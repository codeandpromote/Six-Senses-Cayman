'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
} from 'lucide-react';
import {
  calculateCharterEstimate,
  DEPARTURE_WINDOWS,
  generateInquiryReference,
  validateInquiry,
  type DepartureWindowId,
  type ExcursionSpec,
  type InquiryValidationErrors,
} from '@/lib/charter';
import { BUSINESS_INFO, EXCURSIONS } from '@/lib/data';

interface CharterInquiryFormProps {
  selectedExcursionId: string;
  departureWindow: DepartureWindowId;
  onExcursionChange: (excursionId: string) => void;
  onDepartureWindowChange: (windowId: DepartureWindowId) => void;
}

interface SubmittedReceipt {
  reference: string;
  excursionTitle: string;
  preferredDate: string;
  departureWindowLabel: string;
  totalGuests: number;
  estimatedTotalUsd: number;
  fullName: string;
  email: string;
  accessibilityNeeds: string;
}

const DEPARTURE_WINDOW_KEYS: DepartureWindowId[] = [
  'early-bird',
  'late-afternoon',
  'custom-morning',
  'sunset-bio',
];

function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function CharterInquiryForm({
  selectedExcursionId,
  departureWindow,
  onExcursionChange,
  onDepartureWindowChange,
}: CharterInquiryFormProps) {
  const activeExcursion: ExcursionSpec = useMemo(
    () =>
      EXCURSIONS.find((item) => item.id === selectedExcursionId) ??
      EXCURSIONS[0],
    [selectedExcursionId]
  );

  const [preferredDate, setPreferredDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedReceipt | null>(null);

  const estimate = useMemo(
    () =>
      calculateCharterEstimate({
        excursion: activeExcursion,
        adults,
        children,
        departureWindow,
      }),
    [activeExcursion, adults, children, departureWindow]
  );

  const handleSelectExcursion = (nextId: string) => {
    onExcursionChange(nextId);
    setErrors((prev) => ({ ...prev, guests: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todayIso = getTodayIsoDate();
    const validationErrors = validateInquiry(
      {
        excursionId: activeExcursion.id,
        preferredDate,
        departureWindow,
        adults,
        children,
        fullName,
        email,
        phone,
        accessibilityNeeds,
        notes,
      },
      activeExcursion.maxGuests,
      todayIso
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted({
      reference: generateInquiryReference(activeExcursion.id, preferredDate),
      excursionTitle: activeExcursion.title,
      preferredDate,
      departureWindowLabel: `${DEPARTURE_WINDOWS[departureWindow].label} (${DEPARTURE_WINDOWS[departureWindow].timeRange})`,
      totalGuests: estimate.totalGuests,
      estimatedTotalUsd: estimate.estimatedTotalUsd,
      fullName: fullName.trim(),
      email: email.trim(),
      accessibilityNeeds: accessibilityNeeds.trim(),
    });
  };

  const handleReset = () => {
    setSubmitted(null);
    setErrors({});
  };

  return (
    <section
      id="inquire"
      aria-labelledby="inquire-heading"
      className="scroll-mt-16 border-t border-[#E2E8EC] bg-[#F5F7F8]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: Direct dock & contact details */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#0E6B74]">
                Reserve Directly
              </p>
              <h2
                id="inquire-heading"
                className="font-serif text-3xl font-semibold tracking-tight text-[#0B1F2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] [text-wrap:balance]"
              >
                Plan your day on the North Sound.
              </h2>
              <p className="text-base leading-relaxed text-[#475B66]">
                Send your preferred date and group size below. Captain PJ
                Goldsmith and crew respond directly with tide-matched boarding
                times and availability from Cayman Islands Yacht Club.
              </p>
            </div>

            <div className="space-y-5 border-t border-[#D8E1E6] pt-6 text-sm text-[#475B66]">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0E6B74]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#0B1F2A]">Departure Dock</p>
                  <p className="mt-0.5">{BUSINESS_INFO.addressLine1}</p>
                  <p>{BUSINESS_INFO.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0E6B74]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#0B1F2A]">Phone &amp; WhatsApp</p>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="mt-0.5 inline-block tabular-nums text-[#0E6B74] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0E6B74]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#0B1F2A]">Email</p>
                  <a
                    href={BUSINESS_INFO.emailHref}
                    className="mt-0.5 inline-block text-[#0E6B74] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#D8E1E6] pt-6">
              <p className="text-xs font-semibold text-[#0B1F2A]">
                Follow daily sightings &amp; guest photos
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm font-medium text-[#0B1F2A]">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#0E6B74] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                >
                  Instagram
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#0E6B74] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                >
                  Facebook
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_INFO.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#0E6B74] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                >
                  Google Reviews
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Interactive Charter Estimator & Validated Inquiry Form */}
          <div className="rounded-xl border border-[#E2E8EC] bg-white p-6 sm:p-8 lg:col-span-7">
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="space-y-6 py-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#0E6B74]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#0E6B74] tabular-nums">
                      Inquiry Reference · {submitted.reference}
                    </p>
                    <h3 className="mt-1 font-serif text-3xl font-semibold text-[#0B1F2A]">
                      Charter request prepared for {submitted.fullName}.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475B66]">
                      We have logged your preferred itinerary for{' '}
                      <span className="font-medium text-[#0B1F2A]">
                        {submitted.excursionTitle}
                      </span>
                      . Captain PJ’s team will reply to{' '}
                      <span className="font-medium text-[#0B1F2A]">
                        {submitted.email}
                      </span>{' '}
                      to confirm dock boarding details at Cayman Islands Yacht
                      Club.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-4 border-y border-[#E2E8EC] py-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-[#475B66]">Preferred Date</dt>
                    <dd className="mt-1 font-medium text-[#0B1F2A] tabular-nums">
                      {submitted.preferredDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#475B66]">Departure Window</dt>
                    <dd className="mt-1 font-medium text-[#0B1F2A]">
                      {submitted.departureWindowLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#475B66]">Party Size</dt>
                    <dd className="mt-1 font-medium text-[#0B1F2A] tabular-nums">
                      {submitted.totalGuests}{' '}
                      {submitted.totalGuests === 1 ? 'Guest' : 'Guests'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#475B66]">Estimated Rate</dt>
                    <dd className="mt-1 font-semibold text-[#0B1F2A] tabular-nums">
                      ${submitted.estimatedTotalUsd.toLocaleString()} USD
                    </dd>
                  </div>
                  {submitted.accessibilityNeeds && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-[#475B66]">
                        Accessibility &amp; Boarding Preferences
                      </dt>
                      <dd className="mt-1 font-medium text-[#0B1F2A]">
                        {submitted.accessibilityNeeds}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#CBD6DC] bg-white px-5 py-2.5 text-sm font-medium text-[#0B1F2A] transition-colors hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74]"
                  >
                    Modify or Start Another Inquiry
                  </button>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#0E6B74] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
                  >
                    Call {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="excursion-select"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Excursion or Charter
                    </label>
                    <select
                      id="excursion-select"
                      value={activeExcursion.id}
                      onChange={(event) =>
                        handleSelectExcursion(event.target.value)
                      }
                      className="mt-2 block min-h-[44px] w-full rounded-md border border-[#CBD6DC] bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] focus:border-[#0E6B74] focus:outline-none focus:ring-2 focus:ring-[#0E6B74]/25"
                    >
                      {EXCURSIONS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} ({item.durationLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Preferred Date <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      id="preferred-date"
                      type="date"
                      value={preferredDate}
                      onChange={(event) => {
                        setPreferredDate(event.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          preferredDate: undefined,
                        }));
                      }}
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={
                        errors.preferredDate ? 'preferred-date-error' : undefined
                      }
                      className={`mt-2 block min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] tabular-nums focus:outline-none focus:ring-2 ${
                        errors.preferredDate
                          ? 'border-[#B42318] focus:ring-[#B42318]/20'
                          : 'border-[#CBD6DC] focus:border-[#0E6B74] focus:ring-[#0E6B74]/25'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p
                        id="preferred-date-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  {/* Guest count steppers */}
                  <div>
                    <span className="block text-sm font-medium text-[#0B1F2A]">
                      Guests (Max {activeExcursion.maxGuests})
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <div className="flex min-h-[44px] items-center justify-between rounded-md border border-[#CBD6DC] px-2.5">
                        <span className="text-xs text-[#475B66]">Adults</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setAdults((prev) => Math.max(0, prev - 1));
                              setErrors((prev) => ({
                                ...prev,
                                guests: undefined,
                              }));
                            }}
                            aria-label="Decrease adults"
                            className="inline-flex h-8 w-8 items-center justify-center rounded text-[#0B1F2A] hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-[#0E6B74]"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span
                            className="w-5 text-center text-sm font-semibold tabular-nums text-[#0B1F2A]"
                            aria-live="polite"
                          >
                            {adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setAdults((prev) => Math.min(20, prev + 1));
                              setErrors((prev) => ({
                                ...prev,
                                guests: undefined,
                              }));
                            }}
                            aria-label="Increase adults"
                            className="inline-flex h-8 w-8 items-center justify-center rounded text-[#0B1F2A] hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-[#0E6B74]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex min-h-[44px] items-center justify-between rounded-md border border-[#CBD6DC] px-2.5">
                        <span className="text-xs text-[#475B66]">Children</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setChildren((prev) => Math.max(0, prev - 1));
                              setErrors((prev) => ({
                                ...prev,
                                guests: undefined,
                              }));
                            }}
                            aria-label="Decrease children"
                            className="inline-flex h-8 w-8 items-center justify-center rounded text-[#0B1F2A] hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-[#0E6B74]"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span
                            className="w-5 text-center text-sm font-semibold tabular-nums text-[#0B1F2A]"
                            aria-live="polite"
                          >
                            {children}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setChildren((prev) => Math.min(15, prev + 1));
                              setErrors((prev) => ({
                                ...prev,
                                guests: undefined,
                              }));
                            }}
                            aria-label="Increase children"
                            className="inline-flex h-8 w-8 items-center justify-center rounded text-[#0B1F2A] hover:bg-[#F5F7F8] focus-visible:outline-2 focus-visible:outline-[#0E6B74]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {errors.guests && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.guests}
                      </p>
                    )}
                  </div>
                </div>

                {/* Departure Window Selector */}
                <fieldset>
                  <legend className="text-sm font-medium text-[#0B1F2A]">
                    Preferred Departure Window
                  </legend>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {DEPARTURE_WINDOW_KEYS.map((windowId) => {
                      const info = DEPARTURE_WINDOWS[windowId];
                      const isSelected = departureWindow === windowId;
                      return (
                        <button
                          key={windowId}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => onDepartureWindowChange(windowId)}
                          className={`flex min-h-[54px] flex-col items-start justify-center rounded-md border px-3.5 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B74] ${
                            isSelected
                              ? 'border-[#0E6B74] bg-[#0E6B74]/8 text-[#0B1F2A]'
                              : 'border-[#E2E8EC] bg-white text-[#475B66] hover:border-[#CBD6DC]'
                          }`}
                        >
                          <span className="text-sm font-medium text-[#0B1F2A]">
                            {info.label}
                          </span>
                          <span className="text-xs text-[#475B66] tabular-nums">
                            {info.timeRange}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Live Charter Estimate Strip */}
                <div className="rounded-lg border border-[#E2E8EC] bg-[#F5F7F8] p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs font-medium text-[#475B66]">
                      Estimated Charter Rate · {estimate.durationLabel}
                    </p>
                    <p className="font-serif text-2xl font-semibold text-[#0B1F2A] tabular-nums">
                      ${estimate.estimatedTotalUsd.toLocaleString()} USD
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-[#475B66] tabular-nums">
                    {estimate.priceBreakdownLabel}
                  </p>
                  <p className="mt-2 text-xs text-[#0E6B74]">
                    {estimate.crowdAdvantageNote}
                  </p>
                </div>

                {/* Guest Contact Fields */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Full Name <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder="Claire Henderson"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? 'guest-name-error' : undefined
                      }
                      className={`mt-2 block min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] placeholder:text-[#8A9BA6] focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-[#B42318] focus:ring-[#B42318]/20'
                          : 'border-[#CBD6DC] focus:border-[#0E6B74] focus:ring-[#0E6B74]/25'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="guest-name-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guest-email"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Email Address <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="claire@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'guest-email-error' : undefined
                      }
                      className={`mt-2 block min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] placeholder:text-[#8A9BA6] focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-[#B42318] focus:ring-[#B42318]/20'
                          : 'border-[#CBD6DC] focus:border-[#0E6B74] focus:ring-[#0E6B74]/25'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="guest-email-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guest-phone"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Phone or WhatsApp (Optional)
                    </label>
                    <input
                      id="guest-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="+1 (345) 555-0192"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? 'guest-phone-error' : undefined
                      }
                      className={`mt-2 block min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] placeholder:text-[#8A9BA6] focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-[#B42318] focus:ring-[#B42318]/20'
                          : 'border-[#CBD6DC] focus:border-[#0E6B74] focus:ring-[#0E6B74]/25'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="guest-phone-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="accessibility-notes"
                      className="block text-sm font-medium text-[#0B1F2A]"
                    >
                      Accessibility or Swim Notes (Optional)
                    </label>
                    <input
                      id="accessibility-notes"
                      type="text"
                      value={accessibilityNeeds}
                      onChange={(event) =>
                        setAccessibilityNeeds(event.target.value)
                      }
                      placeholder="e.g., Assisted ladder entry, junior vests, shaded seat"
                      className="mt-2 block min-h-[44px] w-full rounded-md border border-[#CBD6DC] bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] placeholder:text-[#8A9BA6] focus:border-[#0E6B74] focus:outline-none focus:ring-2 focus:ring-[#0E6B74]/25"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="trip-notes"
                    className="block text-sm font-medium text-[#0B1F2A]"
                  >
                    Resort / Condo Stay or Special Requests (Optional)
                  </label>
                  <textarea
                    id="trip-notes"
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Let us know where you are staying on Seven Mile Beach or if you'd like to add a Kaibo lunch stop."
                    className="mt-2 block w-full rounded-md border border-[#CBD6DC] bg-white px-3.5 py-2.5 text-sm text-[#0B1F2A] placeholder:text-[#8A9BA6] focus:border-[#0E6B74] focus:outline-none focus:ring-2 focus:ring-[#0E6B74]/25"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-[#E2E8EC] pt-5 sm:flex-row sm:items-center">
                  <p className="text-xs text-[#475B66]">
                    No upfront card required. Direct confirmation from our Yacht
                    Club dock team.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-md bg-[#0E6B74] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0A555C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F2A]"
                  >
                    Request Availability
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
