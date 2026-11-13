import type { FaqBlock as FaqBlockData } from '@/payload-types';

import { SectionHeading } from '../SectionHeading';

/** Native <details> — accessible and zero JS. FAQPage JSON-LD is emitted by CmsPage. */
export function FaqBlock({ block }: { block: FaqBlockData }) {
  const items = block.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading heading={block.heading} />
        <div className="divide-border border-border divide-y border-y">
          {items.map((item) => (
            <details key={item.id ?? item.question} className="group py-5">
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="border-border text-foreground-muted grid size-8 shrink-0 place-items-center rounded-full border transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-foreground-muted mt-3 max-w-2xl leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqBlock.displayName = 'FaqBlock';
