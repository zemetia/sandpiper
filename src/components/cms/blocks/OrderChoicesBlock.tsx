import { ArrowUpRight, Bike, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { copy } from '@/config/copy';
import { cn } from '@/lib/cn';
import type { OrderChoicesBlock as OrderChoicesData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';

import { LinkTo } from '../LinkTo';
import { AppTile } from '../order/AppTile';
import { PromoCode } from '../order/PromoCode';

type Tone = 'paper' | 'blue';

function CardHead({
  Icon,
  tag,
  title,
  body,
  tone,
}: {
  Icon: LucideIcon;
  tag?: string | null;
  title?: string | null;
  body?: string | null;
  tone: Tone;
}) {
  const onBlue = tone === 'blue';
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="bg-sunny text-ink grid size-14 shrink-0 place-items-center rounded-full lg:size-[84px]">
          <Icon aria-hidden strokeWidth={2} className="size-7 lg:size-10" />
        </span>
        {tag && (
          <span
            className={cn(
              'font-ui rounded-full border-[2.5px] px-3 py-1.5 text-[11px] leading-none font-extrabold tracking-[0.1em] lg:px-4 lg:py-2 lg:text-[13px] lg:tracking-[0.09em]',
              onBlue ? 'border-paper text-paper' : 'border-ink text-ink',
            )}
          >
            {tag}
          </span>
        )}
      </div>
      {title && (
        <h2
          className={cn(
            'font-display text-[44px] leading-none font-extrabold tracking-[-0.03em] lg:mt-1 lg:text-[min(5vw,72px)]',
            onBlue ? 'text-paper' : 'text-ink',
          )}
        >
          {title}
        </h2>
      )}
      {body && (
        <p
          className={cn(
            'text-[15px] leading-[1.55] lg:text-[19px]',
            onBlue ? 'text-paper' : 'text-ink',
          )}
        >
          {body}
        </p>
      )}
    </>
  );
}

const card =
  'border-ink od-swap flex flex-col rounded-[24px] border-[3px] lg:gap-7 lg:rounded-[32px] lg:p-12';

/**
 * Two order paths: pickup through Toast (white card) and the delivery apps (blue card).
 * Desktop shows both side by side; phones show the one picked in the hero's `OrderToggle`.
 */
export function OrderChoicesBlock({ block }: { block: OrderChoicesData }) {
  const { pickup, delivery } = block;
  const toast = toLink(pickup?.link);
  const apps = delivery?.apps ?? [];

  return (
    <section className="bg-sunny">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 pb-10 lg:grid-cols-2 lg:gap-8 lg:px-16 lg:pb-[120px]">
        <article
          id="pickup"
          className={cn(
            card,
            'bg-paper text-ink gap-5 p-6 max-lg:in-data-[order-view=delivery]:hidden',
          )}
        >
          <CardHead
            Icon={Store}
            tag={pickup?.tag}
            title={pickup?.title}
            body={pickup?.body}
            tone="paper"
          />

          {pickup?.steps && pickup.steps.length > 0 && (
            <ol className="flex flex-col gap-3.5 py-2">
              {pickup.steps.map((step, i) => (
                <li key={step.id ?? i} className="flex items-center gap-3.5">
                  <span className="bg-ink text-sunny font-ui grid size-[34px] shrink-0 place-items-center rounded-full text-[15px] font-extrabold">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-medium lg:text-lg">{step.text}</span>
                </li>
              ))}
            </ol>
          )}

          {toast && (
            <div className="flex flex-col gap-5 lg:mt-auto lg:gap-7">
              <LinkTo
                link={toast}
                className="bg-blue text-paper font-ui group/toast hover:bg-blue-deep inline-flex h-[58px] items-center justify-center gap-3 rounded-full px-5 text-[15px] font-extrabold tracking-[0.065em] uppercase transition-[background-color,translate] duration-200 hover:-translate-y-0.5 active:translate-y-px lg:h-[66px] lg:text-lg lg:tracking-[0.055em]"
              >
                {toast.label}
                {toast.newTab && <span className="sr-only">{copy.order.newTab}</span>}
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={2.5}
                  className="size-[22px] transition-transform duration-200 group-hover/toast:translate-x-0.5 group-hover/toast:-translate-y-0.5"
                />
              </LinkTo>
              {pickup?.note && <p className="text-slate text-[13px] lg:text-sm">{pickup.note}</p>}
            </div>
          )}
        </article>

        <article
          id="delivery"
          className={cn(
            card,
            'bg-blue gap-4 px-4 py-6 max-lg:hidden max-lg:in-data-[order-view=delivery]:flex',
          )}
        >
          <CardHead
            Icon={Bike}
            tag={delivery?.tag}
            title={delivery?.title}
            body={delivery?.body}
            tone="blue"
          />

          {apps.length > 0 && (
            <ul className="flex flex-col gap-4 lg:gap-7">
              {apps.map((app, i) => (
                <li
                  key={app.id ?? i}
                  className="bg-paper group/app relative flex items-center gap-3 rounded-2xl p-3.5 transition-transform duration-200 hover:-translate-y-0.5 lg:gap-[18px] lg:rounded-[20px] lg:px-[22px] lg:py-5"
                >
                  <AppTile app={app.app} className="size-12 rounded-xl lg:size-16 lg:rounded-2xl" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-ink text-[17px] leading-[1.1] font-extrabold after:absolute after:inset-0 after:rounded-[inherit] lg:text-xl"
                    >
                      {app.name}
                      <span className="sr-only"> {copy.order.newTab}</span>
                    </a>
                    {app.description && (
                      <p className="text-slate text-[13px] leading-[1.45] lg:text-sm">
                        {app.description}
                      </p>
                    )}
                    {app.promoCode && <PromoCode code={app.promoCode} />}
                  </div>
                  <span
                    aria-hidden
                    className="bg-ink text-sunny group-hover/app:bg-blue grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200 lg:size-12"
                  >
                    <ArrowUpRight strokeWidth={2.5} className="size-[18px] lg:size-[22px]" />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {delivery?.note && (
            <p className="text-paper/70 text-[13px] leading-[1.4] lg:mt-auto lg:text-sm">
              {delivery.note}
            </p>
          )}
        </article>
      </div>
    </section>
  );
}

OrderChoicesBlock.displayName = 'OrderChoicesBlock';
