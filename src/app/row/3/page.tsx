"use client";

import React, { Suspense } from 'react';
import Calendar from '@/components/row/Calendar';
import Categories from '@/components/row/Categories';
import CategoryBox from '@/components/row/CategoryBox';
import CategoryInput from '@/components/row/CategoryInput';
import Counter from '@/components/row/Counter';
import CountrySelect from '@/components/row/CountrySelect';
import ListingCard from '@/components/row/ListingCard';
import ListingCategory from '@/components/row/ListingCategory';
import ListingReservation from '@/components/row/ListingReservation';
import RentModal from '@/components/row/RentModal';
import UserMenu from '@/components/row/UserMenu';
import { TbBeach } from 'react-icons/tb';
import { addDays } from 'date-fns';

const Page = () => {
  // Simplified mock data
  const dateRange = {
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
    key: 'selection'
  };

  const mockListing = {
    id: '1',
    title: 'Beach House',
    description: 'Beautiful beach house',
    imageSrc: '/placeholder.jpg',
    category: 'Beach',
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    locationValue: 'US',
    price: 100,
    createdAt: new Date(),
    userId: '1'
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">User Menu</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <UserMenu />
        </Suspense>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Categories />
        </Suspense>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Category Box</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryBox 
            icon={TbBeach}
            label="Beach"
            description="This property is close to the beach!"
          />
        </Suspense>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Category Input</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryInput 
            icon={TbBeach}
            label="Beach"
            onClick={() => {}}
          />
        </Suspense>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Counter</h2>
        <Counter 
          title="Guests"
          subtitle="How many guests?"
          value={1}
          onChange={() => {}}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Country Select</h2>
        <CountrySelect 
          onChange={() => {}}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <Calendar 
          value={dateRange}
          onChange={() => {}}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Listing Card</h2>
        <div className="max-w-sm">
          <ListingCard 
            data={mockListing}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Listing Category</h2>
        <ListingCategory 
          icon={TbBeach}
          label="Beach"
          description="This property is close to the beach!"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Listing Reservation</h2>
        <div className="max-w-md">
          <ListingReservation 
            price={100}
            dateRange={dateRange}
            totalPrice={500}
            onChangeDate={() => {}}
            onSubmit={() => {}}
            disabled={false}
            disabledDates={[]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Rent Modal</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <RentModal />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;