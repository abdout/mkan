"use client";

import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId?: string;
  isInFavoriteList?: boolean;
  homeId: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  homeId,
  isInFavoriteList = false,
}: iAppProps) {
  const { getByValue } = useCountries();
  const country = getByValue(location);

  // Ensure image path starts with a slash
  const normalizedImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return (
    <div className="group flex flex-col transition-transform hover:scale-[1.02]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={normalizedImagePath}
          alt={`${country?.label} property - ${description}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {userId && (
          <button 
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full transition-all",
              "hover:scale-110 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              isInFavoriteList 
                ? "bg-rose-500 text-white focus:ring-rose-500" 
                : "bg-white text-neutral-500 hover:bg-neutral-100 focus:ring-neutral-300"
            )}
            onClick={() => {}}
            aria-label={isInFavoriteList ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="w-6 h-6" />
          </button>
        )}
      </div>
      <Link href={`/home/${homeId}`} className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">{country?.label}</h3>
          <Heart className="h-7 text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200" />
        </div>
        <div className="text-sm text-gray-500">
          <span>{country?.region}</span>
        </div>
        <p className="text-neutral-600 text-sm line-clamp-2">
          {description}
        </p>
        <div className="flex items-center space-x-1">
          <span className="text-base font-semibold">${price}</span>
          <span className="text-gray-500">/ night</span>
        </div>
      </Link>
    </div>
  );
}
