import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { ReviewThreadBlock as ReviewThreadBlockData } from '@/payload-types';

/** Desktop chat layout — x / width as % of 1440, y in artboard px. Extra reviews continue the zigzag. */
const SLOTS = [
  { x: 41, y: 70, w: 31.4 },
  { x: 54.7, y: 246, w: 41.1 },
  { x: 29.3, y: 464, w: 29.4 },
  { x: 62.5, y: 535, w: 23.6 },
  { x: 41, y: 700, w: 31.4 },
  { x: 58, y: 820, w: 33 },
];

const TONES = {
  paper: 'bg-paper text-ink',
  blue: 'bg-blue text-paper',
  sunny: 'bg-sunny text-ink',
} as const;

export async function ReviewThreadBlock({ block }: { block: ReviewThreadBlockData }) {
  const t = await getTranslations('site');
  const reviews = (block.reviews ?? []).filter((r) => r.quote);
  const ratings = block.ratings ?? [];
  const tall = reviews.length > 4;

  return (
    <section className="bg-sunny-soft relative isolate overflow-hidden py-14 lg:py-0">
      <div
        className={cn(
          'container-wide relative',
          tall ? 'lg:min-h-[min(66vw,950px)]' : 'lg:min-h-[min(50.8vw,731px)]',
        )}
      >
        <span
          aria-hidden="true"
          className="font-display text-sunny absolute -top-10 right-[16%] -z-10 text-[300px] leading-[0.8] font-extrabold select-none lg:top-[min(28vw,404px)] lg:right-auto lg:left-[min(4.2vw,60px)] lg:text-[min(41vw,591px)]"
        >
          “
        </span>

        <div className="lg:absolute lg:top-[min(3.5vw,50px)]">
          <h2 className="font-display text-ink text-[clamp(42px,13vw,54px)] leading-[0.95] font-extrabold tracking-[-0.037em] whitespace-pre-line uppercase lg:text-[min(5.5vw,79px)]">
            {block.heading}
          </h2>
          {ratings.length > 0 && (
            <ul
              aria-label={t('ratings')}
              className="mt-5 flex flex-wrap gap-2 lg:mt-[min(2.6vw,38px)] lg:gap-3"
            >
              {ratings.map((r) => (
                <li
                  key={r.platform}
                  className="bg-ink flex h-8 items-center gap-2 rounded-full px-3 lg:h-[34px] lg:px-3.5"
                >
                  <span className="font-ui text-sunny text-[13px] font-extrabold lg:text-[15px]">
                    ★ {r.score}
                  </span>
                  <span className="text-paper text-xs lg:text-[13px]">{r.platform}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="mt-8 flex flex-col gap-5 lg:mt-0 lg:block">
          {reviews.map((r, i) => {
            const slot = SLOTS[i % SLOTS.length] ?? SLOTS[0];
            const right = i % 2 === 1;
            return (
              <li
                key={r.id ?? i}
                className={cn(
                  'sticker-pop flex max-w-[82%] flex-col lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-[var(--w)] lg:max-w-none',
                  right ? 'items-end self-end lg:items-start' : 'items-start self-start',
                )}
                style={
                  {
                    '--x': `${slot?.x}%`,
                    '--y': `min(${((slot?.y ?? 0) / 14.4).toFixed(2)}vw, ${slot?.y}px)`,
                    '--w': `${slot?.w}%`,
                  } as CSSProperties
                }
              >
                <blockquote
                  className={cn(
                    'border-ink rounded-[22px] border-2 px-[18px] py-3.5 text-[15px] leading-[1.45] lg:w-full lg:px-6 lg:py-[19px] lg:text-[17px]',
                    TONES[r.tone ?? 'paper'],
                  )}
                >
                  {r.quote}
                </blockquote>
                <p className="text-slate mt-2 text-xs font-semibold lg:text-[13px]">
                  — {r.author}
                  {r.source && `, ${r.source}`}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

ReviewThreadBlock.displayName = 'ReviewThreadBlock';
