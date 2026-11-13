import { Marquee } from '@/components/shared/Marquee';
import type { CateringRibbonBlock as CateringRibbonBlockData } from '@/payload-types';

/** Straight ink strip of scrolling catering staples under the hero. */
export function CateringRibbonBlock({ block }: { block: CateringRibbonBlockData }) {
  const words = block.words ?? [];
  if (words.length === 0) return null;

  return (
    <Marquee
      items={words}
      duration={42}
      repeat={3}
      separator={
        <span
          aria-hidden="true"
          className="text-sunny mx-[18px] text-[15px] leading-none lg:mx-7 lg:text-xl"
        >
          ★
        </span>
      }
      className="bg-ink flex h-12 items-center lg:h-16"
      itemClassName="font-display text-paper text-lg leading-none font-extrabold uppercase lg:text-2xl"
    />
  );
}

CateringRibbonBlock.displayName = 'CateringRibbonBlock';
