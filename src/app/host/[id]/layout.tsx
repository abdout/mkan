import React from 'react';
import HostFooter from '@/components/host/host-footer';

interface HostLayoutProps {
  children: React.ReactNode;
}

const HostLayout = ({ children }: HostLayoutProps) => {
  return (
    <div className="px-20">
      {/* Main content with padding to account for fixed footer */}
      <main className="h-screen">
        {children}
      </main>

      {/* Footer with embedded header */}
      <HostFooter />
    </div>
  );
};

export default HostLayout;
