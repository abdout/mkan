'use client';

import Image from 'next/image';
import Link from 'next/link';

interface AppNearbyProps {
  location: string;
  img: string;
  distance: string;
}

const AppNearby = ({ location, img, distance }: AppNearbyProps) => {
  return (
    <Link href="/" className="block group">
      <div className="relative h-32 mb-2 overflow-hidden rounded-xl">
        <Image
          src={img}
          alt={location}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{location}</h3>
        <p className="text-sm text-gray-500">{distance} drive</p>
      </div>
    </Link>
  );
};

export default AppNearby;
