"use client"

import React, { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface PropertyCardProps {
  id: string
  images: string[]
  title: string
  location: string
  dates?: string
  price: number
  rating: number
  isSuperhostBadge?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void
  onCardClick?: (id: string) => void
  className?: string
}

export function PropertyCard({
  id,
  images = [],
  title,
  location,
  dates,
  price,
  rating,
  isSuperhostBadge = false,
  isFavorite = false,
  onFavoriteToggle,
  onCardClick,
  className
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(isFavorite)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    onFavoriteToggle?.(id, !isLiked)
  }

  const handleCardClick = () => {
    onCardClick?.(id)
  }

  const handleImageNavigation = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setCurrentImageIndex(index)
  }

  // Fallback image if no images provided
  const displayImages = images.length > 0 ? images : ['/api/placeholder/303/287']

  return (
    <div 
      className={cn(
        "w-full max-w-sm cursor-pointer group",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative mb-3">
        {/* Main Image */}
        <div className="relative w-full h-52 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={displayImages[currentImageIndex]}
            alt={title}
            width={303}
            height={287}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={cn(
                "w-4 h-4 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
              )}
            />
          </Button>

          {/* Superhost Badge */}
          {isSuperhostBadge && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-medium"
            >
              Superhost
            </Badge>
          )}

          {/* Image Navigation Dots */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    index === currentImageIndex 
                      ? "bg-white" 
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  onClick={(e) => handleImageNavigation(e, index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Location and Rating Row */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Location */}
            <div className="text-gray-900 font-normal text-sm">
              <span className="truncate">{location}</span>
            </div>
            
            {/* Dates */}
            {dates && (
              <div className="text-gray-500 text-xs mt-1">
                <span>{dates}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-gray-900 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {rating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h5 className="text-gray-900 font-normal text-sm line-clamp-2">
          {title}
        </h5>

        {/* Price */}
        <div className="text-gray-900 text-sm">
          <span className="font-medium">${price}</span>
          <span className="text-gray-500 text-xs"> night</span>
        </div>
      </div>
    </div>
  )
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