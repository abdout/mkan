"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { CalendarCheckmark, LightningBoltIcon } from '@/components/atom/airbnb-icons';

interface InstantBookPageProps {
  params: Promise<{ id: string }>;
}

const InstantBookPage = ({ params }: InstantBookPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('approve-first-5');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/finish-setup`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/visibility`);
  };

  const bookingOptions = [
    {
      id: 'approve-first-5',
      title: 'Approve your first 5 bookings',
      subtitle: 'Recommended',
      description: 'Start by reviewing reservation requests, then switch to Instant Book, so guests can book automatically.',
      icon: CalendarCheckmark,
      recommended: true,
    },
    {
      id: 'instant-book',
      title: 'Use Instant Book',
      description: 'Let guests book automatically.',
      icon: LightningBoltIcon,
      recommended: false,
    },
  ];

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-3 gap-16 items-start">
          {/* Left column - Title and description */}
          <div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Pick your<br />
              booking settings
            </h1>
            <p className="text-gray-600 text-lg">
              You can change this at any time.{' '}
              <button className="underline hover:no-underline">
                Learn more
              </button>
            </p>
          </div>

          {/* Right column - Booking options */}
          <div className="col-span-2 space-y-4">
            {bookingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-5 rounded-xl border transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 ">
                      <h3 className="text-lg font-medium">
                        {option.title}
                      </h3>
                      
                    </div>
                    {option.recommended && (
                        <span className=" text-green-600 text-xs font-medium ">
                          {option.subtitle}
                        </span>
                      )}
                    <p className="text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <div className=" ">
                    <option.icon size={24} />
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

export default InstantBookPage; 