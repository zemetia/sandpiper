import { Bird, Coffee, Croissant, CupSoda, Sandwich, Sun, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { copy } from '@/config/copy';

import { cn } from '@/lib/cn';
import type { HomeHeroBlock as HomeHeroBlockData, MenuItem } from '@/payload-types';
import { populated, toImage, toLink, toLinks, toMenuItem } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';
import type { ImageVO, LinkVO, MenuItemVO } from '@/types/value-objects';

import { CmsImage } from '../CmsImage';
import { HeroSlider } from '../landing/HeroSlider';
import { PillLink, Sticker } from '../landing/primitives';

/** Faint mural doodles behind the type — positions are % of the 1440 × 1013 artboard. */
const DOODLES: { Icon: LucideIcon; x: number; y: number; r: number; mobile?: boolean }[] = [
  { Icon: Utensils, x: 1, y: 36, r: 10 },
  { Icon: Sun, x: 80, y: 38, r: -14, mobile: true },
  { Icon: CupSoda, x: 95.7, y: 2.8, r: 0, mobile: true },
  { Icon: Sandwich, x: 42.4, y: 72, r: 6 },
  { Icon: Croissant, x: 24.4, y: 53, r: -8 },
  { Icon: Coffee, x: 88, y: 19.4, r: -10 },
  { Icon: Bird, x: 44.8, y: 4.1, r: 12 },
];

const display =
  'font-display text-ink font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[16.5vw] lg:text-[min(10.97vw,158px)]';

function HeadlineSlide({
  block,
  links,
  Heading,
}: {
  block: HomeHeroBlockData;
  links: LinkVO[];
  Heading: 'h1' | 'h2';
}) {
  const pill = toImage(block.pillImage, 'thumbnail');
  const polaroid = toImage(block.polaroid?.image, 'card');
  const stamp = block.stamp;

  return (
    <div className="container-wide relative pt-[76px] pb-[132px] lg:min-h-[min(70.35vw,1013px)] lg:pt-[min(3.9vw,56px)] lg:pb-0">
      <Heading className={display}>
        <span className="block">{block.line1}</span>
        <span className="flex items-center gap-[0.12em] lg:gap-[0.18em]">
          <span>{block.line2}</span>
          {pill && (
            <span className="border-ink relative inline-block h-[0.64em] w-[1.4em] shrink-0 overflow-hidden rounded-full border-2 lg:h-[0.75em] lg:w-[1.78em]">
              <CmsImage image={pill} sizes="(min-width: 1024px) 281px, 96px" priority />
            </span>
          )}
          {block.accent && <span className="text-blue">{block.accent}</span>}
        </span>
        <span className="block whitespace-nowrap">
          {block.line3}
          <span aria-hidden="true">
            {' '}
            {block.line3} {block.line3}
          </span>
        </span>
      </Heading>

      <div className="mt-6 max-w-[478px] lg:mt-[min(7.7vw,111px)]">
        {block.body && (
          <p className="text-ink text-base leading-normal lg:text-xl lg:leading-[1.5]">
            {block.body}
          </p>
        )}
        {links.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:gap-[38px] lg:mt-[52px]">
            {links.map((l) => (
              <PillLink
                key={l.href + l.label}
                link={l}
                variant={l.appearance === 'outline' ? 'outline' : 'primary'}
                className="max-sm:px-3"
              />
            ))}
          </div>
        )}
      </div>

      {(polaroid || stamp?.value) && (
        <div className="relative mt-14 ml-[6%] w-[72%] max-w-[360px] lg:absolute lg:top-[min(33.75vw,486px)] lg:left-[52.9%] lg:mt-0 lg:ml-0 lg:w-[min(31.3vw,451px)] lg:max-w-none">
          {polaroid && (
            <figure className="wobble bg-paper border-ink rotate-6 border-2 p-3 pb-4 [--wobble:4deg] lg:p-5 lg:pb-6">
              <div className="relative aspect-[411/338] overflow-hidden">
                <CmsImage image={polaroid} sizes="(min-width: 1024px) 411px, 70vw" />
              </div>
              {block.polaroid?.caption && (
                <figcaption className="font-script text-blue mt-2 text-[22px] leading-tight lg:mt-3 lg:text-[31px]">
                  {block.polaroid.caption}
                </figcaption>
              )}
            </figure>
          )}
          {stamp?.value && (
            <span className="sticker-pop bg-blue border-ink absolute top-[35%] -right-[86px] grid size-[112px] -rotate-[14deg] place-content-center rounded-full border-2 text-center lg:top-[17%] lg:right-auto lg:left-[107%] lg:size-[min(12.15vw,175px)]">
              {stamp.label && (
                <span className="font-ui text-sunny text-[10px] font-extrabold tracking-[0.14em] uppercase lg:text-[13px]">
                  {stamp.label}
                </span>
              )}
              <span className="font-display text-paper text-[38px] leading-none font-extrabold lg:text-[min(3.9vw,56px)]">
                {stamp.value}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function DishSlide({
  item,
  pitch,
  image,
  orderLink,
  eyebrow,
}: {
  item: MenuItemVO;
  pitch: string | null;
  image: ImageVO | null;
  orderLink: LinkVO | null;
  eyebrow: string;
}) {
  return (
    <div className="container-wide relative grid items-center gap-10 pt-[76px] pb-[132px] lg:min-h-[min(70.35vw,1013px)] lg:grid-cols-[1.1fr_1fr] lg:pt-[min(9vw,130px)] lg:pb-[min(12vw,170px)]">
      <div>
        <p className="font-ui text-blue text-xs font-extrabold tracking-[0.17em] uppercase lg:text-sm">
          {eyebrow}
        </p>
        <h2 className={cn(display, 'mt-4 text-[14vw] text-balance lg:text-[min(8.4vw,120px)]')}>
          {item.name}
        </h2>
        {(pitch ?? item.description) && (
          <p className="text-ink mt-6 max-w-[478px] text-base leading-normal lg:text-xl lg:leading-[1.5]">
            {pitch ?? item.description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="font-display text-blue text-5xl font-extrabold lg:text-6xl">
            {item.price}
          </span>
          {orderLink && <PillLink link={orderLink} />}
        </div>
      </div>
      {image && (
        <div className="relative mx-auto w-[min(82vw,520px)] lg:w-[min(36vw,520px)]">
          <div className="border-ink relative aspect-square overflow-hidden rounded-full border-2">
            <CmsImage image={image} sizes="(min-width: 1024px) 520px, 82vw" />
          </div>
          <Sticker tone="berry" rotate={-8} className="absolute bottom-[8%] -left-[4%]">
            <span className="font-display px-4 py-2 text-xl font-extrabold lg:px-5 lg:text-[26px]">
              {item.name} · {item.price}
            </span>
          </Sticker>
        </div>
      )}
    </div>
  );
}

export async function HomeHeroBlock({
  block,
  isFirst,
}: {
  block: HomeHeroBlockData;
  isFirst: boolean;
}) {
  const settings = await cmsService.getSiteSettings();
  const links = toLinks(block.links);
  const orderLink = toLink(block.orderLink) ?? links[0] ?? null;
  const dishes = (block.slides ?? []).flatMap((s) => {
    const doc = populated<MenuItem>(s.menuItem);
    if (!doc) return [];
    const item = toMenuItem(doc, settings.currency);
    return [{ item, pitch: s.pitch ?? null, image: toImage(s.image, 'card') ?? item.image }];
  });

  const slides = [
    <HeadlineSlide key="headline" block={block} links={links} Heading={isFirst ? 'h1' : 'h2'} />,
    ...dishes.map((d, i) => (
      <DishSlide
        key={d.item.id}
        {...d}
        orderLink={orderLink}
        eyebrow={`${copy.hero.slides} · ${String(i + 2).padStart(2, '0')}`}
      />
    )),
  ];
  const titles = [
    [block.line1, block.line2, block.accent, block.line3].filter(Boolean).join(' '),
    ...dishes.map((d) => `${d.item.name}, ${d.item.price}`),
  ];

  return (
    <div className="bg-sunny relative isolate overflow-hidden">
      {DOODLES.map(({ Icon, x, y, r, mobile }) => (
        <Icon
          key={`${x}-${y}`}
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            'text-ink/15 absolute -z-10 size-[min(15vw,64px)] lg:size-[min(6.3vw,91px)]',
            !mobile && 'max-lg:hidden',
          )}
          style={{ left: `${x}%`, top: `${y}%`, rotate: `${r}deg` }}
        />
      ))}
      <HeroSlider
        slides={slides}
        titles={titles}
        interval={block.autoplay ?? 7}
        labels={{
          next: copy.hero.next,
          region: copy.hero.slides,
          goToSlide: copy.hero.goToSlide,
          pause: copy.hero.pause,
          play: copy.hero.play,
        }}
      />
    </div>
  );
}

HomeHeroBlock.displayName = 'HomeHeroBlock';
