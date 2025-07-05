"use client";

import React from 'react';
import { Home, Copy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NewListingOptionsProps {
  onCreateNew?: () => void;
  onCreateFromExisting?: () => void;
}

const NewListingOptions: React.FC<NewListingOptionsProps> = ({
  onCreateNew,
  onCreateFromExisting
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900">
        Start a new listing
      </h2>
      
      <div className="space-y-3">
        {/* Create a new listing */}
        <Link href="/host/overview" className="w-full flex items-center justify-between h-auto py-4 border-b  transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-900 font-medium">
                Create a new listing
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Link>

        {/* Create from existing listing */}
        <Link href="/host/overview" className="w-full flex items-center justify-between h-auto py-4 border-b  transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-900 font-medium">
                Create from an existing listing
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default NewListingOptions; 