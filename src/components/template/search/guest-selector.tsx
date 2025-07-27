"use client"

import { Counter } from "@/components/atom"
import { GUEST_LIMITS } from "./constant"

interface GuestSelectorProps {
  guests: {
    adults: number
    children: number
    infants: number
  }
  onGuestChange: (type: 'adults' | 'children' | 'infants', operation: 'increment' | 'decrement') => void
}

export default function GuestSelectorDropdown({
  guests,
  onGuestChange
}: GuestSelectorProps) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Who's coming?</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Adults</div>
            <div className="text-sm text-gray-500">Ages 13 or above</div>
          </div>
          <Counter
            value={guests.adults}
            onIncrement={() => onGuestChange('adults', 'increment')}
            onDecrement={() => onGuestChange('adults', 'decrement')}
            min={GUEST_LIMITS.adults.min}
            max={GUEST_LIMITS.adults.max}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Children</div>
            <div className="text-sm text-gray-500">Ages 2-12</div>
          </div>
          <Counter
            value={guests.children}
            onIncrement={() => onGuestChange('children', 'increment')}
            onDecrement={() => onGuestChange('children', 'decrement')}
            min={GUEST_LIMITS.children.min}
            max={GUEST_LIMITS.children.max}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Infants</div>
            <div className="text-sm text-gray-500">Under 2</div>
          </div>
          <Counter
            value={guests.infants}
            onIncrement={() => onGuestChange('infants', 'increment')}
            onDecrement={() => onGuestChange('infants', 'decrement')}
            min={GUEST_LIMITS.infants.min}
            max={GUEST_LIMITS.infants.max}
          />
        </div>
      </div>
    </>
  )
} 