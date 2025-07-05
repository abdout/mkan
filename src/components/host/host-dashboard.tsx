"use client";

import React from 'react';
import ListingCard from './listing-card';
import NewListingOptions from './new-listing-options';

interface Listing {
  id: string;
  title: string;
  startDate: string;
  type: 'house' | 'listing';
}

interface HostDashboardProps {
  hostName?: string;
  listings?: Listing[];
  onListingClick?: (id: string) => void;
  onCreateNew?: () => void;
  onCreateFromExisting?: () => void;
}

const HostDashboard: React.FC<HostDashboardProps> = ({
  hostName = "Abdout",
  listings = [
    {
      id: "1",
      title: "Your House listing started June 7, 2025",
      startDate: "June 7, 2025",
      type: "house"
    },
    {
      id: "2", 
      title: "Your listing started June 7, 2025",
      startDate: "June 7, 2025",
      type: "listing"
    }
  ],
  onListingClick,
  onCreateNew,
  onCreateFromExisting
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-medium text-gray-900 mb-8">
          Welcome back, {hostName}
        </h1>
      </div>

      {/* Finish your listing section */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-gray-900">
          Finish your listing
        </h2>
        
        <div className="space-y-3">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              startDate={listing.startDate}
              type={listing.type}
              onClick={onListingClick}
            />
          ))}
        </div>
      </div>

      {/* Start a new listing section */}
      <NewListingOptions
        onCreateNew={onCreateNew}
        onCreateFromExisting={onCreateFromExisting}
      />
    </div>
  );
};

export default HostDashboard; 