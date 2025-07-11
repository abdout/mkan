"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostStepLayout } from '@/components/host';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useHostValidation } from '@/context/host-validation-context';

interface DiscountPageProps {
  params: Promise<{ id: string }>;
}

const DiscountPage = ({ params }: DiscountPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([
    'new-listing',
    'last-minute',
    'weekly'
  ]);
  const { enableNext } = useHostValidation();

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable next button since discounts are optional
  React.useEffect(() => {
    enableNext();
  }, [enableNext]);

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
      percentage: '25%',
      title: 'Last-minute discount',
      description: 'For stays booked 14 days or less before arrival',
    },
    {
      id: 'weekly',
      percentage: '10%',
      title: 'Weekly discount',
      description: 'For stays of 7 nights or more',
    },
  ];

  return (
    <HostStepLayout
      title="Add discounts"
      subtitle="Help your place stand out to get booked faster and earn your first reviews."
    >
      <div className="space-y-4">
        {discounts.map((discount) => (
          <Card
            key={discount.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedDiscounts.includes(discount.id)
                ? 'border-foreground/50 bg-accent'
                : 'hover:border-foreground/50'
            }`}
            onClick={() => toggleDiscount(discount.id)}
          >
            <div className="flex items-center justify-between">
              {/* Percentage Badge */}
              <div className="flex-shrink-0">
                <Badge 
                  variant={discount.id === 'new-listing' ? 'default' : 'outline'} 
                  className={`w-12 h-8 bg-transparent text-foreground flex items-center justify-center ${
                    discount.id !== 'new-listing' ? 'bg-background border border-muted-foreground' : ''
                  }`}
                >
                  {discount.percentage}
                </Badge>
              </div>
              
              {/* Title and Description */}
              <div className="flex-1 mx-4">
                <h5 className="mb-1">
                  {discount.title}
                </h5>
                <p>
                  {discount.description}
                </p>
              </div>
              
              {/* Checkbox */}
              <div className="flex-shrink-0">
                <Checkbox
                  checked={selectedDiscounts.includes(discount.id)}
                  onCheckedChange={() => toggleDiscount(discount.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </HostStepLayout>
  );
};

export default DiscountPage; 