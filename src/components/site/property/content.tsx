"use client"

import React, { useState } from 'react'
import { PropertyGrid } from './card'
import { PROPERTY_DATA } from './constant'

export function Property() {
  const [properties, setProperties] = useState(PROPERTY_DATA)

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, isFavorite }
          : property
      )
    )
  }

  const handleCardClick = (id: string) => {
    console.log('Property clicked:', id)
    // Add navigation logic here
  }

  const propertiesWithHandlers = properties.map(property => ({
    ...property,
    onFavoriteToggle: handleFavoriteToggle,
    onCardClick: handleCardClick
  }))

  return (
    <div className="layout-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Featured Properties
        </h1>
        <p className="text-gray-600">
          Discover amazing places to stay around the world
        </p>
      </div>
      
      <PropertyGrid 
        properties={propertiesWithHandlers}
        className="mb-8"
      />
    </div>
  )
}
