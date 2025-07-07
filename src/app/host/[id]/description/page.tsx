"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHostValidation } from '@/context/host-validation-context';
import { Peaceful, Unique, Stylish, Central, Spacious, FamilyFriendly } from '@/components/atom/airbnb-icons';

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
    { id: '1', title: 'Peaceful', icon: Peaceful },
    { id: '2', title: 'Unique', icon: Unique },
    { id: '3', title: 'Family-friendly', icon: Stylish },
    { id: '4', title: 'Stylish', icon: Spacious },
    { id: '5', title: 'Central', icon: Central },
    { id: '6', title: 'Spacious', icon: FamilyFriendly }
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
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Text content */}
          <div className="space-y-4">
            <h3>
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
            </h3>
            <p>
              {currentStep === 'highlights' 
                ? "Choose up to 2 highlights. We'll use these to get your description started."
                : "Share what makes your place special."}
            </p>
          </div>

          {/* Right side - Content */}
          <div>
            {currentStep === 'highlights' ? (
              <div className="flex flex-wrap gap-3">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <button
                      key={highlight.id}
                      onClick={() => toggleHighlight(highlight.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all whitespace-nowrap ${
                        selectedHighlights.includes(highlight.id)
                          ? 'border-foreground bg-accent'
                          : 'border-border hover:border-foreground/50'
                      }`}
                    >
                      <Icon size={18} className="text-foreground" />
                      <span>{highlight.title}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full h-[200px] p-6 border border-input rounded-lg resize-none focus:outline-none focus:border-ring transition-colors"
                />
                <div className="flex justify-start mt-2 text-muted-foreground">
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