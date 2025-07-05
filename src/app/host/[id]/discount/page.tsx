"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';

interface DiscountPageProps {
  params: Promise<{ id: string }>;
}

const DiscountPage = ({ params }: DiscountPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([
    'new-listing',
    'last-minute',
    'weekly',
    'monthly'
  ]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/price`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/legal-and-create`);
  };

  const toggleDiscount = (discountId: string) => {
    setSelectedDiscounts(prev => 
      prev.includes(discountId)
        ? prev.filter(id => id !== discountId)
        : [...prev, discountId]
    );
  };

  const discounts = [
    {
      id: 'new-listing',
      percentage: '20%',
      title: 'New listing promotion',
      description: 'Offer 20% off your first 3 bookings',
    },
    {
      id: 'last-minute',
      percentage: '15%',
      title: 'Last-minute discount',
      description: 'For stays booked 14 days or less before arrival',
    },
    {
      id: 'weekly',
      percentage: '10%',
      title: 'Weekly discount',
      description: 'For stays of 7 nights or more',
    },
    {
      id: 'monthly',
      percentage: '20%',
      title: 'Monthly discount',
      description: 'For stays of 28 nights or more',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-2xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Add discounts
          </h1>
          <p className="text-gray-600 text-lg">
            Help your place stand out to get booked faster and earn your first reviews.
          </p>
        </div>

        <div className="space-y-4">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center justify-between p-6 rounded-xl border border-gray-200 bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {discount.percentage}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {discount.title}
                  </h3>
                  <p className="text-gray-600">
                    {discount.description}
                  </p>
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDiscounts.includes(discount.id)}
                  onChange={() => toggleDiscount(discount.id)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedDiscounts.includes(discount.id)
                    ? 'bg-gray-900 border-gray-900'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}>
                  {selectedDiscounts.includes(discount.id) && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>
            </div>
          ))}
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

export default DiscountPage; 