"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyTypeSelector, StepNavigation } from '@/components/host';

interface StructurePageProps {
  params: Promise<{ id: string }>;
}

const StructurePage = ({ params }: StructurePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/about-your-place`);
  };

  const handleNext = () => {
    // Navigate to next step (would be privacy type selection or location)
    router.push(`/host/${id}/privacy-type`);
  };

  const handlePropertyTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="pt-16">
        <PropertyTypeSelector
          selectedType={selectedType}
          onSelect={handlePropertyTypeSelect}
        />
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={!selectedType}
      />
    </div>
  );
};

export default StructurePage; 