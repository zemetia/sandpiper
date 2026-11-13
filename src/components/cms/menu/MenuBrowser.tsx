'use client';

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';
import { Bike, Search, Store, X } from 'lucide-react';

import { copy } from '@/config/copy';
import { cn } from '@/lib/cn';
import type { MenuCategoryVO } from '@/types/value-objects';

import { MenuCard } from './MenuCard';
import type { MenuCardOrder } from './MenuCard';

type Mode = 'pickup' | 'delivery';

export interface MenuOrderLink {
  label: string;
  href: string;
  newTab: boolean;
}

export interface MenuBrowserProps {
  /** Server-rendered left side of the yellow header (breadcrumb, title, hours). */
  intro: ReactNode;
  categories: MenuCategoryVO[];
  order: Partial<Record<Mode, MenuOrderLink>>;
  searchPlaceholder: string;
  categoriesLabel: string;
}

const MODE_KEY = 'sp-menu-mode';
const modes = [
  { id: 'pickup', Icon: Store },
  { id: 'delivery', Icon: Bike },
] as const;

/** Remembered channel from a previous visit — a per-browser convenience, fine if storage is blocked. */
const readSavedMode = (): Mode | null => {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    return saved === 'pickup' || saved === 'delivery' ? saved : null;
  } catch {
    return null;
  }
};
const noSubscribe = () => () => {};

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/**
 * The whole menu page below the site header. Data arrives once from the (cached) server render;
 * search, the Pickup/Delivery switch and the category scroll-spy all run on that data in the
 * browser, so nothing is refetched while browsing.
 */
