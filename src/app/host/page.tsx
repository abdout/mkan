"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostDashboard } from '@/components/host';
import { getHostListings, createListing } from '@/components/host/action';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

const BecomeAHostPage = () => {
  const router = useRouter();
  const { session, status } = useAuthRedirect();
  const [backendListings, setBackendListings] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // Load backend data but don't show loading state to match frontend
  React.useEffect(() => {
    async function loadListings() {
      try {
        const hostListings = await getHostListings();
        setBackendListings(hostListings);
      } catch (error) {
        console.error('Error loading listings:', error);
      }
    }
    loadListings();
  }, []);

  const handleListingClick = (id: string) => {
    // Use backend functionality but preserve frontend behavior
    const backendListing = backendListings.find(listing => listing.id.toString() === id);
    if (backendListing) {
      router.push(`/host/${id}/about-place`);
    } else {
      // Fallback to console log as in frontend
      console.log('Listing clicked:', id);
    }
  };

  const handleCreateNew = async () => {
    if (isCreating) return;
    
    setIsCreating(true);
    try {
      // Try backend creation first
      const result = await createListing({ draft: true });
      if (result.success && result.listing) {
        router.push(`/host/${result.listing.id}/about-place`);
        return;
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
    
    // Fallback to frontend behavior
    router.push('/host/overview');
    setIsCreating(false);
  };

  const handleCreateFromExisting = () => {
    // Handle create from existing
    console.log('Create from existing');
  };

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen">
      <HostDashboard 
        hostName={session.user?.name || "Host"}
        onListingClick={handleListingClick}
        onCreateNew={handleCreateNew}
        onCreateFromExisting={handleCreateFromExisting}
      />
    </div>
  );
};

export default BecomeAHostPage; 