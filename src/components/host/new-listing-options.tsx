"use client";

import React from 'react';
import { Home, Copy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-4 border border-gray-200 hover:shadow-md transition-shadow"
          onClick={onCreateNew}
        >
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-base text-gray-900 font-medium">
                Create a new listing
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Button>

        {/* Create from existing listing */}
        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-4 border border-gray-200 hover:shadow-md transition-shadow"
          onClick={onCreateFromExisting}
        >
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Copy className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-base text-gray-900 font-medium">
                Create from an existing listing
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

export default NewListingOptions; 