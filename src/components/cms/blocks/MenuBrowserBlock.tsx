import Link from 'next/link';
import { Clock3, MapPin } from 'lucide-react';

import { copy } from '@/config/copy';
import { isOpenAt } from '@/lib/hours';
import type { MenuBrowserBlock as MenuBrowserData } from '@/payload-types';
import { toLink } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';

import { MenuBrowser } from '../menu/MenuBrowser';
import type { MenuOrderLink } from '../menu/MenuBrowser';
import { OpenPill } from '../menu/OpenPill';

const orderLink = (group: MenuBrowserData['pickup']): MenuOrderLink | undefined => {
  const link = toLink(group?.link);
  return link ? { label: link.label, href: link.href, newTab: link.newTab } : undefined;
};

/** Toast-style menu page (Pencil "Sandpiper — Menu (CMS / Toast-style)" + "(Android, CMS)"). */
export async function MenuBrowserBlock({
  block,
  isFirst,
}: {
  block: MenuBrowserData;
  isFirst: boolean;
}) {
  const [menu, settings] = await Promise.all([cmsService.getMenu(), cmsService.getSiteSettings()]);

  const picked = (block.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c));
  const categories = menu
    .filter((c) => picked.length === 0 || picked.includes(c.id))
    .map((c) => ({
      ...c,
      items: block.showSoldOut ? c.items : c.items.filter((i) => i.availability !== 'soldOut'),
    }))
    .filter((c) => c.items.length > 0);

  const Heading = isFirst ? 'h1' : 'h2';
  const title = block.title || copy.menuPage.title;
  const address = block.address || settings.address;
  const metaShort = block.metaShort || [block.hoursLabel, address].filter(Boolean).join(' · ');
  const hasHours = Boolean(block.opensAt && block.closesAt);

  const intro = (
    <div className="flex flex-col gap-3.5">
      <nav
        aria-label={copy.menuPage.breadcrumb}
        className="text-slate text-sm font-medium max-lg:hidden"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink underline-offset-2 hover:underline">
              {copy.home}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <Heading className="font-display text-ink text-[56px] leading-[0.95] font-extrabold tracking-[-0.027em] lg:text-[min(6.7vw,96px)] lg:tracking-[-0.031em]">
        {title}
      </Heading>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 lg:mt-0.5 lg:gap-x-5">
        {hasHours && (
          <OpenPill
            opens={block.opensAt as string}
            closes={block.closesAt as string}
            initial={isOpenAt(block.opensAt as string, block.closesAt as string, new Date())}
          />
        )}
        {metaShort && <p className="text-[13px] font-medium lg:hidden">{metaShort}</p>}
        {block.hoursLabel && (
          <p className="flex items-center gap-1.5 text-[15px] font-medium max-lg:hidden">
            <Clock3 aria-hidden strokeWidth={2} className="size-4" />
            {block.hoursLabel}
          </p>
        )}
        {address && (
          <p className="flex items-center gap-1.5 text-[15px] font-medium max-lg:hidden">
            <MapPin aria-hidden strokeWidth={2} className="size-4" />
            {address}
          </p>
        )}
      </div>
    </div>
  );

  const pickup = orderLink(block.pickup);
  const delivery = orderLink(block.delivery);

  return (
    <MenuBrowser
      intro={intro}
      categories={categories}
      order={{ ...(pickup ? { pickup } : {}), ...(delivery ? { delivery } : {}) }}
      searchPlaceholder={block.searchPlaceholder || copy.menuPage.search}
      categoriesLabel={block.categoriesLabel || copy.menuPage.categories}
    />
  );
}

MenuBrowserBlock.displayName = 'MenuBrowserBlock';
