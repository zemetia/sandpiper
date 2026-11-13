'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

export interface CateringMenuChipsProps {
  chips: { id: string; label: string }[];
  label: string;
}

/** Phone-only jump chips; the chip of the category card nearest the top of the screen lights up. */
export function CateringMenuChips({ chips, label }: CateringMenuChipsProps) {
  const [active, setActive] = useState(chips[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = chips.flatMap((c) => document.getElementById(c.id) ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [chips]);

  return (
    <nav aria-label={label} className="no-scrollbar -mr-5 overflow-x-auto lg:hidden">
      <ul className="flex w-max gap-2 pr-5">
        {chips.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? 'true' : undefined}
              onClick={() => setActive(c.id)}
              className={cn(
                'font-display flex h-[42px] items-center rounded-full border-2 px-4 text-base font-extrabold transition-colors',
                active === c.id
                  ? 'bg-sunny border-ink text-ink'
                  : 'border-ink/25 text-ink/60 hover:border-ink hover:text-ink',
              )}
            >
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

CateringMenuChips.displayName = 'CateringMenuChips';
