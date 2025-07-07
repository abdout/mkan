"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HostStepLayout } from '@/components/host';
import { MapPin } from 'lucide-react';
import { useHostValidation } from '@/context/host-validation-context';

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

const LocationPage = ({ params }: LocationPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [address, setAddress] = useState<string>('');
  const { enableNext, disableNext } = useHostValidation();

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Enable/disable next button based on address input
  React.useEffect(() => {
    if (address.trim()) {
      enableNext();
    } else {
      disableNext();
    }
  }, [address, enableNext, disableNext]);

  return (
    <HostStepLayout
      title="Where's your place located?"
      subtitle="Your address is only shared with guests after they've made a reservation."
    >
      <div className="space-y-6">
        <div className="bg-muted rounded-2xl h-96 relative overflow-hidden">
          {/* Map placeholder - in a real app, this would be a Google Maps or similar component */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Map will appear here</p>
            </div>
          </div>

          {/* Address input overlay */}
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-background rounded-full shadow-lg flex items-center px-6 py-4 border border-border">
              <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 outline-none bg-transparent placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Mock map markers */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-background shadow-lg"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-background shadow-lg"></div>
          </div>
        </div>

        {/* <div className="text-center text-sm text-muted-foreground">
          <p>We'll only share your address after a guest books your place.</p>
        </div> */}
      </div>
    </HostStepLayout>
  );
};

export default LocationPage; 