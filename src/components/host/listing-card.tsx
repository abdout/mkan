"use client";

import React from 'react';
import { Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ListingCardProps {
  id: string;
  title: string;
  startDate: string;
  type?: 'house' | 'listing';
  onClick?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  startDate,
  type = 'listing',
  onClick
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <Card 
      className="border hover:border-foreground/50 py-3 sm:py-4 bg-card hover:bg-accent transition-all cursor-pointer shadow-none hover:shadow-none rounded-lg min-h-[60px] sm:min-h-[72px]"
      onClick={handleClick}
    >
      <CardContent className="flex items-center px-3 sm:px-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-sm sm:text-base font-medium truncate">
              {title}
            </h5>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Started {startDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard; 