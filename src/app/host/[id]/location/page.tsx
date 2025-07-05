"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { MapPin } from 'lucide-react';

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

const LocationPage = ({ params }: LocationPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [address, setAddress] = useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/privacy-type`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/floor-plan`);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Where's your place located?
          </h1>
          <p className="text-gray-600 text-lg">
            Your address is only shared with guests after they've made a reservation.
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl h-96 relative overflow-hidden mb-8">
          {/* Map placeholder - in a real app, this would be a Google Maps or similar component */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Map will appear here</p>
            </div>
          </div>

          {/* Address input overlay */}
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-white rounded-full shadow-lg flex items-center px-6 py-4">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Mock map markers */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>We'll only share your address after a guest books your place.</p>
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={!address.trim()}
      />
    </div>
  );
};

export default LocationPage; 