"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepHeader, StepNavigation } from '@/components/host';

interface AboutYourPlacePageProps {
  params: Promise<{ sessionId: string }>;
}

const AboutYourPlacePage = ({ params }: AboutYourPlacePageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push('/become-a-host/overview');
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/structure`);
  };

  const illustration = (
    <div className="w-full h-96 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl flex items-center justify-center">
      <div className="text-center text-gray-400">
        {/* 3D house illustration placeholder */}
        <div className="w-48 h-48 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mx-auto mb-4 relative">
          <div className="absolute inset-4 bg-white/20 rounded-xl"></div>
          <div className="absolute inset-8 bg-white/20 rounded-lg"></div>
        </div>
        <p className="text-sm">3D House Cross-Section</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="pt-16">
        <StepHeader
          stepNumber={1}
          title="Tell us about your place"
          description="In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
          illustration={illustration}
        />
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  );
};

export default AboutYourPlacePage; 