import { cn } from '@/lib/cn';
import type { HeroBlock as HeroBlockData } from '@/payload-types';
import { toImage, toLinks } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { CmsLink } from '../CmsLink';

export function HeroBlock({ block, isFirst }: { block: HeroBlockData; isFirst: boolean }) {
  const variant = block.variant ?? 'split';
  const links = toLinks(block.links);
  const image = toImage(block.image, 'hero');
  const Heading = isFirst ? 'h1' : 'h2';

  const copy = (
    <>
      {block.eyebrow && (
        <p className="text-primary mb-5 text-xs font-semibold tracking-[0.2em] uppercase">
          {block.eyebrow}
        </p>
      )}
      <Heading className="font-display text-foreground text-5xl leading-[1.02] font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
        {block.heading}
      </Heading>
      {block.subheading && (
        <p className="text-foreground-muted mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
          {block.subheading}
        </p>
      )}
      {links.length > 0 && (
        <div className="mt-9 flex flex-wrap gap-3">
          {links.map((l) => (
            <CmsLink key={l.href + l.label} link={l} />
          ))}
        </div>
      )}
    </>
  );

  if (variant === 'fullBleed') {
    return (
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
        <CmsImage image={image} sizes="100vw" priority={isFirst} className="-z-20" />
        <div
          aria-hidden="true"
          className="from-background via-background/70 to-background/10 absolute inset-0 -z-10 bg-gradient-to-t"
        />
        <div className="container-page pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl">{copy}</div>
        </div>
      </section>
    );
  }

  if (variant === 'minimal') {
    return (
      <section className="border-border/60 relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="bg-primary-subtle pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full blur-3xl"
        />
        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-3xl">{copy}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div className={cn('order-2 lg:order-1')}>{copy}</div>
      <div className="border-border relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] border lg:order-2">
        <CmsImage image={image} sizes="(min-width: 1024px) 45vw, 100vw" priority={isFirst} />
        {!image && (
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="text-primary/60 absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2"
          >
            <path
              fill="currentColor"
              d="M7 19.5c2.6 0 4-1.6 5.5-3.4C14.4 13.8 16.4 11 21 11c2 0 3.4.6 4.5 1.4-1.6-.2-3 .4-3.9 1.6l-2.4 3.2c-1.6 2.1-3.7 3.3-6.7 3.3H7Z"
            />
          </svg>
        )}
      </div>
    </section>
  );
}

HeroBlock.displayName = 'HeroBlock';
