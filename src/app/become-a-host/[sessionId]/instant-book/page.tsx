"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { Calendar, Zap } from 'lucide-react';

interface InstantBookPageProps {
  params: Promise<{ sessionId: string }>;
}

const InstantBookPage = ({ params }: InstantBookPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('approve-first-5');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/finish-setup`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/visibility`);
  };

  const bookingOptions = [
    {
      id: 'approve-first-5',
      title: 'Approve your first 5 bookings',
      subtitle: 'Recommended',
      description: 'Start by reviewing reservation requests, then switch to Instant Book, so guests can book automatically.',
      icon: Calendar,
      recommended: true,
    },
    {
      id: 'instant-book',
      title: 'Use Instant Book',
      description: 'Let guests book automatically.',
      icon: Zap,
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Pick your booking settings
          </h1>
          <p className="text-gray-600 text-lg">
            You can change this at any time.{' '}
            <button className="underline hover:no-underline">
              Learn more
            </button>
          </p>
        </div>

        <div className="space-y-4">
          {bookingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedOption === option.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-medium text-gray-900">
                      {option.title}
                    </h3>
                    {option.recommended && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        {option.subtitle}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="ml-6 text-gray-400">
                  <option.icon size={32} />
                </div>
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
        nextDisabled={false}
      />
    </div>
  );
};

export default InstantBookPage; 