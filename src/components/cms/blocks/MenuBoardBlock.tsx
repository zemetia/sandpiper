import type { Locale } from '@/i18n/routing';
import type { MenuBoardBlock as MenuBoardBlockData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';

import { MenuBoardTabs } from '../landing/MenuBoardTabs';
import { Eyebrow } from '../landing/primitives';

export async function MenuBoardBlock({
  block,
  locale,
}: {
  block: MenuBoardBlockData;
  locale: Locale;
}) {
  const categories = await cmsService.getMenuBoard(block, locale);
  if (categories.length === 0) return null;

  return (
    <section className="bg-cream relative overflow-hidden pt-[124px] pb-16 lg:min-h-[min(70.35vw,1013px)] lg:pt-[min(14.8vw,214px)] lg:pb-[min(6vw,88px)]">
      <div className="container-wide relative">
        {block.eyebrow && <Eyebrow className="lg:hidden">{block.eyebrow}</Eyebrow>}
        {block.heading && (
          <h2 className="font-display text-ink mt-2 max-w-[8ch] text-[clamp(44px,14vw,58px)] leading-[0.92] font-extrabold tracking-[-0.035em] uppercase lg:mt-0 lg:max-w-none lg:text-[min(7vw,101px)] lg:leading-none lg:tracking-[-0.028em]">
            {block.heading}
          </h2>
        )}
        <MenuBoardTabs
          categories={categories}
          stickerLabel={block.stickerLabel ?? null}
          menuLink={toLink(block.menuLink)}
        />
      </div>
    </section>
  );
}

MenuBoardBlock.displayName = 'MenuBoardBlock';
