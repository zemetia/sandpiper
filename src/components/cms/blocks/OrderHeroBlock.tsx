import { ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';

import { copy } from '@/config/copy';
import type { OrderHeroBlock as OrderHeroData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';

import { LinkTo } from '../LinkTo';
import { OrderToggle } from '../order/OrderToggle';

/** Yellow "Hungry? Pick your way." intro: centred on desktop, left-aligned with a Pickup/Delivery switch on phones. */
export function OrderHeroBlock({ block, isFirst }: { block: OrderHeroData; isFirst: boolean }) {
  const Heading = isFirst ? 'h1' : 'h2';
  const menu = toLink(block.menuLink);
  const eyebrowShort = block.eyebrowShort || block.eyebrow;

  return (
    <section className="bg-sunny text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[18px] px-5 pt-10 pb-7 lg:items-center lg:gap-7 lg:px-16 lg:pt-28 lg:pb-[72px] lg:text-center">
        {block.eyebrow && (
          <p className="bg-ink text-paper font-ui inline-flex items-center gap-2 self-start rounded-full px-3.5 py-2 text-[11px] leading-[1.1] font-extrabold tracking-[0.11em] lg:gap-2.5 lg:self-center lg:px-[18px] lg:py-2.5 lg:text-sm lg:tracking-[0.1em]">
            <ShoppingBag aria-hidden strokeWidth={2.5} className="text-sunny size-3.5 lg:size-4" />
            <span className="lg:hidden">{eyebrowShort}</span>
            <span className="max-lg:hidden">{block.eyebrow}</span>
          </p>
        )}

        <Heading className="font-display leading-[0.95] font-extrabold tracking-[-0.027em]">
          {block.line1 && (
            <span className="block text-[60px] lg:text-[min(7.8vw,112px)]">{block.line1}</span>
          )}
          {block.line2 && (
            <span className="text-blue block text-[52px] lg:text-[min(7.8vw,112px)]">
              {block.line2}
            </span>
          )}
        </Heading>

        {block.body && (
          <p className="text-base leading-[1.5] lg:max-w-[640px] lg:text-[21px] lg:leading-[1.55]">
            {block.body}
          </p>
        )}

        <OrderToggle
          label={copy.order.switch}
          labels={{
            pickup: block.toggle?.pickup || copy.order.pickup,
            delivery: block.toggle?.delivery || copy.order.delivery,
          }}
        />

        {menu && (
          <LinkTo
            link={menu}
            className="font-ui group/menu inline-flex items-center justify-center gap-2 self-center text-sm font-extrabold tracking-[0.07em] uppercase underline-offset-4 hover:underline lg:text-[17px] lg:tracking-[0.06em]"
          >
            <BookOpen aria-hidden strokeWidth={2.25} className="size-4 lg:size-5" />
            {menu.label}
            <ArrowRight
              aria-hidden
              strokeWidth={2.25}
              className="size-4 transition-transform duration-200 group-hover/menu:translate-x-1 lg:size-5"
            />
          </LinkTo>
        )}
      </div>
    </section>
  );
}

OrderHeroBlock.displayName = 'OrderHeroBlock';
