"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { ListView, GridView } from '@/components/atom/airbnb-icons';
import NotificationCard from '@/components/hosting/notification-card';

const HostingListingsPage = () => {
  const router = useRouter();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const mockListings = [
    {
      id: '1456438879027340782',
      image: '/assets/hero.jpg',
      status: 'action-required',
      title: 'Cozy Downtown Apartment',
    },
    {
      id: '2',
      image: '/assets/find-experience.jpg', 
      status: 'action-required',
      title: 'Modern Studio Loft',
    },
    {
      id: '3',
      image: '/assets/banner.jpg',
      status: 'in-progress', 
      title: 'Beachfront Villa',
    },
  ];

  const handleEditListing = (listingId: string) => {
    router.push(`/hosting/listings/editor/${listingId}/details/photo-tour`);
  };

  const toggleViewType = () => {
    setViewType(viewType === 'grid' ? 'list' : 'grid');
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case 'action-required':
          return { label: 'Action required', color: 'text-red-700 bg-red-100' };
        case 'in-progress':
          return { label: 'In progress', color: 'text-orange-700 bg-orange-100' };
        default:
          return { label: 'Draft', color: 'text-gray-700 bg-gray-100' };
      }
    };

    const config = getStatusConfig(status);
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <>
      <NotificationCard
            subtitle="hello mkan"
            title="Confirm a few key details"
            description="Required to publish"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Your listings</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18m-9-9l9 9-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={toggleViewType}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              {viewType === 'grid' ? (
                <ListView size={20} className="text-gray-600" />
              ) : (
                <GridView size={20} className="text-gray-600" />
              )}
            </button>
            <button 
              onClick={() => router.push('/host/overview')}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {mockListings.map((listing) => (
            <div 
              key={listing.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${viewType === 'list' ? 'flex' : ''}`}
              onClick={() => handleEditListing(listing.id)}
            >
              <div className="relative">
                <div className={`${viewType === 'list' ? 'w-48 h-32' : 'aspect-square'} bg-gray-200 overflow-hidden`}>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-3 left-3">
                  <StatusBadge status={listing.status} />
                </div>
              </div>
              <div className="p-4 flex-1">
                <p className="text-sm text-gray-600 mb-1">{listing.title}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditListing(listing.id);
                  }}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Edit listing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HostingListingsPage; 