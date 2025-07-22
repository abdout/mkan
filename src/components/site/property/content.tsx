"use client";
import React, { useState, useEffect } from "react";
import { Listing } from "@/types/listing";
import { PropertyListings } from "./listings";

interface PropertyContentProps {
  properties: Listing[];
}

export const PropertyContent = ({ properties: initialProperties }: PropertyContentProps) => {
  const [properties, setProperties] = useState(initialProperties);

  useEffect(() => {
    // Filter to show only published listings
    const publishedProperties = initialProperties.filter(property => property.isPublished === true);
    setProperties(publishedProperties);
  }, [initialProperties]);

  return (
    <div className="w-full">
      <div className="flex relative">
        <div className="flex-1">
          <PropertyListings properties={properties} />
        </div>
      </div>
    </div>
  );
};
