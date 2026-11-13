import type { RibbonsBlock as RibbonsBlockData } from '@/payload-types';
import { Marquee } from '@/components/shared/Marquee';

const word =
  'font-display text-[22px] font-extrabold uppercase tracking-[-0.01em] lg:text-[36px] leading-none';
const star = (color: string) => (
  <span
    aria-hidden="true"
    className={`${color} mx-4 text-lg leading-none lg:mx-[34px] lg:text-[29px]`}
  >
    ★
  </span>
);

/**
 * Two marquee ribbons crossing over the seam between the hero and the menu board.
 * Negative margins let it overlap both neighbours; `overflow-x-clip` stops the rotated
 * ribbons from adding a horizontal scrollbar.
 */
export function RibbonsBlock({ block }: { block: RibbonsBlockData }) {
  const top = block.topWords ?? [];
  const bottom = block.bottomWords ?? [];
  if (top.length === 0 && bottom.length === 0) return null;

  return (
    <div className="pointer-events-none relative z-20 -my-[78px] h-[156px] overflow-x-clip lg:-my-[min(8vw,115px)] lg:h-[min(16vw,230px)]">
      {bottom.length > 0 && (
        <Marquee
          items={bottom}
          reverse
          duration={38}
          repeat={4}
          separator={star('text-sunny')}
          className="bg-ink absolute top-1/2 -right-[10%] -left-[10%] -translate-y-1/2 -rotate-6 py-3 lg:py-[21px]"
          itemClassName={`${word} text-paper`}
        />
      )}
      {top.length > 0 && (
        <Marquee
          items={top}
          duration={46}
          repeat={4}
          separator={star('text-blue')}
          className="bg-sunny border-ink absolute top-1/2 -right-[10%] -left-[10%] -translate-y-1/2 rotate-[7deg] border-y-2 py-3 lg:py-[21px]"
          itemClassName={`${word} text-ink`}
        />
      )}
    </div>
  );
}

RibbonsBlock.displayName = 'RibbonsBlock';
