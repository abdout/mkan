import React from 'react';
import { cn } from '@/lib/utils';

interface StepWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ children, className }) => (
  <div className={cn('max-w-6xl mx-auto px-4 py-8', className)}>
    {children}
  </div>
);

export default StepWrapper; 