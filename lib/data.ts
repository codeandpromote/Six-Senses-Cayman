import type { ExcursionSpec } from './charter';
import type { MediaKey } from './media';

export const BUSINESS_INFO = {
  brandShort: 'Six Senses Cayman',
  brandFull: 'Six Senses Cayman Adventures',
  founder: 'Captain PJ Goldsmith',
  locationShort: 'Cayman Islands Yacht Club · Grand Cayman',
  addressLine1: 'Cayman Islands Yacht Club, Yacht Drive',
  addressLine2: 'Seven Mile Beach, Grand Cayman KY1-1207, Cayman Islands',
  phoneDisplay: '+1 (345) 938-3303',
  phoneHref: 'tel:+13459383303',
  email: 'info@caymansixsenses.com',
  emailHref: 'mailto:info@caymansixsenses.com',
  facebookUrl: 'https://www.facebook.com/caymansixsenses',
  instagramUrl: 'https://www.instagram.com/caymansixsenses/',
  googleProfileUrl: 'https://share.google/lPKbTn8KDvIkmm8Tu',
  maxGroupSize: 15,
};

export const KEY_FACTS = [
  {
    value: '15 Guests Max',
    label: 'Strict small-group vessel cap',
  },
  {
    value: '6 Eco Stops',
    label: 'Signature 5-hour North Sound route',
  },
  {
    value: '7:30 AM & 1:00 PM',
    label: 'Timed around tides, away from crowds',
  },
  {
    value: 'Yacht Club Dock',
    label: 'Direct boarding near Seven Mile Beach',
  },
];

export const EXCURSIONS: ExcursionSpec[] = [
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
    departureTiming: '7:30 AM Early Bird or 1:00 PM Late Afternoon',
    defaultWindow: 'late-afternoon',
    summary:
      'Our flagship unhurried voyage across Grand Cayman’s North Sound. Glide through living mangrove nurseries, snorkel vibrant barrier reefs, wade at Starfish Point, pause near Rum Point & Kaibo, and reach Stingray City Sandbar when the crowds have cleared.',
    accessibilityNote:
      'Stable tri-hull pontoon with wide boarding ladder, full overhead shade, flotation noodles, and non-swimmer waist-deep stops.',
    highlights: [
      'Guided ecology commentary through sheltered red mangrove channels',
      'Sanitized mask, snorkel, fins, and junior flotation vests included',
      'Chilled island water, fresh seasonal fruit, and shaded deck seating',
      'Timed arrival at Stingray City Sandbar after large tour boats depart',
    ],
    stops: [
      'Mangrove Forest Nursery',
      'Barrier Reef Snorkeling',
      'Starfish Point Sanctuary',
      'Rum Point / Kaibo Beach Break',
      'Stingray City Sandbar',
      'North Sound Coastal Return',
    ],
    imageKey: 'reef',
    featured: true,
  },
  {
    id: 'private-north-sound',
    title: 'Private North Sound Charter',
    category: 'private',
    categoryLabel: 'Private Charter',
    durationHours: 4,
    durationLabel: '4 or 6 Hours',
    maxGuests: 15,
    pricingMode: 'private',
    basePriceUsd: 950,
    includedGuestsInPrivateBase: 6,
    extraGuestUsd: 95,
    departureTiming: 'Flexible Morning or Afternoon Boarding',
    defaultWindow: 'custom-morning',
    summary:
      'Reserve our tri-hulled pontoon exclusively for your family or group. Shape every stop to your rhythm—lingering longer over coral gardens, stopping for seaside lunch at Kaibo, or choosing gentle shallow bays for young children and grandparents.',
    accessibilityNote:
      'Fully paced to your group’s mobility and swim comfort, with private crew assistance at every water entry.',
    highlights: [
      'Dedicated local captain and marine naturalist crew',
      'Custom route across Stingray City, Coral Gardens, Starfish Point, and Mangroves',
      'Optional lunch docking at Kaibo Beach Bar or Rum Point',
      'Spacious cushioned seating with uninterrupted 360-degree shade canopy',
    ],
    stops: [
      'Bespoke North Sound Itinerary',
      'Stingray City Sandbar',
      'Coral Gardens or Barrier Reef',
      'Starfish Point & Kaibo Lunch Stop',
    ],
    imageKey: 'pontoon',
  },
  {
    id: 'bioluminescent-sunset',
    title: 'Bioluminescent Bay & Sunset Cruise',
    category: 'evening',
    categoryLabel: 'Evening Excursion',
    durationHours: 3,
    durationLabel: '3 Hours',
    maxGuests: 12,
    pricingMode: 'small-group',
    basePriceUsd: 135,
    childPriceUsd: 95,
    departureTiming: '5:30 PM Sunset Departure (Seasonal Lunar Windows)',
    defaultWindow: 'sunset-bio',
    summary:
      'Cross the calm evening waters of the North Sound at golden hour before drifting quietly into Grand Cayman’s famed Bioluminescent Bay. Watch every ripple ignite with delicate natural blue-teal light under dark Caribbean skies.',
    accessibilityNote:
      'View the bioluminescence comfortably from the boat deck or enter calmly via wide stern steps with full crew guidance.',
    highlights: [
      'Golden-hour cruise from Cayman Islands Yacht Club',
      'Low-impact eco viewing protecting fragile bioluminescent dinoflagellates',
      'Optional guided swim or seated deck observation—no swimming required',
      'Small-group tranquility capped at 12 evening guests',
    ],
    stops: [
      'North Sound Sunset Crossing',
      'Starfish Point Dusk Pause',
      'Cayman Kai Bioluminescent Bay',
    ],
    imageKey: 'biobay',
  },
  {
    id: 'mangrove-sup-safari',
    title: 'Mangrove & Paddleboard Eco-Safari',
    category: 'eco',
    categoryLabel: 'Eco & Paddle',
    durationHours: 3,
    durationLabel: '3.5 Hours',
    maxGuests: 10,
    pricingMode: 'small-group',
    basePriceUsd: 125,
    childPriceUsd: 90,
    departureTiming: '8:00 AM Calm-Water Morning Window',
    defaultWindow: 'early-bird',
    summary:
      'Designed for nature lovers and curious paddlers. Launch stable stand-up paddleboards directly from our pontoon into glassy red-mangrove channels, observing juvenile reef life, coastal birds, and crystal-clear tidal flats up close.',
    accessibilityNote:
      'Wide beginner-friendly SUP boards, seated paddling option, and pontoon tender always alongside for effortless rest.',
    highlights: [
      'Stable wide-deck stand-up paddleboards and lightweight carbon paddles',
      'Shallow, wind-sheltered mangrove waterways ideal for first-timers',
      'Marine ecology storytelling led by local Cayman guides',
      'Pontoon support boat follows quietly with chilled water and shade',
    ],
    stops: [
      'Central Mangrove Channels',
      'Tidal Nursery Flats',
      'Shallow Reef Snorkel Stop',
    ],
    imageKey: 'mangroves',
  },
];

