import { cn } from '@/lib/cn';
import type { AboutBeliefBlock as AboutBeliefBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { AccentLines, StoryEyebrow } from '../story/primitives';

/** Staggered plate heights from the 1312-wide strip (photo px / 310 px wide). */
const PLATE_ASPECT = [
  'aspect-[310/380]',
  'aspect-[310/460]',
  'aspect-[310/340]',
  'aspect-[310/420]',
];

export function AboutBeliefBlock({ block }: { block: AboutBeliefBlockData }) {
  const plates = block.plates ?? [];

  return (
    <section className="bg-cream py-16 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide">
        <div className="ct-reveal flex flex-col gap-6 lg:flex-row lg:gap-20">
          <div className="lg:flex-[792]">
            {block.eyebrow && <StoryEyebrow className="text-berry">{block.eyebrow}</StoryEyebrow>}
            {block.heading && (
              <h2 className="font-display text-ink mt-4 text-[40px] leading-none font-extrabold tracking-[-0.03em] lg:mt-5 lg:text-[min(5vw,72px)] lg:tracking-[-0.021em]">
                <AccentLines
                  text={block.heading}
                  accentClassName="text-blue mt-[0.25em] font-light"
                />
              </h2>
            )}
          </div>
          {(block.body || block.note) && (
            <div className="flex flex-col gap-5 lg:flex-[440] lg:pt-10">
              {block.body && (
                <p className="text-ink text-base leading-[1.6] lg:text-lg">{block.body}</p>
              )}
              {block.note && (
                <p className="font-script text-blue text-2xl leading-tight font-bold lg:text-[30px]">
                  {block.note}
                </p>
              )}
            </div>
          )}
        </div>

        {plates.length > 0 && (
          <ul className="no-scrollbar -mx-[clamp(1.25rem,3.9vw,3.5rem)] mt-10 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,3.9vw,3.5rem)] items-end gap-4 overflow-x-auto px-[clamp(1.25rem,3.9vw,3.5rem)] pb-2 lg:mx-0 lg:mt-20 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {plates.map((p, i) => (
              <li
                key={p.id ?? p.name}
                className="ct-reveal group flex w-[62vw] max-w-[260px] shrink-0 snap-start flex-col gap-3.5 lg:w-auto lg:max-w-none"
              >
                <div
                  className={cn(
                    'border-ink relative overflow-hidden rounded-2xl border-2 transition-transform duration-300 group-hover:-translate-y-1.5',
                    PLATE_ASPECT[i % PLATE_ASPECT.length],
                  )}
                >
                  <CmsImage
                    image={toImage(p.image, 'card')}
                    sizes="(min-width: 1024px) 320px, 62vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="bg-sunny border-ink font-ui text-ink absolute top-3 right-3 rounded-full border-2 px-3 py-1 text-[10px] font-extrabold tracking-[0.1em] uppercase lg:top-3.5 lg:right-3.5 lg:text-xs">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="font-display text-ink text-xl leading-tight font-extrabold lg:text-2xl">
                  {p.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

AboutBeliefBlock.displayName = 'AboutBeliefBlock';
