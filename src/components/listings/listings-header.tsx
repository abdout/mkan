"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MoreHorizontal, Menu } from 'lucide-react';
import BigSearch from '@/components/template/search/big-search';
import SmallSearch from '@/components/template/search/small-search';

const ListingsHeader = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: 'Homes', href: '#' },
    { name: 'Experiences', href: '#' },
    { name: 'Services', href: '#' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="bg-muted sticky top-0 z-50 transition-all duration-300 border-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-14 pt-4 min-h-[56px]">
          {/* Left side - Logo - Fixed Position */}
          <div className="flex items-center w-1/3">
            {/* Mkan Logo */}
            <Link href="/" className="cursor-pointer hover:text-gray-700" scroll={false}>
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

          {/* Center - Navigation Links and Small Search */}
          <div className="flex-1 flex justify-center relative">
            {/* Navigation Links */}
            <nav className={`flex space-x-8 transition-all duration-300 ${isScrolled ? 'transform -translate-y-full opacity-0 absolute' : 'transform translate-y-0 opacity-100'}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium ${
                    isActiveRoute(item.href)
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Small Search */}
            <div className={`pt-1 transition-all duration-300 ${isScrolled ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0 absolute'}`}>
              <SmallSearch />
            </div>
          </div>

          {/* Right side - User Controls - Fixed Position */}
          <div className="flex items-center justify-end space-x-2 w-1/3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Menu size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Second Row - Big Search Component */}
      <div className={`w-full px-4 sm:px-6 lg:px-32 pt-3 pb-4 transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        <div className={`transition-all duration-300 ${isScrolled ? 'transform -translate-y-full opacity-0 scale-75' : 'transform translate-y-0 opacity-100 scale-100'}`}>
          <BigSearch />
        </div>
      </div>
    </header>
  );
};

export default ListingsHeader;
