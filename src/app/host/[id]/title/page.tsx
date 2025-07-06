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
    <div className="">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Text content */}
          <div className="">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Now, let's give your
              <br />
              house a title
            </h1>
            <p className="text-gray-600 text-lg">
              Short titles work best. Have fun with it—you can always change it later.
            </p>
          </div>

          {/* Right side - Input box */}
          <div>
            <textarea
              value={title}
              onChange={handleTitleChange}
              className="w-full h-[100px] p-6 text-lg border border-neutral-500 rounded-lg resize-none focus:outline-none transition-colors"
              maxLength={maxLength}
            />
            <div className="mt-2 text-sm text-gray-500">
              <span>{title.length}/{maxLength}</span>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={title.length === 0}
      />
    </div>
  );
};

export default TitlePage; 