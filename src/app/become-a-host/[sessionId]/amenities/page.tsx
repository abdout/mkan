"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { 
  Wifi, 
  Tv, 
  ChefHat, 
  WashingMachine, 
  Car, 
  DollarSign, 
  Snowflake, 
  Briefcase,
  Waves,
  Coffee,
  Building,
  Flame,
  UtensilsCrossed,
  TreePine
} from 'lucide-react';

interface AmenitiesPageProps {
  params: Promise<{ sessionId: string }>;
}

const AmenitiesPage = ({ params }: AmenitiesPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/stand-out`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/photos`);
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const guestFavorites = [
    { id: 'wifi', label: 'Wifi', icon: Wifi },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
    { id: 'washer', label: 'Washer', icon: WashingMachine },
    { id: 'free-parking', label: 'Free parking on premises', icon: Car },
    { id: 'paid-parking', label: 'Paid parking on premises', icon: DollarSign },
    { id: 'air-conditioning', label: 'Air conditioning', icon: Snowflake },
    { id: 'dedicated-workspace', label: 'Dedicated workspace', icon: Briefcase },
  ];

  const standoutAmenities = [
    { id: 'pool', label: 'Pool', icon: Waves },
    { id: 'hot-tub', label: 'Hot tub', icon: Coffee },
    { id: 'patio', label: 'Patio', icon: Building },
    { id: 'bbq-grill', label: 'BBQ grill', icon: UtensilsCrossed },
    { id: 'outdoor-dining', label: 'Outdoor dining area', icon: TreePine },
    { id: 'fire-pit', label: 'Fire pit', icon: Flame },
  ];

  const AmenityCard = ({ 
    amenity, 
    isSelected, 
    onToggle 
  }: { 
    amenity: { id: string; label: string; icon: any }; 
    isSelected: boolean; 
    onToggle: () => void; 
  }) => (
    <button
      onClick={onToggle}
      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left flex flex-col items-start space-y-3 min-h-[120px] ${
        isSelected
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <amenity.icon size={24} className="text-gray-600" />
      <span className="text-base font-medium text-gray-900">
        {amenity.label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Tell guests what your place has to offer
          </h1>
          <p className="text-gray-600 text-lg">
            You can add more amenities after you publish your listing.
          </p>
        </div>

        <div className="space-y-12">
          {/* Guest Favorites */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              What about these guest favorites?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              Do you have any standout amenities?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={false}
      />
    </div>
  );
};

export default AmenitiesPage; 