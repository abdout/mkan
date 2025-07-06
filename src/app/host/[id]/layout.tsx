"use client";

import React from 'react';
import HostFooter from '@/components/host/host-footer';
import { HostValidationProvider } from '@/context/host-validation-context';

interface HostLayoutProps {
  children: React.ReactNode;
}

const HostLayout = ({ children }: HostLayoutProps) => {
  return (
    <HostValidationProvider>
      <div className="px-20">
        {/* Main content with padding to account for fixed footer */}
        <main className="h-screen pt-20 ">
          {children}
        </main>

        {/* Footer with embedded navigation */}
        <HostFooter />
      </div>
    </HostValidationProvider>
  );
};

export default HostLayout;
