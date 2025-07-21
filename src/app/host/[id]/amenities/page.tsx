"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostStepLayout, AmenitySelector } from '@/components/host';
import { useHostValidation } from '@/context/host-validation-context';
import { ListingProvider, useListing } from '@/components/host/use-listing';

interface AmenitiesPageProps {
  params: Promise<{ id: string }>;
}

const AmenitiesPageContent = ({ params }: AmenitiesPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const { enableNext } = useHostValidation();
  const { listing, updateListingData, loadListing } = useListing();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
      // Load the listing data in the background
      const listingId = parseInt(resolvedParams.id);
      if (!isNaN(listingId)) {
        loadListing(listingId).catch(console.error);
      }
    });
  }, [params, loadListing]);

  // Load existing amenities from listing
  React.useEffect(() => {
    if (listing?.amenities) {
      setSelectedAmenities(listing.amenities.map(a => a.toLowerCase().replace(/_/g, '-')));
    }
  }, [listing]);

  // Enable next button since amenities are optional
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

  const toggleAmenity = async (amenityId: string) => {
    const newSelectedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    
    setSelectedAmenities(newSelectedAmenities);

    // Update backend data
    try {
      // Convert frontend amenity IDs to backend enum values
      const backendAmenities = newSelectedAmenities.map(amenityId => 
        amenityId.toUpperCase().replace(/-/g, '_')
      );
      
      await updateListingData({
        amenities: backendAmenities as any[]
      });
    } catch (error) {
      console.error('Error updating amenities:', error);
    }
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

const AmenitiesPage = ({ params }: AmenitiesPageProps) => {
  return (
    <ListingProvider>
      <AmenitiesPageContent params={params} />
    </ListingProvider>
  );
};

export default AmenitiesPage; 