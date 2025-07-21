"use client";
import React, { useState, useEffect } from "react";
import { PropertyCard } from "@/components/site/property/card";
import { Listing } from "@/components/host/use-listing";

interface PropertyContentProps {
  properties: Listing[];
}

export const PropertyContent = ({ properties: initialProperties }: PropertyContentProps) => {
  const [properties, setProperties] = useState(initialProperties);

  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

  return (
    <div className="py-10 lg:py-14">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id!}
            title={property.title!}
            address={`${property.address}, ${property.city}`}
            price={property.pricePerNight!}
            imageUrl={property.photoUrls?.[0] || ""}
          />
        ))}
      </div>
    </div>
  );
};
