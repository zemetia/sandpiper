import type { Locale } from '@/i18n/routing';
import type { Page } from '@/payload-types';
import { assertNever } from '@/lib/utils';

import { CallToActionBlock } from './blocks/CallToActionBlock';
import { CoffeeOrbitBlock } from './blocks/CoffeeOrbitBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { FaqBlock } from './blocks/FaqBlock';
import { FullMenuBlock } from './blocks/FullMenuBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { GramWallBlock } from './blocks/GramWallBlock';
import { HeroBlock } from './blocks/HeroBlock';
import { HomeHeroBlock } from './blocks/HomeHeroBlock';
import { MediaContentBlock } from './blocks/MediaContentBlock';
import { MenuBoardBlock } from './blocks/MenuBoardBlock';
import { MenuHighlightsBlock } from './blocks/MenuHighlightsBlock';
import { MuralStoryBlock } from './blocks/MuralStoryBlock';
import { PlateParadeBlock } from './blocks/PlateParadeBlock';
import { ReviewThreadBlock } from './blocks/ReviewThreadBlock';
import { RibbonsBlock } from './blocks/RibbonsBlock';
import { SunCtaBlock } from './blocks/SunCtaBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { VisitHoursBlock } from './blocks/VisitHoursBlock';
import { VisitUsBlock } from './blocks/VisitUsBlock';

type Block = NonNullable<Page['layout']>[number];

function renderBlock(block: Block, index: number, locale: Locale) {
  switch (block.blockType) {
    case 'homeHero':
      return <HomeHeroBlock block={block} locale={locale} isFirst={index === 0} />;
    case 'ribbons':
      return <RibbonsBlock block={block} />;
    case 'menuBoard':
      return <MenuBoardBlock block={block} locale={locale} />;
    case 'plateParade':
      return <PlateParadeBlock block={block} locale={locale} />;
    case 'coffeeOrbit':
      return <CoffeeOrbitBlock block={block} locale={locale} />;
    case 'muralStory':
      return <MuralStoryBlock block={block} />;
    case 'gramWall':
      return <GramWallBlock block={block} />;
    case 'reviewThread':
      return <ReviewThreadBlock block={block} />;
    case 'visitHours':
      return <VisitHoursBlock block={block} locale={locale} />;
    case 'sunCta':
      return <SunCtaBlock block={block} />;
    case 'hero':
      return <HeroBlock block={block} isFirst={index === 0} />;
    case 'content':
      return <ContentBlock block={block} />;
    case 'mediaContent':
      return <MediaContentBlock block={block} />;
    case 'menuHighlights':
      return <MenuHighlightsBlock block={block} locale={locale} />;
    case 'fullMenu':
      return <FullMenuBlock block={block} locale={locale} />;
    case 'gallery':
      return <GalleryBlock block={block} />;
    case 'testimonials':
      return <TestimonialsBlock block={block} />;
    case 'faq':
      return <FaqBlock block={block} />;
    case 'visitUs':
      return <VisitUsBlock block={block} locale={locale} />;
    case 'cta':
      return <CallToActionBlock block={block} />;
    default:
      return assertNever(block);
  }
}

export function RenderBlocks({ blocks, locale }: { blocks: Page['layout']; locale: Locale }) {
  return (
    <>
      {(blocks ?? []).map((block, i) => (
        <div
          key={block.id ?? i}
          id={block.blockName ? block.blockName.toLowerCase().replace(/\s+/g, '-') : undefined}
        >
          {renderBlock(block, i, locale)}
        </div>
      ))}
    </>
  );
}

RenderBlocks.displayName = 'RenderBlocks';
