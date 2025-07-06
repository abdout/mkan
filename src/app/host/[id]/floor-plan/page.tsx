"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus } from 'lucide-react';
import { useHostValidation } from '@/context/host-validation-context';

interface FloorPlanPageProps {
  params: Promise<{ id: string }>;
}

const FloorPlanPage = ({ params }: FloorPlanPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const { enableNext } = useHostValidation();
  const [counts, setCounts] = useState({
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable next button since we have default values
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

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
    <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-b-0">
      <div className="text-lg text-gray-900">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={value <= 1}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            value <= 1
              ? 'border-gray-200 text-gray-200 cursor-not-allowed'
              : 'border-gray-500 text-gray-500 hover:border-gray-950 hover:text-gray-950'
          }`}
        >
          <Minus size={14} strokeWidth={2} />
        </button>
        <span className="text-base w-2.5 text-center font-medium">
          {value}
        </span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 rounded-full border border-gray-500 text-gray-500 hover:border-gray-950 hover:text-gray-950 flex items-center justify-center transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="items-center justify-center">
        <div className="flex flex-row gap-12">
          {/* Left div - Title */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-medium text-gray-900 leading-tight text-start">
              <div>Share some basics</div>
              <div>about your place</div>
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              You'll add more details later, like bed types.
            </p>
          </div>

          {/* Right div - Counter Controls */}
          <div className="flex-1">
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
        </div>
      </div>
    </div>
  );
};

export default FloorPlanPage; 