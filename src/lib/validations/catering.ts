import { z } from 'zod';

/** Catering quote request — validated in the form and again by `POST /api/catering-requests/submit`. */
export const cateringRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(40).optional(),
  eventDate: z.iso.date().optional(),
  headcount: z.coerce.number().int().min(1).max(5000).optional(),
  budget: z.string().trim().max(60).optional(),
  occasion: z.string().trim().max(80).optional(),
  fulfillment: z.enum(['pickup', 'delivery']).default('pickup'),
  notes: z.string().trim().max(2000).optional(),
});

export type CateringRequestInput = z.input<typeof cateringRequestSchema>;
