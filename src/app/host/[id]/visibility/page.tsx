"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface VisibilityPageProps {
  params: Promise<{ id: string }>;
}

const VisibilityPage = ({ params }: VisibilityPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('any-guest');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/instant-book`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/price`);
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
    <div className="">
      <div className="">
        <div className="grid grid-cols-5 gap-16 items-start">
          {/* Left column - Title and description */}
          <div className="col-span-2">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Choose who to welcome for your first reservation
            </h1>
            <p className="text-gray-600 text-lg">
              After your first guest, anyone can book your place.{' '}
              <button className="underline hover:no-underline">
                Learn more
              </button>
            </p>
          </div>

          {/* Right column - Guest options */}
          <div className="col-span-3 space-y-4">
            {guestOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-5 rounded-xl border transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Radio button */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? 'border-gray-900 bg-gray-900'
                        : 'border-gray-300 bg-white'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 ">
                      <h3 className="text-lg font-medium">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
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

export default VisibilityPage; 