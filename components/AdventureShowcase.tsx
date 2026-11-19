'use client';

import { useState } from 'react';
import type { DepartureWindowId, ExcursionSpec } from '@/lib/charter';
import { EXCURSIONS } from '@/lib/data';
import ExcursionsSection from './ExcursionsSection';
import SixStopRoute from './SixStopRoute';
import PhotoGallery from './PhotoGallery';
import EthosAndReviews from './EthosAndReviews';
import CharterInquiryForm from './CharterInquiryForm';

export default function AdventureShowcase() {
  const [selectedExcursionId, setSelectedExcursionId] = useState<string>(
    EXCURSIONS[0].id
  );
  const [departureWindow, setDepartureWindow] = useState<DepartureWindowId>(
    EXCURSIONS[0].defaultWindow
  );

  const handleSelectExcursion = (excursion: ExcursionSpec) => {
    setSelectedExcursionId(excursion.id);
    setDepartureWindow(excursion.defaultWindow);
  };

  const handleExcursionIdChange = (excursionId: string) => {
    setSelectedExcursionId(excursionId);
    const matched = EXCURSIONS.find((item) => item.id === excursionId);
    if (matched) {
      setDepartureWindow(matched.defaultWindow);
    }
  };

  return (
    <>
      <ExcursionsSection onSelectExcursion={handleSelectExcursion} />
      <SixStopRoute />
      <PhotoGallery />
      <EthosAndReviews />
      <CharterInquiryForm
        selectedExcursionId={selectedExcursionId}
        departureWindow={departureWindow}
        onExcursionChange={handleExcursionIdChange}
        onDepartureWindowChange={setDepartureWindow}
      />
    </>
  );
}
