"use client"

import React from 'react'
import { Minus, Plus } from 'lucide-react'

interface CounterProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
  step?: number
}

export function Counter({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 100,
  step = 1,
}: CounterProps) {
  const isDecrementDisabled = value <= min
  const isIncrementDisabled = value >= max

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={onDecrement}
        disabled={isDecrementDisabled}
        className={`
          w-12 h-12 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors min-h-[48px] sm:min-h-[40px]
          ${isDecrementDisabled
            ? 'border-muted text-muted-foreground cursor-not-allowed'
            : 'border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground active:scale-95'
          }
        `}
      >
        <Minus size={18} strokeWidth={2} className="sm:w-4 sm:h-4" />
      </button>

      <span className="w-12 sm:w-16 text-center text-lg sm:text-xl font-medium">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={isIncrementDisabled}
        className={`
          w-12 h-12 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors min-h-[48px] sm:min-h-[40px]
          ${isIncrementDisabled
            ? 'border-muted text-muted-foreground cursor-not-allowed'
            : 'border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground active:scale-95'
          }
        `}
      >
        <Plus size={18} strokeWidth={2} className="sm:w-4 sm:h-4" />
      </button>
    </div>
  )
} 