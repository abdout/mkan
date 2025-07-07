"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface SelectionCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick?: (id: string) => void;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  description,
  icon,
  isSelected = false,
  onClick,
  className,
  compact = false,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 border hover:border-foreground/50',
        isSelected && 'border-foreground bg-accent',
        disabled && 'cursor-not-allowed opacity-50',
        compact ? 'p-3' : 'p-4',
        className
      )}
      onClick={handleClick}
    >
      <div className={cn(
        'flex items-center',
        compact ? 'flex-col space-y-2' : description ? 'justify-between' : 'space-x-3'
      )}>
        <div className={cn('flex', compact ? 'flex-col items-center space-y-1' : 'flex-1 items-center space-x-3')}>
          {icon && !description && (
            <div className={cn(
              'flex-shrink-0',
              isSelected ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {icon}
            </div>
          )}
          <div className={cn(compact && 'text-center')}>
            <h6 className={cn(
              isSelected ? 'text-foreground' : 'text-foreground'
            )}>
              {title}
            </h6>
            {description && !compact && (
              <p className="mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        {icon && !compact && (
          <div className={cn(
            'flex-shrink-0 ml-4',
            isSelected ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SelectionCard; 