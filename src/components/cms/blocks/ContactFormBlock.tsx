import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { copy } from '@/config/copy';
import type { ContactFormBlock as ContactFormBlockData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';

import { LinkTo } from '../LinkTo';
import { ContactMessageForm } from '../contact/ContactMessageForm';
import { AccentLines, StoryEyebrow, StoryIcon, headingText } from '../story/primitives';

type Detail = NonNullable<ContactFormBlockData['details']>[number];

function DetailRow({ detail }: { detail: Detail }) {
  const body = (
    <>
      <span className="bg-sunny border-ink grid size-12 shrink-0 place-items-center rounded-full border-2 transition-transform duration-300 group-hover:-rotate-12 lg:size-[52px]">
        <StoryIcon name={detail.icon} className="text-ink size-5 lg:size-[22px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {detail.label && (
          <span className="font-ui text-slate text-[10px] font-extrabold tracking-[0.15em] uppercase lg:text-[11px]">
            {detail.label}
          </span>
        )}
        <span className="font-display text-ink truncate text-xl leading-tight font-extrabold lg:text-2xl">
          {detail.value}
        </span>
        {detail.description && (
          <span className="text-slate text-[13px] lg:text-sm">{detail.description}</span>
        )}
      </span>
      {detail.url && (
        <ArrowUpRight
          aria-hidden="true"
          className="text-blue size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  const cls =
    'group border-ink/15 flex items-center gap-4 border-b py-5 lg:gap-[18px] lg:py-[22px]';
  if (!detail.url) return <li className={cls}>{body}</li>;
  const external = detail.url.startsWith('http');
  return (
    <li>
      <a
        href={detail.url}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {body}
      </a>
    </li>
  );
}

export function ContactFormBlock({ block }: { block: ContactFormBlockData }) {
  const details = block.details ?? [];
  const callout = block.callout;
  const calloutLink = toLink(callout?.link);

  return (
    <section className="bg-cream py-14 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_minmax(0,440px)] lg:items-start lg:gap-[72px]">
        <div className="ct-reveal bg-paper border-ink rounded-3xl border-2 p-5 shadow-[6px_6px_0_var(--color-ink)] sm:p-8 lg:p-12 lg:shadow-[8px_8px_0_var(--color-ink)]">
          {block.eyebrow && <StoryEyebrow className="text-berry">{block.eyebrow}</StoryEyebrow>}
          {block.heading && (
            <h2 className="font-display text-ink mt-4 mb-7 text-[36px] leading-[1.02] font-extrabold tracking-[-0.02em] lg:mt-7 lg:text-[min(3.9vw,56px)] lg:tracking-[-0.021em]">
              <AccentLines text={block.heading} accentClassName="text-blue font-light" />
            </h2>
          )}
          <ContactMessageForm
            ariaLabel={headingText(block.heading) ?? undefined}
            topics={block.topics ?? []}
            submitLabel={block.submitLabel || copy.contactForm.send}
            note={block.note ?? null}
            success={{
              heading: block.successHeading || copy.contactForm.thanks,
              body: block.successBody ?? null,
            }}
          />
        </div>

        {(details.length > 0 || callout?.text) && (
          <div className="ct-reveal lg:pt-1">
            {block.detailsHeading && (
              <StoryEyebrow className="text-blue">{block.detailsHeading}</StoryEyebrow>
            )}
            {details.length > 0 && (
              <ul className="mt-2 lg:mt-3">
                {details.map((d) => (
                  <DetailRow key={d.id ?? d.value} detail={d} />
                ))}
              </ul>
            )}
            {callout?.text && (
              <div className="bg-ink mt-8 flex flex-col gap-2.5 rounded-[20px] p-6 lg:p-7">
                {callout.eyebrow && (
                  <p className="font-ui text-sunny text-xs font-extrabold tracking-[0.15em] uppercase">
                    {callout.eyebrow}
                  </p>
                )}
                <p className="font-display text-paper text-[22px] leading-[1.15] font-extrabold lg:text-2xl">
                  {callout.text}
                </p>
                {calloutLink && (
                  <LinkTo
                    link={calloutLink}
                    className="group font-ui text-sunny mt-1.5 inline-flex items-center gap-2 self-start text-[13px] font-extrabold tracking-[0.08em] uppercase hover:underline hover:underline-offset-4"
                  >
                    {calloutLink.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </LinkTo>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

ContactFormBlock.displayName = 'ContactFormBlock';
