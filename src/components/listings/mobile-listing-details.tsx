"use client";

import React, { useState, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareIcon, HeartIcon } from '@/components/atom/icons';
import { useRouter } from 'next/navigation';

interface MobileListingDetailsProps {
  listing: any;
  images?: string[];
  onSave?: () => void;
  isSaved?: boolean;
  onShare?: () => void;
}

const MobileListingDetails: React.FC<MobileListingDetailsProps> = ({
  listing,
  images = [],
  onSave,
  isSaved = false,
  onShare
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  // Touch handlers for swipe
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleBack = () => {
    router.back();
  };

  // If no images, use placeholder
  const displayImages = images && images.length > 0 ? images : ['/placeholder.svg?height=500&width=600'];
  
  // Debug logging
  console.log('Mobile Listing Details - Images:', images);
  console.log('Mobile Listing Details - Display Images:', displayImages);
  console.log('Mobile Listing Details - Current Index:', currentImageIndex);

  // Safely format location string
  const getLocationString = () => {
    if (!listing?.location) return 'Location';
    if (typeof listing.location === 'string') return listing.location;
    return `${listing.location.city || ''}, ${listing.location.state || ''}`.trim() || 'Location';
  };

  return (
    <div className="md:hidden">
             {/* Full Screen Image Gallery */}
       <div 
         className="relative w-full h-[50vh] bg-black"
         onTouchStart={onTouchStart}
         onTouchMove={onTouchMove}
         onTouchEnd={onTouchEnd}
       >
        {/* Current Image */}
        <Image
          src={displayImages[currentImageIndex]}
          alt={`Property image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            console.error('Image failed to load:', displayImages[currentImageIndex]);
            // Fallback to placeholder if image fails
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg?height=500&width=600';
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                 {/* Top Navigation Bar */}
         <div className="absolute top-0 left-0 right-0 z-10 p-4">
           <div className="flex items-center justify-between">
             {/* Left Side - Back Button */}
             <Button
               variant="ghost"
               size="icon"
               onClick={handleBack}
               className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
             >
               <ArrowLeft className="w-5 h-5 text-gray-700" />
             </Button>

             {/* Right Side - Share and Love */}
             <div className="flex items-center space-x-3">
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={onShare}
                 className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
               >
                 <ShareIcon className="w-5 h-5 text-gray-700" />
               </Button>
               
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={onSave}
                 className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
               >
                 <HeartIcon className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
               </Button>
             </div>
           </div>
         </div>

                 {/* Image Counter */}
         {displayImages.length > 1 && (
           <div className="absolute bottom-4 right-4">
             <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
               {currentImageIndex + 1} / {displayImages.length}
             </div>
           </div>
         )}
      </div>

      {/* Property Info */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {listing?.title || 'Beautiful Property'}
        </h1>
        
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <span className="text-sm">★ 4.8</span>
          <span className="text-sm">·</span>
          <span className="text-sm underline">128 reviews</span>
          <span className="text-sm">·</span>
          <span className="text-sm underline">
            {getLocationString()}
          </span>
        </div>

        {/* Property details can be added here */}
      </div>
    </div>
  );
};

export default MobileListingDetails; 