"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
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
    <header className="bg-muted sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-3 items-center h-16">
          {/* Left side - Logo - Fixed Position */}
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

          {/* Center - Navigation Links */}
          <div className="flex justify-center">
            <nav className="flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActiveRoute(item.href)
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5'
                      : 'text-gray-600 hover:text-gray-900'
                  } ${isScrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - User Controls - Fixed Position */}
          <div className="flex items-center justify-end">
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
      
      {/* Second Row - Big Search Component */}
      <div className={`w-full px-4 sm:px-6 lg:px-32 py-3 transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        <div className={`transition-all duration-300 ${isScrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
          <BigSearch />
        </div>
      </div>
    </header>
  );
};

export default ListingsHeader;
