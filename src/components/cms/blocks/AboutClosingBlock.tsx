import { Sunrise } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { AboutClosingBlock as AboutClosingBlockData } from '@/payload-types';
import { toLinks } from '@/services/cms.mappers';

import { LinkTo } from '../LinkTo';
import { pillVariants } from '../landing/primitives';
import { AccentLines } from '../story/primitives';

export function AboutClosingBlock({ block }: { block: AboutClosingBlockData }) {
  const links = toLinks(block.links);

  return (
    <section className="bg-cream pt-16 pb-16 lg:pt-[min(9.7vw,140px)] lg:pb-[min(8.3vw,120px)]">
      <div className="container-wide ct-reveal flex flex-col items-center gap-8 text-center lg:gap-12">
        <span className="bg-sunny border-ink sticker-pop grid size-20 place-items-center rounded-full border-2 lg:size-[120px]">
          <Sunrise aria-hidden="true" className="text-ink size-9 lg:size-[52px]" />
        </span>
        {block.body && (
          <p className="text-ink max-w-[760px] text-[17px] leading-[1.6] lg:text-[21px]">
            {block.body}
          </p>
        )}
        {block.heading && (
          <h2 className="font-display text-ink text-[min(8.2vw,40px)] leading-[1.02] font-extrabold tracking-[-0.03em] lg:text-[min(5.83vw,84px)] lg:tracking-[-0.024em]">
            <AccentLines text={block.heading} accentClassName="text-blue font-light" />
          </h2>
        )}
        {links.length > 0 && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:gap-4">
            {links.map((l, i) => (
              <LinkTo
                key={l.href + l.label}
                link={l}
                className={cn(
                  pillVariants({
                    variant: i === 0 && l.appearance !== 'outline' ? 'primary' : 'outline',
                  }),
                  'hover:-translate-y-0.5',
                )}
              >
                {l.label}
              </LinkTo>
            ))}
          </div>
        )}
        {block.note && (
          <p className="font-script text-berry rotate-3 text-[28px] font-bold lg:text-[34px]">
            {block.note}
          </p>
        )}
      </div>
    </section>
  );
}

AboutClosingBlock.displayName = 'AboutClosingBlock';
