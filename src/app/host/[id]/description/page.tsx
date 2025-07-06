"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHostValidation } from '@/context/host-validation-context';
import { MapPin, Home, Sparkles, Users, Building2, LayoutDashboard } from 'lucide-react';

interface DescriptionPageProps {
  params: Promise<{ id: string }>;
}

const DescriptionPage = ({ params }: DescriptionPageProps) => {
  const router = useRouter();
  const { setCustomNavigation } = useHostValidation();
  const [id, setId] = React.useState<string>('');
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [description, setDescription] = useState('You\'ll have a great time at this comfortable place to stay.');
  const [currentStep, setCurrentStep] = useState<'highlights' | 'description'>('highlights');

  const maxLength = 500;

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    if (currentStep === 'description') {
      setCurrentStep('highlights');
      return;
    }
    router.push(`/host/${id}/title`);
  };

  const handleNext = () => {
    if (currentStep === 'highlights') {
      if (selectedHighlights.length > 0) {
        setCurrentStep('description');
      }
      return;
    }
    
    if (currentStep === 'description' && description.trim().length > 0) {
      router.push(`/host/${id}/finish-setup`);
    }
  };

  const nextDisabled = (currentStep === 'highlights' && selectedHighlights.length === 0) ||
                      (currentStep === 'description' && description.trim().length === 0);

  // Set custom navigation in context
  useEffect(() => {
    setCustomNavigation({
      onBack: handleBack,
      onNext: handleNext,
      nextDisabled: nextDisabled
    });

    // Cleanup on unmount
    return () => {
      setCustomNavigation(undefined);
    };
  }, [currentStep, selectedHighlights, description, id]);

  const highlights = [
    { id: '1', title: 'Peaceful', icon: Home },
    { id: '2', title: 'Unique', icon: Sparkles },
    { id: '3', title: 'Family-friendly', icon: Users },
    { id: '4', title: 'Stylish', icon: Building2 },
    { id: '5', title: 'Central', icon: MapPin },
    { id: '6', title: 'Spacious', icon: LayoutDashboard }
  ];

  const toggleHighlight = (highlightId: string) => {
    setSelectedHighlights(prev => {
      if (prev.includes(highlightId)) {
        return prev.filter(id => id !== highlightId);
      }
      if (prev.length < 2) {
        return [...prev, highlightId];
      }
      return prev;
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setDescription(newValue);
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Text content */}
          <div className="">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              {currentStep === 'highlights' ? (
                <>
                  Next, let's describe
                  <br />
                  your house
                </>
              ) : (
                <>
                  Create your description
                </>
              )}
            </h1>
            <p className="text-gray-600 text-lg">
              {currentStep === 'highlights' 
                ? "Choose up to 2 highlights. We'll use these to get your description started."
                : "Share what makes your place special."}
            </p>
          </div>

          {/* Right side - Content */}
          <div>
            {currentStep === 'highlights' ? (
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <button
                      key={highlight.id}
                      onClick={() => toggleHighlight(highlight.id)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-full border transition-all ${
                        selectedHighlights.includes(highlight.id)
                          ? 'border-black bg-gray-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <Icon size={20} className="text-neutral-700" />
                      <span className="text-base">{highlight.title}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full h-[200px] p-6 text-lg border border-neutral-300 rounded-lg resize-none focus:outline-none focus:border-neutral-950 transition-colors"
                />
                <div className="flex justify-start mt-2 text-sm text-gray-500">
                  <span>{description.length}/{maxLength}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage; 