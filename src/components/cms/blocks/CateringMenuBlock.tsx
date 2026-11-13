import { Leaf } from 'lucide-react';
import { copy } from '@/config/copy';

import { cn } from '@/lib/cn';
import type { CateringMenuBlock as CateringMenuBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { CateringMenuChips } from '../catering/CateringMenuChips';
import { Eyebrow } from '../landing/primitives';

type Category = NonNullable<CateringMenuBlockData['categories']>[number];

const pad = (n: number) => String(n).padStart(2, '0');

function CategoryCard({ category, index, id }: { category: Category; index: number; id: string }) {
  const image = toImage(category.image, 'thumbnail');
  const items = category.items ?? [];
  // Checkerboard on desktop (white · yellow / yellow · white); the same order reads fine stacked.
  const soft = index % 4 === 1 || index % 4 === 2;

  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        'ct-reveal ct-lift border-ink flex scroll-mt-6 flex-col gap-[18px] rounded-3xl border-2 p-5 lg:gap-6 lg:p-8',
        soft ? 'bg-sunny-soft' : 'bg-paper',
      )}
    >
      <header className="flex items-center gap-3.5 lg:gap-5">
        <div className="border-ink bg-sunny-soft relative size-16 shrink-0 overflow-hidden rounded-full border-2 lg:size-24">
          <CmsImage image={image} sizes="(min-width: 1024px) 96px, 64px" />
        </div>
        <div>
          <p className="font-ui text-berry text-[11px] font-extrabold tracking-[0.12em] lg:text-[13px]">
            {pad(index + 1)}
          </p>
          <h3
            id={`${id}-title`}
            className="font-display text-ink mt-0.5 text-2xl leading-tight font-extrabold tracking-[-0.03em] lg:mt-1 lg:text-4xl"
          >
            {category.title}
          </h3>
        </div>
      </header>
      {items.length > 0 && (
        <ul className="flex flex-col gap-3.5 lg:gap-[18px]">
          {items.map((item) => (
            <li key={item.id ?? item.name}>
              <div className="font-display flex items-end gap-2.5 text-base leading-tight font-extrabold lg:text-[21px]">
                <span className="text-ink">{item.name}</span>
                <span aria-hidden="true" className="border-ink/30 mb-1.5 flex-1 border-b-2" />
                <span className="text-blue whitespace-nowrap">{item.price}</span>
              </div>
              {item.description && (
                <p className="text-slate mt-[3px] text-[13px] lg:text-sm">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export async function CateringMenuBlock({ block }: { block: CateringMenuBlockData }) {
  const categories = block.categories ?? [];
  if (categories.length === 0) return null;
  const ids = categories.map((_, i) => `catering-menu-${i + 1}`);

  return (
    <section className="bg-paper py-12 lg:py-24">
      <div className="container-wide">
        <header className="ct-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            {block.eyebrow && (
              <Eyebrow className="text-[13px] tracking-[0.15em] lg:text-sm lg:tracking-[0.14em]">
                {block.eyebrow}
              </Eyebrow>
            )}
            {block.heading && (
              <h2 className="font-display text-ink mt-5 max-w-[11ch] text-[50px] leading-[0.95] font-extrabold tracking-[-0.04em] uppercase lg:mt-3 lg:max-w-none lg:text-[min(6.1vw,88px)] lg:tracking-[-0.034em]">
                {block.heading}
              </h2>
            )}
          </div>
          {block.intro && (
            <p className="text-slate max-w-[400px] text-[15px] leading-[1.55] lg:text-[17px]">
              {block.intro}
            </p>
          )}
        </header>

        <div className="mt-5 lg:hidden">
          <CateringMenuChips
            label={copy.catering.jumpToCategory}
            chips={categories.map((c, i) => ({
              id: ids[i] as string,
              label: c.shortLabel || c.title || pad(i + 1),
            }))}
          />
        </div>

        <div className="mt-5 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {categories.map((c, i) => (
            <CategoryCard key={c.id ?? i} category={c} index={i} id={ids[i] as string} />
          ))}
        </div>

        {block.note && (
          <p className="text-slate mt-5 flex items-start justify-center gap-2.5 text-center text-[13px] leading-[1.55] lg:mt-12 lg:items-center lg:text-[15px]">
            <Leaf aria-hidden="true" className="text-blue size-[18px] shrink-0 max-lg:hidden" />
            {block.note}
          </p>
        )}
      </div>
    </section>
  );
}

CateringMenuBlock.displayName = 'CateringMenuBlock';
