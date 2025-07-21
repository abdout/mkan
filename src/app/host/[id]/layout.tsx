"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import HostFooter from '@/components/host/host-footer';
import { HostValidationProvider } from '@/context/host-validation-context';
import { ListingProvider, useListing } from '@/components/host/use-listing';

interface HostLayoutProps {
  children: React.ReactNode;
}

function HostLayoutContent({ children }: HostLayoutProps) {
  const params = useParams();
  const { loadListing } = useListing();
  const listingId = params.id ? parseInt(params.id as string, 10) : null;

  useEffect(() => {
    if (listingId) {
      loadListing(listingId);
    }
  }, [listingId, loadListing]);

  return (
    <div className="px-20 bg-background min-h-screen">
      {/* Main content with padding to account for fixed footer */}
      <main className="h-screen pt-20">
        {children}
      </main>

      {/* Footer with embedded navigation */}
      <HostFooter />
    </div>
  );
}

const HostLayout = ({ children }: HostLayoutProps) => {
  return (
    <ListingProvider>
      <HostValidationProvider>
        <HostLayoutContent>
          {children}
        </HostLayoutContent>
      </HostValidationProvider>
    </ListingProvider>
  );
};

export default HostLayout;
