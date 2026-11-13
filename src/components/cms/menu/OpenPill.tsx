'use client';

import { useEffect, useState } from 'react';

import { copy } from '@/config/copy';
import { cn } from '@/lib/cn';
import { isOpenAt } from '@/lib/hours';

/**
 * OPEN NOW / CLOSED pill in café time. Starts from the server's answer and re-checks every
 * minute, so a tab left open across opening time flips on its own.
 */
export function OpenPill({
  opens,
  closes,
  initial,
}: {
  opens: string;
  closes: string;
  initial: boolean;
}) {
  const [open, setOpen] = useState(initial);

  useEffect(() => {
    const check = () => setOpen(isOpenAt(opens, closes, new Date()));
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, [opens, closes]);

  return (
    <span className="bg-ink text-paper font-ui inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[10px] leading-none font-extrabold tracking-[0.08em] lg:gap-2 lg:px-3 lg:py-1.5 lg:text-xs">
      <span
        aria-hidden
        className={cn('size-[7px] rounded-full lg:size-2', open ? 'bg-success' : 'bg-paper/40')}
      />
      {open ? copy.menuPage.open : copy.menuPage.closed}
    </span>
  );
}

OpenPill.displayName = 'OpenPill';
