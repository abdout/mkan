"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, DoorOpen, Building } from 'lucide-react';
import { useHostValidation } from '@/context/host-validation-context';

interface PrivacyTypePageProps {
  params: Promise<{ id: string }>;
}

const PrivacyTypePage = ({ params }: PrivacyTypePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('entire-place');
  const { enableNext } = useHostValidation();

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable next button since we have a default selection
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

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
    <div className="">
      <div className="items-center justify-center">
        <div className="flex flex-row gap-12">
          {/* Left div - Title */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-medium text-gray-900 leading-tight text-start">
              <div>What type of</div>
              <div>place will guests have?</div>
            </h1>
          </div>

          {/* Right div - Privacy Types */}
          <div className="flex-1">
            <div className="space-y-3">
              {privacyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full py-3 px-4 rounded-xl border transition-all duration-200 text-left flex items-center justify-between ${
                    selectedType === type.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-foreground hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className={`text-base font-medium mb-1 ${
                      selectedType === type.id ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {type.description}
                    </p>
                  </div>
                  <div className={`ml-4 ${
                    selectedType === type.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    <type.icon size={24} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTypePage; 