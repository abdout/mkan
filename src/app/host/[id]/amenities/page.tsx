"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostStepLayout, AmenitySelector } from '@/components/host';
import { useHostValidation } from '@/context/host-validation-context';

interface AmenitiesPageProps {
  params: Promise<{ id: string }>;
}

const AmenitiesPage = ({ params }: AmenitiesPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const { enableNext } = useHostValidation();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable next button since amenities are optional
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <HostStepLayout
      title={
        <h3>Tell guests what <br /> your place has to offer</h3>
      }
      subtitle="You can add more amenities after you publish your listing."
    >
      <AmenitySelector
        selectedAmenities={selectedAmenities}
        onToggle={toggleAmenity}
      />
    </HostStepLayout>
  );
};

export default AmenitiesPage; 