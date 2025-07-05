'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface AppPlaceCardProps {
  img: string;
  title: string;
  location: string;
  description: string;
  star: number;
  reviews: number;
  price: number;
}

const AppPlaceCard = ({
  img,
  title,
  location,
  description,
  star,
  reviews,
  price
}: AppPlaceCardProps) => {
  return (
    <div className="grid sm:grid-cols-[300px,1fr] py-5 border-gray-200 cursor-pointer sm:border-t grid-cols-1 gap-x-4 group">
      {/* Image */}
      <div className="relative w-full mb-2 md:mb-0 sm:h-44 h-52 overflow-hidden rounded-xl">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          priority
        />
      </div>

      {/* Details */}
      <div className="flex flex-col px-1 sm:px-0">
        {/* Top section */}
        <div className="flex-grow space-y-1">
          <span className="text-sm text-gray-400">{location}</span>
          <h3 className="text-lg font-medium">{title}</h3>
          <hr className="hidden w-10 border-gray-200 sm:block" />
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        {/* Bottom section */}
        <div className="flex justify-between order-first sm:order-none items-end mt-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-semibold">{star}</span>
            <span className="text-sm text-gray-400">({reviews} reviews)</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold">${price}</span>
            <span className="text-gray-500 ml-1">/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPlaceCard;
