"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface TitlePageProps {
  params: Promise<{ id: string }>;
}

const TitlePage = ({ params }: TitlePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [title, setTitle] = useState<string>('');

  const maxLength = 32;

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/photos`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/description`);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;
    if (newTitle.length <= maxLength) {
      setTitle(newTitle);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Now, let's give your house a title
          </h1>
          <p className="text-gray-600 text-lg">
            Short titles work best. Have fun with it—you can always change it later.
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={title}
            onChange={handleTitleChange}
            placeholder=""
            className="w-full h-40 p-6 text-lg border-2 border-gray-200 rounded-xl resize-none focus:border-gray-900 focus:outline-none transition-colors"
            maxLength={maxLength}
          />
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{title.length}/{maxLength}</span>
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={title.trim().length === 0}
      />
    </div>
  );
};

export default TitlePage; 