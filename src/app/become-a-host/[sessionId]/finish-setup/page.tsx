"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface FinishSetupPageProps {
  params: Promise<{ sessionId: string }>;
}

const FinishSetupPage = ({ params }: FinishSetupPageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/description`);
  };

  const handleNext = () => {
    router.push(`/become-a-host/${sessionId}/instant-book`);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="mb-8">
              <p className="text-lg font-medium text-gray-600 mb-4">Step 3</p>
              <h1 className="text-5xl font-medium text-gray-900 leading-tight">
                Finish up and publish
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Finally, you'll choose booking settings, set up pricing, and publish your listing.
            </p>
          </div>

          {/* Right side - Modern House Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Modern house illustration */}
              <div className="w-96 h-96 relative">
                {/* Main house structure */}
                <div className="absolute bottom-0 right-8 w-64 h-48 bg-gray-200 rounded-lg shadow-xl transform rotate-12">
                  {/* House base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg"></div>
                  
                  {/* Roof */}
                  <div className="absolute -top-4 left-0 right-0 h-8 bg-gray-800 rounded-t-lg shadow-lg"></div>
                  
                  {/* Solar panels on roof */}
                  <div className="absolute -top-3 left-4 w-8 h-6 bg-blue-800 rounded border border-blue-900"></div>
                  <div className="absolute -top-3 left-14 w-8 h-6 bg-blue-800 rounded border border-blue-900"></div>
                  <div className="absolute -top-3 left-24 w-8 h-6 bg-blue-800 rounded border border-blue-900"></div>
                  
                  {/* Windows - upper floor */}
                  <div className="absolute top-6 left-6 w-12 h-8 bg-orange-300 rounded border-2 border-white">
                    <div className="absolute inset-1 border border-white rounded"></div>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-8 bg-orange-300 rounded border-2 border-white">
                    <div className="absolute inset-1 border border-white rounded"></div>
                  </div>
                  
                  {/* Large window - ground floor */}
                  <div className="absolute bottom-12 left-6 w-20 h-16 bg-orange-200 rounded border-2 border-white">
                    <div className="absolute inset-1 border border-white rounded"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white"></div>
                  </div>
                  
                  {/* Door */}
                  <div className="absolute bottom-0 right-8 w-8 h-16 bg-amber-700 rounded-t-lg border border-amber-800">
                    <div className="absolute top-6 right-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                  
                  {/* Skylight */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-blue-200 rounded border border-white"></div>
                </div>
                
                {/* Garden elements */}
                <div className="absolute bottom-0 left-0 w-20 h-12 bg-green-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-4 left-12 w-16 h-8 bg-green-400 rounded-full opacity-70"></div>
                <div className="absolute bottom-2 right-0 w-12 h-6 bg-green-300 rounded-full opacity-60"></div>
                
                {/* Trees */}
                <div className="absolute top-8 right-0 w-8 h-16 bg-green-500 rounded-full shadow-lg"></div>
                <div className="absolute top-12 left-2 w-6 h-12 bg-green-600 rounded-full shadow-lg"></div>
                
                {/* Garden bench */}
                <div className="absolute bottom-8 right-2 w-6 h-3 bg-amber-600 rounded shadow-md"></div>
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

export default FinishSetupPage; 