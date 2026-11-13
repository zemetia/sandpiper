'use client';

import { useMutation } from '@tanstack/react-query';
import { Check, Send } from 'lucide-react';
import { useState } from 'react';

import { copy } from '@/config/copy';
import { cn } from '@/lib/cn';
import { contactMessageSchema } from '@/lib/validations/contact';
import { contactService } from '@/services/contact.service';

export interface ContactMessageFormProps {
  topics: string[];
  submitLabel: string;
  note: string | null;
  success: { heading: string; body: string | null };
  ariaLabel?: string;
}

const t = copy.contactForm;
const label = 'font-ui text-ink text-xs font-extrabold tracking-[0.1em] uppercase';
const input =
  'bg-cream border-ink text-ink placeholder:text-slate h-14 w-full rounded-[14px] border-2 px-[18px] text-base transition-[border-color,box-shadow] outline-none hover:border-blue focus-visible:border-blue focus-visible:ring-blue/20 focus-visible:ring-4';

/** Contact page note. Native validation first, then Zod; the endpoint re-validates. */
export function ContactMessageForm({
  topics,
  submitLabel,
  note,
  success,
  ariaLabel,
}: ContactMessageFormProps) {
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({ mutationFn: contactService.send });

  if (mutation.isSuccess) {
    return (
      <div
        role="status"
        className="flex min-h-[360px] flex-col items-center justify-center text-center"
      >
        <span className="bg-sunny border-ink sticker-pop grid size-16 place-items-center rounded-full border-2">
          <Check aria-hidden="true" className="text-ink size-8" strokeWidth={3} />
        </span>
        <p className="font-display text-ink mt-5 text-3xl font-extrabold">{success.heading}</p>
        {success.body && <p className="text-slate mt-2 max-w-sm leading-relaxed">{success.body}</p>}
      </div>
    );
  }

  const message = invalid ? t.invalid : mutation.isError ? t.error : null;

  return (
    <form
      aria-label={ariaLabel}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(
          [...new FormData(e.currentTarget)].filter(([, v]) => typeof v === 'string' && v.trim()),
        );
        const parsed = contactMessageSchema.safeParse(data);
        setInvalid(!parsed.success);
        if (parsed.success) {
          mutation.mutate({ ...parsed.data, website: (data['website'] as string) ?? '' });
        }
      }}
      className="flex flex-col gap-5 lg:gap-7"
    >
      {topics.length > 0 && (
        <fieldset>
          <legend className={cn(label, 'mb-3')}>{t.topic}</legend>
          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {topics.map((topic, i) => (
              <label
                key={topic}
                className="border-ink text-ink has-checked:bg-ink has-checked:text-sunny has-focus-visible:ring-blue/30 hover:bg-sunny-soft flex h-10 cursor-pointer items-center rounded-full border-2 px-4 text-sm font-semibold transition-colors has-focus-visible:ring-4 lg:h-11 lg:px-[18px] lg:text-[15px]"
              >
                <input
                  type="radio"
                  name="topic"
                  value={topic}
                  defaultChecked={i === 0}
                  className="sr-only"
                />
                {topic}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="cm-name" className={label}>
            {t.name}
          </label>
          <input
            id="cm-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={input}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cm-email" className={label}>
            {t.email}
          </label>
          <input
            id="cm-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={input}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cm-phone" className={label}>
          {t.phone}
        </label>
        <input
          id="cm-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          placeholder={t.phonePlaceholder}
          className={input}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cm-message" className={label}>
          {t.message}
        </label>
        <textarea
          id="cm-message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder={t.messagePlaceholder}
          className={cn(input, 'h-[150px] resize-y py-4')}
        />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {message && (
        <p role="alert" className="text-destructive -mt-2 text-sm">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="group bg-blue text-paper hover:bg-blue-deep font-ui flex h-[58px] items-center justify-center gap-2.5 rounded-full px-[34px] text-[15px] font-extrabold tracking-[0.04em] uppercase transition-[background-color,translate] hover:-translate-y-0.5 active:translate-y-px disabled:opacity-60 lg:text-[17px]"
        >
          {mutation.isPending ? t.sending : submitLabel}
          <Send
            aria-hidden="true"
            className="text-sunny size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
        {note && (
          <p className="font-script text-blue text-center text-2xl font-bold lg:text-[26px]">
            {note}
          </p>
        )}
      </div>
    </form>
  );
}

ContactMessageForm.displayName = 'ContactMessageForm';
