import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { GramWallBlock as GramWallBlockData } from '@/payload-types';
import { toImage, toLink } from '@/services/cms.mappers';
import { InstagramIcon } from '@/components/shared/Icons';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { pillVariants } from '../landing/primitives';

/** Fridge-door layout: polaroid centres on the 1440 × 731 artboard + clockwise tilt. */
const DESKTOP = [
  { x: 156, y: 205, r: 8 },
  { x: 456, y: 542, r: -6 },
  { x: 214, y: 544, r: -5 },
  { x: 1204, y: 160, r: -7 },
  { x: 949, y: 581, r: 6 },
  { x: 1262, y: 549, r: 4 },
];
/** Mobile: 2-up grid, still tilted. */
const MOBILE_TILT = [-4, 3, 4, -3, -3, 4];

const vw = (px: number) => `min(${(px / 14.4).toFixed(2)}vw, ${px}px)`;

export function GramWallBlock({ block }: { block: GramWallBlockData }) {
  const link = toLink(block.link);
  const photos = (block.photos ?? [])
    .map((p) => toImage(p, 'thumbnail'))
    .filter((p) => p !== null)
    .slice(0, 6);

  return (
    <section className="bg-cream relative overflow-hidden py-14 lg:min-h-[min(50.8vw,731px)] lg:py-0">
      <div className="container-wide relative flex flex-col items-center text-center lg:min-h-[min(50.8vw,731px)] lg:justify-center lg:pb-[min(9vw,130px)]">
        <h2 className="font-display text-ink text-[clamp(30px,9.2vw,38px)] leading-none font-extrabold tracking-[-0.037em] lg:text-[min(5.5vw,79px)]">
          {block.handle}
        </h2>
        {block.subline && (
          <p className="text-ink/80 mt-3 text-[15px] lg:mt-6 lg:text-xl">{block.subline}</p>
        )}
        {link && (
          <LinkTo
            link={link}
            className={cn(
              pillVariants({ variant: 'primary' }),
              'order-last mt-10 h-14 w-full gap-3 lg:order-none lg:mt-6 lg:h-16 lg:w-auto lg:px-[38px]',
            )}
          >
            <InstagramIcon className="size-5 lg:size-[22px]" />
            {link.label}
          </LinkTo>
        )}

        {photos.length > 0 && (
          <ul className="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-5 md:max-w-[720px] md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:contents">
            {photos.map((photo, i) => {
              const d = DESKTOP[i] ?? DESKTOP[0];
              if (!d) return null;
              return (
                <li
                  key={photo.url + i}
                  className="wobble relative rotate-[var(--rm)] lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-[min(16.6vw,239px)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rotate-[var(--rd)]"
                  style={
                    {
                      '--rm': `${MOBILE_TILT[i] ?? 0}deg`,
                      '--rd': `${d.r}deg`,
                      '--x': `${((d.x / 1440) * 100).toFixed(2)}%`,
                      '--y': vw(d.y),
                      '--wobble': `${d.r > 0 ? d.r - 3 : d.r + 3}deg`,
                    } as CSSProperties
                  }
                >
                  <figure className="bg-paper border-ink border-2 p-2.5 pb-8 lg:p-3.5 lg:pb-14">
                    <div className="relative aspect-[211/197] overflow-hidden">
                      <CmsImage image={photo} sizes="(min-width: 1024px) 211px, 45vw" />
                    </div>
                  </figure>
                  <span
                    aria-hidden="true"
                    className="bg-sunny/70 absolute -top-3 left-1/2 h-6 w-[38%] -translate-x-1/2 -rotate-3 lg:-top-4 lg:h-[37px]"
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

GramWallBlock.displayName = 'GramWallBlock';
