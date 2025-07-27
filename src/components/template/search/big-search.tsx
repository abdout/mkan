"use client"

import { SearchButton, Counter } from "@/components/atom"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

type ActiveButton = "location" | "checkin" | "checkout" | "guests" | null

export default function BigSearch() {
  const router = useRouter()
  const [activeButton, setActiveButton] = useState<ActiveButton>(null)
  const [hoveredButton, setHoveredButton] = useState<ActiveButton>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  
  // Guest counter state
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0
  })

  const handleButtonClick = (button: ActiveButton) => {
    setActiveButton(activeButton === button ? null : button)
  }

  // Guest counter handlers
  const handleGuestChange = (type: 'adults' | 'children' | 'infants', operation: 'increment' | 'decrement') => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'increment' 
        ? prev[type] + 1 
        : Math.max(0, prev[type] - 1)
    }))
  }

  // Click outside to reset
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveButton(null)
        setHoveredButton(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const isLineHidden = (position: "location-checkin" | "checkin-checkout" | "checkout-guests") => {
    switch (position) {
      case "location-checkin":
        return (
          hoveredButton === "location" ||
          hoveredButton === "checkin" ||
          activeButton === "location" ||
          activeButton === "checkin"
        )
      case "checkin-checkout":
        return (
          hoveredButton === "checkin" ||
          hoveredButton === "checkout" ||
          activeButton === "checkin" ||
          activeButton === "checkout"
        )
      case "checkout-guests":
        return (
          hoveredButton === "checkout" ||
          hoveredButton === "guests" ||
          activeButton === "checkout" ||
          activeButton === "guests"
        )
      default:
        return false
    }
  }

  // Helper function to get button styling
  const getButtonStyling = (button: ActiveButton) => {
    const isActive = activeButton === button
    const isHovered = hoveredButton === button
    const hasActiveButton = activeButton !== null

    // Base background color
    let bgClass = "bg-transparent"
    if (isActive) {
      bgClass = "bg-white shadow-md"
    } else if (hasActiveButton) {
      // When there's an active button, all other buttons get dark gray background
      bgClass = "bg-[#e5e7eb]"
      if (isHovered) {
        bgClass = "bg-[#d1d5db]" // Slightly darker on hover
      }
    } else if (isHovered) {
      bgClass = "bg-[#f3f4f6]" // Regular gray when no button is active
    } else {
      bgClass = "bg-transparent hover:bg-[#f3f4f6]"
    }

    // Rounded corners logic - sharp edges when adjacent to active/hovered buttons
    let roundedClass = "rounded-full"

    if (hasActiveButton) {
      // Check if this button is adjacent to active button
      const isAdjacentToActive =
        (activeButton === "location" && button === "checkin") ||
        (activeButton === "checkin" && (button === "location" || button === "checkout")) ||
        (activeButton === "checkout" && (button === "checkin" || button === "guests")) ||
        (activeButton === "guests" && button === "checkout")

      // Check if this button is adjacent to hovered button
      const isAdjacentToHovered =
        (hoveredButton === "location" && button === "checkin") ||
        (hoveredButton === "checkin" && (button === "location" || button === "checkout")) ||
        (hoveredButton === "checkout" && (button === "checkin" || button === "guests")) ||
        (hoveredButton === "guests" && button === "checkout")

      if (isActive) {
        // Active button gets sharp edges on sides touching hovered buttons
        if (hoveredButton === "checkin" && button === "location") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        } else if (hoveredButton === "location" && button === "checkin") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        } else if (hoveredButton === "checkout" && button === "checkin") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        } else if (hoveredButton === "checkin" && button === "checkout") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        } else if (hoveredButton === "guests" && button === "checkout") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        } else if (hoveredButton === "checkout" && button === "guests") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        }
      } else if (isHovered && isAdjacentToActive) {
        // Hovered button gets sharp edge on side touching active button
        if (activeButton === "location" && button === "checkin") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        } else if (activeButton === "checkin" && button === "location") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        } else if (activeButton === "checkin" && button === "checkout") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        } else if (activeButton === "checkout" && button === "checkin") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        } else if (activeButton === "checkout" && button === "guests") {
          roundedClass = "rounded-r-full rounded-l-none" // Sharp left edge
        } else if (activeButton === "guests" && button === "checkout") {
          roundedClass = "rounded-l-full rounded-r-none" // Sharp right edge
        }
      }
    }

    return `${bgClass} ${roundedClass} transition-all duration-200`
  }

  return (
    <div className="relative w-full" ref={searchBarRef}>
      <div
        className={`flex items-center border border-[#e5e7eb] rounded-full shadow-sm transition-colors ${
          activeButton ? "bg-[#e5e7eb]" : "bg-white"
        }`}
      >
        {/* Location Button */}
        <button
          className={`flex-[2] px-6 py-3 ${getButtonStyling("location")}`}
          onMouseEnter={() => setHoveredButton("location")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => handleButtonClick("location")}
        >
          <div className="text-left">
            <div className="text-sm font-semibold text-[#000000] mb-1">Location</div>
            <div className="text-sm text-[#6b7280]">Where are you going?</div>
          </div>
        </button>

        {/* Divider 1 */}
        <div
          className={`w-px h-8 bg-[#e5e7eb] transition-opacity duration-200 ${
            isLineHidden("location-checkin") ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Check in Button */}
        <button
          className={`flex-1 px-6 py-3 ${getButtonStyling("checkin")}`}
          onMouseEnter={() => setHoveredButton("checkin")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => handleButtonClick("checkin")}
        >
          <div className="text-left">
            <div className="text-sm font-semibold text-[#000000] mb-1">Check in</div>
            <div className="text-sm text-[#6b7280]">Add dates</div>
          </div>
        </button>

        {/* Divider 2 */}
        <div
          className={`w-px h-8 bg-[#e5e7eb] transition-opacity duration-200 ${
            isLineHidden("checkin-checkout") ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Check out Button */}
        <button
          className={`flex-1 px-6 py-3 ${getButtonStyling("checkout")}`}
          onMouseEnter={() => setHoveredButton("checkout")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => handleButtonClick("checkout")}
        >
          <div className="text-left">
            <div className="text-sm font-semibold text-[#000000] mb-1">Check out</div>
            <div className="text-sm text-[#6b7280]">Add dates</div>
          </div>
        </button>

        {/* Divider 3 */}
        <div
        className={`w-px h-8 bg-[#e5e7eb] transition-opacity duration-200 ${
            isLineHidden("checkout-guests") ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Guests Button + Search Button Container */}
        <div
          className={`flex-[2] flex items-center ${getButtonStyling("guests")}`}
          onMouseEnter={() => setHoveredButton("guests")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {/* Guests Button */}
          <div className="flex-1 px-6 py-3 text-left" onClick={() => handleButtonClick("guests")}>
            <div className="text-sm font-semibold text-[#000000] mb-1">Guests</div>
            <div className="text-sm text-[#6b7280]">Add guests</div>
          </div>

          {/* Search Button */}
          <div className="pr-2">
            <SearchButton
              size={activeButton ? "big" : "small"}
              onClick={() => router.push('/search')}
              showText={!!activeButton}
            />
          </div>
        </div>
      </div>

      {/* Dropdown Menus */}
      {activeButton === "location" && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
          <h3 className="text-lg font-semibold mb-4">Where to?</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Paris, France</div>
              <div className="text-sm text-gray-500">Popular destination</div>
            </div>
            <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Tokyo, Japan</div>
              <div className="text-sm text-gray-500">Trending destination</div>
            </div>
            <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">New York, USA</div>
              <div className="text-sm text-gray-500">Popular destination</div>
            </div>
          </div>
        </div>
      )}

      {activeButton === "checkin" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
          <h3 className="text-lg font-semibold mb-4 text-center">Select dates</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Check-in</h4>
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Calendar 1<div className="text-xs mt-2">January 2024</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Check-out</h4>
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Calendar 2<div className="text-xs mt-2">February 2024</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeButton === "checkout" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
          <h3 className="text-lg font-semibold mb-4 text-center">Select dates</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Check-in</h4>
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Calendar 1<div className="text-xs mt-2">January 2024</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Check-out</h4>
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Calendar 2<div className="text-xs mt-2">February 2024</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeButton === "guests" && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
          <h3 className="text-lg font-semibold mb-4">Who's coming?</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-gray-500">Ages 13 or above</div>
              </div>
              <Counter
                value={guests.adults}
                onIncrement={() => handleGuestChange('adults', 'increment')}
                onDecrement={() => handleGuestChange('adults', 'decrement')}
                min={0}
                max={16}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-gray-500">Ages 2-12</div>
              </div>
              <Counter
                value={guests.children}
                onIncrement={() => handleGuestChange('children', 'increment')}
                onDecrement={() => handleGuestChange('children', 'decrement')}
                min={0}
                max={10}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Infants</div>
                <div className="text-sm text-gray-500">Under 2</div>
              </div>
              <Counter
                value={guests.infants}
                onIncrement={() => handleGuestChange('infants', 'increment')}
                onDecrement={() => handleGuestChange('infants', 'decrement')}
                min={0}
                max={5}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
