"use client"

import { Input } from "@/components/ui/input"
import { LOCATIONS, SEARCH_CONSTANTS } from "./constant"

interface LocationProps {
  searchQuery: string
  filteredLocations: string[]
  onSearchQueryChange: (query: string) => void
  onLocationSelect: (location: string) => void
}

export default function LocationDropdown({
  searchQuery,
  filteredLocations,
  onSearchQueryChange,
  onLocationSelect
}: LocationProps) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Where to?</h3>
      
      {/* Search input */}
      <div className="mb-4">
        <Input
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full h-10 border-0 border-none rounded-lg focus:outline-none focus:border-0 shadow-none text-black caret-black"
          autoFocus
        />
      </div>

      {/* Results */}
      <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => onLocationSelect(location)}
            >
              <div className="font-medium">{location}</div>
              <div className="text-sm text-gray-500">
                
              </div>
            </div>
          ))
        ) : searchQuery ? (
          <div className="text-center text-gray-500 py-4">
            No destinations found
          </div>
        ) : (
          // Show popular destinations when no search
          LOCATIONS.slice(0, SEARCH_CONSTANTS.DEFAULT_POPULAR_LOCATIONS_COUNT).map((location: string, index: number) => (
            <div 
              key={index}
              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => onLocationSelect(location)}
            >
              <div className="font-medium">{location}</div>
              <div className="text-sm text-gray-500">
                
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
