"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { Home, DoorOpen, Building } from 'lucide-react';

interface PrivacyTypePageProps {
  params: Promise<{ sessionId: string }>;
}

const PrivacyTypePage = ({ params }: PrivacyTypePageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/structure`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/location`);
  };

  const privacyTypes = [
    {
      id: 'entire-place',
      title: 'An entire place',
      description: 'Guests have the whole place to themselves.',
      icon: Home,
    },
    {
      id: 'room',
      title: 'A room',
      description: 'Guests have their own room in a home, plus access to shared spaces.',
      icon: DoorOpen,
    },
    {
      id: 'shared-room',
      title: 'A shared room in a hostel',
      description: 'Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.',
      icon: Building,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-medium text-gray-900 mb-16 text-center">
          What type of place will guests have?
        </h1>

        <div className="space-y-4">
          {privacyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left flex items-center justify-between ${
                selectedType === type.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600">
                  {type.description}
                </p>
              </div>
              <div className="ml-6 text-gray-400">
                <type.icon size={32} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={!selectedType}
      />
    </div>
  );
};

export default PrivacyTypePage; 