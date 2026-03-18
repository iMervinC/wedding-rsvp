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
    guestNames: z
      .array(z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'))
      .optional(),
    message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
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
      const extraGuests = (data.guestCount ?? 1) - 1;
      for (let i = 0; i < extraGuests; i++) {
        const name = data.guestNames?.[i];
        if (!name || name.trim().length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['guestNames', i],
            message: 'Please enter a name for this guest',
          });
        }
      }
    }
  });

export type RSVPFormData = z.infer<typeof rsvpSchema>;
