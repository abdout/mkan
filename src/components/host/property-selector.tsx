"use client";

import React, { useState } from 'react';
import { Home, Building, Bed, Ship, TreePine, Castle, Mountain, Container, Lock, Tent, Building2, House, Warehouse, Car } from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PropertySelectorProps {
  selectedType?: string;
  onSelect?: (typeId: string) => void;
  compact?: boolean;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  selectedType,
  onSelect,
  compact = false
}) => {
  const [selected, setSelected] = useState<string>(selectedType || '');

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

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
    onSelect?.(typeId);
  };

  if (compact) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-4 gap-3">
          {propertyTypes.map((type) => {
            const IconComponent = type.icon;
            const isSelected = selected === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`
                  relative p-3 border rounded-lg transition-all duration-200 text-left h-20
                  ${isSelected 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-foreground hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex flex-col items-start space-y-1">
                  <IconComponent className={`w-5 h-5 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`} />
                  <span className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'} leading-tight`}>
                    {type.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-gray-900 text-center">
          Which of these best describes your place?
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {propertyTypes.map((type) => {
          const IconComponent = type.icon;
          const isSelected = selected === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`
                relative p-6 border-2 rounded-lg transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-gray-900 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex flex-col items-start space-y-3">
                <IconComponent className={`w-8 h-8 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`} />
                <span className={`text-base font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {type.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySelector; 