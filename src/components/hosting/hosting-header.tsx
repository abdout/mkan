"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

const HostingHeader = () => {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Today', href: '/hosting' },
    { name: 'Calendar', href: '/hosting/calendar' },
    { name: 'Listings', href: '/hosting/listings' },
    { name: 'Messages', href: '/hosting/messages', hasNotification: true },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            {/* Mkan Logo */}
            <Link href="/hosting" className="cursor-pointer hover:text-gray-700" scroll={false}>
              <div className="flex items-center gap-2">
                <Image
                  src="/tent.png"
                  alt="Mkan Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <div className="text-xl font-bold text-gray-900">
                  Mk
                  <span className="font-light hover:text-gray-700 text-gray-600">
                    an
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center - Navigation (Absolutely Centered) */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActiveRoute(item.href)
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                {item.hasNotification && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side - User Controls */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Switch to traveling
            </Link>
            
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            
            <button className="text-gray-600 hover:text-gray-900 relative transition-colors">
              <MoreHorizontal size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HostingHeader;
