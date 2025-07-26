"use client";

import React from 'react';

interface Destination {
  id: string;
  title: string;
  distance: string;
  image: string;
  backgroundColor: string;
}

interface AirbnbInspirationProps {
  destinations?: Destination[];
  className?: string;
}

const defaultDestinations: Destination[] = [
  {
    id: '1',
    title: 'Nashville',
    distance: '53 miles away',
    image: '/airbnb/Rectangle 1.svg',
    backgroundColor: '#CC2D4A'
  },
  {
    id: '2',
    title: 'South Haven',
    distance: '168 miles away',
    image: '/airbnb/Rectangle 1 (2).svg',
    backgroundColor: '#BC1A6E'
  },
  {
    id: '3',
    title: 'Stanton',
    distance: '192 miles away',
    image: '/airbnb/Rectangle 1 (3).svg',
    backgroundColor: '#DE3151'
  },
  {
    id: '4',
    title: 'New Buffalo',
    distance: '130 miles away',
    image: '/airbnb/Rectangle 1.svg',
    backgroundColor: '#D93B30'
  }
];

const AirbnbInspiration: React.FC<AirbnbInspirationProps> = ({
  destinations = defaultDestinations,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
        Inspiration for your next trip
      </h2>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="cursor-pointer rounded-sm overflow-hidden flex flex-col h-80"
          >
            {/* Image Section */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section with Custom Color */}
            <div 
              className="h-40 p-4 text-white flex flex-col "
              style={{ backgroundColor: destination.backgroundColor }}
            >
              <h3 className="text-lg font-semibold mb-1">
                {destination.title}
              </h3>
              <p className="text-sm opacity-90 text-white">
                {destination.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirbnbInspiration; 