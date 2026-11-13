import type { Page } from '@/payload-types';
import { assertNever } from '@/lib/utils';

import { AboutBeliefBlock } from './blocks/AboutBeliefBlock';
import { AboutClosingBlock } from './blocks/AboutClosingBlock';
import { AboutGalleryBlock } from './blocks/AboutGalleryBlock';
import { AboutHeroBlock } from './blocks/AboutHeroBlock';
import { AboutKitchenBlock } from './blocks/AboutKitchenBlock';
import { AboutTeamBlock } from './blocks/AboutTeamBlock';
import { CallToActionBlock } from './blocks/CallToActionBlock';
import { CateringHeroBlock } from './blocks/CateringHeroBlock';
import { CateringMenuBlock } from './blocks/CateringMenuBlock';
import { CateringQuoteBlock } from './blocks/CateringQuoteBlock';
import { CateringRibbonBlock } from './blocks/CateringRibbonBlock';
import { CateringStepsBlock } from './blocks/CateringStepsBlock';
import { CateringUseCasesBlock } from './blocks/CateringUseCasesBlock';
import { CoffeeOrbitBlock } from './blocks/CoffeeOrbitBlock';
import { ContactFindBlock } from './blocks/ContactFindBlock';
import { ContactFormBlock } from './blocks/ContactFormBlock';
import { ContactHeroBlock } from './blocks/ContactHeroBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { FaqBlock } from './blocks/FaqBlock';
import { FullMenuBlock } from './blocks/FullMenuBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { GiftCardFaqBlock } from './blocks/GiftCardFaqBlock';
import { GiftCardHeroBlock } from './blocks/GiftCardHeroBlock';
import { GiftCardPanelsBlock } from './blocks/GiftCardPanelsBlock';
import { GiftCardStepsBlock } from './blocks/GiftCardStepsBlock';
import { GramWallBlock } from './blocks/GramWallBlock';
import { HeroBlock } from './blocks/HeroBlock';
import { HomeHeroBlock } from './blocks/HomeHeroBlock';
import { MediaContentBlock } from './blocks/MediaContentBlock';
import { MenuBoardBlock } from './blocks/MenuBoardBlock';
import { MenuBrowserBlock } from './blocks/MenuBrowserBlock';
import { MenuHighlightsBlock } from './blocks/MenuHighlightsBlock';
import { MuralStoryBlock } from './blocks/MuralStoryBlock';
import { OrderChoicesBlock } from './blocks/OrderChoicesBlock';
import { OrderHeroBlock } from './blocks/OrderHeroBlock';
import { PlateParadeBlock } from './blocks/PlateParadeBlock';
import { ReviewThreadBlock } from './blocks/ReviewThreadBlock';
import { RibbonsBlock } from './blocks/RibbonsBlock';
import { SunCtaBlock } from './blocks/SunCtaBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { VisitHoursBlock } from './blocks/VisitHoursBlock';
import { VisitUsBlock } from './blocks/VisitUsBlock';

type Block = NonNullable<Page['layout']>[number];

function renderBlock(block: Block, index: number) {
  switch (block.blockType) {
    case 'homeHero':
      return <HomeHeroBlock block={block} isFirst={index === 0} />;
    case 'ribbons':
      return <RibbonsBlock block={block} />;
    case 'menuBoard':
      return <MenuBoardBlock block={block} />;
    case 'plateParade':
      return <PlateParadeBlock block={block} />;
    case 'coffeeOrbit':
      return <CoffeeOrbitBlock block={block} />;
    case 'muralStory':
      return <MuralStoryBlock block={block} />;
    case 'gramWall':
      return <GramWallBlock block={block} />;
    case 'reviewThread':
      return <ReviewThreadBlock block={block} />;
    case 'visitHours':
      return <VisitHoursBlock block={block} />;
    case 'sunCta':
      return <SunCtaBlock block={block} />;
    case 'cateringHero':
      return <CateringHeroBlock block={block} isFirst={index === 0} />;
    case 'cateringRibbon':
      return <CateringRibbonBlock block={block} />;
    case 'cateringMenu':
      return <CateringMenuBlock block={block} />;
    case 'cateringUseCases':
      return <CateringUseCasesBlock block={block} />;
    case 'cateringSteps':
      return <CateringStepsBlock block={block} />;
    case 'cateringQuote':
      return <CateringQuoteBlock block={block} />;
    case 'giftCardHero':
      return <GiftCardHeroBlock block={block} isFirst={index === 0} />;
    case 'giftCardSteps':
      return <GiftCardStepsBlock block={block} />;
    case 'giftCardPanels':
      return <GiftCardPanelsBlock block={block} />;
    case 'giftCardFaq':
      return <GiftCardFaqBlock block={block} />;
    case 'aboutHero':
      return <AboutHeroBlock block={block} isFirst={index === 0} />;
    case 'aboutBelief':
      return <AboutBeliefBlock block={block} />;
    case 'aboutKitchen':
      return <AboutKitchenBlock block={block} />;
    case 'aboutGallery':
      return <AboutGalleryBlock block={block} />;
    case 'aboutTeam':
      return <AboutTeamBlock block={block} />;
    case 'aboutClosing':
      return <AboutClosingBlock block={block} />;
    case 'contactHero':
      return <ContactHeroBlock block={block} isFirst={index === 0} />;
    case 'contactForm':
      return <ContactFormBlock block={block} />;
    case 'contactFind':
      return <ContactFindBlock block={block} />;
    case 'menuBrowser':
      return <MenuBrowserBlock block={block} isFirst={index === 0} />;
    case 'orderHero':
      return <OrderHeroBlock block={block} isFirst={index === 0} />;
    case 'orderChoices':
      return <OrderChoicesBlock block={block} />;
    case 'hero':
      return <HeroBlock block={block} isFirst={index === 0} />;
    case 'content':
      return <ContentBlock block={block} />;
    case 'mediaContent':
      return <MediaContentBlock block={block} />;
    case 'menuHighlights':
      return <MenuHighlightsBlock block={block} />;
    case 'fullMenu':
      return <FullMenuBlock block={block} />;
    case 'gallery':
      return <GalleryBlock block={block} />;
    case 'testimonials':
      return <TestimonialsBlock block={block} />;
    case 'faq':
      return <FaqBlock block={block} />;
    case 'visitUs':
      return <VisitUsBlock block={block} />;
    case 'cta':
      return <CallToActionBlock block={block} />;
    default:
      return assertNever(block);
  }
}

export function RenderBlocks({ blocks }: { blocks: Page['layout'] }) {
  return (
    <>
      {(blocks ?? []).map((block, i) => (
        <div
          key={block.id ?? i}
          id={block.blockName ? block.blockName.toLowerCase().replace(/\s+/g, '-') : undefined}
        >
          {renderBlock(block, i)}
        </div>
      ))}
    </>
  );
}

RenderBlocks.displayName = 'RenderBlocks';
