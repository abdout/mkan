"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertySelector from '@/components/host/property-selector';
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
    <div className="">
      <div className="items-center justify-center">
        <div className="flex flex-row gap-12">
          {/* Left div - Title */}
          <div className="flex-1 flex flex-col ">
            <h1 className="text-4xl font-medium text-gray-900 leading-tight text-start">
              <div>Which of these best</div>
              <div>describes your place?</div>
            </h1>
          </div>

          {/* Right div - Compact PropertyTypeSelector */}
          <div className="flex-1">
            <PropertySelector
              selectedType={selectedType}
              onSelect={handlePropertySelect}
              compact={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructurePage; 