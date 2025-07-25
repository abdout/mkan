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
  const handleCreateNew = (e: React.MouseEvent) => {
    e.preventDefault();
    onCreateNew?.();
  };

  const handleCreateFromExisting = (e: React.MouseEvent) => {
    e.preventDefault();
    onCreateFromExisting?.();
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h5 className="text-lg sm:text-xl font-semibold">
        Start a new listing
      </h5>
      
      <div className="space-y-2 sm:space-y-3">
        {/* Create a new listing */}
        <Link href="/host/overview" onClick={handleCreateNew} className="w-full flex items-center justify-between h-auto py-3 sm:py-4 border-b border-border transition-all group min-h-[60px] sm:min-h-[72px]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h5 className="text-sm sm:text-base font-medium">
                Create a new listing
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
        </Link>

        {/* Create from existing listing */}
        <Link href="/host/overview" onClick={handleCreateFromExisting} className="w-full flex items-center justify-between h-auto py-3 sm:py-4 border-b border-border transition-all group min-h-[60px] sm:min-h-[72px]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Copy className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h5 className="text-sm sm:text-base font-medium">
                Create from an existing listing
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
};

export default NewListingOptions; 