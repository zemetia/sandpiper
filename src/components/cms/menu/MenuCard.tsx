import { Plus } from 'lucide-react';

import { copy } from '@/config/copy';
import { cn } from '@/lib/cn';
import type { MenuItemVO } from '@/types/value-objects';

import { CmsImage } from '../CmsImage';

export interface MenuCardOrder {
  href: string;
  newTab: boolean;
  /** Spoken mode for the + button label ("pickup" / "delivery"). */
  mode: string;
}

/**
 * One dish: a bordered card on desktop, a ruled row on phones (Pencil "Menu Item / Card" and
 * "Menu Item / Row (Mobile)"). The + button links to the order channel picked in the menu header.
 */
export function MenuCard({ item, order }: { item: MenuItemVO; order: MenuCardOrder | null }) {
  const soldOut = item.availability === 'soldOut';
  const badge = soldOut ? copy.menuPage.soldOut : item.badge;

  return (
    <article
      className={cn(
        'border-ink flex gap-3.5 border-b-[1.5px] py-3.5',
        'lg:bg-paper lg:min-h-[172px] lg:gap-4 lg:rounded-2xl lg:border-[1.5px] lg:p-4',
        soldOut && 'opacity-55',
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-1.5">
        <h3 className="font-display text-ink text-base leading-[1.15] font-extrabold lg:text-[19px]">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-slate text-[13px] leading-[1.45] lg:text-sm lg:leading-normal">
            {item.description}
          </p>
        )}
        <p className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          <span className="text-ink text-sm font-semibold tabular-nums lg:text-base">
            {item.price}
          </span>
          {item.compareAtPrice && (
            <s className="text-slate text-xs tabular-nums lg:text-sm">{item.compareAtPrice}</s>
          )}
          {badge && (
            <span
              className={cn(
                'font-ui text-paper rounded-full px-2 py-0.5 text-[9px] leading-none font-extrabold tracking-[0.09em] uppercase lg:px-[9px] lg:py-[3px] lg:text-[10px] lg:tracking-[0.08em]',
                soldOut ? 'bg-ink' : 'bg-berry',
              )}
            >
              {badge}
            </span>
          )}
        </p>
      </div>

      {item.image && (
        <div className="bg-sunny-soft relative size-[100px] shrink-0 overflow-hidden rounded-xl lg:size-[140px]">
          <CmsImage image={item.image} sizes="(min-width: 1024px) 140px, 100px" />
          {order && !soldOut && (
            <a
              href={order.href}
              {...(order.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={copy.menuPage.add(item.name, order.mode)}
              className="bg-paper border-ink text-ink hover:bg-sunny focus-visible:ring-blue absolute right-1.5 bottom-1.5 grid size-7 place-items-center rounded-full border-[1.5px] transition-[background-color,transform] duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:outline-none lg:right-2 lg:bottom-2 lg:size-8"
            >
              <Plus aria-hidden strokeWidth={2} className="size-4 lg:size-[18px]" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

MenuCard.displayName = 'MenuCard';
