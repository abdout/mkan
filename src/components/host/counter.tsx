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
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onDecrement}
        disabled={isDecrementDisabled}
        className={`
          w-10 h-10 rounded-full border flex items-center justify-center transition-colors
          ${isDecrementDisabled
            ? 'border-muted text-muted-foreground cursor-not-allowed'
            : 'border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground'
          }
        `}
      >
        <Minus size={16} strokeWidth={2} />
      </button>

      <span className="w-12 text-center text-lg font-medium">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={isIncrementDisabled}
        className={`
          w-10 h-10 rounded-full border flex items-center justify-center transition-colors
          ${isIncrementDisabled
            ? 'border-muted text-muted-foreground cursor-not-allowed'
            : 'border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground'
          }
        `}
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  )
} 