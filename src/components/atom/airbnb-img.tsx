import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Grip } from "lucide-react"

interface PropertyGalleryProps {
  images?: string[];
  onSave?: () => void;
  isSaved?: boolean;
  onShowAllPhotos?: () => void;
  className?: string;
}

export default function PropertyGallery({ 
  images = [], 
  onSave, 
  isSaved = false, 
  onShowAllPhotos,
  className = "" 
}: PropertyGalleryProps) {
  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 h-[200px] lg:h-[320px]">
          {/* Main large image */}
          <div className="relative overflow-hidden rounded-l-xl lg:rounded-l-xl rounded-r-xl lg:rounded-r-none">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Modern living room with gray sectional sofa and yellow accent chair"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Grid of smaller images */}
          <div className="hidden lg:grid grid-cols-2 gap-2">
            {/* Top left */}
            <div className="relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=300"
                alt="Dining area with wooden table and modern stairs"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Top right */}
            <div className="relative overflow-hidden rounded-tr-xl">
              <Image
                src="/placeholder.svg?height=250&width=300"
                alt="Modern living room view"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom left */}
            <div className="relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=300"
                alt="Modern kitchen with light colored cabinets"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom right with overlay button */}
            <div className="relative overflow-hidden rounded-br-xl">
              <Image
                src="/placeholder.svg?height=250&width=300"
                alt="Exterior view of traditional European buildings"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Show all photos button */}
              <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors duration-200" />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-4 right-4 gap-2 bg-[#ffffff] text-[#000000] hover:bg-gray-100 border border-gray-300"
              >
                <Grip className="w-4 h-4" />
                Show all photos
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const mainImage = images[0];
  const thumbnailImages = images.slice(1, 5);
  const totalImages = images.length;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 h-[200px] lg:h-[320px]">
        {/* Main large image */}
        <div className="relative overflow-hidden rounded-l-xl lg:rounded-l-xl rounded-r-xl lg:rounded-r-none cursor-pointer" onClick={onShowAllPhotos}>
          <Image
            src={mainImage}
            alt="Property main image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md rounded-full p-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path 
                  d="M7.99996 3.16675L9.16663 6.83341H12.8333L9.83329 9.16675L10.8333 12.8334L7.99996 10.5001L5.16663 12.8334L6.16663 9.16675L3.16663 6.83341H6.83329L7.99996 3.16675Z" 
                  stroke={isSaved ? '#DE3151' : '#484848'} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill={isSaved ? '#DE3151' : 'none'}
                />
              </svg>
            </Button>
          )}
        </div>

        {/* Grid of smaller images */}
        <div className="hidden lg:grid grid-cols-2 gap-2">
          {/* Top left */}
          <div className="relative overflow-hidden cursor-pointer" onClick={onShowAllPhotos}>
            <Image
              src={thumbnailImages[0] || mainImage}
              alt="Property image 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Top right */}
          <div className="relative overflow-hidden rounded-tr-xl cursor-pointer" onClick={onShowAllPhotos}>
            <Image
              src={thumbnailImages[1] || mainImage}
              alt="Property image 3"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bottom left */}
          <div className="relative overflow-hidden cursor-pointer" onClick={onShowAllPhotos}>
            <Image
              src={thumbnailImages[2] || mainImage}
              alt="Property image 4"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bottom right with overlay button */}
          <div className="relative overflow-hidden rounded-br-xl cursor-pointer" onClick={onShowAllPhotos}>
            <Image
              src={thumbnailImages[3] || mainImage}
              alt="Property image 5"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />

            {/* Show all photos button */}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors duration-200" />
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 gap-2 bg-[#ffffff] text-[#000000] hover:bg-gray-100 border border-gray-300"
            >
              <Grip className="w-4 h-4" />
              Show all photos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