export interface RouteStop {
  number: string;
  name: string;
  duration: string;
  waterDepth: string;
  accessibility: string;
  ecologyNote: string;
  description: string;
  imageKey: MediaKey;
}

export const SIX_STOPS: RouteStop[] = [
  {
    number: '01',
    name: 'Mangrove Forest Nursery',
    duration: '35 min',
    waterDepth: '2–4 ft sheltered channel',
    accessibility: 'Stay seated on shaded deck · No swimming required',
    ecologyNote: 'Critical nursery for juvenile parrotfish, lobster, and lemon sharks',
    description:
      'We begin away from the open sound, gliding at idle speed beneath arching red mangrove roots. Our crew shares how these coastal wetlands filter the turquoise waters of Grand Cayman and shelter young marine life before they venture to the outer reef.',
    imageKey: 'mangroves',
  },
  {
    number: '02',
    name: 'Barrier Reef Snorkeling',
    duration: '45 min',
    waterDepth: '8–12 ft crystal-clear reef',
    accessibility: 'Wide rear boarding ladder · Flotation vests & noodles provided',
    ecologyNote: 'Living elkhorn coral, purple sea fans, blue tang, and green morays',
    description:
      'Anchored in calm leeward pockets along the northern barrier reef, guests slip into gin-clear visibility. First-time snorkelers receive patient one-on-one mask fitting and buoyant guidance, while experienced swimmers explore coral canyons at ease.',
    imageKey: 'reef',
  },
  {
    number: '03',
    name: 'Starfish Point',
    duration: '40 min',
    waterDepth: '1–3 ft sandy shoreline',
    accessibility: 'Gentle shallow wading · Ideal for children & non-swimmers',
    ecologyNote: 'Natural habitat for Caribbean cushion sea stars (observe submerged only)',
    description:
      'At the quiet tip of Cayman Kai, powdery white sand meets translucent knee-deep water. We practice strict conservation etiquette—admiring and photographing the vibrant orange cushion starfish while keeping them gently submerged at all times.',
    imageKey: 'starfish',
  },
  {
    number: '04',
    name: 'Rum Point & Kaibo Pause',
    duration: '45 min',
    waterDepth: 'Shallow beach mooring',
    accessibility: 'Level beach landing · Shaded seating & island refreshments',
    ecologyNote: 'Protected North Sound bay fringed with casuarina shade trees',
    description:
      'Time slows down along the northern peninsula. Stretch your legs on soft sand, enjoy fresh seasonal fruit aboard the pontoon, or arrange a relaxed seaside lunch pause on private charters before the afternoon sun warms the sandbar.',
    imageKey: 'pontoon',
  },
  {
    number: '05',
    name: 'Stingray City Sandbar',
    duration: '60 min',
    waterDepth: '3–4 ft waist-deep sandbar',
    accessibility: 'Stand comfortably on flat sand · Hands-on crew orientation',
    ecologyNote: 'Wild southern stingrays (Hypanus americanus) visiting naturally for generations',
    description:
      'Timed deliberately for early morning or late afternoon once cruise-ship excursions depart. Stand waist-deep on rippled white sand as gentle southern stingrays glide past your knees while our crew introduces each guest patiently and respectfully.',
    imageKey: 'sandbar',
  },
  {
    number: '06',
    name: 'North Sound Coastal Return',
    duration: '35 min',
    waterDepth: 'Smooth sheltered crossing',
    accessibility: 'Full canopy shade · Cushioned wrap-around lounge seating',
    ecologyNote: 'Golden-hour views across Grand Cayman’s 35-square-mile lagoon',
    description:
      'As the sun softens across the North Sound, we cruise calmly back toward the Cayman Islands Yacht Club—leaving you rinsed, unhurried, and minutes from Seven Mile Beach.',
    imageKey: 'biobay',
  },
];

