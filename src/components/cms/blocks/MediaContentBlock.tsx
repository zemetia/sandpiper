import { cn } from '@/lib/cn';
import type { MediaContentBlock as MediaContentBlockData } from '@/payload-types';
import { toImage, toLinks } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { CmsLink } from '../CmsLink';
import { RichText } from '../RichText';
import { SectionHeading } from '../SectionHeading';

export function MediaContentBlock({ block }: { block: MediaContentBlockData }) {
  const links = toLinks(block.links);
  return (
    <section className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <div
        className={cn(
          'border-border relative aspect-[5/4] overflow-hidden rounded-[2rem] border',
          block.imagePosition === 'right' && 'md:order-2',
        )}
      >
        <CmsImage image={toImage(block.image, 'card')} sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div>
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} className="mb-6" />
        <RichText data={block.body} />
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <CmsLink key={l.href + l.label} link={l} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

MediaContentBlock.displayName = 'MediaContentBlock';
