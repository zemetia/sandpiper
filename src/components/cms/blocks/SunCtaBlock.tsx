import type { SunCtaBlock as SunCtaBlockData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';

import { PillLink } from '../landing/primitives';

/** The logo's yellow circle rising like a sun from behind the footer, carrying the order CTA. */
export function SunCtaBlock({ block }: { block: SunCtaBlockData }) {
  const link = toLink(block.link);
  const stamp = block.stamp;

  return (
    <section className="bg-cream relative h-[344px] overflow-hidden pt-10 lg:h-[min(22.4vw,323px)] lg:pt-0">
      <div className="container-wide relative h-full">
        {block.sideText && (
          <p className="font-display text-ink mx-auto max-w-[280px] text-center text-[22px] leading-[1.15] font-extrabold tracking-[-0.03em] whitespace-pre-line lg:absolute lg:top-1/2 lg:mx-0 lg:max-w-[min(18vw,260px)] lg:-translate-y-1/2 lg:text-left lg:text-[min(1.9vw,27px)] lg:leading-[1.05]">
            {block.sideText}
          </p>
        )}

        <div className="relative mx-auto mt-8 w-[min(92vw,380px)] lg:absolute lg:top-[min(4.7vw,68px)] lg:left-1/2 lg:mt-0 lg:w-[min(38vw,548px)] lg:-translate-x-1/2">
          <div className="bg-sunny border-ink flex aspect-square flex-col items-center rounded-full border-2 pt-[19%] text-center lg:pt-[12%]">
            {block.eyebrow && (
              <p className="font-ui text-ink text-xs font-extrabold tracking-[0.17em] uppercase lg:text-[15px]">
                {block.eyebrow}
              </p>
            )}
            <h2 className="font-display text-ink mt-3 text-[40px] leading-none font-extrabold tracking-[-0.035em] lg:mt-5 lg:text-[min(3.8vw,55px)]">
              {block.heading}
            </h2>
            {link && <PillLink link={link} size="md" className="mt-6 lg:mt-7" />}
          </div>

          {stamp?.value && (
            <span className="bg-blue border-ink sticker-pop absolute -top-[6%] right-[-4%] grid size-[96px] rotate-[8deg] place-content-center rounded-full border-2 text-center lg:top-[17%] lg:right-[-55%] lg:size-[min(10.3vw,148px)]">
              {stamp.label && (
                <span className="font-ui text-sunny text-[9px] font-extrabold tracking-[0.13em] uppercase lg:text-xs">
                  {stamp.label}
                </span>
              )}
              <span className="font-display text-paper text-xl leading-tight font-extrabold lg:text-[31px]">
                {stamp.value}
              </span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

SunCtaBlock.displayName = 'SunCtaBlock';