export interface GuestReview {
  id: string;
  guestName: string;
  origin: string;
  excursion: string;
  dateLabel: string;
  quote: string;
  outcome: string;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    guestName: 'Hannah & David Mercer',
    origin: 'Toronto, Canada',
    excursion: 'Signature 6-Stop Eco Tour',
    dateLabel: 'Stay-Over Family · 4 Guests',
    quote:
      'We booked the afternoon eco-tour specifically to avoid the huge cruise boats, and arriving at Stingray City with only two other small vessels in sight felt surreal. The mangrove portion taught our kids more about island ecology than any textbook.',
    outcome: 'Quiet sandbar encounter with zero crowd rush',
  },
  {
    id: 'rev-2',
    guestName: 'Margaret Ellison',
    origin: 'Boston, Massachusetts',
    excursion: 'Private North Sound Charter',
    dateLabel: 'Multi-Generational Group · 7 Guests',
    quote:
      'Traveling with my 74-year-old father and two young grandchildren, I worried about boat comfort and boarding ladders. The tri-hulled pontoon stayed remarkably steady, the canopy kept everyone shaded, and the crew patiently helped Dad stand right on the sandbar.',
    outcome: 'Comfortable boarding for ages 6 to 74',
  },
  {
    id: 'rev-3',
    guestName: 'Rachel & Tom Lindholm',
    origin: 'London, United Kingdom',
    excursion: 'Bioluminescent Bay & Sunset Cruise',
    dateLabel: 'Couple · Evening Excursion',
    quote:
      'Everything about Six Senses feels deeply considered—from the spotless deck at Cayman Islands Yacht Club to how gently the crew treats the stingrays and starfish. Watching the Bio Bay shimmer in near silence was the highlight of our week in Cayman.',
    outcome: 'Small-group serenity & respectful wildlife care',
  },
];

export const GALLERY_ORDER: MediaKey[] = [
  'sandbar',
  'mangroves',
  'reef',
  'starfish',
  'pontoon',
  'biobay',
];

export const ACCESSIBILITY_PILLARS = [
  {
    title: 'Wide-Deck Tri-Hull Stability',
    detail:
      'Our shallow-draft pontoon minimizes roll at anchor and features wide, cushioned walkways with uninterrupted overhead shade.',
  },
  {
    title: 'Unrushed, Assisted Water Entry',
    detail:
      'Sturdy wide-rung stern ladders, high-buoyancy vests, and patient in-water crew support welcome first-time snorkelers and non-swimmers.',
  },
  {
    title: 'Multi-Generational Pacing',
    detail:
      'With a strict 15-guest cap and shallow stops like Starfish Point and the Sandbar, children, seniors, and seasoned explorers share the same day effortlessly.',
  },
  {
    title: 'Inclusive Digital & Pre-Trip Planning',
    detail:
      'Let us know any mobility, sensory, or dietary considerations in advance so Captain PJ and crew can prepare seating and gear before you board.',
  },
];
