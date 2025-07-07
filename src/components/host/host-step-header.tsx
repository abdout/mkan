"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface HostStepHeaderProps {
  stepNumber?: number;
  title: string;
  description?: string;
  illustration?: React.ReactNode;
  className?: string;
}

const HostStepHeader: React.FC<HostStepHeaderProps> = ({
  stepNumber,
  title,
  description,
  illustration,
  className,
}) => {
  return (
    <div className={cn('w-full -mt-10', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6">
          {stepNumber && (
            <h6>
              Step {stepNumber}
            </h6>
          )}
          
          <h2 className="leading-tight">
            {title}
          </h2>
          
          {description && (
            <p>
              {description}
            </p>
          )}
        </div>

        {/* Right Side - Illustration */}
        {illustration && (
          <div className="hidden lg:block">
            <div className="relative">
              {illustration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostStepHeader; 