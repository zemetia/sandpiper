'use client';

import { useMutation } from '@tanstack/react-query';
import { Calendar, Check, Mail, Phone, Send, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { cateringRequestSchema } from '@/lib/validations/catering';
import { cateringService } from '@/services/catering.service';

export interface CateringQuoteFormLabels {
  name: string;
  email: string;
  phone: string;
  date: string;
  headcount: string;
  budget: string;
  occasion: string;
  fulfillment: string;
  pickup: string;
  delivery: string;
  notes: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  headcountPlaceholder: string;
  budgetPlaceholder: string;
  notesPlaceholder: string;
  sending: string;
  invalid: string;
  error: string;
}

export interface CateringQuoteFormProps {
  title: string | null;
  occasions: string[];
  submitLabel: string;
  finePrint: string | null;
  success: { heading: string; body: string | null };
  labels: CateringQuoteFormLabels;
}

const label = 'font-ui text-ink text-xs font-extrabold tracking-[0.1em] uppercase';
const input =
  'bg-cream border-ink/25 text-ink placeholder:text-slate h-[52px] w-full rounded-[14px] border-2 px-4 text-[15px] transition-colors outline-none hover:border-ink/50 focus-visible:border-blue focus-visible:ring-blue/20 focus-visible:ring-4';

function Field({
  id,
  text,
  icon: Icon,
  iconMobileOnly,
  className,
  children,
}: {
  id: string;
  text: string;
  icon?: LucideIcon;
  iconMobileOnly?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className={cn(
              'text-slate pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2',
              iconMobileOnly && 'lg:hidden',
            )}
          />
        )}
        {children}
      </div>
    </div>
  );
}

/** Quote request card. Native validation first, then Zod; the endpoint re-validates. */
export function CateringQuoteForm({
  title,
  occasions,
  submitLabel,
  finePrint,
  success,
  labels,
}: CateringQuoteFormProps) {
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({ mutationFn: cateringService.requestQuote });

  if (mutation.isSuccess) {
    return (
      <div
        role="status"
        className="flex min-h-[320px] flex-col items-center justify-center text-center"
      >
        <span className="bg-sunny border-ink sticker-pop grid size-16 place-items-center rounded-full border-2">
          <Check aria-hidden="true" className="text-ink size-8" strokeWidth={3} />
        </span>
        <p className="font-display text-ink mt-5 text-3xl font-extrabold">{success.heading}</p>
        {success.body && <p className="text-slate mt-2 max-w-sm leading-relaxed">{success.body}</p>}
      </div>
    );
  }

  const message = invalid ? labels.invalid : mutation.isError ? labels.error : null;
  const padIcon = 'pl-11';

  return (
    <form
      aria-label={title ?? undefined}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(
          [...new FormData(e.currentTarget)].filter(([, v]) => typeof v === 'string' && v.trim()),
        );
        const parsed = cateringRequestSchema.safeParse(data);
        setInvalid(!parsed.success);
        if (parsed.success) {
          mutation.mutate({ ...parsed.data, website: (data['website'] as string) ?? '' });
        }
      }}
      className="flex flex-col gap-4 lg:gap-5"
    >
      {title && (
        <h3 className="font-display text-ink text-[30px] leading-tight font-extrabold max-lg:hidden">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-5">
        <Field id="cq-name" text={labels.name} className="col-span-2 lg:col-span-1">
          <input
            id="cq-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            className={input}
          />
        </Field>
        <Field
          id="cq-email"
          text={labels.email}
          icon={Mail}
          iconMobileOnly
          className="col-span-2 lg:col-span-1"
        >
          <input
            id="cq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            className={cn(input, padIcon, 'lg:pl-4')}
          />
        </Field>
        <Field
          id="cq-phone"
          text={labels.phone}
          icon={Phone}
          iconMobileOnly
          className="col-span-2 lg:col-span-1"
        >
          <input
            id="cq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={labels.phonePlaceholder}
            className={cn(input, padIcon, 'lg:pl-4')}
          />
        </Field>
        <Field id="cq-date" text={labels.date} icon={Calendar}>
          <input id="cq-date" name="eventDate" type="date" className={cn(input, padIcon, 'pr-2')} />
        </Field>
        <Field id="cq-headcount" text={labels.headcount} icon={Users}>
          <input
            id="cq-headcount"
            name="headcount"
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            placeholder={labels.headcountPlaceholder}
            className={cn(input, padIcon)}
          />
        </Field>
        <Field id="cq-budget" text={labels.budget} className="col-span-2 lg:col-span-1">
          <input
            id="cq-budget"
            name="budget"
            maxLength={60}
            placeholder={labels.budgetPlaceholder}
            className={input}
          />
        </Field>
      </div>

      {occasions.length > 0 && (
        <fieldset className="flex flex-col gap-2.5">
          <legend className={cn(label, 'mb-2.5')}>{labels.occasion}</legend>
          <div className="flex flex-wrap gap-2">
            {occasions.map((o, i) => (
              <label
                key={o}
                className="group border-ink/25 text-ink has-checked:bg-sunny has-checked:border-ink has-focus-visible:ring-blue/30 hover:border-ink/60 flex h-10 cursor-pointer items-center gap-1.5 rounded-full border-2 px-4 text-sm transition-colors has-checked:font-semibold has-focus-visible:ring-4"
              >
                <input
                  type="radio"
                  name="occasion"
                  value={o}
                  defaultChecked={i === 0}
                  className="sr-only"
                />
                <Check
                  aria-hidden="true"
                  className="hidden size-[15px] group-has-checked:block"
                  strokeWidth={3}
                />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className={cn(label, 'mb-2.5')}>{labels.fulfillment}</legend>
        <div className="border-ink grid h-12 grid-cols-2 rounded-full border-2 p-1">
          {(['pickup', 'delivery'] as const).map((v) => (
            <label
              key={v}
              className="font-ui text-ink has-checked:bg-ink has-checked:text-sunny has-focus-visible:ring-blue/40 grid cursor-pointer place-items-center rounded-full text-sm font-extrabold transition-colors has-focus-visible:ring-4"
            >
              <input
                type="radio"
                name="fulfillment"
                value={v}
                defaultChecked={v === 'pickup'}
                className="sr-only"
              />
              {labels[v]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="cq-notes" className={label}>
          {labels.notes}
        </label>
        <textarea
          id="cq-notes"
          name="notes"
          rows={3}
          maxLength={2000}
          placeholder={labels.notesPlaceholder}
          className={cn(input, 'h-[92px] resize-y py-3.5 lg:h-[100px]')}
        />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="group bg-blue text-paper hover:bg-blue-deep font-ui flex h-[54px] items-center justify-center gap-2.5 rounded-full text-sm font-extrabold tracking-[0.04em] uppercase transition-[background-color,translate] hover:-translate-y-0.5 active:translate-y-px disabled:opacity-60 lg:h-[58px] lg:text-[15px]"
      >
        {mutation.isPending ? labels.sending : submitLabel}
        <Send
          aria-hidden="true"
          className="text-sunny size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>

      {message && (
        <p role="alert" className="text-destructive -mt-1 text-sm">
          {message}
        </p>
      )}
      {finePrint && <p className="text-slate text-xs lg:text-[13px]">{finePrint}</p>}
    </form>
  );
}

CateringQuoteForm.displayName = 'CateringQuoteForm';
