import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import type { LinkVO } from '@/types/value-objects';

import { LinkTo } from '../LinkTo';

/** The diner-style pill buttons used across the landing page (Archivo, all caps). */
export const pillVariants = cva(
  'font-ui inline-flex items-center justify-center gap-2 rounded-full font-extrabold uppercase whitespace-nowrap transition-[background-color,color,transform] active:translate-y-px',
  {
    variants: {
      variant: {
        primary: 'bg-blue text-paper hover:bg-blue-deep',
        outline: 'border-ink text-ink hover:bg-ink hover:text-sunny border-2',
        sunny: 'bg-sunny text-ink hover:bg-warning-hover',
      },
      size: {
        md: 'h-12 px-6 text-sm tracking-[0.03em]',
        lg: 'h-[52px] px-7 text-sm tracking-[0.03em] lg:h-[57px] lg:px-[34px] lg:text-[17px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'lg' },
  },
);

export type PillVariants = VariantProps<typeof pillVariants>;

export function PillLink({
  link,
  className,
  children,
  ...variants
}: PillVariants & { link: LinkVO; className?: string; children?: ReactNode }) {
  return (
    <LinkTo link={link} className={cn(pillVariants(variants), className)}>
      {children ?? link.label}
    </LinkTo>
  );
}

/** Small all-caps label above a heading (Archivo, wide tracking). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-ui text-blue text-xs font-extrabold tracking-[0.17em] uppercase',
        className,
      )}
    >
      {children}
    </p>
  );
}

const stickerVariants = cva('sticker-pop border-ink inline-flex items-center border-2', {
  variants: {
    shape: { tag: 'rounded-[12px]', pill: 'rounded-full' },
    tone: {
      berry: 'bg-berry text-paper',
      sunny: 'bg-sunny text-ink',
      blue: 'bg-blue text-paper',
      paper: 'bg-paper text-ink',
    },
  },
  defaultVariants: { tone: 'sunny', shape: 'tag' },
});

/** Rotated price-tag sticker, slapped on photos. Rotation is passed in degrees (clockwise). */
export function Sticker({
  tone,
  shape,
  rotate = 0,
  className,
  children,
}: VariantProps<typeof stickerVariants> & {
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn('inline-block', className)} style={{ rotate: `${rotate}deg` }}>
      <span className={stickerVariants({ tone, shape })}>{children}</span>
    </span>
  );
}
