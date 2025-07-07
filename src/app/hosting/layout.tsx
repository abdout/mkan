"use client";

import React from 'react';
import HostingHeader from '@/components/hosting/hosting-header';
import NotificationCard from '@/components/hosting/notification-card';

interface HostingLayoutProps {
  children: React.ReactNode;
}

const HostingLayout = ({ children }: HostingLayoutProps) => {
  return (
    <div className="min-h-screen">
      <HostingHeader />
      
      <main>
        {children}
      </main>
    </div>
  );
};

export default HostingLayout;
