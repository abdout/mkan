"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepsOverview } from '@/components/host';

const OverviewPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Generate a mock session ID for the listing flow
    const id = Date.now().toString();
    router.push(`/host/${id}/about-your-place`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <StepsOverview onGetStarted={handleGetStarted} />
    </div>
  );
};

export default OverviewPage; 