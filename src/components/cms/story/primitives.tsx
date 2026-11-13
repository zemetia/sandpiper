import {
  Bike,
  Clock,
  Coffee,
  Croissant,
  HandHeart,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Sandwich,
  Star,
  Sunrise,
  Utensils,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

import { InstagramIcon } from '@/components/shared/Icons';
import { cn } from '@/lib/cn';
import type { AboutKitchenBlock } from '@/payload-types';

export type StoryIconKey = NonNullable<NonNullable<AboutKitchenBlock['pillars']>[number]['icon']>;

/** Keys mirror `storyIconOptions` in `src/cms/blocks/storyIcons.ts`. */
const STORY_ICONS: Record<StoryIconKey, LucideIcon | ComponentType<{ className?: string }>> = {
  sandwich: Sandwich,
  utensils: Utensils,
  coffee: Coffee,
  croissant: Croissant,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  instagram: InstagramIcon,
  sunrise: Sunrise,
  clock: Clock,
  bike: Bike,
  bag: ShoppingBag,
  handHeart: HandHeart,
  heart: Heart,
  star: Star,
};

export function StoryIcon({ name, className }: { name?: StoryIconKey | null; className?: string }) {
  const Icon = STORY_ICONS[name ?? 'star'];
  return <Icon aria-hidden="true" className={className} />;
}

/** Splits an editor headline into lines; `*line*` marks the accent line. */
export const headingLines = (text: string | null | undefined) =>
  (text ?? '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const accent = /^\*.+\*$/.test(l);
      return { text: accent ? l.slice(1, -1) : l, accent };
    });

/** Plain-text version of an accent headline (for aria labels). */
export const headingText = (text: string | null | undefined) =>
  headingLines(text)
    .map((l) => l.text)
    .join(' ') || null;

/** Renders `headingLines` as stacked spans; accent lines get `accentClassName`. */
export function AccentLines({
  text,
  accentClassName,
  lineClassName,
}: {
  text: string | null | undefined;
  accentClassName: string;
  lineClassName?: string;
}) {
  return headingLines(text).map((l, i) => (
    <span key={i} className={cn('block', lineClassName, l.accent && accentClassName)}>
      {l.text}
    </span>
  ));
}

/** Round three-line sticker (small caps / big word / small caps). */
export function Stamp({
  stamp,
  className,
  topClassName,
  valueClassName,
}: {
  stamp: { top?: string | null; value?: string | null; bottom?: string | null } | undefined;
  className?: string;
  topClassName?: string;
  valueClassName?: string;
}) {
  if (!stamp?.value) return null;
  const small = cn(
    'font-ui text-[9px] font-extrabold tracking-[0.15em] uppercase lg:text-[13px]',
    topClassName,
  );
  return (
    <span
      className={cn(
        'sticker-pop border-ink absolute grid aspect-square place-content-center rounded-full border-2 text-center',
        className,
      )}
    >
      {stamp.top && <span className={small}>{stamp.top}</span>}
      <span
        className={cn(
          'font-display text-[26px] leading-[1.1] font-extrabold lg:text-[min(2.64vw,38px)]',
          valueClassName,
        )}
      >
        {stamp.value}
      </span>
      {stamp.bottom && <span className={small}>{stamp.bottom}</span>}
    </span>
  );
}

/** Section eyebrow in the About/Contact style (15px Archivo, 0.13em tracking). */
export function StoryEyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        'font-ui text-[13px] font-extrabold tracking-[0.15em] uppercase lg:text-[15px] lg:tracking-[0.13em]',
        className,
      )}
    >
      {children}
    </p>
  );
}
