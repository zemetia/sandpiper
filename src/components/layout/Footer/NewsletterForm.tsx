'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/lib/cn';
import { emailSchema } from '@/lib/validations';
import { newsletterService } from '@/services';

export interface NewsletterFormProps {
  placeholder: string;
  buttonLabel: string;
  labels: { email: string; thanks: string; invalid: string; error: string };
  className?: string;
}

export function NewsletterForm({
  placeholder,
  buttonLabel,
  labels,
  className,
}: NewsletterFormProps) {
  const locale = useLocale();
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({
    mutationFn: (email: string) => newsletterService.subscribe(email, locale),
  });

  if (mutation.isSuccess) {
    return (
      <p role="status" className={cn('text-sunny font-display text-lg font-extrabold', className)}>
        {labels.thanks}
      </p>
    );
  }

  const message = invalid ? labels.invalid : mutation.isError ? labels.error : null;

  return (
    <form
      noValidate
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get('email');
        const parsed = emailSchema.safeParse(email);
        setInvalid(!parsed.success);
        if (parsed.success) mutation.mutate(parsed.data);
      }}
    >
      <div className="bg-paper flex h-14 items-center rounded-full p-1.5 pl-5">
        <label htmlFor="newsletter-email" className="sr-only">
          {labels.email}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? 'newsletter-message' : undefined}
          className="text-ink placeholder:text-slate min-w-0 flex-1 bg-transparent text-[15px] outline-none"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-sunny text-ink hover:bg-warning-hover h-full shrink-0 rounded-full px-5 text-sm font-semibold tracking-[0.1em] uppercase transition-colors disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      </div>
      {message && (
        <p id="newsletter-message" role="alert" className="text-sunny-soft mt-2 pl-5 text-sm">
          {message}
        </p>
      )}
    </form>
  );
}

NewsletterForm.displayName = 'NewsletterForm';
