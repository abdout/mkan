"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AmenityItem {
  id: string;
  label: string;
  icon: string;
  alt: string;
}

interface AmenityViewerProps {
  className?: string;
}

// Custom component for SVG amenity icons
const SvgIcon = ({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    className="object-contain"
  />
);

const AmenityViewer: React.FC<AmenityViewerProps> = ({
  className,
}) => {
  // Static amenities data matching the image exactly
  const staticAmenities: AmenityItem[] = [
    { id: 'wifi', label: 'Wifi', icon: '/amenities/Wifi.svg', alt: 'Wifi' },
    { id: 'tv', label: 'TV', icon: '/amenities/TV.svg', alt: 'TV' },
    { id: 'kitchen', label: 'Kitchen', icon: '/amenities/Kitchen.svg', alt: 'Kitchen' },
    { id: 'free-parking', label: 'Free parking on premises', icon: '/amenities/Parking.svg', alt: 'Free parking' },
    { id: 'air-conditioning', label: 'Air conditioning', icon: '/amenities/Air conditioning.svg', alt: 'Air conditioning' },
    { id: 'smoke-alarm', label: 'Smoke alarm', icon: '/amenities/Smoke alarm.svg', alt: 'Smoke alarm' },
  ];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Heading */}
      <h3 className="text-xl font-semibold text-foreground">
        What this place offers
      </h3>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 gap-4">
        {staticAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <SvgIcon src={amenity.icon} alt={amenity.alt} size={24} />
            </div>
            <span className="text-sm text-foreground leading-relaxed">
              {amenity.label}
            </span>
          </div>
        ))}
      </div>

      {/* Show all amenities button */}
      <Button 
        variant="outline" 
        className="w-auto bg-muted border-0 text-gray-700 hover:bg-gray-50"
      >
        Show all 23 amenities
      </Button>
    </div>
  );
};

export default AmenityViewer; 