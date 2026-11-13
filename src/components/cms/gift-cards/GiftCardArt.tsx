import type { ReactNode } from 'react';

import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/cn';

export interface GiftCardArtProps {
  tone: 'blue' | 'sunny';
  label?: string | null;
  address?: string | null;
  amount?: ReactNode;
  /** Hides the address/amount on phones, where the back card is mostly covered. */
  compact?: boolean;
  className?: string;
}

const toneClasses = {
  blue: {
    card: 'bg-blue-deep',
    sun: 'bg-sunny',
    logo: 'text-sunny',
    counter: 'fill-blue-deep',
    text: 'text-sunny',
    amount: 'text-sunny',
  },
  sunny: {
    card: 'bg-sunny',
    sun: 'bg-ink',
    logo: 'text-blue',
    counter: 'fill-sunny',
    text: 'text-ink',
    amount: 'text-blue',
  },
};

/**
 * The illustrated Sandpiper eGift card (credit-card ratio). Everything inside is sized in
 * container units so the card scales with whatever width the composition gives it.
 */
export function GiftCardArt({
  tone,
  label,
  address,
  amount,
  compact,
  className,
}: GiftCardArtProps) {
  const t = toneClasses[tone];
  return (
    <div
      aria-hidden
      className={cn(
        'border-ink shadow-gift-card @container relative aspect-[460/290] overflow-hidden rounded-[20px] border-2 lg:rounded-[26px]',
        t.card,
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-[32.6cqw] left-[58cqw] aspect-square w-[62cqw] rounded-full opacity-[0.14]',
          t.sun,
        )}
      />
      <Logo
        className={cn('absolute top-[3.9cqw] left-[4.7cqw] w-[41cqw]', t.logo)}
        counterClassName={t.counter}
      />
      {address && (
        <span
          className={cn(
            'font-ui absolute top-[6.1cqw] right-[6.1cqw] text-[2.4cqw] leading-none font-extrabold tracking-[0.145em] uppercase opacity-70',
            compact && 'max-lg:hidden',
            t.text,
          )}
        >
          {address}
        </span>
      )}
      {label && (
        <span
          className={cn(
            'font-ui absolute bottom-[8.4cqw] left-[6.3cqw] text-[max(10px,2.9cqw)] leading-none font-extrabold tracking-[0.19em]',
            t.text,
          )}
        >
          {label}
        </span>
      )}
      {amount && (
        <span
          className={cn(
            'font-display absolute right-[6.1cqw] bottom-[2cqw] text-[17cqw] leading-[1.2] font-extrabold tracking-[-0.04em]',
            compact && 'max-lg:hidden',
            t.amount,
          )}
        >
          {amount}
        </span>
      )}
    </div>
  );
}

GiftCardArt.displayName = 'GiftCardArt';
