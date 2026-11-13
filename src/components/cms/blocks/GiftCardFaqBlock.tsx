import type { GiftCardFaqBlock as GiftCardFaqData } from '@/payload-types';

import { BreakLines } from '../gift-cards/primitives';

/** "Good to know." — short Q&A strip on the soft-yellow band above the footer. */
export function GiftCardFaqBlock({ block }: { block: GiftCardFaqData }) {
  const items = block.items ?? [];
  if (!block.heading && items.length === 0) return null;

  return (
    <section className="bg-sunny-soft border-ink border-t-2">
      <div className="container-wide flex flex-col gap-[22px] pt-11 pb-12 lg:flex-row lg:gap-12 lg:py-[min(5vw,72px)]">
        {block.heading && (
          <h2 className="font-display text-ink gc-rise shrink-0 text-4xl leading-[1.2] font-extrabold tracking-[-0.033em] lg:text-[min(3.9vw,56px)] lg:leading-[0.95] lg:tracking-[-0.036em] lg:whitespace-nowrap">
            <BreakLines text={block.heading} brClassName="max-lg:hidden" />
          </h2>
        )}
        {items.length > 0 && (
          <dl className="grid flex-1 gap-[22px] lg:auto-cols-fr lg:grid-flow-col lg:gap-8">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="gc-rise flex flex-col gap-1.5 lg:gap-2.5">
                <dt className="font-display text-ink text-lg leading-[1.2] font-extrabold lg:text-[21px]">
                  {item.question}
                </dt>
                <dd className="text-slate text-sm leading-[1.5] lg:text-[15px] lg:leading-[1.55]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

GiftCardFaqBlock.displayName = 'GiftCardFaqBlock';
