import { ArrowRight, ArrowUpRight, Coffee, Croissant, Sandwich, Sparkle } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { CateringHeroBlock as CateringHeroBlockData } from '@/payload-types';
import { toImage, toLinks } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { cateringIcon } from '../catering/icons';
import { pillVariants } from '../landing/primitives';

/** Faint doodles — px positions on the 1440 × 732 desktop artboard, as % of the hero. */
const DOODLES = [
  { Icon: Sandwich, x: 44.4, y: 5.5, r: 8, mobile: true },
  { Icon: Coffee, x: 2.8, y: 80, r: -10 },
  { Icon: Croissant, x: 48.6, y: 75.4, r: -6 },
];

const circle = 'border-ink absolute overflow-hidden rounded-full border-2';

export function CateringHeroBlock({
  block,
  isFirst,
}: {
  block: CateringHeroBlockData;
  isFirst: boolean;
}) {
  const Heading = isFirst ? 'h1' : 'h2';
  const links = toLinks(block.links);
  const facts = block.facts ?? [];
  const main = toImage(block.photos?.main, 'card');
  const side = toImage(block.photos?.side, 'thumbnail');
  const small = toImage(block.photos?.small, 'thumbnail');
  const lines = (block.heading ?? '').split('\n').filter(Boolean);

  return (
    <section className="bg-sunny border-ink relative isolate overflow-hidden border-b-2">
      {DOODLES.map(({ Icon, x, y, r, mobile }) => (
        <Icon
          key={`${x}-${y}`}
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn(
            'ct-bob text-ink/10 absolute -z-10 size-14 lg:size-[72px]',
            mobile ? 'max-lg:top-[17%]! max-lg:left-[78%]!' : 'max-lg:hidden',
          )}
          style={{ left: `${x}%`, top: `${y}%`, rotate: `${r}deg` }}
        />
      ))}

      <div className="container-wide flex flex-col gap-[22px] pt-7 pb-9 lg:grid lg:grid-cols-[660fr_620fr] lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-12 lg:gap-y-7 lg:py-[76px]">
        <div className="animate-[slide-in_0.6s_ease-out_both] lg:col-start-1 lg:row-start-1 lg:pt-[19px]">
          {block.eyebrow && (
            <p className="bg-ink font-ui text-sunny inline-flex h-[27px] items-center gap-2 rounded-full px-3.5 text-[11px] font-extrabold tracking-[0.145em] uppercase lg:h-[30px] lg:px-4 lg:text-[13px] lg:tracking-[0.14em]">
              <Sparkle aria-hidden="true" className="size-[13px] lg:size-3.5" />
              {block.eyebrow}
            </p>
          )}
          {lines.length > 0 && (
            <Heading className="font-display text-ink mt-[22px] text-[min(14.5vw,62px)] leading-[0.9] font-extrabold tracking-[-0.042em] lg:mt-7 lg:text-[min(7.78vw,112px)] lg:tracking-[-0.04em]">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Heading>
          )}
          {block.body && (
            <p className="text-ink mt-[22px] max-w-[560px] text-base leading-[1.55] lg:mt-7 lg:text-[19px]">
              {block.body}
            </p>
          )}
        </div>

        {(main || side || block.stamp?.value) && (
          <div className="relative mx-auto aspect-[372/300] w-full max-w-[520px] lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:aspect-[620/580] lg:max-w-[620px] lg:self-center">
            {main && (
              <div
                className={cn(
                  circle,
                  'wobble top-0 left-[30.1%] aspect-square w-[69.9%] [--wobble:-3deg] lg:top-[6.9%] lg:left-[24.2%] lg:w-[67.7%]',
                )}
              >
                <CmsImage image={main} sizes="(min-width: 1024px) 420px, 70vw" priority={isFirst} />
              </div>
            )}
            {side && (
              <div
                className={cn(
                  circle,
                  'wobble bg-paper top-[46.7%] left-0 aspect-square w-[43%] [--wobble:4deg] lg:top-[51.7%] lg:left-[1.6%] lg:w-[40.3%]',
                )}
              >
                <CmsImage image={side} sizes="(min-width: 1024px) 250px, 43vw" />
              </div>
            )}
            {small && (
              <div
                className={cn(
                  circle,
                  'wobble top-[63.8%] left-[71%] aspect-square w-[30.6%] max-lg:hidden',
                )}
              >
                <CmsImage image={small} sizes="190px" />
              </div>
            )}
            {block.stamp?.value && (
              <span className="sticker-pop bg-blue border-ink absolute -top-[3.7%] left-[2.7%] grid aspect-square w-[32%] -rotate-12 place-content-center rounded-full border-2 text-center lg:top-[1.5%] lg:left-[6.5%] lg:w-[28.7%]">
                {block.stamp.label && (
                  <span className="font-ui text-sunny text-[8px] font-extrabold tracking-[0.15em] uppercase lg:text-[11px] lg:tracking-[0.14em]">
                    {block.stamp.label}
                  </span>
                )}
                <span className="font-display text-paper text-4xl leading-tight font-extrabold lg:text-[54px]">
                  {block.stamp.value}
                </span>
              </span>
            )}
            {block.note && (
              <p className="font-script text-blue absolute top-[87.3%] left-[50.5%] flex rotate-4 items-center gap-2 text-[22px] whitespace-nowrap lg:top-[91.4%] lg:left-[42%] lg:text-[26px]">
                {block.note}
                <span
                  aria-hidden="true"
                  className="bg-blue text-paper grid size-[22px] place-items-center rounded-[3px] lg:size-[26px]"
                >
                  <ArrowUpRight className="size-4" strokeWidth={3} />
                </span>
              </p>
            )}
          </div>
        )}

        {facts.length > 0 && (
          <ul className="grid grid-cols-3 gap-2 lg:col-start-1 lg:row-start-3 lg:flex lg:gap-7 lg:pt-1">
            {facts.map((f) => {
              const Icon = cateringIcon(f.icon);
              return (
                <li
                  key={f.id ?? f.value}
                  className="bg-paper border-ink flex flex-col gap-1 rounded-2xl border-2 p-3 lg:flex-row lg:items-center lg:gap-2.5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span className="lg:bg-paper lg:border-ink grid shrink-0 place-items-start lg:size-10 lg:place-items-center lg:rounded-full lg:border-2">
                    <Icon aria-hidden="true" className="text-blue size-[18px]" />
                  </span>
                  <span className="mt-1 flex flex-col lg:mt-0">
                    <span className="font-display text-ink text-base leading-tight font-extrabold lg:text-lg">
                      {f.value}
                    </span>
                    <span className="text-slate text-[11px] leading-snug lg:text-[13px]">
                      {f.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {links.length > 0 && (
          <div className="flex flex-col gap-2.5 lg:col-start-1 lg:row-start-2 lg:flex-row lg:items-start lg:gap-3.5">
            {links.map((l, i) => {
              const primary = i === 0 && l.appearance !== 'outline';
              return (
                <LinkTo
                  key={l.href + l.label}
                  link={l}
                  className={cn(
                    pillVariants({ variant: primary ? 'primary' : 'outline', size: 'md' }),
                    'h-[54px] w-full text-sm tracking-[0.036em] transition-[background-color,color,translate] hover:-translate-y-0.5 lg:w-auto lg:text-[15px] lg:tracking-[0.04em]',
                    primary ? 'group lg:h-14 lg:px-8' : 'lg:h-[50px] lg:px-[30px]',
                  )}
                >
                  {l.label}
                  {primary && (
                    <ArrowRight
                      aria-hidden="true"
                      className="text-sunny size-[18px] transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  )}
                </LinkTo>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

CateringHeroBlock.displayName = 'CateringHeroBlock';
