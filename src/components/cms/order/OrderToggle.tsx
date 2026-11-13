'use client';

import { useEffect, useState } from 'react';
import { Bike, Store } from 'lucide-react';

import { cn } from '@/lib/cn';

const tabs = [
  { id: 'pickup', Icon: Store },
  { id: 'delivery', Icon: Bike },
] as const;

type TabId = (typeof tabs)[number]['id'];

/**
 * Phone-only Pickup / Delivery switch. The order cards live in another block, so the choice is
 * published as `data-order-view` on `<html>`; `OrderChoicesBlock` shows only the matching card below `lg`.
 */
export function OrderToggle({ labels, label }: { labels: Record<TabId, string>; label: string }) {
  const [active, setActive] = useState<TabId>('pickup');

  useEffect(() => {
    const root = document.documentElement;
    root.dataset['orderView'] = active;
    return () => {
      delete root.dataset['orderView'];
    };
  }, [active]);

  return (
    <div
      role="group"
      aria-label={label}
      className="bg-paper border-ink grid h-[52px] grid-cols-2 rounded-full border-[2.5px] p-[3px] lg:hidden"
    >
      {tabs.map(({ id, Icon }) => {
        const on = active === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            aria-controls={id}
            onClick={() => setActive(id)}
            className={cn(
              'font-ui flex items-center justify-center gap-2 rounded-full text-sm font-extrabold tracking-[0.1em] transition-colors duration-200',
              on ? 'bg-ink text-paper' : 'text-ink',
            )}
          >
            <Icon
              aria-hidden
              strokeWidth={2.25}
              className={cn('size-[18px]', on ? 'text-sunny' : 'text-ink')}
            />
            {labels[id]}
          </button>
        );
      })}
    </div>
  );
}
