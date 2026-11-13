import { ArrowRight } from 'lucide-react';
import { copy } from '@/config/copy';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { PlateParadeBlock as PlateParadeBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { CmsImage } from '../CmsImage';
import { PlateScroller } from '../landing/PlateScroller';
import { Sticker } from '../landing/primitives';

/** Desktop wave: plate size + top offset (px on the 1440 artboard), repeating every four plates. */
const WAVE = [
  { size: 309, top: 85, rotate: 6 },
  { size: 367, top: 212, rotate: -5 },
  { size: 267, top: 57, rotate: 6 },
  { size: 338, top: 240, rotate: -4 },
] as const;

const vw = (px: number) => `min(${((px / 1440) * 100).toFixed(2)}vw, ${px}px)`;

export async function PlateParadeBlock({ block }: { block: PlateParadeBlockData }) {
  const items = await cmsService.getPlateParade(block);
  if (items.length === 0) return null;
  const dragLabel = block.dragLabel || 'Drag';

  return (
    <section className="bg-sunny-soft relative overflow-hidden pt-12 pb-10 lg:min-h-[min(46.9vw,675px)] lg:py-0">
      <div className="container-wide flex items-end justify-between gap-4 lg:contents">
        <div>
          {block.eyebrow && (
            <p className="font-ui text-berry text-xs font-extrabold tracking-[0.17em] uppercase lg:hidden">
              {block.eyebrow}
            </p>
          )}
          {block.heading && (
            <h2 className="font-display text-blue mt-1 text-[clamp(40px,13.6vw,56px)] leading-none font-extrabold tracking-[-0.036em] uppercase lg:absolute lg:top-[min(1vw,15px)] lg:left-[min(5.5vw,80px)] lg:mt-0 lg:rotate-180 lg:text-[min(9.4vw,135px)] lg:tracking-[-0.031em] lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">
              {block.heading}
            </h2>
          )}
        </div>
        <span
          aria-hidden="true"
          className="bg-blue text-paper font-ui mb-1 grid size-16 shrink-0 place-content-center justify-items-center rounded-full text-[10px] font-extrabold tracking-[0.1em] uppercase lg:hidden"
        >
          {copy.swipe}
          <ArrowRight className="size-3.5" />
        </span>
      </div>

      <PlateScroller
        count={items.length}
        dragLabel={dragLabel}
        label={copy.plates}
        className="mt-8 lg:mt-0"
      >
        <ul className="flex gap-5 px-5 lg:gap-[min(2vw,28px)] lg:pr-0 lg:pl-[min(14.6vw,210px)]">
          {items.map((item, i) => {
            const wave = WAVE[i % WAVE.length] ?? WAVE[0];
            return (
              <li
                key={item.id}
                className={cn(
                  'relative shrink-0 snap-center pb-6',
                  i % 2 === 1 && 'max-lg:mt-8',
                  'lg:pb-[min(6.7vw,96px)]',
                )}
                style={{ '--plate': vw(wave.size), '--top': vw(wave.top) } as CSSProperties}
              >
                <div className="w-[min(56vw,230px)] lg:mt-[var(--top)] lg:w-[var(--plate)]">
                  <div className="border-ink bg-paper relative aspect-square overflow-hidden rounded-full border-2">
                    <CmsImage image={item.image} sizes="(min-width: 1024px) 367px, 56vw" />
                  </div>
                  <Sticker
                    tone={i % 4 === 2 ? 'berry' : 'sunny'}
                    shape="pill"
                    rotate={wave.rotate}
                    className="absolute right-[-6%] bottom-[2%] lg:bottom-[calc(min(6.7vw,96px)-4%)]"
                  >
                    <span className="flex items-baseline gap-3 px-4 py-2 lg:gap-4">
                      <span className="font-ui text-[13px] font-extrabold tracking-[0.08em] uppercase lg:text-base">
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          'font-display text-base font-extrabold lg:text-lg',
                          i % 4 === 2 ? 'text-paper' : 'text-blue',
                        )}
                      >
                        {item.price}
                      </span>
                    </span>
                  </Sticker>
                </div>
              </li>
            );
          })}
        </ul>
      </PlateScroller>
    </section>
  );
}

PlateParadeBlock.displayName = 'PlateParadeBlock';
