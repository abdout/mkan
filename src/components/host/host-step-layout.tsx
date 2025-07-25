"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface HostStepLayoutProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const HostStepLayout: React.FC<HostStepLayoutProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div className={cn('', className)}>
      <div className="items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left div - Title and subtitle */}
          <div className="flex-1 flex flex-col">
            <div className="leading-tight text-start">
              {typeof title === 'string' ? (
                <h3 className="text-xl sm:text-2xl lg:text-3xl">{title}</h3>
              ) : (
                title
              )}
            </div>
            {subtitle && (
              <div className="mt-3 sm:mt-4">
                {typeof subtitle === 'string' ? (
                  <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
                ) : (
                  subtitle
                )}
              </div>
            )}
          </div>

          {/* Right div - Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostStepLayout; 