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
          <div className="space-y-4">
            <h3>
              Now, let's give your
              <br />
              house a title
            </h3>
            <p>
              Short titles work best. Have fun with it—you can always change it later.
            </p>
          </div>

          {/* Right side - Input box */}
          <div>
            <textarea
              value={title}
              onChange={handleTitleChange}
              className="w-full h-[100px] p-6 border border-input rounded-lg resize-none focus:outline-none focus:border-ring transition-colors"
              maxLength={maxLength}
            />
            <div className="mt-2 text-muted-foreground">
              <span>{title.length}/{maxLength}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TitlePage; 