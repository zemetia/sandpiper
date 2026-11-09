import { cn } from '@/lib/cn';
import type { ContentBlock as ContentBlockData } from '@/payload-types';

import { RichText } from '../RichText';

export function ContentBlock({ block }: { block: ContentBlockData }) {
  return (
    <section className="container-page py-16 md:py-20">
      <RichText
        data={block.body}
        className={cn('mx-auto', block.width === 'wide' ? 'max-w-5xl' : 'max-w-2xl')}
      />
    </section>
  );
}

ContentBlock.displayName = 'ContentBlock';
