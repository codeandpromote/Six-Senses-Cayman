import type { StaticImageData } from 'next/image';
import heroSandbar from '@/src/assets/images/hero_cayman_sandbar_1795116316717.jpg';
import tourMangroves from '@/src/assets/images/tour_mangrove_channels_1795116329934.jpg';
import tourCoralReef from '@/src/assets/images/tour_coral_reef_snorkel_1795116284025.jpg';
import tourStarfish from '@/src/assets/images/tour_starfish_point_1795116314703.jpg';
import tourPontoon from '@/src/assets/images/tour_private_pontoon_1795116275729.jpg';
import tourBioBay from '@/src/assets/images/tour_bioluminescent_bay_1795116275822.jpg';

export type MediaKey =
  | 'sandbar'
  | 'mangroves'
  | 'reef'
  | 'starfish'
  | 'pontoon'
  | 'biobay';

export interface MediaAsset {
  key: MediaKey;
  src: StaticImageData;
  alt: string;
  title: string;
  location: string;
  caption: string;
  timing: string;
}

export const MEDIA_ASSETS: Record<MediaKey, MediaAsset> = {
  sandbar: {
    key: 'sandbar',
    src: heroSandbar,
    alt: 'Southern stingrays gliding across sunlit shallow turquoise sandbar waters in Grand Cayman with a shaded pontoon charter boat anchored nearby',
    title: 'Late-Afternoon Calm at Stingray City Sandbar',
    location: 'North Sound Sandbar, Grand Cayman',
    caption:
      'Arriving as cruise-ship vessels depart leaves waist-deep turquoise water open for quiet, respectful encounters with wild southern stingrays.',
    timing: 'Late afternoon light · 3–4 ft depth',
  },
  mangroves: {
    key: 'mangroves',
    src: tourMangroves,
    alt: 'Narrow emerald-turquoise waterway winding peacefully through coastal red mangrove forests in Grand Cayman North Sound',
    title: 'Red Mangrove Nursery Channels',
    location: 'Central Mangrove Wetlands, North Sound',
    caption:
      'Our shallow-draft tri-hull pontoon glides silently through sheltered mangrove tunnels where juvenile reef fish, upside-down jellyfish, and coastal birds thrive.',
    timing: 'Calm sheltered water · Zero wake',
  },
  reef: {
    key: 'reef',
    src: tourCoralReef,
    alt: 'Sunlight streaming underwater over healthy Grand Cayman barrier coral reef formations, purple sea fans, and blue tang fish',
    title: 'Barrier Reef & Coral Gardens',
    location: 'Grand Cayman North Barrier Reef',
    caption:
      'Protected from open-ocean swell, the North Sound reef shelves offer 80-foot visibility across sea fans, elkhorn coral, and schools of blue tang.',
    timing: '8–12 ft clarity · Guided snorkel entry',
  },
  starfish: {
    key: 'starfish',
    src: tourStarfish,
    alt: 'Two bright orange cushion starfish resting naturally underwater on rippled white sand at Starfish Point beach in Grand Cayman',
    title: 'Shallow Sanctuary at Starfish Point',
    location: 'Cayman Kai Peninsula, Grand Cayman',
    caption:
      'An unhurried shoreline stop framed by swaying casuarinas where guests wade knee-deep to observe cushion sea stars undisturbed in their habitat.',
    timing: 'Ankle-to-waist depth · Family accessible',
  },
  pontoon: {
    key: 'pontoon',
    src: tourPontoon,
    alt: 'Modern white tri-hulled pontoon charter vessel with shaded canopy cruising smoothly over turquoise shoals in Grand Cayman North Sound',
    title: 'Our Tri-Hulled Pontoon Vessel',
    location: 'Departing Cayman Islands Yacht Club',
    caption:
      'Engineered for stability, generous full-deck shade, wide boarding steps, and effortless shallow-water access across the entire North Sound.',
    timing: 'Max 15 guests · Shaded cushioned deck',
  },
  biobay: {
    key: 'biobay',
    src: tourBioBay,
    alt: 'Quiet mangrove cove at Grand Cayman Bioluminescent Bay glowing with natural blue-teal light ripples under a starry night sky',
    title: 'Twilight Glow at Bioluminescent Bay',
    location: 'Cayman Kai Bio Bay, Grand Cayman',
    caption:
      'Under dark island skies, microscopic Pyrodinium bahamense illuminate every paddle stroke and gentle ripple across the sheltered lagoon.',
    timing: 'New-moon & evening departures',
  },
};
