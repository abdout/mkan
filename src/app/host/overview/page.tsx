"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepsOverview } from '@/components/host';
import { createListing } from '@/components/host/actions';

const OverviewPage = () => {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      // Create a new listing in the database
      const result = await createListing({ draft: true });
      
      if (result.success && result.listing) {
        // Navigate to the first step with the actual listing ID
        router.push(`/host/${result.listing.id}/about-place`);
      } else {
        console.error('Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <StepsOverview onGetStarted={handleGetStarted} />
    </div>
  );
};

export default OverviewPage; 