import { z } from 'zod';

/** Contact page message — validated in the form and again by `POST /api/contact-messages/submit`. */
export const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(40).optional(),
  topic: z.string().trim().max(60).optional(),
  message: z.string().trim().min(1).max(4000),
});

export type ContactMessageInput = z.input<typeof contactMessageSchema>;
