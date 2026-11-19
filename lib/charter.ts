export type ExcursionCategory = 'all' | 'eco' | 'private' | 'evening';

export type BookingMode = 'small-group' | 'private';

export type DepartureWindowId =
  | 'early-bird'
  | 'late-afternoon'
  | 'custom-morning'
  | 'sunset-bio';

export interface ExcursionSpec {
  id: string;
  title: string;
  category: Exclude<ExcursionCategory, 'all'>;
  categoryLabel: string;
  durationHours: number;
  durationLabel: string;
  maxGuests: number;
  pricingMode: BookingMode;
  basePriceUsd: number;
  includedGuestsInPrivateBase?: number;
  extraGuestUsd?: number;
  childPriceUsd?: number;
  departureTiming: string;
  defaultWindow: DepartureWindowId;
  summary: string;
  accessibilityNote: string;
  highlights: string[];
  stops: string[];
  imageKey:
    | 'sandbar'
    | 'mangroves'
    | 'reef'
    | 'starfish'
    | 'pontoon'
    | 'biobay';
  featured?: boolean;
}

export interface CharterEstimateInput {
  excursion: ExcursionSpec;
  adults: number;
  children: number;
  departureWindow: DepartureWindowId;
}

export interface CharterEstimateResult {
  totalGuests: number;
  estimatedTotalUsd: number;
  priceBreakdownLabel: string;
  exceedsCapacity: boolean;
  crowdAdvantageNote: string;
  durationLabel: string;
}

export interface InquiryFormInput {
  excursionId: string;
  preferredDate: string;
  departureWindow: DepartureWindowId;
  adults: number;
  children: number;
  fullName: string;
  email: string;
  phone: string;
  accessibilityNeeds: string;
  notes: string;
}

export interface InquiryValidationErrors {
  preferredDate?: string;
  guests?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export const DEPARTURE_WINDOWS: Record<
  DepartureWindowId,
  { label: string; timeRange: string; crowdNote: string }
> = {
  'early-bird': {
    label: 'Early Bird',
    timeRange: '7:30 AM – 12:30 PM',
    crowdNote:
      'First arrival across the North Sound before midday excursion boats gather.',
  },
  'late-afternoon': {
    label: 'Late Afternoon Sandbar',
    timeRange: '1:00 PM – 6:00 PM',
    crowdNote:
      'Timed so Stingray City is reached after cruise-ship vessels depart.',
  },
  'custom-morning': {
    label: 'Private Custom Departure',
    timeRange: '8:30 AM or 1:00 PM',
    crowdNote:
      'Flexible Yacht Club boarding adapted around your group’s pace and tides.',
  },
  'sunset-bio': {
    label: 'Twilight & Bio Bay',
    timeRange: '5:30 PM – 8:30 PM',
    crowdNote:
      'Timed to sunset and lunar darkness for natural bioluminescence visibility.',
  },
};

export function filterExcursions(
  excursions: ExcursionSpec[],
  category: ExcursionCategory
): ExcursionSpec[] {
  if (category === 'all') {
    return excursions;
  }
  return excursions.filter((item) => item.category === category);
}

export function calculateCharterEstimate(
  input: CharterEstimateInput
): CharterEstimateResult {
  const adults = Math.max(0, Math.floor(input.adults));
  const children = Math.max(0, Math.floor(input.children));
  const totalGuests = adults + children;
  const { excursion } = input;
  const exceedsCapacity = totalGuests > excursion.maxGuests;

  let estimatedTotalUsd = 0;
  let priceBreakdownLabel = '';

  if (excursion.pricingMode === 'private') {
    const includedBase = excursion.includedGuestsInPrivateBase ?? 6;
    const extraGuestRate = excursion.extraGuestUsd ?? 95;
    const extraGuests = Math.max(0, totalGuests - includedBase);
    estimatedTotalUsd = excursion.basePriceUsd + extraGuests * extraGuestRate;
    priceBreakdownLabel =
      extraGuests > 0
        ? `$${excursion.basePriceUsd.toLocaleString()} base (up to ${includedBase}) + ${extraGuests} additional × $${extraGuestRate}`
        : `Private vessel charter for up to ${includedBase} guests`;
  } else {
    const childRate = excursion.childPriceUsd ?? Math.round(excursion.basePriceUsd * 0.75);
    estimatedTotalUsd = adults * excursion.basePriceUsd + children * childRate;
    if (children > 0) {
      priceBreakdownLabel = `${adults} adult${adults === 1 ? '' : 's'} × $${excursion.basePriceUsd} + ${children} child${children === 1 ? '' : 'ren'} × $${childRate}`;
    } else {
      priceBreakdownLabel = `${adults} guest${adults === 1 ? '' : 's'} × $${excursion.basePriceUsd} per guest`;
    }
  }

  const windowInfo = DEPARTURE_WINDOWS[input.departureWindow];

  return {
    totalGuests,
    estimatedTotalUsd,
    priceBreakdownLabel,
    exceedsCapacity,
    crowdAdvantageNote: windowInfo.crowdNote,
    durationLabel: excursion.durationLabel,
  };
}

export function validateInquiry(
  input: InquiryFormInput,
  maxGuests: number,
  todayIso: string
): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name so Captain PJ and crew can address your inquiry.';
  }

  const emailTrimmed = input.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailTrimmed || !emailPattern.test(emailTrimmed)) {
    errors.email = 'Please enter a valid email address for your charter confirmation.';
  }

  const phoneDigits = input.phone.replace(/\D/g, '');
  if (input.phone.trim().length > 0 && phoneDigits.length < 7) {
    errors.phone = 'If providing a phone number, please include at least 7 digits.';
  }

  if (!input.preferredDate) {
    errors.preferredDate = 'Please select a preferred charter date.';
  } else if (input.preferredDate < todayIso) {
    errors.preferredDate = 'Please choose today or an upcoming date in Grand Cayman.';
  }

  const totalGuests = input.adults + input.children;
  if (input.adults < 1) {
    errors.guests = 'At least one adult must be included on the excursion.';
  } else if (totalGuests > maxGuests) {
    errors.guests = `This vessel accommodates up to ${maxGuests} guests to preserve small-group comfort.`;
  }

  return errors;
}

export function generateInquiryReference(
  excursionId: string,
  preferredDate: string
): string {
  const prefix = excursionId.slice(0, 3).toUpperCase();
  const compactDate = preferredDate.replace(/-/g, '').slice(2, 8) || 'CAYMAN';
  return `SSCA-${prefix}-${compactDate}`;
}
