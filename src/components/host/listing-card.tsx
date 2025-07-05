"use client";

import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
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
      className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="flex items-center p-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-base text-gray-900 font-medium">
              {title}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </CardContent>
    </Card>
  );
};

export default ListingCard; 