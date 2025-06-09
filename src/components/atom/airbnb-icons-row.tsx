"use client";

import React from 'react';
import AirbnbIcon from './airbnb-icon';

interface IconItem {
  filename: string;
  label: string;
  description?: string;
}

const AIRBNB_ICONS: IconItem[] = [
  { filename: 'Islands', label: 'Islands', description: 'Private islands' },
  { filename: 'Mension', label: 'Mansions', description: 'Luxury homes' },
  { filename: 'Beach', label: 'Beach', description: 'Beachfront' },
  { filename: 'Boat', label: 'Boats', description: 'Unique stays' },
  { filename: 'Containers', label: 'Containers', description: 'Modern design' },
  { filename: 'New', label: 'New', description: 'Latest additions' },
  { filename: 'Beauty Pools', label: 'Pools', description: 'Pool paradise' },
  { filename: 'Group', label: 'Groups', description: 'Large groups' },
  { filename: 'layer1', label: 'Featured', description: 'Top picks' },
  { filename: 'Calque 2', label: 'Special', description: 'Unique stays' },
  { filename: 'Windmill', label: 'Windmills', description: 'Unique stays' },
];

interface AirbnbIconsRowProps {
  onIconClick?: (iconFilename: string) => void;
  selectedIcon?: string;
  className?: string;
  showDescriptions?: boolean;
}

const AirbnbIconsRow: React.FC<AirbnbIconsRowProps> = ({
  onIconClick,
  selectedIcon,
  className = "",
  showDescriptions = false
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-start justify-between py-2 -mx-6">
        {AIRBNB_ICONS.map((icon) => (
          <div
            key={icon.filename}
            onClick={() => onIconClick?.(icon.filename)}
            className="flex flex-col items-center flex-1 cursor-pointer group transition-all duration-200"
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center w-12 h-12 rounded-lg">
              <AirbnbIcon 
                name={icon.filename} 
                size={24}
                className={`transition-all duration-200 ${
                  selectedIcon === icon.filename 
                    ? 'brightness-0 saturate-0' 
                    : 'group-hover:brightness-0 group-hover:saturate-0'
                }`}
              />
            </div>
            
            {/* Label */}
            <div className="-mt-2 text-center">
              <div 
                className={`text-xs font-normal transition-colors duration-200 inline-block ${
                  selectedIcon === icon.filename
                    ? 'text-black'
                    : 'text-gray-700 group-hover:text-black'
                }`}
              >
                {icon.label}
              </div>
              
              {/* Optional Description */}
              {showDescriptions && icon.description && (
                <div className="text-[10px] text-gray-700">
                  {icon.description}
                </div>
              )}
            </div>

            {/* Underline - Selected Only */}
            <div 
              className={`mt-1 h-0.5 bg-gray-900 transition-opacity duration-200 mx-auto ${
                selectedIcon === icon.filename
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              style={{ width: 'fit-content', minWidth: '20px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirbnbIconsRow; 