import { cn } from '@/lib/cn';
import type { AboutGalleryBlock as AboutGalleryBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { StoryEyebrow } from '../story/primitives';

type Photo = NonNullable<AboutGalleryBlockData['photos']>[number];

function Tile({ photo, className, sizes }: { photo: Photo; className?: string; sizes: string }) {
  return (
    <figure
      className={cn(
        'ct-reveal group border-ink relative overflow-hidden rounded-[20px] border-2',
        className,
      )}
    >
      <CmsImage
        image={toImage(photo.image, 'card')}
        sizes={sizes}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      {photo.caption && (
        <figcaption className="bg-paper border-ink text-ink absolute bottom-3 left-3 rounded-full border-2 px-3 py-1 text-xs font-semibold lg:bottom-4 lg:left-4 lg:px-3.5 lg:py-1.5 lg:text-[13px]">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Two-row photo grid: three wide tiles over four shorter ones (column widths from the design). */
export function AboutGalleryBlock({ block }: { block: AboutGalleryBlockData }) {
  const photos = block.photos ?? [];
  const top = photos.slice(0, 3);
  const bottom = photos.slice(3, 7);

  return (
    <section className="bg-sunny-soft py-16 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide">
        <div className="ct-reveal flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {block.eyebrow && <StoryEyebrow className="text-berry">{block.eyebrow}</StoryEyebrow>}
            {block.heading && (
              <h2 className="font-display text-ink mt-3 text-[40px] leading-none font-extrabold tracking-[-0.03em] lg:mt-4 lg:text-[min(5vw,72px)] lg:tracking-[-0.021em]">
                {block.heading}
              </h2>
            )}
          </div>
          {block.note && (
            <p className="font-script text-blue text-2xl font-bold lg:pb-1 lg:text-[34px]">
              {block.note}
            </p>
          )}
        </div>

        {photos.length > 0 && (
          <div className="mt-8 flex flex-col gap-3 lg:mt-14 lg:gap-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[560fr_412fr_300fr] lg:gap-5">
              {top.map((p, i) => (
                <Tile
                  key={p.id ?? i}
                  photo={p}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className={cn(
                    'aspect-[3/4] lg:aspect-auto lg:h-[min(30.6vw,440px)]',
                    i === 0 && 'col-span-2 aspect-[4/3] lg:col-span-1',
                  )}
                />
              ))}
            </div>
            {bottom.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-[280fr_332fr_300fr_340fr] lg:gap-5">
                {bottom.map((p, i) => (
                  <Tile
                    key={p.id ?? i}
                    photo={p}
                    sizes="(min-width: 1024px) 340px, 50vw"
                    className="aspect-[3/4] lg:aspect-auto lg:h-[min(23.6vw,340px)]"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

AboutGalleryBlock.displayName = 'AboutGalleryBlock';
