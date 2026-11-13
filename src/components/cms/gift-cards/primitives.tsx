import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { ArrowUpRight, Coffee, CreditCard, Gift, Heart, Mail, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { LinkVO } from '@/types/value-objects';

import { LinkTo } from '../LinkTo';

const icons: Record<string, LucideIcon> = {
  card: CreditCard,
  mail: Mail,
  coffee: Coffee,
  gift: Gift,
  search: Search,
  heart: Heart,
};

export function GiftCardIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = icons[name ?? ''] ?? Gift;
  return <Icon aria-hidden className={className} />;
}

/** Gift-card CTAs: diner pills with an up-right arrow (they open Toast, our payments partner). */
export const giftPillVariants = cva(
  'font-ui group/pill inline-flex items-center justify-center gap-2 rounded-full border-2 font-extrabold whitespace-nowrap transition-[background-color,color,translate] duration-200 hover:-translate-y-0.5 active:translate-y-px',
  {
    variants: {
      tone: {
        sunny: 'bg-sunny border-ink text-ink hover:bg-paper',
        ghost: 'border-paper text-paper hover:bg-paper hover:text-blue',
        blue: 'bg-blue border-ink text-paper hover:bg-blue-deep',
        ink: 'bg-ink border-ink text-sunny hover:bg-blue-deep',
      },
      size: {
        hero: 'h-[54px] px-8 text-sm tracking-[0.036em] lg:h-14 lg:text-[15px] lg:tracking-[0.04em]',
        panel:
          'h-[52px] px-[30px] text-sm tracking-[0.036em] lg:h-[54px] lg:text-[15px] lg:tracking-[0.04em]',
      },
    },
    defaultVariants: { tone: 'sunny', size: 'hero' },
  },
);

const arrowTone = { sunny: 'text-ink', ghost: 'text-sunny', blue: 'text-paper', ink: 'text-sunny' };

export function GiftPillLink({
  link,
  tone = 'sunny',
  size,
  className,
}: VariantProps<typeof giftPillVariants> & { link: LinkVO; className?: string }) {
  return (
    <LinkTo link={link} className={cn(giftPillVariants({ tone, size }), className)}>
      {link.label}
      <ArrowUpRight
        aria-hidden
        strokeWidth={2.5}
        className={cn(
          'size-[18px] transition-transform duration-200 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5',
          arrowTone[tone ?? 'sunny'],
        )}
      />
    </LinkTo>
  );
}

/**
 * Renders editor line breaks only at one breakpoint: the words stay space-separated,
 * the `<br>` is hidden elsewhere.
 */
export function BreakLines({ text, brClassName }: { text: string; brClassName: string }) {
  const lines = text.split(/\r?\n/);
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && (
        <>
          {' '}
          <br className={brClassName} />
        </>
      )}
    </span>
  ));
}
