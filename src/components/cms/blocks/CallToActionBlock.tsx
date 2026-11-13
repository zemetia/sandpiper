import type { CallToActionBlock as CallToActionBlockData } from '@/payload-types';
import { toLinks } from '@/services/cms.mappers';

import { CmsLink } from '../CmsLink';

export function CallToActionBlock({ block }: { block: CallToActionBlockData }) {
  const links = toLinks(block.links);
  return (
    <section className="container-page py-16 md:py-24">
      <div className="bg-primary text-primary-foreground relative isolate overflow-hidden rounded-[2rem] px-8 py-14 md:px-16 md:py-20">
        <div
          aria-hidden="true"
          className="bg-sea/40 absolute -right-24 -bottom-24 -z-10 size-80 rounded-full blur-3xl"
        />
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
            {block.heading}
          </h2>
          {block.body && <p className="mt-4 text-lg leading-relaxed opacity-80">{block.body}</p>}
        </div>
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <CmsLink
                key={l.href + l.label}
                link={l}
                className={
                  i === 0
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-none'
                    : 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10'
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

CallToActionBlock.displayName = 'CallToActionBlock';
