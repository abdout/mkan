"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle } from 'lucide-react';

interface LegalAndCreatePageProps {
  params: Promise<{ id: string }>;
}

const LegalAndCreatePage = ({ params }: LegalAndCreatePageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [hostingType, setHostingType] = useState<string>('private-individual');
  const [safetyFeatures, setSafetyFeatures] = useState<string[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);



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
    <div className="">
      <div className="">
        {/* Title at the top */}
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-900">
            Share safety details
          </h1>
        </div>

        {/* Two sections side by side */}
        <div className="grid grid-cols-5 gap-20 items-start">
          {/* Left column - Hosting type */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                How are you hosting on Airbnb?
              </h2>
              <HelpCircle size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hosting-type"
                  value="private-individual"
                  checked={hostingType === 'private-individual'}
                  onChange={(e) => setHostingType(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  hostingType === 'private-individual'
                    ? 'border-gray-900 bg-gray-900'
                    : 'border-gray-300 bg-white'
                }`}>
                  {hostingType === 'private-individual' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm text-gray-900">I'm hosting as a private individual</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hosting-type"
                  value="business"
                  checked={hostingType === 'business'}
                  onChange={(e) => setHostingType(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  hostingType === 'business'
                    ? 'border-gray-900 bg-gray-900'
                    : 'border-gray-300 bg-white'
                }`}>
                  {hostingType === 'business' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm text-gray-900">I'm hosting as a business</span>
              </label>
            </div>
          </div>

          {/* Right column - Safety features and important info */}
          <div className="col-span-3 space-y-4">
            {/* Safety Features */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <h2 className="text-lg font-medium text-gray-900">
                  Does your place have any of these?
                </h2>
                <HelpCircle size={18} className="text-gray-400" />
              </div>
              
              <div className="space-y-2">
                {safetyOptions.map((option) => (
                  <label key={option} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-900">{option}</span>
                    <input
                      type="checkbox"
                      checked={safetyFeatures.includes(option)}
                      onChange={() => toggleSafetyFeature(option)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      safetyFeatures.includes(option)
                        ? 'border-gray-900 bg-gray-900'
                        : 'border-gray-300 bg-white'
                    }`}>
                      {safetyFeatures.includes(option) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Important Information */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-gray-900">
                Important things to know
              </h3>
              {/* <p className="text-xs text-gray-600 leading-relaxed">
                Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.
              </p> */}
              <p className="text-xs text-gray-600 leading-relaxed">
                Be sure to comply with your <span className="underline">local laws</span> and review Airbnb's <span className="underline">anti-discrimination policy</span><br/> and <span className="underline">guest and Host fees</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LegalAndCreatePage; 