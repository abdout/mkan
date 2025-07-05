"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Plus, Eye } from 'lucide-react';

interface PhotoTourPageProps {
  params: Promise<{ listingId: string }>;
}

const PhotoTourPage = ({ params }: PhotoTourPageProps) => {
  const router = useRouter();
  const [listingId, setListingId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setListingId(resolvedParams.listingId);
    });
  }, [params]);

  const rooms = [
    {
      id: 'bedroom',
      name: 'Bedroom',
      status: 'add-photos',
      photoCount: 0,
    },
    {
      id: 'bathroom',
      name: 'Full bathroom',
      status: 'add-photos',
      photoCount: 0,
    },
    {
      id: 'additional',
      name: 'Additional photos',
      status: 'has-photos',
      photoCount: 5,
    },
  ];

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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <button
              onClick={() => router.push('/hosting/listings')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Listing editor</span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex space-x-6 mb-8">
              <button className="text-gray-900 font-medium border-b-2 border-gray-900 pb-2">
                Your space
              </button>
              <button className="text-gray-600 hover:text-gray-900 pb-2">
                Arrival guide
              </button>
              <button className="text-gray-600 hover:text-gray-900 pb-2">
                <Settings size={16} />
              </button>
            </div>

            {/* Required Steps */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-lg font-medium text-gray-900">Complete required steps</span>
                </div>
                <button>
                  <ArrowLeft size={16} className="text-gray-400 rotate-180" />
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Finish these final tasks to publish your listing and start getting booked.
              </p>
            </div>

            {/* Photo Tour Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Photo tour</h3>
              <p className="text-gray-600 text-sm mb-4">1 bedroom • 1 bed • 1 bath</p>
              
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">👤</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 text-white text-sm font-medium">
                  5 photos
                </div>
              </div>
              
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <Eye size={16} />
                <span>View</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-medium text-gray-900">Photo tour</h1>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">All photos</button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Manage photos and add details. Guests will only see your tour if every room has a photo.
            </p>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {room.id === 'bedroom' && (
                      <div className="relative w-32 h-32">
                        {/* 3D Isometric Bed */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                          {/* Bed base */}
                          <div className="w-20 h-12 bg-orange-200 rounded-lg shadow-lg relative">
                            {/* Mattress */}
                            <div className="absolute -top-2 left-1 right-1 h-3 bg-orange-100 rounded border border-orange-300"></div>
                            {/* Pillow */}
                            <div className="absolute -top-3 left-2 w-6 h-2 bg-white rounded border border-gray-200"></div>
                            {/* Blanket */}
                            <div className="absolute -top-1 left-3 right-2 bottom-2 bg-orange-300 rounded"></div>
                          </div>
                          {/* Bed legs */}
                          <div className="absolute bottom-0 left-1 w-1 h-2 bg-amber-700"></div>
                          <div className="absolute bottom-0 right-1 w-1 h-2 bg-amber-700"></div>
                        </div>
                      </div>
                    )}
                    {room.id === 'bathroom' && (
                      <div className="relative w-32 h-32">
                        {/* 3D Isometric Bathroom */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                          {/* Bathtub */}
                          <div className="w-20 h-10 bg-blue-200 rounded-lg shadow-lg relative">
                            {/* Tub interior */}
                            <div className="absolute top-1 left-1 right-1 bottom-1 bg-blue-100 rounded"></div>
                            {/* Faucet */}
                            <div className="absolute -top-1 left-3 w-2 h-2 bg-gray-400 rounded-full"></div>
                            {/* Tap handles */}
                            <div className="absolute -top-1 left-1 w-1 h-1 bg-gray-500 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-1 h-1 bg-gray-500 rounded-full"></div>
                          </div>
                          {/* Towel rack */}
                          <div className="absolute -right-4 top-2 w-6 h-1 bg-gray-300 rounded"></div>
                          <div className="absolute -right-4 top-3 w-5 h-3 bg-green-200 rounded"></div>
                        </div>
                      </div>
                    )}
                    {room.id === 'additional' && (
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{room.name}</h3>
                    {room.status === 'add-photos' ? (
                      <button className="text-sm text-gray-600 hover:text-gray-900">
                        Add photos
                      </button>
                    ) : (
                      <p className="text-sm text-gray-600">
                        {room.photoCount} photos
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoTourPage; 