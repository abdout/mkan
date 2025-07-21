"use client"

import React from 'react'

interface FormFieldProps {
  label: string
  description?: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, description, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-lg font-medium text-foreground">
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>

      {children}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
} 