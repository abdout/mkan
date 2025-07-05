"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle } from 'lucide-react';

interface LegalAndCreatePageProps {
  params: Promise<{ sessionId: string }>;
}

const LegalAndCreatePage = ({ params }: LegalAndCreatePageProps) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [hostingType, setHostingType] = useState<string>('');
  const [safetyFeatures, setSafetyFeatures] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/become-a-host/${sessionId}/discount`);
  };

  const handleCreateListing = () => {
    // This would create the listing and redirect to the host dashboard
    router.push('/hosting/listings');
  };

  const toggleSafetyFeature = (feature: string) => {
    setSafetyFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const safetyOptions = [
    'Exterior security camera present',
    'Noise decibel monitor present',
    'Weapon(s) on the property',
  ];

  const isFormValid = hostingType && safetyFeatures.length >= 0; // At least hosting type selected

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-medium text-gray-900 mb-12 text-center">
          Share safety details
        </h1>

        <div className="space-y-12">
          {/* Hosting Type */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                How are you hosting on Airbnb?
              </h2>
              <HelpCircle size={20} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hosting-type"
                  value="private-individual"
                  checked={hostingType === 'private-individual'}
                  onChange={(e) => setHostingType(e.target.value)}
                  className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                />
                <span className="text-lg text-gray-900">I'm hosting as a private individual</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hosting-type"
                  value="business"
                  checked={hostingType === 'business'}
                  onChange={(e) => setHostingType(e.target.value)}
                  className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                />
                <span className="text-lg text-gray-900">I'm hosting as a business</span>
              </label>
            </div>
          </div>

          {/* Safety Features */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                Does your place have any of these?
              </h2>
              <HelpCircle size={20} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {safetyOptions.map((option) => (
                <label key={option} className="flex items-center justify-between cursor-pointer">
                  <span className="text-lg text-gray-900">{option}</span>
                  <input
                    type="checkbox"
                    checked={safetyFeatures.includes(option)}
                    onChange={() => toggleSafetyFeature(option)}
                    className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Important things to know
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleCreateListing}
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-lg text-lg font-medium transition-all ${
              isFormValid
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalAndCreatePage; 