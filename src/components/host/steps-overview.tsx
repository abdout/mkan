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
      illustration: "/airbnb/place.webp"
    },
    {
      number: 2,
      title: "Make it stand out",
      description: "Add 5 or more photos plus a title and description—we'll help you out.",
      illustration: "/airbnb/stand-out.webp"
    },
    {
      number: 3,
      title: "Finish up and publish",
      description: "Choose a starting price, verify a few details, then publish your listing.",
      illustration: "/airbnb/publish.png"
    }
  ];

  return (
    <div className="h-full flex flex-col px-10">
      <div className="flex-1 px-6">
        <div className="h-full max-w-7xl mx-auto flex flex-col">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-12">
            {/* Left Side - Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
                It's easy to get
                <br />
                started on Mkan
              </h1>
            </div>

            {/* Right Side - Steps */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start">
                  <div className="flex gap-3 flex-1">
                    <div className="flex-shrink-0">
                      <span className="text-lg font-medium text-gray-900">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <div className="relative w-24 h-24 overflow-hidden ">
                      <Image
                        src={step.illustration}
                        alt={step.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section with HR and Button */}
          <div className="">
            <hr className="w-full border-t border-gray-200" />
            <div className="flex justify-end py-4">
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsOverview; 