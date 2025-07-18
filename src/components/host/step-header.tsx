"use client";

import React from 'react';

interface StepHeaderProps {
  stepNumber?: number;
  title: string;
  description?: string;
  illustration?: React.ReactNode;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  stepNumber,
  title,
  description,
  illustration
}) => {
  return (
    <div className="w-full -mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6">
          {stepNumber && (
            <div className="text-sm font-medium text-gray-600">
              Step {stepNumber}
            </div>
          )}
          
          <h1 className="text-4xl font-medium text-gray-900 leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed">
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

export default StepHeader; 