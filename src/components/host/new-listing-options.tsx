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
    <div className="space-y-4">
      <h5>
        Start a new listing
      </h5>
      
      <div className="space-y-3">
        {/* Create a new listing */}
        <Link href="/host/overview" onClick={handleCreateNew} className="w-full flex items-center justify-between h-auto py-4 border-b border-border transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <h5>
                Create a new listing
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-foreground group-hover:text-foreground transition-colors" />
        </Link>

        {/* Create from existing listing */}
        <Link href="/host/overview" onClick={handleCreateFromExisting} className="w-full flex items-center justify-between h-auto py-4 border-b border-border transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <h5>
                Create from an existing listing
              </h5>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-foreground group-hover:text-foreground transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default NewListingOptions; 