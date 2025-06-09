"use client"

import React, { useState } from 'react'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface PropertySearchNavProps {
  onSearch?: (params: SearchParams) => void
  className?: string
}

interface SearchParams {
  location: string
  checkIn: string
  checkOut: string
  guests: number
}

export function PropertySearchNav({ onSearch, className }: PropertySearchNavProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleSearch = () => {
    onSearch?.(searchParams)
  }

  const handleInputChange = (field: keyof SearchParams, value: string | number) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className={cn(
      "inline-flex items-center justify-between",
      "bg-white border border-gray-300 rounded-full",
      "shadow-sm hover:shadow-md transition-shadow duration-200",
      "p-2 max-w-4xl mx-auto",
      className
    )}>
      {/* Location Input */}
      <div className="flex-1 px-6 py-2">
        <div className="flex items-center space-x-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <div className="flex-1">
            <Input
              placeholder="Anywhere"
              value={searchParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="border-0 shadow-none p-0 h-auto text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
            />
            <div className="text-xs text-gray-400 mt-0.5">Where are you going?</div>
          </div>
        </div>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-200" />

      {/* Check-in Date */}
      <div className="flex-1 px-6 py-2">
        <div className="flex items-center space-x-3">
          <Calendar className="h-4 w-4 text-gray-500" />
          <div className="flex-1">
            <Input
              type="date"
              placeholder="Check-in"
              value={searchParams.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="border-0 shadow-none p-0 h-auto text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
            />
            <div className="text-xs text-gray-400 mt-0.5">Add dates</div>
          </div>
        </div>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-200" />

      {/* Check-out Date */}
      <div className="flex-1 px-6 py-2">
        <div className="flex items-center space-x-3">
          <Calendar className="h-4 w-4 text-gray-500" />
          <div className="flex-1">
            <Input
              type="date"
              placeholder="Check-out"
              value={searchParams.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              className="border-0 shadow-none p-0 h-auto text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
            />
            <div className="text-xs text-gray-400 mt-0.5">Add dates</div>
          </div>
        </div>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-200" />

      {/* Guests Input */}
      <div className="flex-1 px-6 py-2">
        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-gray-500" />
          <div className="flex-1">
            <Input
              type="number"
              min="1"
              placeholder="Guests"
              value={searchParams.guests || ''}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value) || 1)}
              className="border-0 shadow-none p-0 h-auto text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
            />
            <div className="text-xs text-gray-400 mt-0.5">Add guests</div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        size="icon"
        className="h-12 w-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg ml-2"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}

// Compact version for smaller screens
export function PropertySearchNavCompact({ onSearch, className }: PropertySearchNavProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleSearch = () => {
    onSearch?.(searchParams)
  }

  return (
    <div className={cn(
      "flex items-center",
      "bg-white border border-gray-300 rounded-full",
      "shadow-sm hover:shadow-md transition-shadow duration-200",
      "p-2",
      className
    )}>
      <div className="flex-1 px-4 py-2">
        <Input
          placeholder="Search properties..."
          className="border-0 shadow-none p-0 h-auto text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
        />
      </div>
      
      <Button
        onClick={handleSearch}
        size="icon"
        className="h-10 w-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg ml-2"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
} 