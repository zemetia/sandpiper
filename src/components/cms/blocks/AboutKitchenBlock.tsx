import type { AboutKitchenBlock as AboutKitchenBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { AccentLines, Stamp, StoryEyebrow, StoryIcon } from '../story/primitives';

const photo = 'border-ink absolute overflow-hidden border-2';

export function AboutKitchenBlock({ block }: { block: AboutKitchenBlockData }) {
  const main = toImage(block.photos?.main, 'card');
  const round = toImage(block.photos?.round, 'card');
  const small = toImage(block.photos?.small, 'card');
  const pillars = block.pillars ?? [];

  return (
    <section className="bg-blue overflow-hidden py-16 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide flex flex-col-reverse gap-12 lg:grid lg:grid-cols-[620fr_620fr] lg:items-center lg:gap-[72px]">
        {(main || round || small) && (
          <div className="relative mx-auto aspect-[620/690] w-full max-w-[460px] lg:max-w-[620px]">
            {main && (
              <div
                className={`${photo} wobble top-0 left-0 aspect-[340/420] w-[54.8%] rounded-3xl`}
              >
                <CmsImage image={main} sizes="(min-width: 1024px) 340px, 55vw" />
              </div>
            )}
            {round && (
              <div
                className={`${photo} wobble top-[26%] left-[48.4%] aspect-square w-[51.6%] rounded-full [--wobble:-4deg]`}
              >
                <CmsImage image={round} sizes="(min-width: 1024px) 320px, 52vw" />
              </div>
            )}
            {small && (
              <div
                className={`${photo} wobble top-[63.8%] left-[7.4%] aspect-[233/215] w-[37.6%] rotate-4 rounded-[20px] [--wobble:-1deg]`}
              >
                <CmsImage image={small} sizes="(min-width: 1024px) 240px, 38vw" />
              </div>
            )}
            <Stamp
              stamp={block.stamp}
              className="bg-sunny top-[72.5%] left-[64.2%] w-[29.2%] rotate-8"
              topClassName="text-ink"
              valueClassName="text-blue"
            />
          </div>
        )}

        <div className="ct-reveal">
          {block.eyebrow && <StoryEyebrow className="text-sunny">{block.eyebrow}</StoryEyebrow>}
          {block.heading && (
            <h2 className="font-display text-paper mt-5 text-[40px] leading-[1.02] font-extrabold tracking-[-0.02em] lg:mt-7 lg:text-[min(4.44vw,64px)] lg:tracking-[-0.019em]">
              <AccentLines text={block.heading} accentClassName="text-sunny font-light" />
            </h2>
          )}
          {block.body && (
            <p className="text-paper mt-5 text-base leading-[1.6] lg:mt-7 lg:text-[19px]">
              {block.body}
            </p>
          )}
          {pillars.length > 0 && (
            <ol className="mt-7 lg:mt-7">
              {pillars.map((p, i) => (
                <li
                  key={p.id ?? p.title}
                  className="group border-paper/25 flex items-center gap-4 border-t py-4 last:border-b lg:gap-6 lg:py-5"
                >
                  <span className="font-ui text-sunny w-5 shrink-0 text-[13px] font-extrabold lg:text-[15px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-display text-paper text-xl leading-tight font-extrabold lg:text-[26px]">
                      {p.title}
                    </span>
                    {p.description && (
                      <span className="text-paper/80 text-sm lg:text-[15px]">{p.description}</span>
                    )}
                  </span>
                  <StoryIcon
                    name={p.icon}
                    className="text-sunny size-6 shrink-0 transition-transform duration-300 group-hover:-rotate-12 lg:size-[30px]"
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

AboutKitchenBlock.displayName = 'AboutKitchenBlock';
