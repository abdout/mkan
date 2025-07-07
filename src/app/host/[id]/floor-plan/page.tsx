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
    <div className="flex items-center justify-between py-6 border-b border-border last:border-b-0">
      <div className="text-foreground">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={value <= 1}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            value <= 1
              ? 'border-muted text-muted-foreground cursor-not-allowed'
              : 'border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground'
          }`}
        >
          <Minus size={14} strokeWidth={2} />
        </button>
        <span className="w-2.5 text-center">
          {value}
        </span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 rounded-full border border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground flex items-center justify-center transition-colors"
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
            <h3 className="">
              Share some basics <br />
              about your place
            </h3>
            <p className="mt-4">
              You'll add more details later, like bed types.
            </p>
          </div>

          {/* Right div - Counter Controls */}
          <div className="flex-1">
            <div className="bg-background">
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