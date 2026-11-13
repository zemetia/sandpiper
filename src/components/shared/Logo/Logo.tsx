import { cn } from '@/lib/cn';

import { WORDMARK_PATHS } from './paths';

export interface LogoProps {
  /** `wordmark` — the script logo; `badge` — the wordmark inside the yellow circle. */
  variant?: 'wordmark' | 'badge';
  /** Accessible name. Omit when the logo sits inside a link that already has a label. */
  title?: string;
  className?: string;
  /** Fill class for the letter counters — match it to the surface the logo sits on. */
  counterClassName?: string;
}

function Paths({ counterClassName }: { counterClassName: string }) {
  return WORDMARK_PATHS.map(([x, y, d, role], i) => (
    <path
      key={i}
      transform={`translate(${x} ${y})`}
      d={d}
      className={role === 'ink' ? 'fill-current' : counterClassName}
    />
  ));
}

/** Sandpiper Cafe logo. Ink paths use `currentColor` — set the colour with a `text-*` class. */
export function Logo({
  variant = 'wordmark',
  title,
  className,
  counterClassName = 'fill-sunny',
}: LogoProps) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };

  if (variant === 'badge') {
    return (
      <svg viewBox="0 0 540 540" className={cn('text-blue', className)} {...a11y}>
        <circle cx="270" cy="270" r="270" className="fill-sunny" />
        <g transform="translate(17.404 170.56)">
          <Paths counterClassName="fill-sunny" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 516 220" className={cn('text-blue', className)} {...a11y}>
      <Paths counterClassName={counterClassName} />
    </svg>
  );
}

Logo.displayName = 'Logo';
