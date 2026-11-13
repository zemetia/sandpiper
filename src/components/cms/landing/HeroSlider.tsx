'use client';

import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/cn';

export interface HeroSliderProps {
  slides: ReactNode[];
  /** "Turkey Club, $12" — shown on the NEXT card for each slide. */
  titles: string[];
  /** Seconds per slide; 0 disables autoplay. */
  interval: number;
  labels: { next: string; region: string; goToSlide: string; pause: string; play: string };
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Stacks every slide in one grid cell (so the hero never jumps in height) and cross-fades.
 * Autoplay pauses on hover/focus, honours reduced motion, and has a pause button.
 */
export function HeroSlider({ slides, titles, interval, labels }: HeroSliderProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  // null = follow the default (autoplay unless reduced motion); the pause button sets it explicitly.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = interval > 0 && count > 1 && (choice ?? !reducedMotion);
  const [held, setHeld] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (!playing || held) return;
    const id = window.setTimeout(() => go(index + 1), interval * 1000);
    return () => window.clearTimeout(id);
  }, [playing, held, index, interval, count, go]);

  const next = (index + 1) % count;
  const nextTitle = titles[next];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setHeld(false);
      }}
    >
      <div className="grid grid-cols-1">
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${pad(i + 1)} / ${pad(count)}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className={cn(
              'col-start-1 row-start-1 min-w-0 transition-[opacity,visibility] duration-500',
              i === index ? 'visible opacity-100' : 'invisible opacity-0',
            )}
          >
            {slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="container-wide pointer-events-none absolute inset-x-0 top-0">
          <div className="pointer-events-auto flex items-center justify-between gap-3 pt-5 lg:absolute lg:top-[min(5vw,73px)] lg:right-[min(3.3vw,48px)] lg:w-[267px] lg:flex-col lg:items-stretch lg:pt-0">
            <div className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="font-ui text-ink text-[13px] font-extrabold tracking-[0.09em] tabular-nums lg:text-base">
                {pad(index + 1)} / {pad(count)}
              </span>
              <div className="flex items-center gap-1.5 lg:gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={labels.goToSlide.replace('{n}', String(i + 1))}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => go(i)}
                    className={cn(
                      'bg-ink/25 relative h-[7px] overflow-hidden rounded-full transition-[width] duration-300',
                      i === index ? 'w-[38px] lg:w-[51px]' : 'w-[18px] lg:w-[25px]',
                    )}
                  >
                    {i === index && (
                      <span
                        key={index}
                        className={cn(
                          'bg-ink absolute inset-0 origin-left rounded-full',
                          playing && !held && 'animate-progress',
                        )}
                        style={{ '--slide-ms': `${interval * 1000}ms` } as CSSProperties}
                      />
                    )}
                  </button>
                ))}
              </div>
              {interval > 0 && (
                <button
                  type="button"
                  onClick={() => setChoice(!playing)}
                  aria-label={playing ? labels.pause : labels.play}
                  className="text-ink hover:bg-ink/10 -ml-1 grid size-7 place-items-center rounded-full"
                >
                  {playing ? (
                    <Pause aria-hidden="true" className="size-3.5" fill="currentColor" />
                  ) : (
                    <Play aria-hidden="true" className="size-3.5" fill="currentColor" />
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => go(next)}
              className="border-ink bg-paper hover:bg-sunny-soft flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-left transition-colors lg:mt-6 lg:flex-col lg:items-start lg:gap-0.5 lg:rounded-[14px] lg:px-4 lg:py-2.5"
            >
              <span className="font-ui text-blue text-[11px] font-extrabold tracking-[0.14em] uppercase lg:text-xs">
                {labels.next} <span className="max-lg:hidden">→</span>
              </span>
              <span className="font-display text-ink max-w-[44vw] truncate text-sm font-extrabold lg:max-w-none lg:text-lg">
                {nextTitle}
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

HeroSlider.displayName = 'HeroSlider';
