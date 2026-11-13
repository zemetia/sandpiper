'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';
import type { LinkVO, MenuBoardCategoryVO } from '@/types/value-objects';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { Sticker, pillVariants } from './primitives';

export interface MenuBoardTabsProps {
  categories: MenuBoardCategoryVO[];
  stickerLabel: string | null;
  menuLink: LinkVO | null;
}

/** Big diner-board category words (desktop) / chip scroller (mobile) driving one shared panel. */
export function MenuBoardTabs({ categories, stickerLabel, menuLink }: MenuBoardTabsProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = categories[active];
  if (!current) return null;

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const featured = current.featured;

  return (
    <div className="mt-6 lg:mt-[min(3.1vw,45px)] lg:grid lg:grid-cols-[min(31.25vw,450px)_minmax(0,464px)] lg:items-start">
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:items-start lg:gap-[26px] lg:overflow-visible lg:px-0"
      >
        {categories.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'font-display flex shrink-0 items-center gap-2 font-extrabold uppercase transition-colors',
                'border-ink h-12 rounded-full border-2 px-5 text-[17px]',
                'lg:h-16 lg:rounded-[8px] lg:border-0 lg:px-3.5 lg:text-[min(3.05vw,44px)] lg:tracking-[-0.03em]',
                selected
                  ? 'bg-sunny text-ink'
                  : 'bg-paper text-ink/60 hover:text-ink border-ink/25 lg:text-ink/35 lg:bg-transparent',
              )}
            >
              {selected && (
                <Check aria-hidden="true" className="size-4 lg:hidden" strokeWidth={3} />
              )}
              {c.name}
              {selected && (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden size-[min(2.6vw,37px)] lg:block"
                  strokeWidth={2.5}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="lg:contents"
      >
        <div className="relative mx-auto mt-8 w-[min(76vw,340px)] lg:absolute lg:top-[min(7.6vw,110px)] lg:left-[71.3%] lg:mx-0 lg:mt-0 lg:w-[min(43vw,619px)]">
          <div className="border-ink bg-sunny-soft relative aspect-square overflow-hidden rounded-full border-2">
            <CmsImage
              key={current.id}
              image={current.image}
              sizes="(min-width: 1024px) 619px, 76vw"
              className="animate-[slide-in_0.4s_ease-out]"
            />
          </div>
          {featured && (
            <Sticker
              key={`sticker-${current.id}`}
              tone="berry"
              rotate={-10}
              className="absolute bottom-[14%] -left-[12%] lg:-left-[2%]"
            >
              <span className="flex flex-col px-4 py-2.5 lg:px-6 lg:py-3.5">
                {stickerLabel && (
                  <span className="font-ui text-[11px] font-extrabold tracking-[0.15em] uppercase lg:text-[13px]">
                    {stickerLabel}
                  </span>
                )}
                <span className="font-display text-xl leading-tight font-extrabold lg:text-[26px]">
                  {featured.name} · {featured.price}
                </span>
              </span>
            </Sticker>
          )}
        </div>

        <div className="mt-10 lg:mt-0">
          <ul
            key={current.id}
            className="animate-[slide-in_0.35s_ease-out] space-y-6 lg:space-y-[31px]"
          >
            {current.items.map((item) => (
              <li key={item.id}>
                <div className="flex items-baseline gap-3 lg:gap-4">
                  <span className="font-display text-ink text-xl font-extrabold lg:text-[26px]">
                    {item.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="border-ink/30 flex-1 -translate-y-[0.3em] border-b-[1.5px]"
                  />
                  <span className="font-display text-blue text-xl font-extrabold lg:text-[26px]">
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="text-slate mt-0.5 text-sm lg:text-[15px]">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
          {menuLink && (
            <>
              <LinkTo
                link={menuLink}
                className={cn(
                  pillVariants({ variant: 'outline', size: 'md' }),
                  'mt-9 w-full lg:hidden',
                )}
              >
                {menuLink.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </LinkTo>
              <LinkTo
                link={menuLink}
                className="text-blue mt-[min(8.3vw,120px)] hidden text-lg font-semibold underline-offset-4 hover:underline lg:inline-block"
              >
                {menuLink.label} →
              </LinkTo>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

MenuBoardTabs.displayName = 'MenuBoardTabs';
