import { Gift } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import type { GiftCardHeroBlock as GiftCardHeroData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';

import { GiftCardStage } from '../gift-cards/GiftCardStage';
import { GiftPillLink } from '../gift-cards/primitives';

/** Blue gift-card hero: headline + amount chips on the left, stacked eGift cards on the right. */
export async function GiftCardHeroBlock({
  block,
  isFirst,
}: {
  block: GiftCardHeroData;
  isFirst: boolean;
}) {
  const t = await getTranslations('site');
  const Heading = isFirst ? 'h1' : 'h2';
  const buy = toLink(block.buyLink);
  const balance = toLink(block.balanceLink);
  const amounts = (block.amounts ?? []).map((a) => a.value);
  const initial = Math.max(
    0,
    (block.amounts ?? []).findIndex((a) => a.selected),
  );

  return (
    <section className="bg-blue border-ink relative overflow-hidden border-b-2">
      <div className="container-wide grid gap-y-[22px] pt-7 pb-10 lg:grid-cols-[minmax(0,648fr)_minmax(0,640fr)] lg:gap-x-[min(2.8vw,40px)] lg:gap-y-7 lg:pt-[min(6.1vw,88px)] lg:pb-[min(6.7vw,96px)]">
        {block.eyebrow && (
          <p className="bg-sunny text-ink font-ui inline-flex items-center gap-2 justify-self-start rounded-full px-3.5 py-[7px] text-[11px] leading-[1.1] font-extrabold tracking-[0.145em] lg:col-start-1 lg:px-4 lg:py-2 lg:text-[13px] lg:tracking-[0.14em]">
            <Gift aria-hidden className="size-3.5 lg:size-[15px]" strokeWidth={2.5} />
            {block.eyebrow}
          </p>
        )}

        <Heading className="font-display text-[64px] leading-[0.9] font-extrabold tracking-[-0.04em] lg:col-start-1 lg:text-[min(7.5vw,108px)]">
          {block.line1 && <span className="text-paper block">{block.line1}</span>}
          {block.line2 && <span className="text-sunny block">{block.line2}</span>}
        </Heading>

        {block.body && (
          <p className="text-sunny-soft max-w-[540px] text-base leading-[1.55] lg:col-start-1 lg:text-[min(1.32vw,19px)]">
            {block.body}
          </p>
        )}

        <GiftCardStage
          amounts={amounts}
          initial={initial}
          anyAmount={block.anyAmount}
          groupLabel={t('giftAmount')}
          card={{
            label: block.card?.label,
            address: block.card?.address,
            backAmount: block.card?.backAmount,
          }}
          tag={{ label: block.tag?.label, value: block.tag?.value }}
        />

        {(buy || balance) && (
          <div className="flex flex-col gap-2.5 lg:col-start-1 lg:mt-2 lg:flex-row lg:gap-3.5">
            {buy && <GiftPillLink link={buy} tone="sunny" />}
            {balance && <GiftPillLink link={balance} tone="ghost" />}
          </div>
        )}
      </div>
    </section>
  );
}

GiftCardHeroBlock.displayName = 'GiftCardHeroBlock';
