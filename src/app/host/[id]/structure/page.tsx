"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostStepLayout, PropertySelector } from '@/components/host';
import { useHostValidation } from '@/context/host-validation-context';

interface StructurePageProps {
  params: Promise<{ id: string }>;
}

const StructurePage = ({ params }: StructurePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const { enableNext, disableNext } = useHostValidation();

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Initialize with disabled state since no property type is selected
  React.useEffect(() => {
    disableNext();
  }, [disableNext]);

  // Enable/disable next button based on property selection
  React.useEffect(() => {
    if (selectedType) {
      enableNext();
    } else {
      disableNext();
    }
  }, [selectedType, enableNext, disableNext]);

  const handlePropertySelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  return (
    <HostStepLayout
      title={
        <h3>Which of these best <br /> describes your place?</h3>
      }
    >
      <PropertySelector
        selectedType={selectedType}
        onSelect={handlePropertySelect}
        compact={true}
      />
    </HostStepLayout>
  );
};

export default StructurePage; 