"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-16 items-start">
          {/* Left column - Title and description */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h3>
              Choose who to welcome for your first reservation
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              After your first guest, anyone can book your place.{' '}
              <button className="underline hover:no-underline text-foreground">
                Learn more
              </button>
            </p>
          </div>

          {/* Right column - Guest options */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            {guestOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-4 sm:p-5 rounded-xl border transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? 'border-foreground bg-accent'
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Radio button */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? 'border-foreground bg-foreground'
                        : 'border-muted-foreground bg-background'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-background"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h5 className="text-sm sm:text-base font-medium">
                        {option.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityPage; 