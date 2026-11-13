import { cn } from '@/lib/cn';
import type { GalleryBlock as GalleryBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { SectionHeading } from '../SectionHeading';

export function GalleryBlock({ block }: { block: GalleryBlockData }) {
  const images = (block.images ?? []).map((m) => toImage(m, 'card')).filter((i) => i !== null);
  if (images.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading heading={block.heading} />
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4">
        {images.map((image, i) => (
          <figure
            key={image.url}
            className={cn(
              'relative overflow-hidden rounded-2xl',
              i % 5 === 0 && 'col-span-2 row-span-2',
            )}
          >
            <CmsImage image={image} sizes="(min-width: 768px) 25vw, 50vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}

GalleryBlock.displayName = 'GalleryBlock';
