"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { ChevronDown } from 'lucide-react';

interface PricePageProps {
  params: Promise<{ id: string }>;
}

const PricePage = ({ params }: PricePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [price, setPrice] = useState<number>(158);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  React.useEffect(() => {
    // Auto-focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
      // Position cursor at the end
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, []);

  React.useEffect(() => {
    // Position cursor at the end whenever price changes
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [price]);

  const handleBack = () => {
    router.push(`/host/${id}/visibility`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/discount`);
  };

  const handlePriceChange = (delta: number) => {
    setPrice(prev => Math.max(1, prev + delta));
  };

  const guestPriceBeforeTaxes = price + 22; // Adding estimated fees

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Left column - Title and description */}
          <div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Now, set a base price
            </h1>
            <p className="text-gray-600 text-lg">
              Tip: SR158. You'll set a weekend price next.
            </p>
          </div>

          {/* Right column - Price controls */}
          <div className="flex flex-col items-center">
            {/* Large price display with edit functionality */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={`SR${price}`}
                  onChange={(e) => {
                    const value = e.target.value.replace('SR', '');
                    const numValue = parseInt(value) || 0;
                    setPrice(numValue);
                  }}
                  onKeyDown={(e) => {
                    // Prevent cursor from moving before "SR"
                    if (e.key === 'ArrowLeft' || e.key === 'Home') {
                      const selectionStart = e.currentTarget.selectionStart || 0;
                      if (selectionStart <= 2) {
                        e.preventDefault();
                        e.currentTarget.setSelectionRange(2, 2);
                      }
                    }
                  }}
                  onClick={(e) => {
                    // Ensure cursor doesn't go before "SR"
                    const selectionStart = e.currentTarget.selectionStart || 0;
                    if (selectionStart < 2) {
                      e.currentTarget.setSelectionRange(2, 2);
                    }
                  }}
                  className="text-8xl font-bold text-gray-900 border-none outline-none text-center w-auto min-w-0"
                  style={{ 
                    width: `${(`SR${price}`).length * 0.6}em`,
                    caretColor: '#111827'
                  }}
                />
                <div className="ml-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" fill="currentColor"/>
                    <path d="m5.692 10.497 1.497 1.497-2.234.639-.002.002.002-.002.637-2.136Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Guest price info */}
            <div className="mb-8">
              <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <span>Guest price before taxes SR{guestPriceBeforeTaxes}</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* View similar listings button */}
            <div className="mb-8">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 1v3M8 12v3M15 8h-3M4 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-gray-900 font-medium">View similar listings</span>
              </button>
            </div>

            {/* Learn more link */}
            <div className="">
              <button className="text-gray-600 underline hover:no-underline">
                Learn more about pricing
              </button>
            </div>
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

export default PricePage; 