import type { TestimonialsBlock as TestimonialsBlockData } from '@/payload-types';

import { SectionHeading } from '../SectionHeading';

export function TestimonialsBlock({ block }: { block: TestimonialsBlockData }) {
  const quotes = block.quotes ?? [];
  if (quotes.length === 0) return null;

  return (
    <section className="border-border/60 bg-surface/60 border-y">
      <div className="container-page py-16 md:py-24">
        <SectionHeading heading={block.heading} align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.id ?? q.author}
              className="border-border bg-background flex flex-col rounded-2xl border p-7"
            >
              <span aria-hidden="true" className="font-display text-primary text-5xl leading-none">
                &ldquo;
              </span>
              <blockquote className="font-display text-foreground mt-2 flex-1 text-lg leading-relaxed">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="text-foreground font-semibold">{q.author}</span>
                {q.source && <span className="text-foreground-subtle"> · {q.source}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsBlock.displayName = 'TestimonialsBlock';
