'use client';

import AppBanner from '@/components/row/atoms/AppBanner'
import AppClearButton from '@/components/row/atoms/AppClearButton'
import AppCounter from '@/components/row/atoms/AppCounter'
import AppFooter from '@/components/row/atoms/AppFooter'
import AppHeaderOption from '@/components/row/atoms/AppHeaderOption'
import AppHero from '@/components/row/atoms/AppHero'
import AppMobileNavigation from '@/components/row/atoms/AppNavigationMobile'
import AppNearby from '@/components/row/atoms/AppNearby'
import AppPlaceCard from '@/components/row/atoms/AppPlaceCard'
import AppSearchOptionButton from '@/components/row/atoms/AppSearchOptionButton'
import React, { useState } from 'react'

const NEARBY_PLACES = [
  {
    location: "Lake Tahoe",
    img: "/assets/explore-nearby/1to.webp",
    distance: "3.5 hour"
  },
  {
    location: "Big Bear",
    img: "/assets/explore-nearby/2k3.webp",
    distance: "2 hour"
  },
  {
    location: "Joshua Tree",
    img: "/assets/explore-nearby/40m.webp",
    distance: "4 hour"
  },
  {
    location: "Palm Springs",
    img: "/assets/explore-nearby/2k3.webp",
    distance: "1.5 hour"
  }
];

const FEATURED_PLACES = [
  {
    img: "/assets/search/013c9377-349f-418b-8d4c-15f923234a5f.webp",
    title: "Luxury Villa in Beverly Hills",
    location: "Beverly Hills, California",
    description: "Private pool • 5 bedrooms • Ocean view",
    star: 4.97,
    reviews: 128,
    price: 850
  },
  {
    img: "/assets/search/1379331e-593a-4c1e-af51-222808c85a11.webp",
    title: "Modern Downtown Loft",
    location: "Downtown LA, California",
    description: "City views • 2 bedrooms • Fully equipped kitchen",
    star: 4.85,
    reviews: 96,
    price: 275
  },
  {
    img: "/assets/search/2dd686bc-0195-40db-a37f-8b02476415b7.webp",
    title: "Beachfront Paradise",
    location: "Malibu, California",
    description: "Direct beach access • 3 bedrooms • Stunning sunset views",
    star: 4.92,
    reviews: 164,
    price: 625
  }
];

const page = () => {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [darkTab, setDarkTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [activeSearch, setActiveSearch] = useState<number | null>(null);

  return (
    <div className='min-h-screen flex flex-col'>
      <AppHero />
      
      <div className='flex-1 flex flex-col gap-6 p-10'>
        <AppBanner />
        
        {/* Search Options */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Search Options</h3>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl">
            <AppSearchOptionButton
              title="Location"
              placeholder="Where are you going?"
              type="input"
              value={searchValue}
              onChange={setSearchValue}
              active={activeSearch === 0}
              onFocus={() => setActiveSearch(0)}
              onClear={() => setSearchValue('')}
              separator
            />
            <AppSearchOptionButton
              title="Check in"
              placeholder="Add dates"
              active={activeSearch === 1}
              onFocus={() => setActiveSearch(1)}
              separator
            />
            <AppSearchOptionButton
              title="Check out"
              placeholder="Add dates"
              active={activeSearch === 2}
              onFocus={() => setActiveSearch(2)}
              separator
            />
            <AppSearchOptionButton
              title="Guests"
              placeholder="Add guests"
              active={activeSearch === 3}
              onFocus={() => setActiveSearch(3)}
              withSearch
              onSearch={() => alert('Search clicked!')}
            />
          </div>
        </div>

        {/* Light Header Options */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Light Header Options</h3>
          <div className="flex gap-2 p-4 bg-gray-100 rounded-lg">
            <AppHeaderOption active={activeTab === 0} onClick={() => setActiveTab(0)}>
              Places
            </AppHeaderOption>
            <AppHeaderOption active={activeTab === 1} onClick={() => setActiveTab(1)}>
              Experiences
            </AppHeaderOption>
            <AppHeaderOption active={activeTab === 2} onClick={() => setActiveTab(2)}>
              Online
            </AppHeaderOption>
          </div>
        </div>

        {/* Dark Header Options */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Dark Header Options</h3>
          <div className="flex gap-2 p-4 bg-gray-900 rounded-lg">
            <AppHeaderOption isSnap active={darkTab === 0} onClick={() => setDarkTab(0)}>
              Stays
            </AppHeaderOption>
            <AppHeaderOption isSnap active={darkTab === 1} onClick={() => setDarkTab(1)}>
              Flights
            </AppHeaderOption>
            <AppHeaderOption isSnap active={darkTab === 2} onClick={() => setDarkTab(2)}>
              Cars
            </AppHeaderOption>
          </div>
        </div>

        {/* Nearby Places */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Explore Nearby</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {NEARBY_PLACES.map((place) => (
              <AppNearby key={place.location} {...place} />
            ))}
          </div>
        </div>

        {/* Featured Places */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Featured Places</h3>
          <div className="space-y-2 divide-y divide-gray-100">
            {FEATURED_PLACES.map((place) => (
              <AppPlaceCard key={place.title} {...place} />
            ))}
          </div>
        </div>

        <AppClearButton active={false} onClick={() => {}} />
        <AppCounter 
          value={count}
          onIncrease={() => setCount(prev => Math.min(prev + 1, 16))}
          onDecrease={() => setCount(prev => Math.max(prev - 1, 0))}
        />
      </div>
      <AppFooter />
      <AppMobileNavigation />
    </div>
  )
}

export default page