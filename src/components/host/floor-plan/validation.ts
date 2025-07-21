import { z } from 'zod'
import { FORM_LIMITS, ERROR_MESSAGES } from '../constants'

export const floorPlanSchema = z.object({
  bedrooms: z.number()
    .min(FORM_LIMITS.MIN_BEDROOMS, `Bedrooms must be at least ${FORM_LIMITS.MIN_BEDROOMS}`)
    .max(FORM_LIMITS.MAX_BEDROOMS, `Bedrooms cannot exceed ${FORM_LIMITS.MAX_BEDROOMS}`),
  bathrooms: z.number()
    .min(FORM_LIMITS.MIN_BATHROOMS, `Bathrooms must be at least ${FORM_LIMITS.MIN_BATHROOMS}`)
    .max(FORM_LIMITS.MAX_BATHROOMS, `Bathrooms cannot exceed ${FORM_LIMITS.MAX_BATHROOMS}`),
  guestCount: z.number()
    .min(FORM_LIMITS.MIN_GUESTS, `Guest count must be at least ${FORM_LIMITS.MIN_GUESTS}`)
    .max(FORM_LIMITS.MAX_GUESTS, `Guest count cannot exceed ${FORM_LIMITS.MAX_GUESTS}`),
})

export type FloorPlanFormData = z.infer<typeof floorPlanSchema> 