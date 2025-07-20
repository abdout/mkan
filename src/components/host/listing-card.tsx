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
      className="border hover:border-foreground/50 py-3 bg-card hover:bg-accent transition-all cursor-pointer shadow-none hover:shadow-none rounded-lg"
      onClick={handleClick}
    >
      <CardContent className="flex items-center px-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h5>
              {title}
            </h5>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard; 