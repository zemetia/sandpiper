import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import type { MenuItemVO, MenuTag } from '@/types/value-objects';

import { CmsImage } from './CmsImage';

const HIGHLIGHT_TAGS: ReadonlySet<MenuTag> = new Set(['signature', 'new']);

export interface MenuItemCardProps {
  item: MenuItemVO;
  /** Compact rows are used on the full menu; cards (with photo) on highlights. */
  layout?: 'card' | 'row';
}

export async function MenuItemCard({ item, layout = 'card' }: MenuItemCardProps) {
  const t = await getTranslations('site');
  const soldOut = item.availability === 'soldOut';

  const badges = (
    <div className="flex flex-wrap gap-1.5">
      {item.availability !== 'available' && (
        <Badge size="sm" variant={soldOut ? 'destructive' : 'warning'}>
          {soldOut ? t('soldOut') : t('seasonal')}
        </Badge>
      )}
      {item.tags.map((tag) => (
        <Badge key={tag} size="sm" variant={HIGHLIGHT_TAGS.has(tag) ? 'default' : 'secondary'}>
          {t(`tags.${tag}`)}
        </Badge>
      ))}
    </div>
  );

  const price = (
    <div className="shrink-0 text-right">
      {item.compareAtPrice && (
        <span className="text-foreground-subtle mr-2 text-sm line-through">
          {item.compareAtPrice}
        </span>
      )}
      <span className="text-foreground font-semibold tabular-nums">{item.price}</span>
    </div>
  );

  const variants = item.variants.length > 0 && (
    <p className="text-foreground-subtle text-sm tabular-nums">
      {item.variants.map((v) => `${v.label} ${v.price}`).join('  ·  ')}
    </p>
  );

  if (layout === 'row') {
    return (
      <article id={item.slug} className={cn('flex gap-4 py-5', soldOut && 'opacity-55')}>
        {item.image && (
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl md:size-24">
            <CmsImage image={item.image} sizes="96px" />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-foreground text-lg font-semibold">{item.name}</h3>
            <span
              aria-hidden="true"
              className="border-border-strong mx-1 hidden flex-1 border-b border-dotted sm:block"
            />
            {price}
          </div>
          {item.description && (
            <p className="text-foreground-muted text-sm leading-relaxed">{item.description}</p>
          )}
          {variants}
          {(item.tags.length > 0 || item.availability !== 'available') && (
            <div className="pt-1">{badges}</div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      id={item.slug}
      className={cn(
        'group border-border bg-surface hover:border-border-strong flex flex-col overflow-hidden rounded-2xl border transition-colors',
        soldOut && 'opacity-60',
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CmsImage
          image={item.image}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-foreground text-xl font-semibold">{item.name}</h3>
          {price}
        </div>
        {item.description && (
          <p className="text-foreground-muted text-sm leading-relaxed">{item.description}</p>
        )}
        {variants}
        <div className="mt-auto pt-2">{badges}</div>
      </div>
    </article>
  );
}
