import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HelpCircle, Bookmark } from 'lucide-react';

interface HostFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  onHelp?: () => void;
  onSave?: () => void;
  currentStep?: number; // 1, 2, or 3
  backLabel?: string;
  nextLabel?: string;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

const HostFooter: React.FC<HostFooterProps> = ({
  onBack,
  onNext,
  onHelp,
  onSave,
  currentStep = 1,
  backLabel = "Back",
  nextLabel = "Next",
  canGoBack = true,
  canGoNext = true
}) => {
  // Calculate progress for each step group
  const getStepProgress = (stepNumber: number) => {
    if (currentStep > stepNumber) return 100; // Completed
    if (currentStep === stepNumber) return 50; // In progress
    return 0; // Not started
  };

  const stepLabels = [
    "Tell us about your place",
    "Make it stand out", 
    "Finish up and publish"
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white">
      {/* Three separate progress bars */}
      <div className="">
        <div className="grid grid-cols-3 gap-2 px-20">
          {stepLabels.map((label, index) => (
            <Progress 
              key={index}
              value={getStepProgress(index + 1)} 
              className="h-1 w-full"
            />
          ))}
        </div>
      </div>

      {/* All controls in one row */}
      <div className="flex items-center justify-between px-20 py-4">
        {/* Left side - Logo, Help, Save */}
        <div className="flex items-center">
          <div className="relative w-5 h-5">
            <Image
              src="/tent.png"
              alt="Tent icon"
              fill
              className="object-contain"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onHelp}
            className="rounded-full ml-2"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="rounded-full"
          >
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>

        {/* Right side - Back and Next buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            disabled={!canGoBack}
            size='sm'
            className=""
          >
            {backLabel}
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            size='sm'
            className=""
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default HostFooter;
