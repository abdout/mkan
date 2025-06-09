"use client"

import React from 'react'
import { PropertySearchNav, PropertySearchNavCompact } from '@/components/property-search-nav'

interface SearchParams {
  location: string
  checkIn: string
  checkOut: string
  guests: number
}

export default function SearchDemoPage() {
  const handleSearch = (params: SearchParams) => {
    console.log('Search params:', params)
    // Here you would typically trigger a search API call
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Search Navigation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Inspired by Airbnb's UI Kit - A beautiful and functional search interface for your real estate platform
          </p>
        </div>

        {/* Full Navigation Component */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Full Navigation Component
          </h2>
          <div className="flex justify-center">
            <PropertySearchNav onSearch={handleSearch} />
          </div>
        </div>

        {/* Compact Navigation Component */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Compact Version (Mobile)
          </h2>
          <div className="flex justify-center max-w-md mx-auto">
            <PropertySearchNavCompact onSearch={handleSearch} />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Component Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-rose-600 text-xl">📍</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Location Search</h3>
              <p className="text-sm text-gray-600">Flexible location input with placeholder text</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📅</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Date Picker</h3>
              <p className="text-sm text-gray-600">Check-in and check-out date selection</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Guest Count</h3>
              <p className="text-sm text-gray-600">Number of guests selector</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Search</h3>
              <p className="text-sm text-gray-600">Elegant search button with icon</p>
            </div>
          </div>
        </div>

        {/* Design Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Design Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Styling Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Rounded pill design (500px border radius)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Subtle drop shadow with hover effects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Clean separator lines between sections
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Proper spacing and padding (28px, 8px)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Interaction Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Responsive input fields with icons
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  TypeScript support with type safety
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Callback function for search handling
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Mobile-friendly compact version
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 