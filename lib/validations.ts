import { z } from 'zod';

export const rsvpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name is too long'),
    email: z.string().email('Please enter a valid email address'),
    attending: z.enum(['yes', 'no'], {
      required_error: 'Please let us know if you will attend',
      invalid_type_error: 'Please select yes or no',
    }),
    guestCount: z.coerce
      .number()
      .min(1, 'At least 1 guest required')
      .max(10, 'Maximum 10 guests per RSVP')
      .optional(),
    mealPreference: z.enum(['chicken', 'fish', 'vegetarian']).optional(),
    message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
    songRequest: z.string().max(200, 'Song request cannot exceed 200 characters').optional(),
    // Honeypot — must be empty
    website: z.string().max(0, 'Bot detected').optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attending === 'yes') {
      if (!data.guestCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guestCount'],
          message: 'Please enter the number of guests',
        });
      }
      if (!data.mealPreference) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['mealPreference'],
          message: 'Please select a meal preference',
        });
      }
    }
  });

export type RSVPFormData = z.infer<typeof rsvpSchema>;
