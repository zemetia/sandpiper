import { copy } from '@/config/copy';

import type { FullMenuBlock as FullMenuBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { MenuItemCard } from '../MenuItemCard';
import { SectionHeading } from '../SectionHeading';

export async function FullMenuBlock({ block }: { block: FullMenuBlockData }) {
  const menu = await cmsService.getMenu();

  const picked = (block.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c));
  const categories = menu
    .filter((c) => picked.length === 0 || picked.includes(c.id))
    .map((c) => ({
      ...c,
      items: block.showSoldOut ? c.items : c.items.filter((i) => i.availability !== 'soldOut'),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <section className="container-page py-12 md:py-16">
      <SectionHeading heading={block.heading} intro={block.intro} />

      {categories.length === 0 ? (
        <p className="border-border text-foreground-muted rounded-2xl border border-dashed p-10 text-center">
          {copy.menuEmpty}
        </p>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav aria-label={copy.jumpToSection} className="lg:sticky lg:top-28 lg:self-start">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
              {categories.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.slug}`}
                    className="border-border text-foreground-muted hover:border-border-strong hover:text-foreground block rounded-full border px-4 py-2 text-sm transition-colors lg:rounded-lg lg:border-transparent lg:px-3"
                  >
                    {c.name}
                    <span className="text-foreground-subtle ml-2 tabular-nums">
                      {c.items.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {categories.map((c) => (
              <section
                key={c.id}
                id={c.slug}
                aria-labelledby={`${c.slug}-title`}
                className="scroll-mt-6"
              >
                <header className="border-border mb-2 border-b pb-4">
                  <h2
                    id={`${c.slug}-title`}
                    className="font-display text-foreground text-3xl font-semibold tracking-tight"
                  >
                    {c.name}
                  </h2>
                  {c.description && <p className="text-foreground-muted mt-1">{c.description}</p>}
                </header>
                <div className="divide-border/70 divide-y">
                  {c.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} layout="row" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

FullMenuBlock.displayName = 'FullMenuBlock';
