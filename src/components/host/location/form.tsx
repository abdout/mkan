"use client"

import { useLocation } from './use-location'
import { StepWrapper } from '../step-wrapper'
import { StepNavigation } from '../step-navigation'
import { FormField } from '../form-field'

export function LocationForm() {
  const { 
    form, 
    onSubmit, 
    onBack,
    isLoading, 
    error, 
    isFormValid
  } = useLocation()

  return (
    <StepWrapper>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <FormField
            label="Street address"
            error={form.formState.errors.address?.message}
          >
            <input
              type="text"
              {...form.register('address')}
              placeholder="123 Main Street"
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="City"
              error={form.formState.errors.city?.message}
            >
              <input
                type="text"
                {...form.register('city')}
                placeholder="New York"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </FormField>

            <FormField
              label="State/Province"
              error={form.formState.errors.state?.message}
            >
              <input
                type="text"
                {...form.register('state')}
                placeholder="NY"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Country"
              error={form.formState.errors.country?.message}
            >
              <input
                type="text"
                {...form.register('country')}
                placeholder="United States"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </FormField>

            <FormField
              label="Postal code"
              error={form.formState.errors.postalCode?.message}
            >
              <input
                type="text"
                {...form.register('postalCode')}
                placeholder="10001"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </FormField>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Your address is only shared with guests after they book
              </h4>
              <p className="text-sm text-blue-800">
                We'll show the general area on your listing page so guests know the neighborhood.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <StepNavigation
          onNext={onSubmit}
          onPrevious={onBack}
          isNextDisabled={!isFormValid || isLoading}
          nextLabel={isLoading ? 'Saving...' : 'Next'}
          showPrevious={true}
        />
      </form>
    </StepWrapper>
  )
} 