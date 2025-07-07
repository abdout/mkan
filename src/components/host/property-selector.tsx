"use client";

import React from 'react';
import { Home, Building, Bed, Ship, TreePine, Castle, Mountain, Container, Warehouse, Car, Building2 } from 'lucide-react';
import SelectionCard from './selection-card';
import { cn } from '@/lib/utils';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface PropertySelectorProps {
  selectedType?: string;
  onSelect?: (typeId: string) => void;
  compact?: boolean;
  className?: string;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  selectedType,
  onSelect,
  compact = false,
  className,
}) => {
  const propertyTypes: PropertyType[] = [
    { id: 'house', name: 'House', icon: Home },
    { id: 'apartment', name: 'Apartment', icon: Building },
    { id: 'barn', name: 'Barn', icon: Warehouse },
    { id: 'bed-breakfast', name: 'Bed', icon: Bed },
    { id: 'boat', name: 'Boat', icon: Ship },
    { id: 'cabin', name: 'Cabin', icon: TreePine },
    { id: 'camper-rv', name: 'Camper', icon: Car },
    { id: 'casa-particular', name: 'Casa', icon: Building2 },
    { id: 'castle', name: 'Castle', icon: Castle },
    { id: 'cave', name: 'Cave', icon: Mountain },
    { id: 'container', name: 'Container', icon: Container },
    { id: 'cycladic-home', name: 'Cycladic', icon: Home }
  ];

  if (compact) {
    return (
      <div className={cn('w-full', className)}>
        <div className="grid grid-cols-4 gap-3">
          {propertyTypes.map((type) => {
            const IconComponent = type.icon;
            
            return (
              <SelectionCard
                key={type.id}
                id={type.id}
                title={type.name}
                icon={<IconComponent size={20} />}
                isSelected={selectedType === type.id}
                onClick={onSelect}
                compact={true}
                className="h-20"
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="mb-8">
        {/* <h1 className="text-center">
          Which of these best describes your place?
        </h1> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {propertyTypes.map((type) => {
          const IconComponent = type.icon;
          
          return (
            <SelectionCard
              key={type.id}
              id={type.id}
              title={type.name}
              icon={<IconComponent size={32} />}
              isSelected={selectedType === type.id}
              onClick={onSelect}
              className="p-6"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PropertySelector; 