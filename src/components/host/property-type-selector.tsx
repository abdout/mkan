"use client";

import React, { useState } from 'react';
import { Home, Building, Bed, Ship, TreePine, Castle, Mountain, Container, Lock, Tent, Building2, House, Warehouse, Car } from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PropertyTypeSelectorProps {
  selectedType?: string;
  onSelect?: (typeId: string) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  const [selected, setSelected] = useState<string>(selectedType || '');

  const propertyTypes: PropertyType[] = [
    { id: 'house', name: 'House', icon: Home },
    { id: 'apartment', name: 'Apartment', icon: Building },
    { id: 'barn', name: 'Barn', icon: Warehouse },
    { id: 'bed-breakfast', name: 'Bed & breakfast', icon: Bed },
    { id: 'boat', name: 'Boat', icon: Ship },
    { id: 'cabin', name: 'Cabin', icon: TreePine },
    { id: 'camper-rv', name: 'Camper/RV', icon: Car },
    { id: 'casa-particular', name: 'Casa particular', icon: Building2 },
    { id: 'castle', name: 'Castle', icon: Castle },
    { id: 'cave', name: 'Cave', icon: Mountain },
    { id: 'container', name: 'Container', icon: Container },
    { id: 'cycladic-home', name: 'Cycladic home', icon: Home },
    { id: 'dammuso', name: 'Dammuso', icon: House },
    { id: 'dome', name: 'Dome house', icon: Tent },
    { id: 'earth-house', name: 'Earth house', icon: Mountain }
  ];

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
    onSelect?.(typeId);
  };

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
                <IconComponent className="w-8 h-8 text-gray-700" />
                <span className="text-base font-medium text-gray-900">
                  {type.name}
                </span>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyTypeSelector; 