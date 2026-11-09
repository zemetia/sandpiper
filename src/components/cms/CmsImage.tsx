import Image from 'next/image';

import { cn } from '@/lib/cn';
import type { ImageVO } from '@/types/value-objects';

export interface CmsImageProps {
  image: ImageVO | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Fills its (relatively positioned) parent. Falls back to a branded gradient when no photo is set. */
export function CmsImage({ image, sizes, priority, className }: CmsImageProps) {
  if (!image) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'bg-surface-raised absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,var(--color-primary-subtle),transparent_60%),radial-gradient(100%_100%_at_0%_100%,var(--color-sea-subtle),transparent_60%)]',
          className,
        )}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
      style={{ objectPosition: image.position }}
    />
  );
}

CmsImage.displayName = 'CmsImage';
