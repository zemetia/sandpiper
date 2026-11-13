'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';

import { GiftCardArt } from './GiftCardArt';

export interface GiftCardStageProps {
  amounts: string[];
  initial: number;
  anyAmount?: string | null;
  groupLabel: string;
  card: { label?: string | null; address?: string | null; backAmount?: string | null };
  tag: { label?: string | null; value?: string | null };
}

/**
 * The hero's two grid cells that share state: the stacked card illustration and the amount
 * chips. Picking a chip re-prints the front card; payment itself happens on Toast.
 */
export function GiftCardStage({
  amounts,
  initial,
  anyAmount,
  groupLabel,
  card,
  tag,
}: GiftCardStageProps) {
  const [selected, setSelected] = useState(initial);
  const amount = amounts[selected];

  return (
    <>
      <div className="relative aspect-[372/290] lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:aspect-[640/520] lg:self-center">
        <div className="absolute top-[6.9%] left-[24.2%] w-[80.6%] origin-top-left rotate-[8deg] lg:top-[7.7%] lg:left-[23.4%] lg:w-[71.9%]">
          <GiftCardArt
            tone="blue"
            label={card.label}
            address={card.address}
            amount={card.backAmount}
            compact
            className="gc-float [--float-delay:-3s]"
          />
        </div>
        <div className="absolute top-[33.1%] left-[2.7%] w-[80.6%] origin-top-left -rotate-[6deg] lg:top-[36.5%] lg:left-[6.25%] lg:w-[71.9%]">
          <GiftCardArt
            tone="sunny"
            label={card.label}
            address={card.address}
            compact
            className="gc-float"
            amount={
              amount && (
                <span key={amount} className="gc-amount-pop inline-block">
                  {amount}
                </span>
              )
            }
          />
        </div>
        {tag.value && (
          <span className="absolute top-[0.7%] left-[65%] origin-top-left -rotate-[8deg] lg:top-[76.9%] lg:left-[73.4%] lg:rotate-[10deg]">
            <span className="bg-berry border-ink text-paper sticker-pop flex flex-col rounded-[10px] border-2 px-3 py-2 lg:rounded-[12px] lg:px-4 lg:py-2.5">
              {tag.label && (
                <span className="font-ui text-[9px] leading-none font-extrabold tracking-[0.13em] uppercase lg:text-[min(0.76vw,11px)]">
                  {tag.label}
                </span>
              )}
              <span className="font-display text-base leading-[1.2] font-extrabold whitespace-nowrap lg:text-[min(1.53vw,22px)]">
                {tag.value}
              </span>
            </span>
          </span>
        )}
      </div>

      {amounts.length > 0 && (
        <div className="flex flex-col gap-[22px] lg:col-start-1 lg:flex-row lg:items-center lg:gap-2.5">
          <div
            role="group"
            aria-label={groupLabel}
            className="grid grid-cols-4 gap-2 lg:flex lg:gap-2.5"
          >
            {amounts.map((value, i) => (
              <button
                key={`${value}-${i}`}
                type="button"
                aria-pressed={i === selected}
                onClick={() => setSelected(i)}
                className={cn(
                  'font-display h-11 rounded-full border-2 text-[17px] font-extrabold transition-[background-color,color,border-color,translate] duration-200 hover:-translate-y-0.5 lg:px-5 lg:text-lg',
                  i === selected
                    ? 'bg-sunny border-ink text-ink'
                    : 'border-paper/35 text-paper hover:border-sunny hover:text-sunny',
                )}
              >
                {value}
              </button>
            ))}
          </div>
          {anyAmount && (
            <p className="font-script text-sunny text-[22px] leading-tight lg:text-[26px]">
              {anyAmount}
            </p>
          )}
        </div>
      )}
    </>
  );
}

GiftCardStage.displayName = 'GiftCardStage';
