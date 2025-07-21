"use client"

import React from 'react'

interface StepNavigationProps {
  onNext: () => void
  onPrevious?: () => void
  isNextDisabled?: boolean
  isPreviousDisabled?: boolean
  nextLabel?: string
  previousLabel?: string
  showPrevious?: boolean
}

export function StepNavigation(props: StepNavigationProps) {
  const {
    onNext,
    onPrevious,
    isNextDisabled = false,
    isPreviousDisabled = false,
    nextLabel = 'Next',
    previousLabel = 'Back',
    showPrevious = true,
  } = props

  const previousButton = showPrevious ? (
    <button
      type="button"
      onClick={onPrevious}
      disabled={isPreviousDisabled}
      className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
        isPreviousDisabled
          ? 'text-muted-foreground cursor-not-allowed'
          : 'text-foreground hover:bg-muted'
      }`}
    >
      {previousLabel}
    </button>
  ) : (
    <div /> // Spacer
  )

  return (
    <div className="flex items-center justify-between pt-8 border-t">
      {previousButton}
      <button
        type="submit"
        disabled={isNextDisabled}
        className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
          isNextDisabled
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  )
} 