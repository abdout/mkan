"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HelpCircle, Bookmark } from 'lucide-react';
import { useHostValidation } from '@/context/host-validation-context';

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
  nextDisabled?: boolean;
}

// Define the step order for the hosting flow
const HOSTING_STEPS = [
  'about-place',
  'structure', 
  'privacy-type',
  'location',
  'floor-plan',
  'stand-out',
  'amenities',
  'photos',
  'title',
  'description',
  'finish-setup',
  'instant-book',
  'visibility',
  'price',
  'discount',
  'legal'
];

// Group steps into 3 main categories
const STEP_GROUPS = {
  1: ['about-place', 'structure', 'privacy-type', 'location', 'floor-plan', 'stand-out'],
  2: ['amenities', 'photos', 'title', 'description', 'finish-setup'],
  3: ['instant-book', 'visibility', 'price', 'discount', 'legal']
};

const HostFooter: React.FC<HostFooterProps> = ({
  onBack,
  onNext,
  onHelp,
  onSave,
  currentStep: propCurrentStep,
  backLabel = "Back",
  nextLabel = "Next",
  canGoBack = true,
  canGoNext = true,
  nextDisabled = false
}) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  
  // Use validation context if available
  let contextNextDisabled = false;
  let customNavigation;
  try {
    const validationContext = useHostValidation();
    contextNextDisabled = validationContext.isNextDisabled;
    customNavigation = validationContext.customNavigation;
  } catch (error) {
    // Context not available, use default value
    contextNextDisabled = false;
    customNavigation = undefined;
  }
  
  // Extract current step from pathname
  const getCurrentStepFromPath = () => {
    const pathSegments = pathname.split('/');
    const currentStepSlug = pathSegments[pathSegments.length - 1];
    const stepIndex = HOSTING_STEPS.findIndex(step => step === currentStepSlug);
    return stepIndex === -1 ? 0 : stepIndex; // Default to first step if not found
  };
  
  const currentStepIndex = getCurrentStepFromPath();
  const currentStepSlug = HOSTING_STEPS[currentStepIndex] || HOSTING_STEPS[0];
  
  // Determine which step group we're in
  const getCurrentStepGroup = () => {
    for (const [group, steps] of Object.entries(STEP_GROUPS)) {
      if (steps.includes(currentStepSlug)) {
        return parseInt(group);
      }
    }
    return 1;
  };
  
  const currentStepGroup = getCurrentStepGroup();
  
  // Navigation functions
  const handleBack = () => {
    // Use custom navigation if available
    if (customNavigation?.onBack) {
      customNavigation.onBack();
      return;
    }
    
    if (onBack) {
      onBack();
      return;
    }
    
    if (currentStepIndex > 0) {
      const prevStep = HOSTING_STEPS[currentStepIndex - 1];
      router.push(`/host/${params.id}/${prevStep}`);
    }
  };
  
  const handleNext = () => {
    // Use custom navigation if available
    if (customNavigation?.onNext) {
      customNavigation.onNext();
      return;
    }
    
    if (onNext) {
      onNext();
      return;
    }
    
    // If we're on the legal step (last step), navigate to listings
    if (currentStepSlug === 'legal') {
      router.push('/hosting/listings');
      return;
    }
    
    if (currentStepIndex < HOSTING_STEPS.length - 1) {
      const nextStep = HOSTING_STEPS[currentStepIndex + 1];
      router.push(`/host/${params.id}/${nextStep}`);
    }
  };
  
  // Calculate progress for each step group
  const getStepProgress = (stepNumber: number) => {
    if (currentStepGroup > stepNumber) return 100; // Completed
    if (currentStepGroup === stepNumber) {
      // Calculate progress within current group
      const groupSteps = STEP_GROUPS[stepNumber as keyof typeof STEP_GROUPS];
      const currentStepInGroup = groupSteps.findIndex(step => step === currentStepSlug);
      // Add 1 to currentStepInGroup to make it 1-indexed, so the last step shows 100%
      return Math.max(10, ((currentStepInGroup + 1) / groupSteps.length) * 100);
    }
    return 0; // Not started
  };
  
  const stepLabels = [
    "Tell us about your place",
    "Make it stand out", 
    "Finish up and publish"
  ];
  
  // Check if back/next are available
  const canGoBackActual = canGoBack && (currentStepIndex > 0);
  const canGoNextActual = canGoNext && (currentStepIndex < HOSTING_STEPS.length - 1 || currentStepSlug === 'legal') && !nextDisabled && !contextNextDisabled && !(customNavigation?.nextDisabled);
  
  // Set the next button label based on current step
  const actualNextLabel = currentStepSlug === 'legal' ? 'Create listing' : nextLabel;

  return (
    <footer className="fixed bottom-0 left-0 right-0">
      {/* Three separate progress bars */}
      <div className="">
        <div className="grid grid-cols-3 gap-2 px-20">
          {stepLabels.map((label, index) => (
            <Progress 
              key={index}
              value={getStepProgress(index + 1)} 
              className="h-1 w-full "
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={!canGoBackActual}
            size='sm'
            className=""
          >
            {backLabel}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canGoNextActual}
            size='sm'
            variant="black"
            
          >
            {actualNextLabel}
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default HostFooter;
