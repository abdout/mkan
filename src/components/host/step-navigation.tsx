"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  canGoBack?: boolean;
  canGoNext?: boolean;
  nextDisabled?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  canGoBack = true,
  canGoNext = true,
  nextDisabled = false
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Back Button */}
        <div>
          {canGoBack && onBack ? (
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" />
              {backLabel}
            </Button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Next Button */}
        <div>
          {canGoNext && onNext && (
            <Button
              onClick={onNext}
              disabled={nextDisabled}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepNavigation; 