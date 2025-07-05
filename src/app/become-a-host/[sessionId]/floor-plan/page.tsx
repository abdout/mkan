"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { Minus, Plus } from 'lucide-react';

interface FloorPlanPageProps {
  params: Promise<{ sessionId: string }>;
}

const FloorPlanPage = ({ params }: FloorPlanPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [counts, setCounts] = useState({
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/location`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/stand-out`);
  };

  const updateCount = (field: keyof typeof counts, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [field]: Math.max(1, prev[field] + delta)
    }));
  };

  const CounterRow = ({ 
    label, 
    value, 
    onDecrease, 
    onIncrease 
  }: { 
    label: string; 
    value: number; 
    onDecrease: () => void; 
    onIncrease: () => void; 
  }) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-200 last:border-b-0">
      <div className="text-xl font-medium text-gray-900">
        {label}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onDecrease}
          disabled={value <= 1}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            value <= 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900'
          }`}
        >
          <Minus size={16} />
        </button>
        <span className="text-xl font-medium text-gray-900 w-8 text-center">
          {value}
        </span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 flex items-center justify-center transition-all"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Share some basics about your place
          </h1>
          <p className="text-gray-600 text-lg">
            You'll add more details later, like bed types.
          </p>
        </div>

        <div className="bg-white">
          <CounterRow
            label="Guests"
            value={counts.guests}
            onDecrease={() => updateCount('guests', -1)}
            onIncrease={() => updateCount('guests', 1)}
          />
          <CounterRow
            label="Bedrooms"
            value={counts.bedrooms}
            onDecrease={() => updateCount('bedrooms', -1)}
            onIncrease={() => updateCount('bedrooms', 1)}
          />
          <CounterRow
            label="Beds"
            value={counts.beds}
            onDecrease={() => updateCount('beds', -1)}
            onIncrease={() => updateCount('beds', 1)}
          />
          <CounterRow
            label="Bathrooms"
            value={counts.bathrooms}
            onDecrease={() => updateCount('bathrooms', -1)}
            onIncrease={() => updateCount('bathrooms', 1)}
          />
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

export default FloorPlanPage; 