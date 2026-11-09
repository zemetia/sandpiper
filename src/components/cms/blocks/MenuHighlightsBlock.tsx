import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { MenuHighlightsBlock as MenuHighlightsBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { MenuItemCard } from '../MenuItemCard';
import { SectionHeading } from '../SectionHeading';

export async function MenuHighlightsBlock({
  block,
  locale,
}: {
  block: MenuHighlightsBlockData;
  locale: Locale;
}) {
  const [items, t] = await Promise.all([
    cmsService.getMenuHighlights(block, locale),
    getTranslations('site'),
  ]);
  if (items.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading heading={block.heading} intro={block.intro} />
        {block.showMenuLink && (
          <Link
            href="/menu"
            className="text-primary mb-10 text-sm font-semibold underline-offset-4 transition-colors hover:underline"
          >
            {t('seeFullMenu')} →
          </Link>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

MenuHighlightsBlock.displayName = 'MenuHighlightsBlock';
