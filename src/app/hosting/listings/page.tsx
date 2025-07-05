"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MoreHorizontal } from 'lucide-react';

const HostingListingsPage = () => {
  const router = useRouter();

  const mockListings = [
    {
      id: '1456438879027340782',
      image: '/placeholder.jpg',
      status: 'action-required',
      title: 'Cozy Downtown Apartment',
    },
    {
      id: '2',
      image: '/placeholder.jpg', 
      status: 'in-progress',
      title: 'Modern Studio Loft',
    },
    {
      id: '3',
      image: '/placeholder.jpg',
      status: 'in-progress', 
      title: 'Beachfront Villa',
    },
  ];

  const handleEditListing = (listingId: string) => {
    router.push(`/hosting/listings/editor/${listingId}/details/photo-tour`);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-red-500">airbnb</span>
              </div>
              <nav className="flex space-x-8">
                <button className="text-gray-600 hover:text-gray-900">Today</button>
                <button className="text-gray-600 hover:text-gray-900">Calendar</button>
                <button className="text-gray-900 font-medium border-b-2 border-gray-900 pb-4">Listings</button>
                <button className="text-gray-600 hover:text-gray-900 relative">
                  Messages
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Switch to traveling</button>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <button className="text-gray-600 hover:text-gray-900 relative">
                <MoreHorizontal size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">hello mkan</p>
              <p className="text-base font-medium text-gray-900">Confirm a few key details</p>
              <p className="text-sm text-gray-600">Required to publish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-medium text-gray-900">Your listings</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
            <button 
              onClick={() => router.push('/become-a-host/overview')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">🏠</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <StatusBadge status={listing.status} />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">{listing.title}</p>
                <button
                  onClick={() => handleEditListing(listing.id)}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Edit listing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostingListingsPage; 