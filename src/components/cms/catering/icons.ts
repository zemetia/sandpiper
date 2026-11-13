import {
  Briefcase,
  Calendar,
  Coffee,
  Croissant,
  GraduationCap,
  Heart,
  Leaf,
  PartyPopper,
  Sandwich,
  Star,
  Timer,
  Truck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { CateringHeroBlock } from '@/payload-types';

export type CateringIconKey = NonNullable<NonNullable<CateringHeroBlock['facts']>[number]['icon']>;

/** Keys mirror `cateringIconOptions` in `src/cms/blocks/cateringIcons.ts`. */
export const CATERING_ICONS: Record<CateringIconKey, LucideIcon> = {
  timer: Timer,
  users: Users,
  truck: Truck,
  briefcase: Briefcase,
  party: PartyPopper,
  graduation: GraduationCap,
  coffee: Coffee,
  sandwich: Sandwich,
  croissant: Croissant,
  calendar: Calendar,
  leaf: Leaf,
  heart: Heart,
  star: Star,
};

export const cateringIcon = (key: CateringIconKey | null | undefined): LucideIcon =>
  CATERING_ICONS[key ?? 'star'];
