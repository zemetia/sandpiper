import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { MuralStoryBlock as MuralStoryBlockData } from '@/payload-types';
import { toImage, toLink } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';

/** Magnifier spots on the desktop band (% of width, px from the band top on the 1440 artboard). */
const SPOTS = [
  { left: '11.7%', top: 'min(2.9vw,42px)', caption: 'lg:left-[4%] lg:top-full lg:mt-1' },
  { left: '54.7%', top: 'min(4.9vw,70px)', caption: 'lg:left-[4%] lg:top-full lg:mt-6' },
  { left: '80%', top: 'min(1.9vw,28px)', caption: 'lg:left-[4%] lg:top-full lg:mt-3' },
];

export function MuralStoryBlock({ block }: { block: MuralStoryBlockData }) {
  const mural = toImage(block.image, 'hero');
  const link = toLink(block.link);
  const callouts = (block.callouts ?? []).slice(0, 3).map((c) => ({
    image: toImage(c.image, 'thumbnail'),
    caption: c.caption,
  }));

  return (
    <section className="bg-cream relative overflow-hidden">
      <div className="container-wide pt-14 pb-8 lg:flex lg:h-[min(11.7vw,169px)] lg:items-center lg:gap-[min(5vw,72px)] lg:py-0">
        <h2 className="font-display text-[clamp(36px,11.2vw,46px)] leading-none tracking-[-0.035em] lg:flex lg:gap-[min(5vw,72px)] lg:text-[min(5.07vw,73px)] lg:tracking-[-0.038em]">
          <span className="text-ink block font-extrabold">{block.headingBold}</span>{' '}
          {block.headingLight && (
            <span className="text-blue block font-light">{block.headingLight}</span>
          )}
        </h2>
      </div>

      <div className="border-ink relative border-y-2">
        <div className="relative h-[250px] lg:h-[min(29.3vw,422px)]">
          {mural && <CmsImage image={mural} sizes="100vw" />}
          <div aria-hidden="true" className="bg-cream/50 absolute inset-0 max-lg:hidden" />
        </div>

        {callouts.length > 0 && (
          <ul className="container-wide grid grid-cols-3 gap-3 py-6 lg:pointer-events-none lg:absolute lg:inset-0 lg:block lg:max-w-none lg:p-0">
            {callouts.map((c, i) => {
              const spot = SPOTS[i] ?? SPOTS[0];
              return (
                <li
                  key={c.caption ?? i}
                  className="flex flex-col items-center text-center lg:absolute lg:top-[var(--t)] lg:left-[var(--l)] lg:block lg:w-[min(14.65vw,211px)] lg:text-left"
                  style={{ '--l': spot?.left, '--t': spot?.top } as CSSProperties}
                >
                  <div className="border-ink bg-paper sticker-pop relative aspect-square w-full max-w-[110px] overflow-hidden rounded-full border-[5px] lg:max-w-none lg:border-[7px]">
                    {c.image && (
                      <CmsImage image={c.image} sizes="(min-width: 1024px) 211px, 30vw" />
                    )}
                  </div>
                  {c.caption && (
                    <p
                      className={cn(
                        'font-script text-blue mt-2 text-[19px] leading-tight font-normal lg:absolute lg:mt-0 lg:text-[31px] lg:font-bold lg:whitespace-nowrap',
                        spot?.caption,
                      )}
                    >
                      {c.caption}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {(block.body || link) && (
        <div className="container-wide pb-14 lg:pb-[min(6.4vw,92px)]">
          <div className="bg-sunny border-ink relative rounded-[24px] border-2 p-[22px] lg:-mt-[min(4vw,58px)] lg:ml-[min(27.4vw,395px)] lg:w-[min(41vw,592px)] lg:px-[34px] lg:py-[32px]">
            {block.body && (
              <p className="text-ink text-base leading-[1.6] lg:text-lg lg:leading-[1.55]">
                {block.body}
              </p>
            )}
            {link && (
              <LinkTo
                link={link}
                className="text-blue mt-4 inline-block text-[15px] font-bold underline-offset-4 hover:underline lg:text-[17px]"
              >
                {link.label}
              </LinkTo>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

MuralStoryBlock.displayName = 'MuralStoryBlock';
