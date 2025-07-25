"use client";

import { Button } from "@/components/ui/button"
import { ChevronRight, Home, Minus, Plus } from "lucide-react"
import Image from "next/image"

export default function MobileMap() {
  return (
    <div className="md:hidden px-4 py-6">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4 text-[#000000]">Where you'll be</h1>

      {/* Map Container */}
      <div className="relative w-full h-[250px] mb-4 rounded-lg overflow-hidden border border-[#e5e7eb]">
        {/* Map Background */}
        <div className="absolute inset-0 bg-[#ffffff]">
          <Image
            src="/airbnb/map.png"
            alt="Map of Bordeaux, France showing the Garonne River, Grands Hommes district, and surrounding areas"
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Location Pin and Tooltip Container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Location Tooltip */}
          <div className="relative bg-[#ffffff] shadow-lg border border-[#e5e7eb] px-3 py-2 mb-3">
            <p className="text-xs text-[#374151] whitespace-nowrap font-medium">Exact location provided after booking</p>
            {/* Down arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#ffffff]"></div>
          </div>

          {/* Location Pin */}
          <div className="relative">
            <div className="w-8 h-8 bg-[#de3151] rounded-full flex items-center justify-center shadow-lg">
              <Home className="w-4 h-4 text-[#ffffff]" />
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          <Button size="icon" variant="outline" className="w-6 h-6 rounded-full bg-[#ffffff] border-[#e5e7eb] hover:bg-[#e5e7eb]">
            <Plus className="w-2.5 h-2.5 text-[#374151]" />
          </Button>
          <Button size="icon" variant="outline" className="w-6 h-6 rounded-full bg-[#ffffff] border-[#e5e7eb] hover:bg-[#e5e7eb]">
            <Minus className="w-2.5 h-2.5 text-[#374151]" />
          </Button>
        </div>

        {/* Fullscreen Button */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#ffffff] border-[#e5e7eb] hover:bg-[#e5e7eb]"
        >
          <svg className="w-2 h-2 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeWidth="2"/>
          </svg>
        </Button>
      </div>

      {/* Location Information */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[#000000]">Bordeaux, Nouvelle-Aquitaine, France</h2>

        <p className="text-[#374151] leading-relaxed text-sm">
          Very dynamic and appreciated district by the people of Bordeaux thanks to rue St James and place Fernand
          Lafargue. Home to many historical monuments such as the Grosse Cloche, the Porte de Bourgogne and the Porte
          Cailhau, and cultural sites such as the Aquitaine Museum.
        </p>

        <button className="flex items-center p-0 underline h-auto text-[#000000] hover:text-[#374151] font-medium text-sm">
          Show more
          <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  )
} 