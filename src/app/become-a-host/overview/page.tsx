"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepsOverview } from '@/components/host';

const OverviewPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Generate a mock session ID for the listing flow
    const sessionId = Date.now().toString();
    router.push(`/become-a-host/${sessionId}/about-your-place`);
  };

  return (
    <div className="min-h-screen bg-white">
      <StepsOverview onGetStarted={handleGetStarted} />
    </div>
  );
};

export default OverviewPage; 