import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface MarqueeProps {
  items: string[];
  /** Rendered between items (and after the last, so the loop is seamless). */
  separator?: ReactNode;
  /** Scrolls right instead of left. */
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  /** How many times the list repeats inside each half — raise it for short lists. */
  repeat?: number;
  className?: string;
  itemClassName?: string;
  /** Accessible label for the whole strip; the moving copies are hidden from screen readers. */
  label?: string;
}

/** Infinite CSS marquee. Two identical halves slide by -50%, so the seam is invisible. */
export function Marquee({
  items,
  separator,
  reverse,
  duration = 40,
  repeat = 2,
  className,
  itemClassName,
  label,
}: MarqueeProps) {
  if (items.length === 0) return null;
  const run = Array.from({ length: repeat }, () => items).flat();

  return (
    <div
      className={cn('overflow-hidden', className)}
      role={label ? 'region' : undefined}
      aria-label={label}
    >
      {label && <p className="sr-only">{items.join(' · ')}</p>}
      <div
        aria-hidden="true"
        className={cn(
          'marquee-track flex w-max',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {run.map((item, i) => (
              <Fragment key={i}>
                <span className={cn('shrink-0 whitespace-nowrap', itemClassName)}>{item}</span>
                {separator}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Marquee.displayName = 'Marquee';
