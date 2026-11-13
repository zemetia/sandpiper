import { MapPin } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { AboutHeroBlock as AboutHeroBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { AccentLines, Stamp } from '../story/primitives';

/** Polaroid placement on the 560 × 720 photo stack (desktop) — % of the stack. */
const POLAROIDS = [
  {
    frame: 'left-[2%] top-[3%] w-[72%] -rotate-5 [--wobble:-2deg]',
    photo: 'aspect-[344/290]',
  },
  {
    frame: 'left-[34%] top-[51%] w-[62%] rotate-6 [--wobble:3deg]',
    photo: 'aspect-[294/240]',
  },
];

export function AboutHeroBlock({
  block,
  isFirst,
}: {
  block: AboutHeroBlockData;
  isFirst: boolean;
}) {
  const Heading = isFirst ? 'h1' : 'h2';
  const polaroids = (block.polaroids ?? []).slice(0, 2);
  const tags = block.tags ?? [];

  return (
    <section className="bg-sunny overflow-hidden">
      <div className="container-wide flex flex-col gap-10 pt-8 pb-14 lg:grid lg:grid-cols-[696fr_560fr] lg:items-center lg:gap-14 lg:pt-[min(6.7vw,96px)] lg:pb-[min(7.8vw,112px)]">
        <div className="animate-[slide-in_0.6s_ease-out_both]">
          {block.eyebrow && (
            <p className="bg-ink font-ui text-paper inline-flex min-h-[30px] items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.1em] uppercase lg:min-h-9 lg:gap-2.5 lg:px-[18px] lg:text-sm">
              <MapPin aria-hidden="true" className="text-sunny size-3.5 shrink-0 lg:size-4" />
              {block.eyebrow}
            </p>
          )}
          {block.heading && (
            <Heading className="font-display text-ink mt-6 text-[min(16vw,72px)] leading-[0.92] font-extrabold tracking-[-0.03em] lg:mt-8 lg:text-[min(8.6vw,124px)] lg:tracking-[-0.024em]">
              <AccentLines text={block.heading} accentClassName="text-blue" />
            </Heading>
          )}
          {block.body && (
            <p className="text-ink mt-6 max-w-[580px] text-[17px] leading-[1.55] lg:mt-8 lg:text-[22px]">
              {block.body}
            </p>
          )}
          {tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2 lg:mt-8 lg:gap-3">
              {tags.map((t) => (
                <li
                  key={t}
                  className="border-ink font-ui text-ink rounded-full border-2 px-3.5 py-2 text-[11px] leading-none font-extrabold tracking-[0.086em] uppercase lg:px-[18px] lg:py-2.5 lg:text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {(polaroids.length > 0 || block.stamp?.value) && (
          <div className="relative mx-auto aspect-[560/720] w-full max-w-[440px] lg:max-w-[560px]">
            {polaroids.map((p, i) => (
              <figure
                key={p.id ?? i}
                className={cn(
                  'wobble bg-paper border-ink absolute flex flex-col gap-2 border-2 p-[3%] pb-[2%] shadow-[8px_10px_0_color-mix(in_oklab,var(--color-ink)_20%,transparent)] lg:gap-3',
                  POLAROIDS[i]?.frame,
                )}
              >
                <div className={cn('relative w-full overflow-hidden', POLAROIDS[i]?.photo)}>
                  <CmsImage
                    image={toImage(p.image, 'card')}
                    sizes="(min-width: 1024px) 350px, 70vw"
                    priority={isFirst && i === 0}
                  />
                </div>
                {p.caption && (
                  <figcaption className="font-script text-blue text-xl leading-tight font-bold lg:text-[28px]">
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            ))}
            <Stamp
              stamp={block.stamp}
              className="bg-blue top-[64%] left-[2%] w-[35%] -rotate-10"
              topClassName="text-sunny"
              valueClassName="text-paper"
            />
          </div>
        )}
      </div>
    </section>
  );
}

AboutHeroBlock.displayName = 'AboutHeroBlock';
