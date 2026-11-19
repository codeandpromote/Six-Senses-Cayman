import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCharterEstimate,
  filterExcursions,
  generateInquiryReference,
  validateInquiry,
  type ExcursionSpec,
} from './charter';

const sampleExcursions: ExcursionSpec[] = [
  {
    id: 'six-stop-eco',
    title: 'Signature 6-Stop Eco Tour',
    category: 'eco',
    categoryLabel: 'Small-Group Eco Tour',
    durationHours: 5,
    durationLabel: '5 Hours',
    maxGuests: 15,
    pricingMode: 'small-group',
    basePriceUsd: 165,
    childPriceUsd: 120,
    departureTiming: '7:30 AM or 1:00 PM',
    defaultWindow: 'late-afternoon',
    summary: 'Signature North Sound eco-tour.',
    accessibilityNote: 'Wide pontoon steps.',
    highlights: ['Mangroves'],
    stops: ['Mangroves', 'Stingray City'],
    imageKey: 'sandbar',
  },
  {
    id: 'private-half-day',
    title: 'Private Custom Charter',
    category: 'private',
    categoryLabel: 'Private Charter',
    durationHours: 4,
    durationLabel: '4 Hours',
    maxGuests: 15,
    pricingMode: 'private',
    basePriceUsd: 950,
    includedGuestsInPrivateBase: 6,
    extraGuestUsd: 95,
    departureTiming: 'Custom',
    defaultWindow: 'custom-morning',
    summary: 'Custom private charter.',
    accessibilityNote: 'Tailored pace.',
    highlights: ['Private boat'],
    stops: ['Custom'],
    imageKey: 'pontoon',
  },
];

test('filterExcursions returns all or matching category items', () => {
  assert.equal(filterExcursions(sampleExcursions, 'all').length, 2);
  assert.equal(filterExcursions(sampleExcursions, 'eco').length, 1);
  assert.equal(filterExcursions(sampleExcursions, 'eco')[0].id, 'six-stop-eco');
  assert.equal(filterExcursions(sampleExcursions, 'private')[0].id, 'private-half-day');
  assert.equal(filterExcursions(sampleExcursions, 'evening').length, 0);
});

test('calculateCharterEstimate computes small-group pricing with adults and children', () => {
  const result = calculateCharterEstimate({
    excursion: sampleExcursions[0],
    adults: 2,
    children: 2,
    departureWindow: 'late-afternoon',
  });
  assert.equal(result.totalGuests, 4);
  assert.equal(result.estimatedTotalUsd, 2 * 165 + 2 * 120);
  assert.equal(result.exceedsCapacity, false);
  assert.match(result.crowdAdvantageNote, /cruise-ship/i);
});

test('calculateCharterEstimate computes private charter base and extra guest charges', () => {
  const underBase = calculateCharterEstimate({
    excursion: sampleExcursions[1],
    adults: 4,
    children: 1,
    departureWindow: 'custom-morning',
  });
  assert.equal(underBase.estimatedTotalUsd, 950);

  const overBase = calculateCharterEstimate({
    excursion: sampleExcursions[1],
    adults: 8,
    children: 0,
    departureWindow: 'custom-morning',
  });
  assert.equal(overBase.estimatedTotalUsd, 950 + 2 * 95);
  assert.equal(overBase.exceedsCapacity, false);
});

test('validateInquiry catches missing required fields, past dates, and over-capacity groups', () => {
  const errors = validateInquiry(
    {
      excursionId: 'six-stop-eco',
      preferredDate: '2026-01-01',
      departureWindow: 'late-afternoon',
      adults: 0,
      children: 0,
      fullName: '',
      email: 'not-an-email',
      phone: '123',
      accessibilityNeeds: '',
      notes: '',
    },
    15,
    '2026-11-19'
  );

  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.preferredDate);
  assert.ok(errors.guests);
});

test('validateInquiry passes for complete valid submission and generates deterministic reference', () => {
  const errors = validateInquiry(
    {
      excursionId: 'six-stop-eco',
      preferredDate: '2026-12-15',
      departureWindow: 'early-bird',
      adults: 2,
      children: 1,
      fullName: 'Claire Henderson',
      email: 'claire@example.com',
      phone: '+1 (345) 555-0192',
      accessibilityNeeds: 'Shaded seating preferred',
      notes: 'Staying near Seven Mile Beach.',
    },
    15,
    '2026-11-19'
  );

  assert.deepEqual(errors, {});
  assert.equal(
    generateInquiryReference('six-stop-eco', '2026-12-15'),
    'SSCA-SIX-261215'
  );
});
