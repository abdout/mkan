"use client";

import React from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: 'guest', name: 'Guest' },
    { id: 'home-host', name: 'Home host' },
    { id: 'experience-host', name: 'Experience host' },
    { id: 'service-host', name: 'Service host' },
    { id: 'travel-admin', name: 'Travel admin' },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}



