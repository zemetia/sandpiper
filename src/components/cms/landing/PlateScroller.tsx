'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface PlateScrollerProps {
  children: ReactNode;
  count: number;
  dragLabel: string;
  label: string;
  className?: string;
}

/**
 * Horizontal plate row: native scroll + snap on touch, click-and-drag on desktop with a round
 * "DRAG →" cursor that follows the pointer, and pager dots on mobile.
 */
export function PlateScroller({
  children,
  count,
  dragLabel,
  label,
  className,
}: PlateScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPage(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [count]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    setCursor({ x: e.clientX - box.left, y: e.clientY - box.top });
    const d = drag.current;
    if (!d) return;
    ref.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => {
    drag.current = null;
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => {
          endDrag();
          setCursor(null);
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain select-none lg:cursor-none lg:snap-none"
      >
        {children}
      </div>

      <span
        aria-hidden="true"
        className="bg-blue text-paper font-ui pointer-events-none absolute z-10 hidden size-[118px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full text-[15px] font-extrabold uppercase lg:flex"
        style={
          cursor ? { left: cursor.x, top: cursor.y } : { left: 'min(72vw, 1044px)', top: '62%' }
        }
      >
        {dragLabel}
        <ArrowRight className="size-4" strokeWidth={3} />
      </span>

      {count > 1 && (
        <div aria-hidden="true" className="mt-6 flex justify-center gap-2 lg:hidden">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={cn(
                'h-2 rounded-full transition-all',
                i === page ? 'bg-ink w-6' : 'bg-ink/25 w-2',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

PlateScroller.displayName = 'PlateScroller';
