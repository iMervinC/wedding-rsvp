'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { rsvpSchema, type RSVPFormData } from '@/lib/validations';
import { submitRSVP } from '@/actions/rsvp';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-red-500 font-sans flex items-center gap-1">
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-sans text-sm font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-blush-500 ml-1" aria-label="required">*</span>}
    </label>
  );
}

export default function RSVPForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: undefined,
      guestCount: 1,
    },
  });

  const attending = watch('attending');
  const messageValue = watch('message') ?? '';

  const onSubmit = async (data: RSVPFormData) => {
    setServerError(null);
    const result = await submitRSVP(data);
    if (result.success) {
      router.push(
        `/confirmation?name=${encodeURIComponent(data.fullName.split(' ')[0])}&attending=${data.attending}`
      );
    } else {
      setServerError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Wedding RSVP form">
      {/* Honeypot field — hidden from real users */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="website">Leave this blank</label>
        <input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register('website')}
        />
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" required>Full Name</Label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={`input-field ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" required>Email Address</Label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            className={`input-field ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Attending */}
        <fieldset>
          <legend className="font-sans text-sm font-semibold text-gray-700 mb-3">
            Will you attend?
            <span className="text-blush-500 ml-1" aria-label="required">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'yes', label: 'Joyfully accept', emoji: '🎉' },
              { value: 'no', label: 'Regretfully decline', emoji: '😢' },
            ].map(({ value, label, emoji }) => (
              <label
                key={value}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  attending === value
                    ? 'border-blush-400 bg-blush-50 shadow-md'
                    : 'border-blush-100 bg-white/60 hover:border-blush-200'
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  className="sr-only"
                  aria-label={label}
                  {...register('attending')}
                />
                <span className="text-2xl">{emoji}</span>
                <span className="font-sans text-sm font-semibold text-gray-700 text-center leading-tight">
                  {label}
                </span>
              </label>
            ))}
          </div>
          <FieldError message={errors.attending?.message} />
        </fieldset>

        {/* Conditional fields — shown only when attending */}
        {attending === 'yes' && (
          <div className="space-y-6 animate-fade-up">
            {/* Guest count */}
            <div>
              <Label htmlFor="guestCount" required>Number of Guests (including yourself)</Label>
              <input
                id="guestCount"
                type="number"
                min="1"
                max="10"
                className={`input-field ${errors.guestCount ? 'border-red-400' : ''}`}
                aria-invalid={!!errors.guestCount}
                {...register('guestCount')}
              />
              <FieldError message={errors.guestCount?.message} />
            </div>

            {/* Meal preference */}
            <fieldset>
              <legend className="font-sans text-sm font-semibold text-gray-700 mb-3">
                Meal Preference
                <span className="text-blush-500 ml-1" aria-label="required">*</span>
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'chicken', label: 'Chicken', emoji: '🍗' },
                  { value: 'fish', label: 'Fish', emoji: '🐟' },
                  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥦' },
                ].map(({ value, label, emoji }) => {
                  const currentMeal = watch('mealPreference');
                  return (
                    <label
                      key={value}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        currentMeal === value
                          ? 'border-blush-400 bg-blush-50 shadow-md'
                          : 'border-blush-100 bg-white/60 hover:border-blush-200'
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        className="sr-only"
                        aria-label={label}
                        {...register('mealPreference')}
                      />
                      <span className="text-xl">{emoji}</span>
                      <span className="font-sans text-xs font-semibold text-gray-600">{label}</span>
                    </label>
                  );
                })}
              </div>
              <FieldError message={errors.mealPreference?.message} />
            </fieldset>
          </div>
        )}

        {/* Message to the couple */}
        <div>
          <Label htmlFor="message">Message to the Couple</Label>
          <div className="relative">
            <textarea
              id="message"
              rows={4}
              placeholder="Share your wishes, a favourite memory, or just say hello..."
              className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
              aria-invalid={!!errors.message}
              {...register('message')}
            />
            <span className="absolute bottom-3 right-3 font-sans text-xs text-gray-400 pointer-events-none">
              {messageValue.length}/500
            </span>
          </div>
          <FieldError message={errors.message?.message} />
        </div>

        {/* Song request */}
        <div>
          <Label htmlFor="songRequest">Song Request <span className="font-normal text-gray-400">(optional)</span></Label>
          <input
            id="songRequest"
            type="text"
            placeholder="e.g. Perfect — Ed Sheeran"
            className="input-field"
            {...register('songRequest')}
          />
          <p className="mt-1.5 font-sans text-xs text-gray-400">
            We will do our best to get the DJ to play your request!
          </p>
          <FieldError message={errors.songRequest?.message} />
        </div>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 rounded-xl p-4 font-sans text-sm text-red-700 flex items-start gap-3"
          >
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {serverError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending your RSVP...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Send My RSVP
            </>
          )}
        </button>

        <p className="text-center font-sans text-xs text-gray-400">
          Fields marked with <span className="text-blush-500">*</span> are required.
          Your information will only be used to plan the wedding.
        </p>
      </div>
    </form>
  );
}
