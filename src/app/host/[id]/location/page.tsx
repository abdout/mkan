"use client";

import React from 'react';
import { LocationForm } from '@/components/host/location/form';

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

const LocationPage = ({ params }: LocationPageProps) => {
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-medium mb-4">
          Where's your place located?
        </h1>
        <p className="text-muted-foreground">
          Your address is only shared with guests after they make a reservation.
        </p>
      </div>
      
      <LocationForm />
    </div>
  );
};

export default LocationPage; 