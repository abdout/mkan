"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface VisibilityPageProps {
  params: Promise<{ sessionId: string }>;
}

const VisibilityPage = ({ params }: VisibilityPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('any-guest');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/instant-book`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/price`);
  };

  const guestOptions = [
    {
      id: 'any-guest',
      title: 'Any Airbnb guest',
      description: 'Get reservations faster when you welcome anyone from the Airbnb community.',
    },
    {
      id: 'experienced-guest',
      title: 'An experienced guest',
      description: 'For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great Host.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-6 leading-tight">
            Choose who to welcome for your first reservation
          </h1>
          <p className="text-gray-600 text-lg">
            After your first guest, anyone can book your place.{' '}
            <button className="underline hover:no-underline">
              Learn more
            </button>
          </p>
        </div>

        <div className="space-y-4">
          {guestOptions.map((option) => (
            <label
              key={option.id}
              className={`block w-full p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedOption === option.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="radio"
                  name="guest-type"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mt-1 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            </label>
          ))}
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

export default VisibilityPage; 