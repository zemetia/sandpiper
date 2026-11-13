import type { GiftCardPanelsBlock as GiftCardPanelsData } from '@/payload-types';
import { cn } from '@/lib/cn';
import { toLink } from '@/services/cms.mappers';

import { GiftCardIcon, GiftPillLink } from '../gift-cards/primitives';

const tones = {
  sunny: { panel: 'bg-sunny', icon: 'bg-blue text-paper', pill: 'blue' },
  paper: { panel: 'bg-paper', icon: 'bg-ink text-sunny', pill: 'ink' },
} as const;

const displayUrl = (href: string) =>
  /^https?:\/\//.test(href) ? href.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

/** Two tilted action cards (buy / check balance) that hand off to the ordering partner. */
export function GiftCardPanelsBlock({ block }: { block: GiftCardPanelsData }) {
  const panels = block.panels ?? [];
  if (panels.length === 0) return null;

  return (
    <section className="container-wide grid gap-4 pt-2 pb-12 lg:grid-cols-2 lg:gap-6 lg:pt-0 lg:pb-[min(6.7vw,96px)]">
      {panels.map((panel, i) => {
        const tone = tones[panel.tone ?? 'sunny'];
        const link = toLink(panel.link);
        const url = link ? displayUrl(link.href) : null;
        return (
          <article
            key={panel.id ?? i}
            className={cn(
              'gc-rise border-ink flex flex-col gap-3 rounded-[22px] border-2 p-[22px] transition-[rotate,translate] duration-300 ease-out hover:-translate-y-1 lg:min-h-[min(30.5vw,440px)] lg:gap-[18px] lg:rounded-[28px] lg:p-[min(3vw,44px)] lg:hover:rotate-0',
              i % 2 === 0 ? 'lg:rotate-1' : 'lg:-rotate-1',
              tone.panel,
            )}
          >
            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-[18px]">
              <span
                className={cn(
                  'border-ink grid size-11 shrink-0 place-items-center rounded-full border-2 lg:size-16',
                  tone.icon,
                )}
              >
                <GiftCardIcon name={panel.icon} className="size-5 lg:size-7" />
              </span>
              {panel.eyebrow && (
                <p className="font-ui text-blue text-[11px] font-extrabold tracking-[0.164em] uppercase lg:text-[13px] lg:tracking-[0.154em]">
                  {panel.eyebrow}
                </p>
              )}
            </div>
            {panel.heading && (
              <h2 className="font-display text-ink text-[30px] leading-[1.2] font-extrabold tracking-[-0.033em] lg:text-[min(3.33vw,48px)] lg:leading-none">
                {panel.heading}
              </h2>
            )}
            {panel.body && (
              <p className="text-ink/80 lg:text-ink/85 max-w-[564px] text-sm leading-[1.5] lg:text-[17px] lg:leading-[1.55]">
                {panel.body}
              </p>
            )}
            {link && (
              <GiftPillLink
                link={link}
                tone={tone.pill}
                size="panel"
                className="w-full lg:w-auto lg:self-start"
              />
            )}
            {(panel.note || url) && (
              <p className="text-[12px] leading-[1.4] lg:text-[13px]">
                {panel.note && (
                  <span className={cn('text-slate', url && 'lg:hidden')}>{panel.note}</span>
                )}
                {url && (
                  <span className={cn('text-blue break-all', panel.note && 'max-lg:hidden')}>
                    {url}
                  </span>
                )}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}

GiftCardPanelsBlock.displayName = 'GiftCardPanelsBlock';
