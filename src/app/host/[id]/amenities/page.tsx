"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHostValidation } from '@/context/host-validation-context';
import Image from 'next/image';
import { 
  DollarSign, 
  Waves,
  Coffee,
  Building,
  Flame,
  UtensilsCrossed,
  TreePine
} from 'lucide-react';

interface AmenitiesPageProps {
  params: Promise<{ id: string }>;
}

const AmenitiesPage = ({ params }: AmenitiesPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const { enableNext } = useHostValidation();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable next button since amenities are optional
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Custom component for SVG amenity icons
  const SvgIcon = ({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) => (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );

  const guestFavorites = [
    { id: 'wifi', label: 'Wifi', icon: () => <SvgIcon src="/amenities/Wifi.svg" alt="Wifi" /> },
    { id: 'tv', label: 'TV', icon: () => <SvgIcon src="/amenities/TV.svg" alt="TV" /> },
    { id: 'kitchen', label: 'Kitchen', icon: () => <SvgIcon src="/amenities/Kitchen.svg" alt="Kitchen" /> },
    { id: 'washer', label: 'Washer', icon: () => <SvgIcon src="/amenities/Washing machine.svg" alt="Washing machine" /> },
    { id: 'free-parking', label: 'Free parking', icon: () => <SvgIcon src="/amenities/Parking.svg" alt="Free parking" /> },
    { id: 'paid-parking', label: 'Paid parking', icon: () => <SvgIcon src="/amenities/Paid parking.svg" alt="Paid parking" /> },
    { id: 'air-conditioning', label: 'AC', icon: () => <SvgIcon src="/amenities/Air conditioning.svg" alt="Air conditioning" /> },
    { id: 'dedicated-workspace', label: 'Workspace', icon: () => <SvgIcon src="/amenities/Workspace.svg" alt="Workspace" /> },
  ];

  const standoutAmenities = [
    { id: 'pool', label: 'Pool', icon: () => <SvgIcon src="/amenities/Pool.svg" alt="Pool" /> },
    { id: 'hot-tub', label: 'Hot tub', icon: () => <SvgIcon src="/amenities/Hot tub.svg" alt="Hot tub" /> },
    { id: 'patio', label: 'Patio', icon: () => <SvgIcon src="/amenities/Patio.svg" alt="Patio" /> },
    { id: 'bbq-grill', label: 'BBQ grill', icon: () => <SvgIcon src="/amenities/BBQ grill.svg" alt="BBQ grill" /> },
    // { id: 'outdoor-dining', label: 'Outdoor dining', icon: () => <SvgIcon src="/amenities/Outdoor dining.svg" alt="Outdoor dining" /> },
    // { id: 'fireplace', label: 'Fireplace', icon: () => <SvgIcon src="/amenities/Fireplace.svg" alt="Fireplace" /> },
  ];

  const AmenityCard = ({ 
    amenity, 
    isSelected, 
    onToggle 
  }: { 
    amenity: { id: string; label: string; icon: () => React.ReactNode }; 
    isSelected: boolean; 
    onToggle: () => void; 
  }) => (
    <button
      onClick={onToggle}
      className={`px-3 py-2 rounded-lg border transition-all duration-200 text-left flex flex-col items-start space-y-1.5 ${
        isSelected
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-200 hover:border-foreground hover:bg-gray-50'
      }`}
    >
      <div className={`${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
        <amenity.icon />
      </div>
      <span className={`text-xs font-medium truncate w-full ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
        {amenity.label}
      </span>
    </button>
  );

  return (
    <div className="">
      <div className="items-center justify-center">
        <div className="flex flex-row gap-12">
          {/* Left div - Title */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-medium text-gray-900 leading-tight text-start">
              <div>Tell guests what</div>
              <div>your place has to offer</div>
            </h1>
            <p className="text-lg mt-4">
              You can add more amenities after you <br/> publish your listing.
            </p>
          </div>

          {/* Right div - Amenities */}
          <div className="flex-1">
            <div className="space-y-8">
              {/* Guest Favorites */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  What about these guest favorites?
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {guestFavorites.map((amenity) => (
                    <AmenityCard
                      key={amenity.id}
                      amenity={amenity}
                      isSelected={selectedAmenities.includes(amenity.id)}
                      onToggle={() => toggleAmenity(amenity.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Standout Amenities */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Do you have any standout amenities?
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {standoutAmenities.map((amenity) => (
                    <AmenityCard
                      key={amenity.id}
                      amenity={amenity}
                      isSelected={selectedAmenities.includes(amenity.id)}
                      onToggle={() => toggleAmenity(amenity.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPage; 