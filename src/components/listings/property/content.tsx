"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Listing } from "@/types/listing";
import { PropertyListings } from "./listings";
import { useDebounce } from "@/hooks/useDebounce";

interface PropertyContentProps {
  properties: Listing[];
}

export const PropertyContent = ({ properties: initialProperties }: PropertyContentProps) => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState(initialProperties);
  const [searchFilters, setSearchFilters] = useState({
    location: searchParams.get("location") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: parseInt(searchParams.get("guests") || "0"),
    adults: parseInt(searchParams.get("adults") || "0"),
    children: parseInt(searchParams.get("children") || "0"),
    infants: parseInt(searchParams.get("infants") || "0")
  });

  const debouncedFilters = useDebounce(searchFilters, 300);

  useEffect(() => {
    // Update filters when URL params change
    setSearchFilters({
      location: searchParams.get("location") || "",
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      guests: parseInt(searchParams.get("guests") || "0"),
      adults: parseInt(searchParams.get("adults") || "0"),
      children: parseInt(searchParams.get("children") || "0"),
      infants: parseInt(searchParams.get("infants") || "0")
    });
  }, [searchParams]);

  useEffect(() => {
    // Filter properties based on search criteria
    let filteredProperties = initialProperties.filter(property => property.isPublished === true);

    // Location filter
    if (debouncedFilters.location) {
      const locationLower = debouncedFilters.location.toLowerCase();
      filteredProperties = filteredProperties.filter(property => {
        const locationMatch = 
          property.location?.city?.toLowerCase().includes(locationLower) ||
          property.location?.state?.toLowerCase().includes(locationLower) ||
          property.location?.country?.toLowerCase().includes(locationLower) ||
          property.title?.toLowerCase().includes(locationLower) ||
          property.name?.toLowerCase().includes(locationLower);
        return locationMatch;
      });
    }

    // Guest capacity filter
    if (debouncedFilters.guests > 0 || debouncedFilters.adults > 0) {
      const totalGuests = Math.max(debouncedFilters.guests, debouncedFilters.adults + debouncedFilters.children);
      filteredProperties = filteredProperties.filter(property => {
        const capacity = property.guestCapacity || property.maxGuests || 1;
        return capacity >= totalGuests;
      });
    }

    // Date availability filter (basic implementation - you may want to enhance this)
    if (debouncedFilters.checkIn && debouncedFilters.checkOut) {
      // For now, just ensure the property allows bookings
      // In a real app, you'd check availability calendar
      filteredProperties = filteredProperties.filter(property => {
        return property.isPublished && !property.isBlocked;
      });
    }

    setProperties(filteredProperties);
  }, [initialProperties, debouncedFilters]);

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
