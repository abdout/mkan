"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Users, Bed, BedDouble, Bath } from 'lucide-react'

interface RentalListingHeaderProps {
  title: string
  hostName: string
  maxGuests: number
  bedrooms: number
  beds: number
  bathrooms: number
  isSuperhostBadge?: boolean
  className?: string
}

export function RentalListingHeader({
  title,
  hostName,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  isSuperhostBadge = false,
  className
}: RentalListingHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
          {title}
        </h1>
        
        {/* Host Badge */}
        {isSuperhostBadge && (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-sm font-medium">
            Superhost
          </Badge>
        )}
      </div>

      {/* Property Details */}
      <div className="flex items-center gap-1 text-gray-600 text-base">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}</span>
        </div>
        
        <span className="mx-2">•</span>
        
        <div className="flex items-center gap-1">
          <BedDouble className="w-4 h-4" />
          <span>{bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
        </div>
        
        <span className="mx-2">•</span>
        
        <div className="flex items-center gap-1">
          <Bed className="w-4 h-4" />
          <span>{beds} {beds === 1 ? 'bed' : 'beds'}</span>
        </div>
        
        <span className="mx-2">•</span>
        
        <div className="flex items-center gap-1">
          <Bath className="w-4 h-4" />
          <span>{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
        </div>
      </div>
    </div>
  )
}

// Alternative compact version for smaller spaces
export function RentalListingHeaderCompact({
  title,
  hostName,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  isSuperhostBadge = false,
  className
}: RentalListingHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Title and Badge */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          {title}
        </h2>
        
        {isSuperhostBadge && (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
            Superhost
          </Badge>
        )}
      </div>

      {/* Compact Property Details */}
      <div className="flex items-center gap-1 text-gray-600 text-sm flex-wrap">
        <span>{maxGuests} guests</span>
        <span>•</span>
        <span>{bedrooms} bedroom{bedrooms !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{beds} bed{beds !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
} 