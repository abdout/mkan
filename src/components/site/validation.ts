import { z } from "zod";

export const siteFilterSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(), 
  checkOut: z.string().optional(),
  guests: z.string().transform((val) => parseInt(val) || 0).optional(),
  category: z.string().optional(),
});

export const categoryFilterSchema = z.object({
  category: z.string().min(1, "Category is required"),
});

export type SiteFilterInput = z.infer<typeof siteFilterSchema>;
export type CategoryFilterInput = z.infer<typeof categoryFilterSchema>;