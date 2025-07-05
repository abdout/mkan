"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Step {
  number: number;
  title: string;
  description: string;
  illustration: string;
}

interface StepsOverviewProps {
  onGetStarted?: () => void;
}

const StepsOverview: React.FC<StepsOverviewProps> = ({ onGetStarted }) => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Tell us about your place",
      description: "Share some basic info, like where it is and how many guests can stay.",
      illustration: "/become-host-step1.png"
    },
    {
      number: 2,
      title: "Make it stand out",
      description: "Add 5 or more photos plus a title and description—we'll help you out.",
      illustration: "/become-host-step2.png"
    },
    {
      number: 3,
      title: "Finish up and publish",
      description: "Choose a starting price, verify a few details, then publish your listing.",
      illustration: "/become-host-step3.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-medium text-gray-900 mb-8 leading-tight">
                It's easy to get started on Airbnb
              </h1>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 text-lg font-medium text-gray-900">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 hidden lg:block">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {/* Placeholder for illustration */}
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main illustration placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mx-auto mb-4"></div>
                  <p>3D House Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center lg:text-left">
          <Button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-medium rounded-lg"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepsOverview; 