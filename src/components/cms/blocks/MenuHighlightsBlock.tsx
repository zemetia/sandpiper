import { copy } from '@/config/copy';

import Link from 'next/link';
import type { MenuHighlightsBlock as MenuHighlightsBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { MenuItemCard } from '../MenuItemCard';
import { SectionHeading } from '../SectionHeading';

export async function MenuHighlightsBlock({ block }: { block: MenuHighlightsBlockData }) {
  const items = await cmsService.getMenuHighlights(block);
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
            {copy.seeFullMenu} →
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
