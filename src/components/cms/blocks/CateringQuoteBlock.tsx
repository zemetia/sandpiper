import { MapPin, Minus, Phone, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { copy } from '@/config/copy';

import type { CateringQuoteBlock as CateringQuoteBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { CateringQuoteForm } from '../catering/CateringQuoteForm';
import { Eyebrow } from '../landing/primitives';

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string | null | undefined;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="bg-sunny grid size-11 shrink-0 place-items-center rounded-full transition-transform group-hover:-rotate-12">
        <Icon aria-hidden="true" className="text-ink size-5" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        {label && <span className="text-slate text-[13px]">{label}</span>}
        <span className="font-display text-ink truncate text-xl leading-tight font-extrabold">
          {value}
        </span>
      </span>
    </>
  );
  const cls =
    'group bg-paper border-ink flex h-[76px] items-center gap-3.5 rounded-2xl border-2 px-[18px]';
  return href ? (
    <a href={href} className={`${cls} ct-lift`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export async function CateringQuoteBlock({ block }: { block: CateringQuoteBlockData }) {
  const settings = await cmsService.getSiteSettings();
  const phone = block.phone || settings.phone;
  const address = block.pickupAddress || settings.address?.split('\n')[0] || null;
  const faqs = block.faqs ?? [];
  const lines = (block.heading ?? '').split('\n').filter(Boolean);

  return (
    <section className="bg-cream py-12 lg:py-24">
      <div className="container-wide flex flex-col gap-[22px] lg:grid lg:grid-cols-[624fr_640fr] lg:grid-rows-[auto_auto_1fr] lg:gap-x-16 lg:gap-y-7">
        <div className="ct-reveal lg:col-start-1 lg:row-start-1">
          {block.eyebrow && (
            <Eyebrow className="text-[13px] tracking-[0.15em] lg:text-sm lg:tracking-[0.14em]">
              {block.eyebrow}
            </Eyebrow>
          )}
          {lines.length > 0 && (
            <h2 className="font-display text-ink mt-6 text-[42px] leading-[0.95] font-extrabold tracking-[-0.045em] uppercase lg:mt-7 lg:text-[min(5vw,72px)] lg:tracking-[-0.036em]">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          )}
          {block.body && (
            <p className="text-ink mt-[22px] text-base leading-[1.55] lg:mt-7 lg:text-lg">
              {block.body}
            </p>
          )}
        </div>

        {(phone || address) && (
          <div className="ct-reveal grid grid-cols-2 gap-3 max-lg:hidden lg:col-start-1 lg:row-start-2">
            {phone && (
              <ContactCard icon={Phone} label={block.callLabel} value={phone} href={tel(phone)} />
            )}
            {address && (
              <ContactCard
                icon={MapPin}
                label={block.pickupLabel}
                value={address}
                href={settings.mapUrl ?? undefined}
              />
            )}
          </div>
        )}

        <div className="ct-reveal bg-paper border-ink relative rounded-[24px] border-[2.5px] p-5 shadow-[6px_6px_0_var(--color-ink)] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-start lg:rounded-[28px] lg:p-9 lg:shadow-[8px_8px_0_var(--color-ink)]">
          <CateringQuoteForm
            title={block.formTitle ?? null}
            occasions={block.occasions ?? []}
            submitLabel={block.submitLabel || copy.catering.send}
            finePrint={block.finePrint ?? null}
            success={{
              heading: block.successHeading || copy.catering.thanks,
              body: block.successBody ?? null,
            }}
            labels={{
              name: copy.catering.form.name,
              email: copy.catering.form.email,
              phone: copy.catering.form.phone,
              date: copy.catering.form.date,
              headcount: copy.catering.form.headcount,
              budget: copy.catering.form.budget,
              occasion: copy.catering.form.occasion,
              fulfillment: copy.catering.form.fulfillment,
              pickup: copy.catering.form.pickup,
              delivery: copy.catering.form.delivery,
              notes: copy.catering.form.notes,
              namePlaceholder: copy.catering.form.namePlaceholder,
              emailPlaceholder: copy.catering.form.emailPlaceholder,
              phonePlaceholder: copy.catering.form.phonePlaceholder,
              headcountPlaceholder: copy.catering.form.headcountPlaceholder,
              budgetPlaceholder: copy.catering.form.budgetPlaceholder,
              notesPlaceholder: copy.catering.form.notesPlaceholder,
              sending: copy.catering.form.sending,
              invalid: copy.catering.form.invalid,
              error: copy.catering.form.error,
            }}
          />
        </div>

        {phone && (
          <a
            href={tel(phone)}
            className="group bg-sunny border-ink flex h-16 items-center justify-between gap-3 rounded-full border-2 pr-2.5 pl-5 lg:hidden"
          >
            <span className="font-display text-ink text-base font-extrabold">
              {block.callPrompt ? `${block.callPrompt} ` : ''}
              {phone}
            </span>
            <span className="bg-ink grid size-11 place-items-center rounded-full transition-transform group-active:scale-95">
              <Phone aria-hidden="true" className="text-sunny size-5" />
            </span>
          </a>
        )}

        {faqs.length > 0 && (
          <div className="ct-reveal lg:col-start-1 lg:row-start-3 lg:pt-3">
            {block.faqHeading && (
              <h3 className="font-display text-ink text-[22px] font-extrabold lg:text-[26px]">
                {block.faqHeading}
              </h3>
            )}
            <div className="divide-ink/15 border-ink/15 mt-1 divide-y border-b">
              {faqs.map((f, i) => (
                <details key={f.id ?? f.question} open={i === 0} className="group py-[18px]">
                  <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold lg:text-base [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <Plus
                      aria-hidden="true"
                      className="text-blue size-5 shrink-0 group-open:hidden"
                    />
                    <Minus
                      aria-hidden="true"
                      className="text-blue hidden size-5 shrink-0 group-open:block"
                    />
                  </summary>
                  {f.answer && (
                    <p className="text-slate mt-1.5 animate-[slide-in_0.3s_ease-out] text-sm leading-normal lg:text-[15px]">
                      {f.answer}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

CateringQuoteBlock.displayName = 'CateringQuoteBlock';
