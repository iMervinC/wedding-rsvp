'use server';

import { Resend } from 'resend';
import { rsvpSchema, type RSVPFormData } from '@/lib/validations';
import { buildCoupleEmail, buildGuestConfirmationEmail } from '@/lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);

const COUPLE_EMAIL = process.env.COUPLE_EMAIL ?? '';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';

export interface RSVPActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof RSVPFormData, string>>;
}

export async function submitRSVP(formData: RSVPFormData): Promise<RSVPActionResult> {
  // Validate
  const parsed = rsvpSchema.safeParse(formData);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof RSVPFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof RSVPFormData;
      if (key) fieldErrors[key] = issue.message;
    }
    return { success: false, fieldErrors, error: 'Validation failed' };
  }

  const data = parsed.data;

  // Honeypot check
  if (data.website && data.website.length > 0) {
    // Silently succeed to not reveal honeypot to bots
    return { success: true };
  }

  if (!COUPLE_EMAIL) {
    console.error('COUPLE_EMAIL env variable is not set');
    return { success: false, error: 'Server configuration error. Please contact us directly.' };
  }

  try {
    const coupleEmail = buildCoupleEmail(data);
    const guestEmail = buildGuestConfirmationEmail(data);

    // Send both emails in parallel
    const [coupleResult, guestResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: COUPLE_EMAIL,
        subject: coupleEmail.subject,
        html: coupleEmail.html,
        text: coupleEmail.text,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: guestEmail.subject,
        html: guestEmail.html,
        text: guestEmail.text,
      }),
    ]);

    if (coupleResult.status === 'rejected') {
      console.error('Failed to send RSVP notification to couple:', coupleResult.reason);
      return {
        success: false,
        error: 'We could not send your RSVP. Please try again or contact us directly.',
      };
    }

    if (guestResult.status === 'rejected') {
      // RSVP was recorded — just log the confirmation failure
      console.error('Failed to send confirmation to guest:', guestResult.reason);
    }

    return { success: true };
  } catch (err) {
    console.error('RSVP submission error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
