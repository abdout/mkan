"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  price: number;
  imageUrl: string;
}

export function PropertyCard({
  id,
  title,
  address,
  price,
  imageUrl,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when favoriting
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/listing/${id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition hover:text-red-500"
        >
          <Heart
            className={cn("h-5 w-5", {
              "fill-current text-red-500": isFavorite,
            })}
          />
        </button>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="mt-1 font-semibold text-gray-900">
          ${price}{" "}
          <span className="font-normal text-gray-600">night</span>
        </p>
      </div>
    </Link>
  );
}

// Grid component for displaying multiple property cards
export function PropertyGrid({ 
  properties, 
  className 
}: { 
  properties: Omit<PropertyCardProps, 'className'>[]
  className?: string 
}) {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6",
      className
    )}>
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          {...property}
        />
      ))}
    </div>
  )
} 