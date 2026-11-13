import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import type { CoffeeOrbitBlock as CoffeeOrbitBlockData } from '@/payload-types';
import { toImage, toLink } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';

/**
 * Tags sit on the ring, starting at 12 o'clock and going clockwise. `--orbit-r` is the radius as a
 * share of the box — smaller on phones so the side tags stay on screen.
 */
const ringPoint = (i: number, count: number) => {
  const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
  const at = (v: number) => `calc(50% + ${v.toFixed(4)} * var(--orbit-r))`;
  return { left: at(Math.cos(angle)), top: at(Math.sin(angle)) };
};

export async function CoffeeOrbitBlock({
  block,
  locale,
}: {
  block: CoffeeOrbitBlockData;
  locale: Locale;
}) {
  const [drinks, t] = await Promise.all([
    cmsService.getMenuItemsByIds(block.drinks, locale),
    getTranslations('site'),
  ]);
  const cup = toImage(block.image, 'card');
  const noteLink = toLink(block.note?.link);
  const seal = block.seal;

  return (
    <section className="bg-blue relative overflow-hidden py-14 lg:min-h-[min(54.7vw,788px)] lg:py-0">
      <div className="container-wide relative lg:min-h-[min(54.7vw,788px)]">
        <h2 className="font-display text-[clamp(40px,13vw,54px)] leading-[0.98] tracking-[-0.037em] lg:absolute lg:top-[min(4.4vw,64px)] lg:text-[min(5.5vw,79px)]">
          <span className="text-sunny block font-extrabold">{block.headingBold}</span>{' '}
          {block.headingLight && (
            <span className="text-paper block font-light">{block.headingLight}</span>
          )}
        </h2>

        <div className="relative mx-auto mt-14 aspect-square w-[min(80vw,330px)] lg:absolute lg:top-[min(8.5vw,122px)] lg:left-1/2 lg:mt-0 lg:w-[min(41vw,590px)] lg:-translate-x-1/2">
          <div
            aria-hidden="true"
            className="border-sunny-soft/45 absolute inset-0 rounded-full border-2"
          />
          <div className="border-ink bg-sunny absolute inset-[22%] overflow-hidden rounded-full border-2 lg:inset-[23.7%]">
            {cup && (
              <CmsImage
                image={cup}
                sizes="(min-width: 1024px) 310px, 180px"
                className="scale-[0.82] object-contain"
              />
            )}
          </div>

          {drinks.length > 0 && (
            <ul
              aria-label={t('orbit')}
              className="orbit-ring animate-orbit absolute inset-0 [--orbit-r:40%] lg:[--orbit-r:50%]"
            >
              {drinks.map((d, i) => (
                <li
                  key={d.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={ringPoint(i, drinks.length)}
                >
                  <span className="orbit-tag animate-orbit-reverse bg-ink border-sunny font-ui flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-[13px] font-extrabold whitespace-nowrap lg:gap-2.5 lg:px-4 lg:py-2 lg:text-base">
                    <span className="text-paper tracking-[0.08em] uppercase">{d.name}</span>
                    <span className="text-sunny">{d.price}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-14 flex items-end justify-between gap-4 lg:contents">
          {block.note?.heading && (
            <div className="bg-sunny-soft border-ink sticker-pop max-w-[230px] -rotate-3 rounded-2xl border-2 px-[18px] py-4 lg:absolute lg:bottom-[min(5.3vw,76px)] lg:left-[min(4vw,58px)] lg:max-w-[280px] lg:px-6 lg:py-5">
              <p className="font-display text-ink text-lg leading-tight font-extrabold lg:text-xl">
                {block.note.heading}
              </p>
              {noteLink && (
                <LinkTo
                  link={noteLink}
                  className="text-blue mt-1.5 inline-block text-sm underline-offset-4 hover:underline lg:text-base"
                >
                  {noteLink.label}
                </LinkTo>
              )}
            </div>
          )}
          {seal?.middle && (
            <span className="bg-paper border-ink sticker-pop grid size-[112px] shrink-0 rotate-[8deg] place-content-center rounded-full border-2 text-center lg:absolute lg:right-[min(4.4vw,64px)] lg:bottom-[min(2vw,28px)] lg:size-[min(12.6vw,182px)]">
              {seal.top && (
                <span className="font-ui text-ink text-[9px] font-extrabold tracking-[0.16em] uppercase lg:text-[13px]">
                  {seal.top}
                </span>
              )}
              <span className="font-display text-blue text-[22px] leading-tight font-extrabold lg:text-[34px]">
                {seal.middle}
              </span>
              {seal.bottom && (
                <span className="font-ui text-ink text-[9px] font-extrabold tracking-[0.16em] uppercase lg:text-[13px]">
                  {seal.bottom}
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

CoffeeOrbitBlock.displayName = 'CoffeeOrbitBlock';
