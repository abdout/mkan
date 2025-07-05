"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { ChevronDown } from 'lucide-react';

interface PricePageProps {
  params: Promise<{ sessionId: string }>;
}

const PricePage = ({ params }: PricePageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [price, setPrice] = useState<number>(158);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/visibility`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/discount`);
  };

  const handlePriceChange = (delta: number) => {
    setPrice(prev => Math.max(1, prev + delta));
  };

  const guestPriceBeforeTaxes = price + 22; // Adding estimated fees

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Now, set a weekday base price
          </h1>
          <p className="text-gray-600 text-lg">
            Tip: SR158. You'll set a weekend price next.
          </p>
        </div>

        <div className="text-center mb-12">
          {/* Large price display */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => handlePriceChange(-5)}
              className="w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors"
            >
              <span className="text-2xl font-light text-gray-600">−</span>
            </button>
            
            <div className="relative">
              <span className="text-8xl font-bold text-gray-900">
                SR{price}
              </span>
              <div className="absolute -right-8 top-4">
                <div className="w-2 h-16 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            
            <button
              onClick={() => handlePriceChange(5)}
              className="w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors"
            >
              <span className="text-2xl font-light text-gray-600">+</span>
            </button>
          </div>

          {/* Guest price info */}
          <div className="mb-8">
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <span>Guest price before taxes SR{guestPriceBeforeTaxes}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Learn more link */}
        <div className="text-center">
          <button className="text-gray-600 underline hover:no-underline">
            Learn more about pricing
          </button>
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

export default PricePage; 