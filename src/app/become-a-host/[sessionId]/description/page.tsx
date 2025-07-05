"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { 
  Leaf, 
  Sparkles, 
  Users, 
  Palette, 
  MapPin, 
  Maximize
} from 'lucide-react';

interface DescriptionPageProps {
  params: Promise<{ sessionId: string }>;
}

const DescriptionPage = ({ params }: DescriptionPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/title`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/finish-setup`);
  };

  const toggleHighlight = (highlight: string) => {
    setSelectedHighlights(prev => {
      if (prev.includes(highlight)) {
        return prev.filter(h => h !== highlight);
      } else if (prev.length < 2) {
        return [...prev, highlight];
      }
      return prev;
    });
  };

  const highlights = [
    { id: 'peaceful', label: 'Peaceful', icon: Leaf },
    { id: 'unique', label: 'Unique', icon: Sparkles },
    { id: 'family-friendly', label: 'Family-friendly', icon: Users },
    { id: 'stylish', label: 'Stylish', icon: Palette },
    { id: 'central', label: 'Central', icon: MapPin },
    { id: 'spacious', label: 'Spacious', icon: Maximize },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Next, let's describe your house
          </h1>
          <p className="text-gray-600 text-lg">
            Choose up to 2 highlights. We'll use these to get your description started.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {highlights.map((highlight) => {
            const isSelected = selectedHighlights.includes(highlight.id);
            const isDisabled = !isSelected && selectedHighlights.length >= 2;
            
            return (
              <button
                key={highlight.id}
                onClick={() => toggleHighlight(highlight.id)}
                disabled={isDisabled}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left flex items-center space-x-4 ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50'
                    : isDisabled
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <highlight.icon 
                  size={24} 
                  className={isSelected ? 'text-gray-900' : isDisabled ? 'text-gray-300' : 'text-gray-600'} 
                />
                <span className={`text-base font-medium ${
                  isSelected ? 'text-gray-900' : isDisabled ? 'text-gray-400' : 'text-gray-900'
                }`}>
                  {highlight.label}
                </span>
              </button>
            );
          })}
        </div>

        {selectedHighlights.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Selected highlights:</p>
            <div className="flex flex-wrap gap-2">
              {selectedHighlights.map((highlightId) => {
                const highlight = highlights.find(h => h.id === highlightId);
                return (
                  <span key={highlightId} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">
                    {highlight?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={selectedHighlights.length === 0}
      />
    </div>
  );
};

export default DescriptionPage; 