"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import NotificationCard from '@/components/hosting/notification-card';

const HostingPage = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');

  return (
    <>
      {/* Notification Row */}
      <NotificationCard
            subtitle="hello mkan"
            title="Confirm a few key details"
            description="Required to publish"
          />
          
       

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        {/* Toggle Buttons */}
        <div className="flex justify-center items-center space-x-4 mb-16">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeTab === 'today'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:text-gray-900 hover:border-gray-400'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeTab === 'upcoming'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:text-gray-900 hover:border-gray-400'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-center ">
          {/* Today Image */}
          <div className="">
            <Image
              src="/hosting/today.png"
              alt="Today illustration"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Empty State Text */}
          <div className="text-center">
            <p className="text-gray-500 text-lg">
              {activeTab === 'today' ? 'You don’t have any reservations' : 'You don’t have any upcoming reservations'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostingPage;