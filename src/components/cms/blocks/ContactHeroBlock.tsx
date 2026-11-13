import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { ContactHeroBlock as ContactHeroBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';
import { toImage, toLinks } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { pillVariants } from '../landing/primitives';
import { AccentLines, Stamp } from '../story/primitives';

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const pill =
  'h-14 w-full gap-2.5 px-8 text-[15px] hover:-translate-y-0.5 sm:w-auto lg:h-[58px] lg:text-[17px]';

export async function ContactHeroBlock({
  block,
  isFirst,
}: {
  block: ContactHeroBlockData;
  isFirst: boolean;
}) {
  const Heading = isFirst ? 'h1' : 'h2';
  const settings = await cmsService.getSiteSettings();
  const phone = block.showCall ? settings.phone : null;
  const links = toLinks(block.links);
  const photo = toImage(block.photo, 'card');
  const hours = block.hours;
  const rows = hours?.rows ?? [];

  return (
    <section className="bg-sunny overflow-hidden">
      <div className="container-wide flex flex-col gap-12 pt-8 pb-14 lg:grid lg:grid-cols-[1fr_560px] lg:items-center lg:gap-14 lg:pt-[min(6.7vw,96px)] lg:pb-[min(7.2vw,104px)]">
        <div className="animate-[slide-in_0.6s_ease-out_both]">
          {block.eyebrow && (
            <p className="bg-ink font-ui text-paper inline-flex min-h-[30px] items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.1em] uppercase lg:min-h-9 lg:gap-2.5 lg:px-[18px] lg:text-sm">
              <MessageCircle
                aria-hidden="true"
                className="text-sunny size-3.5 shrink-0 lg:size-4"
              />
              {block.eyebrow}
            </p>
          )}
          {block.heading && (
            <Heading className="font-display text-ink mt-6 text-[min(18vw,80px)] leading-[0.92] font-extrabold tracking-[-0.03em] lg:mt-8 lg:text-[min(8.6vw,124px)] lg:tracking-[-0.024em]">
              <AccentLines text={block.heading} accentClassName="text-blue" />
            </Heading>
          )}
          {block.body && (
            <p className="text-ink mt-6 max-w-[580px] text-[17px] leading-[1.55] lg:mt-8 lg:text-[22px]">
              {block.body}
            </p>
          )}
          {(phone || links.length > 0) && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-8">
              {phone && (
                <a href={tel(phone)} className={cn(pillVariants(), 'group', pill)}>
                  <Phone
                    aria-hidden="true"
                    className="text-sunny size-[18px] transition-transform group-hover:-rotate-12"
                  />
                  {phone}
                </a>
              )}
              {links.map((l) => (
                <LinkTo
                  key={l.href + l.label}
                  link={l}
                  className={cn(pillVariants({ variant: 'outline' }), 'group', pill)}
                >
                  {l.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </LinkTo>
              ))}
            </div>
          )}
        </div>

        {(hours?.value || photo) && (
          <div className="relative mx-auto aspect-[560/600] w-full max-w-[440px] lg:max-w-[560px]">
            {hours?.value && (
              <div className="wobble bg-paper border-ink absolute top-[3%] left-[7%] flex w-[80%] -rotate-3 flex-col gap-2.5 rounded-[20px] border-2 p-5 shadow-[8px_10px_0_var(--color-ink)] [--wobble:-1deg] lg:gap-[18px] lg:p-8">
                {hours.eyebrow && (
                  <p className="font-ui text-berry text-[10px] font-extrabold tracking-[0.15em] uppercase lg:text-[13px]">
                    {hours.eyebrow}
                  </p>
                )}
                <p className="font-display text-ink text-[38px] leading-none font-extrabold tracking-[-0.02em] lg:text-[64px]">
                  {hours.value}
                </p>
                {rows.length > 0 && (
                  <dl>
                    {rows.map((r) => (
                      <div
                        key={r.id ?? r.label}
                        className="border-ink/15 flex justify-between gap-4 border-t py-2 text-[13px] lg:py-3 lg:text-base"
                      >
                        <dt className="text-ink">{r.label}</dt>
                        <dd className="text-blue font-semibold">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
            {photo && (
              <figure className="wobble bg-paper border-ink absolute top-[57%] left-[45%] flex w-[50%] rotate-6 flex-col gap-1.5 border-2 p-2.5 pb-1.5 shadow-[8px_10px_0_color-mix(in_oklab,var(--color-ink)_20%,transparent)] [--wobble:2deg] lg:gap-2.5 lg:p-3.5 lg:pb-2.5">
                <div className="relative aspect-[252/190] overflow-hidden">
                  <CmsImage image={photo} sizes="(min-width: 1024px) 260px, 50vw" />
                </div>
                {block.caption && (
                  <figcaption className="font-script text-blue truncate text-lg font-bold lg:text-[26px]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )}
            <Stamp
              stamp={block.stamp}
              className="bg-blue top-[62%] left-0 w-[30%] -rotate-10"
              topClassName="text-sunny"
              valueClassName="text-paper"
            />
          </div>
        )}
      </div>
    </section>
  );
}

ContactHeroBlock.displayName = 'ContactHeroBlock';
