"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface StandOutPageProps {
  params: Promise<{ sessionId: string }>;
}

const StandOutPage = ({ params }: StandOutPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/floor-plan`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/amenities`);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="mb-8">
              <p className="text-lg font-medium text-gray-600 mb-4">Step 2</p>
              <h1 className="text-5xl font-medium text-gray-900 leading-tight">
                Make your place stand out
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then, you'll create a title and description.
            </p>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Isometric room illustration placeholder */}
              <div className="w-96 h-96 bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Room base */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-200 to-orange-100"></div>
                
                {/* Furniture elements - simplified representations */}
                {/* Bed */}
                <div className="absolute bottom-16 left-8 w-24 h-16 bg-blue-300 rounded-lg shadow-lg"></div>
                <div className="absolute bottom-20 left-10 w-20 h-4 bg-white rounded-md"></div>
                
                {/* Desk */}
                <div className="absolute bottom-16 right-8 w-16 h-12 bg-amber-200 rounded-md shadow-lg"></div>
                
                {/* Window */}
                <div className="absolute top-8 left-8 w-20 h-24 bg-blue-200 rounded-lg border-4 border-white shadow-lg">
                  <div className="absolute inset-2 border border-white rounded"></div>
                </div>
                
                {/* Plant */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-green-300 rounded-full"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-16 right-12 w-6 h-6 bg-pink-300 rounded-full"></div>
                <div className="absolute top-24 right-20 w-4 h-4 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={false}
      />
    </div>
  );
};

export default StandOutPage; 