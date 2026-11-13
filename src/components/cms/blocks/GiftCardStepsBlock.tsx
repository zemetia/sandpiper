import type { GiftCardStepsBlock as GiftCardStepsData } from '@/payload-types';

import { BreakLines, GiftCardIcon } from '../gift-cards/primitives';
import { Eyebrow } from '../landing/primitives';

/** "How it works": three numbered steps, columns on desktop and a list on phones. */
export function GiftCardStepsBlock({ block }: { block: GiftCardStepsData }) {
  const steps = block.steps ?? [];

  return (
    <section className="container-wide pt-12 pb-8 lg:pt-[min(6.7vw,96px)] lg:pb-[min(5.6vw,80px)]">
      <div className="gc-rise flex items-end justify-between gap-6">
        <div>
          {block.eyebrow && (
            <Eyebrow className="text-[12px] tracking-[0.17em] lg:text-sm lg:tracking-[0.14em]">
              {block.eyebrow}
            </Eyebrow>
          )}
          {block.heading && (
            <h2 className="font-display text-ink mt-5 text-[44px] leading-[0.98] font-extrabold tracking-[-0.041em] lg:mt-3 lg:text-[min(5vw,72px)] lg:leading-[1.2] lg:tracking-[-0.036em]">
              <BreakLines text={block.heading} brClassName="lg:hidden" />
            </h2>
          )}
        </div>
        {block.note && (
          <p className="font-script text-blue hidden pb-2 text-[min(2.36vw,34px)] leading-tight whitespace-nowrap lg:block">
            {block.note}
          </p>
        )}
      </div>

      {steps.length > 0 && (
        <ol className="border-ink mt-5 grid border-t-2 lg:mt-14 lg:auto-cols-fr lg:grid-flow-col">
          {steps.map((step, i) => (
            <li
              key={step.id ?? i}
              className="gc-rise group border-ink/15 flex gap-4 border-b py-5 last:border-b-0 lg:flex-col lg:gap-4 lg:border-r lg:border-b-0 lg:px-8 lg:pt-8 lg:pb-0 lg:first:pl-0 lg:last:border-r-0"
            >
              <div className="flex shrink-0 items-start justify-between lg:items-center">
                <span className="font-display text-berry hidden text-[44px] leading-[1.2] font-extrabold lg:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="bg-sunny border-ink text-ink grid size-12 place-items-center rounded-full border-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 lg:size-14">
                  <GiftCardIcon name={step.icon} className="size-[22px] lg:size-6" />
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-ink flex items-baseline gap-2 text-xl leading-[1.2] font-extrabold lg:text-[28px] lg:tracking-[-0.02em]">
                  <span className="text-berry text-[15px] lg:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-slate mt-1 text-sm leading-[1.5] lg:mt-4 lg:max-w-[411px] lg:text-base lg:leading-[1.55]">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

GiftCardStepsBlock.displayName = 'GiftCardStepsBlock';
