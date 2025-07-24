"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import SearchBar from './search';

export default function HelpHeader() {
  return (
    <header className="bg-white sticky top-0 z-50 ">
      <div className="">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer hover:text-gray-700" scroll={false}>
              <div className="flex items-center gap-2">
                <Image
                  src="/tent.png"
                  alt="Mkan Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <h4>
                 Help Center
                </h4>
              </div>
            </Link>
          </div>

         

          {/* Right side - User Controls */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Menu size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
