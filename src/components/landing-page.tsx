"use client"

import React from 'react'
import { ArrowRight, Users, Home, TrendingUp, Star, Shield, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  className?: string
}

export function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 md:px-12 lg:px-36 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-26">
            {/* Hero Content */}
            <div className="flex-1 max-w-2xl">
              <div className="space-y-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                  Find Your Perfect Home
                  <br />
                  <span className="text-blue-600">With Expert Guidance</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl text-center lg:text-left">
                  Discover premium properties and investment opportunities. 
                  Our platform connects you with the best real estate deals 
                  in your area with professional support every step of the way.
                </p>
                
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="flex-shrink-0 w-80 h-80 lg:w-96 lg:h-96">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center">
                <div className="text-white">
                  <Home className="w-32 h-32 mx-auto mb-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-lg opacity-90">Properties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-8 md:py-16 px-4 md:px-12 lg:px-36">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
            <p className="text-lg text-gray-600">
              We work with leading real estate agencies and property developers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {/* Client Logos */}
            {[
              "Premier Properties",
              "Elite Realty",
              "Urban Homes",
              "Luxury Living",
              "Modern Spaces",
              "Prime Locations"
            ].map((client, index) => (
              <div 
                key={index}
                className="flex-1 h-24 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <div className="text-gray-600 font-semibold text-center">
                  {client}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community/Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-12 lg:px-36 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Real Estate Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to buy, sell, or manage properties in one comprehensive system
            </p>
          </div>
          
          <div className="flex gap-8 justify-between">
            {/* Feature Cards */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Buyers</h3>
              <p className="text-gray-600 mb-6">
                Find your dream home with our advanced search filters, 
                virtual tours, and expert guidance throughout the buying process.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  Property matching algorithm
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  Verified listings only
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  24/7 support team
                </li>
              </ul>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Sellers</h3>
              <p className="text-gray-600 mb-6">
                Maximize your property value with our market analysis, 
                professional photography, and extensive buyer network.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  Market value analysis
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  Professional marketing
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  Fast closing process
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-36 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who found their dream homes with us
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Browse Properties
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              List Your Property
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 