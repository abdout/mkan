"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { HostDashboard } from '@/components/host';

const BecomeAHostPage = () => {
  const router = useRouter();

  const handleListingClick = (id: string) => {
    // Handle existing listing click
    console.log('Listing clicked:', id);
  };

  const handleCreateNew = () => {
    router.push('/become-a-host/overview');
  };

  const handleCreateFromExisting = () => {
    // Handle create from existing
    console.log('Create from existing');
  };

  return (
    <div className="min-h-screen bg-white">
      <HostDashboard 
        hostName="Abdout"
        onListingClick={handleListingClick}
        onCreateNew={handleCreateNew}
        onCreateFromExisting={handleCreateFromExisting}
      />
    </div>
  );
};

export default BecomeAHostPage; 