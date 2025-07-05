'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AppSearchOptionMobileProps {
  active: boolean;
  onClose: () => void;
}

interface GuestCounter {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const GuestCounterComponent = ({ value, onIncrease, onDecrease }: GuestCounter) => (
  <div className="flex items-center gap-3">
    <button 
      onClick={onDecrease}
      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
    >
      -
    </button>
    <span className="w-8 text-center">{value}</span>
    <button 
      onClick={onIncrease}
      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
    >
      +
    </button>
  </div>
);

const AppSearchOptionMobile = ({ active, onClose }: AppSearchOptionMobileProps) => {
  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const stepTitles = [
    'What are you looking for?',
    'When will you be there?',
    "Who's coming?",
  ];

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex flex-col justify-end bg-gradient-to-r from-[#70019d] to-[#be0181] transition-all duration-200',
      active ? 'visible opacity-100' : 'invisible opacity-0'
    )}>
      <div className={cn(
        'fixed bottom-0 left-0 right-0 w-full transition-transform duration-700',
        active ? 'translate-y-0' : 'translate-y-full'
      )}>
        <h2 className="w-full px-4 py-3 text-2xl font-medium text-white">
          {stepTitles[step - 1]}
        </h2>

        {/* Content wrapper */}
        <div className="bg-white rounded-t-3xl p-4">
          {/* Step 1: Choose type */}
          {step === 1 && (
            <div className="space-y-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-between w-full p-4 text-left border border-gray-200 shadow-lg rounded-xl hover:border-gray-300"
              >
                <div>
                  <h4 className="font-medium">Find a place to stay</h4>
                  <p className="text-sm text-gray-400">Entire homes, rooms & more</p>
                </div>
                <Image
                  src="/assets/place-to-stay.jpg"
                  alt="place to stay"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </button>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {step === 2 && (
            <div>
              <div className="min-h-[300px] flex items-center justify-center text-gray-400">
                Date Selection Placeholder
              </div>
              <div className="fixed bottom-0 left-0 right-0 grid grid-cols-2 gap-4 p-4 bg-white border-t">
                <button 
                  onClick={() => setStep(1)}
                  className="px-4 py-3 text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="px-4 py-3 text-white bg-primary rounded-lg hover:bg-primary/90"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Guest Selection */}
          {step === 3 && (
            <div>
              <div className="space-y-6">
                {/* Adults */}
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <h3 className="font-medium">Adults</h3>
                    <p className="text-sm text-gray-400">Ages 13 or above</p>
                  </div>
                  <GuestCounterComponent
                    value={adults}
                    onIncrease={() => setAdults(prev => Math.min(prev + 1, 16))}
                    onDecrease={() => setAdults(prev => Math.max(prev - 1, 0))}
                  />
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <h3 className="font-medium">Children</h3>
                    <p className="text-sm text-gray-400">Ages 2-12</p>
                  </div>
                  <GuestCounterComponent
                    value={children}
                    onIncrease={() => setChildren(prev => Math.min(prev + 1, 5))}
                    onDecrease={() => setChildren(prev => Math.max(prev - 1, 0))}
                  />
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium">Infants</h3>
                    <p className="text-sm text-gray-400">Under 2</p>
                  </div>
                  <GuestCounterComponent
                    value={infants}
                    onIncrease={() => setInfants(prev => Math.min(prev + 1, 5))}
                    onDecrease={() => setInfants(prev => Math.max(prev - 1, 0))}
                  />
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 grid grid-cols-2 gap-4 p-4 bg-white border-t">
                <button 
                  onClick={() => setStep(2)}
                  className="px-4 py-3 text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  Back
                </button>
                <button 
                  onClick={onClose}
                  className="px-4 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppSearchOptionMobile;