export function MenuBrowser({
  intro,
  categories,
  order,
  searchPlaceholder,
  categoriesLabel,
}: MenuBrowserProps) {
  const available = modes.filter((m) => order[m.id]);
  const saved = useSyncExternalStore(noSubscribe, readSavedMode, () => null);
  const [picked, setPicked] = useState<Mode | null>(null);
  const preferred = picked ?? saved;
  const mode: Mode = preferred && order[preferred] ? preferred : (available[0]?.id ?? 'pickup');
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const [active, setActive] = useState(categories[0]?.slug);
  const chipBar = useRef<HTMLUListElement>(null);

  const pickMode = (m: Mode) => {
    setPicked(m);
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {
      // Storage blocked (private mode) — the choice just lasts for this visit.
    }
  };

  const shown = useMemo(() => {
    const q = normalize(deferred.trim());
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => normalize(`${i.name} ${i.description ?? ''}`).includes(q)),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, deferred]);

  const searching = deferred.trim().length > 0;
  const total = shown.reduce((n, c) => n + c.items.length, 0);

  // Light up the category nearest the top of the screen.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = shown.flatMap((c) => document.getElementById(c.slug) ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-25% 0px -70% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [shown]);

  // Keep the active chip in view inside the phone chip bar (horizontal scroll only).
  useEffect(() => {
    const bar = chipBar.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!bar || !chip) return;
    const inView =
      chip.offsetLeft >= bar.scrollLeft &&
      chip.offsetLeft + chip.offsetWidth <= bar.scrollLeft + bar.clientWidth;
    if (!inView) bar.scrollTo?.({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const link = order[mode];
  const cardOrder: MenuCardOrder | null = link
    ? { href: link.href, newTab: link.newTab, mode: link.label.toLowerCase() }
    : null;

  const searchBox = (
    <label className="bg-paper border-ink focus-within:ring-blue flex h-11 w-full items-center gap-2.5 rounded-full border-2 px-4 focus-within:ring-2 lg:h-[47px] lg:px-[18px]">
      <Search aria-hidden strokeWidth={2} className="text-slate size-[18px] shrink-0" />
      <span className="sr-only">{searchPlaceholder}</span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="text-ink placeholder:text-slate min-w-0 flex-1 bg-transparent text-sm outline-none lg:text-[15px] [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label={copy.menuPage.clearSearch}
          className="text-ink hover:bg-sunny-soft -mr-1.5 grid size-7 place-items-center rounded-full"
        >
          <X aria-hidden strokeWidth={2.25} className="size-4" />
        </button>
      )}
    </label>
  );

  return (
    <>
      <section className="bg-sunny text-ink lg:border-ink lg:border-b-2">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3.5 px-5 pt-7 pb-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-16 lg:pt-14 lg:pb-12">
          {intro}
          <div className="flex flex-col gap-3.5 lg:w-[380px] lg:shrink-0 lg:items-end lg:gap-3">
            {available.length > 1 && (
              <div
                role="group"
                aria-label={copy.order.switch}
                className="bg-paper border-ink grid h-11 grid-cols-2 rounded-full border-2 p-1 lg:inline-grid lg:grid-cols-[auto_auto]"
              >
                {available.map(({ id, Icon }) => {
                  const on = mode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickMode(id)}
                      className={cn(
                        'font-ui flex items-center justify-center gap-2 rounded-full text-[13px] font-extrabold tracking-[0.08em] uppercase transition-colors duration-200 lg:px-5',
                        on ? 'bg-ink text-paper' : 'text-ink hover:bg-sunny-soft',
                      )}
                    >
                      <Icon
                        aria-hidden
                        strokeWidth={2.25}
                        className={cn('size-4', on ? 'text-sunny' : 'text-ink')}
                      />
                      {order[id]?.label}
                    </button>
                  );
                })}
              </div>
            )}
            {searchBox}
          </div>
        </div>
      </section>

      {/* Phone: sticky ink chip bar under the 72px site header. */}
      <nav
        aria-label={copy.menuPage.categoriesNav}
        className="bg-ink sticky top-[72px] z-30 lg:hidden"
      >
        <ul ref={chipBar} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {shown.map((c) => {
            const on = active === c.slug;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.slug}`}
                  data-slug={c.slug}
                  aria-current={on ? 'true' : undefined}
                  onClick={() => setActive(c.slug)}
                  className={cn(
                    'font-ui block rounded-full border-[1.5px] px-4 py-[9px] text-xs leading-none font-extrabold tracking-[0.07em] whitespace-nowrap uppercase transition-colors',
                    on
                      ? 'bg-sunny border-sunny text-ink'
                      : 'border-paper/25 text-paper hover:border-paper/60',
                  )}
                >
                  {c.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-5 pt-7 pb-11 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:px-16 lg:pt-12 lg:pb-24">
          <nav
            aria-label={copy.menuPage.categoriesNav}
            className="max-lg:hidden lg:sticky lg:top-28 lg:self-start"
          >
            <p className="font-ui text-slate mb-2 text-xs font-extrabold tracking-[0.13em] uppercase">
              {categoriesLabel}
            </p>
            <ul className="flex flex-col gap-0.5">
              {shown.map((c) => {
                const on = active === c.slug;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.slug}`}
                      aria-current={on ? 'true' : undefined}
                      onClick={() => setActive(c.slug)}
                      className={cn(
                        'text-ink flex items-center justify-between gap-3 rounded-[10px] px-3.5 py-[11px] text-[15px] transition-colors',
                        on ? 'bg-sunny font-bold' : 'hover:bg-sunny-soft font-medium',
                      )}
                    >
                      {c.name}
                      <span
                        className={cn(
                          'text-[13px] font-medium tabular-nums',
                          on ? 'text-ink' : 'text-slate',
                        )}
                      >
                        {c.items.length}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex min-w-0 flex-col gap-9 lg:gap-16">
            <p
              aria-live="polite"
              className={cn(searching ? 'text-slate -mb-4 text-sm' : 'sr-only')}
            >
              {searching && total > 0 ? copy.menuPage.results(total) : ''}
            </p>

            {shown.length === 0 && (
              <div className="border-ink/30 flex flex-col items-start gap-4 rounded-2xl border-2 border-dashed p-8">
                <p className="text-ink text-base">
                  {searching ? copy.menuPage.noResults(deferred.trim()) : copy.menuEmpty}
                </p>
                {searching && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="font-ui bg-ink text-paper rounded-full px-4 py-2 text-xs font-extrabold tracking-[0.08em] uppercase"
                  >
                    {copy.menuPage.clearSearch}
                  </button>
                )}
              </div>
            )}

            {shown.map((c) => (
              <section
                key={c.id}
                id={c.slug}
                aria-labelledby={`${c.slug}-title`}
                className="scroll-mt-[64px] lg:scroll-mt-6"
              >
                <header className="flex flex-col gap-1.5 pb-2.5 lg:pb-5">
                  <h2
                    id={`${c.slug}-title`}
                    className="font-display text-ink text-[28px] leading-[1.05] font-extrabold tracking-[-0.035em] lg:text-4xl lg:tracking-[-0.028em]"
                  >
                    {c.name}
                  </h2>
                  {c.description && (
                    <p className="text-slate text-[13px] leading-normal lg:text-[15px]">
                      {c.description}
                    </p>
                  )}
                </header>
                <div className="lg:grid lg:grid-cols-2 lg:gap-5">
                  {c.items.map((item) => (
                    <MenuCard key={item.id} item={item} order={cardOrder} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

MenuBrowser.displayName = 'MenuBrowser';
