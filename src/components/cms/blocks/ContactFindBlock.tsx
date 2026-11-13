import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { ContactFindBlock as ContactFindBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';
import { toImage, toLink } from '@/services/cms.mappers';
import type { LinkVO } from '@/types/value-objects';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { pillVariants } from '../landing/primitives';
import { AccentLines, Stamp, StoryEyebrow, StoryIcon } from '../story/primitives';

const photo = 'wobble border-ink absolute overflow-hidden border-2';

export async function ContactFindBlock({ block }: { block: ContactFindBlockData }) {
  const facts = block.facts ?? [];
  const main = toImage(block.mainPhoto, 'card');
  const side = toImage(block.sidePhoto, 'card');

  let cta: LinkVO | null = null;
  if (block.useMapUrl) {
    const { mapUrl } = await cmsService.getSiteSettings();
    if (mapUrl && block.link?.label) {
      cta = { href: mapUrl, label: block.link.label, newTab: true, appearance: 'primary' };
    }
  } else {
    cta = toLink(block.link);
  }

  return (
    <section className="bg-blue overflow-hidden py-16 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_620px] lg:items-center lg:gap-[72px]">
        <div className="ct-reveal">
          {block.eyebrow && <StoryEyebrow className="text-sunny">{block.eyebrow}</StoryEyebrow>}
          {block.heading && (
            <h2 className="font-display text-paper mt-5 text-[44px] leading-[1.02] font-extrabold tracking-[-0.02em] lg:mt-7 lg:text-[min(4.44vw,64px)] lg:tracking-[-0.019em]">
              <AccentLines text={block.heading} accentClassName="text-sunny font-light" />
            </h2>
          )}
          {block.body && (
            <p className="text-paper mt-5 text-base leading-[1.6] lg:mt-7 lg:text-[19px]">
              {block.body}
            </p>
          )}
          {facts.length > 0 && (
            <ul className="mt-7">
              {facts.map((f) => (
                <li
                  key={f.id ?? f.title}
                  className="border-paper/25 flex items-center gap-4 border-t py-4 lg:gap-5 lg:py-[18px]"
                >
                  <StoryIcon name={f.icon} className="text-sunny size-6 shrink-0 lg:size-[26px]" />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-paper text-xl leading-tight font-extrabold lg:text-2xl">
                      {f.title}
                    </span>
                    {f.detail && (
                      <span className="text-paper/80 text-sm lg:text-[15px]">{f.detail}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <LinkTo
              link={cta}
              className={cn(
                pillVariants({ variant: 'sunny' }),
                'group mt-7 h-14 w-full gap-2.5 px-8 text-[15px] hover:-translate-y-0.5 sm:w-auto lg:h-[58px] lg:text-[17px]',
              )}
            >
              {cta.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LinkTo>
          )}
        </div>

        {(main || side) && (
          <div className="relative mx-auto aspect-[620/600] w-full max-w-[460px] lg:max-w-[620px]">
            {main && (
              <div
                className={`${photo} top-0 left-0 aspect-[420/440] w-[67.7%] rounded-3xl [--wobble:-2deg]`}
              >
                <CmsImage image={main} sizes="(min-width: 1024px) 420px, 68vw" />
              </div>
            )}
            {side && (
              <div
                className={`${photo} top-[41.7%] left-[54.8%] aspect-[260/320] w-[41.9%] rotate-4 rounded-[20px] [--wobble:-1deg]`}
              >
                <CmsImage image={side} sizes="(min-width: 1024px) 260px, 42vw" />
              </div>
            )}
            <Stamp
              stamp={block.stamp}
              className="bg-sunny top-[68%] left-[6.5%] w-[27.4%] rotate-8"
              topClassName="text-ink"
              valueClassName="text-blue"
            />
          </div>
        )}
      </div>
    </section>
  );
}

ContactFindBlock.displayName = 'ContactFindBlock';
