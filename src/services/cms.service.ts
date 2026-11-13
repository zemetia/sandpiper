import config from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import type { Where } from 'payload';
import { cache } from 'react';

import type { Locale } from '@/i18n/routing';
import type { Category, MenuHighlightsBlock, Page } from '@/payload-types';
import type {
  MenuCategoryVO,
  MenuItemVO,
  NavigationVO,
  SiteSettingsVO,
} from '@/types/value-objects';

import { populated, toImage, toLink, toLinks, toMenuItem } from './cms.mappers';

/**
 * Server-only CMS service — reads Payload through the Local API (no HTTP hop).
 * Draft content is returned only while Next.js draft mode is on (set by /preview).
 */

const client = () => getPayload({ config });

const isDraft = async () => (await draftMode()).isEnabled;

const getPage = cache(async (slug: string, locale: Locale): Promise<Page | null> => {
  const draft = await isDraft();
  const payload = await client();
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
    draft,
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  });
  return docs[0] ?? null;
});

const getPageSlugs = async (): Promise<{ slug: string; updatedAt: string }[]> => {
  const payload = await client();
  const { docs } = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    select: { slug: true, updatedAt: true },
    depth: 0,
    limit: 500,
    pagination: false,
  });
  return docs.flatMap((d) => (d.slug ? [{ slug: d.slug, updatedAt: d.updatedAt }] : []));
};

const getSiteSettings = cache(async (locale: Locale): Promise<SiteSettingsVO> => {
  const payload = await client();
  const s = await payload.findGlobal({ slug: 'site-settings', locale, depth: 1 });
  const digits = s.whatsapp?.replace(/\D/g, '');
  return {
    siteName: s.siteName || 'Sandpiper',
    tagline: s.tagline ?? null,
    logo: toImage(s.logo),
    currency: s.currency ?? 'IDR',
    email: s.email ?? null,
    phone: s.phone ?? null,
    whatsappUrl: digits ? `https://wa.me/${digits}` : null,
    address: s.address ?? null,
    mapUrl: s.mapUrl ?? null,
    hours: (s.hours ?? []).map(({ days, time }) => ({ days, time })),
    socials: (s.socials ?? []).map(({ platform, url }) => ({ platform, url })),
    announcement:
      s.announcementEnabled && s.announcement
        ? { text: s.announcement, link: toLink(s.announcementLink) }
        : null,
  };
});

const getNavigation = cache(async (locale: Locale): Promise<NavigationVO> => {
  const payload = await client();
  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header', locale, depth: 1 }),
    payload.findGlobal({ slug: 'footer', locale, depth: 1 }),
  ]);
  return {
    header: { items: toLinks(header.navItems), cta: toLink(header.cta) },
    footer: { blurb: footer.blurb ?? null, items: toLinks(footer.navItems) },
  };
});

/** Public reads keep access control on (published only); draft mode bypasses it for editors. */
const queryMenuItems = async (locale: Locale, where: Where | undefined, limit: number) => {
  const draft = await isDraft();
  const [payload, settings] = await Promise.all([client(), getSiteSettings(locale)]);
  const { docs } = await payload.find({
    collection: 'menu-items',
    ...(where ? { where } : {}),
    locale,
    draft,
    overrideAccess: draft,
    depth: 1,
    sort: '_order',
    limit,
    pagination: false,
  });
  return docs.map((d) => ({
    categoryId: populated<Category>(d.category)?.id ?? (d.category as number),
    item: toMenuItem(d, settings.currency, locale),
  }));
};

const findMenuItems = async (locale: Locale, where: Where, limit = 200): Promise<MenuItemVO[]> =>
  (await queryMenuItems(locale, where, limit)).map((r) => r.item);

const getMenu = cache(async (locale: Locale): Promise<MenuCategoryVO[]> => {
  const payload = await client();
  const [{ docs: categories }, rows] = await Promise.all([
    payload.find({
      collection: 'categories',
      locale,
      sort: '_order',
      depth: 0,
      limit: 100,
      pagination: false,
    }),
    queryMenuItems(locale, undefined, 500),
  ]);

  return categories.map((c) => ({
    id: c.id,
    slug: c.slug ?? String(c.id),
    name: c.name,
    description: c.description ?? null,
    items: rows.filter((r) => r.categoryId === c.id).map((r) => r.item),
  }));
});

const getMenuHighlights = async (
  block: MenuHighlightsBlock,
  locale: Locale,
): Promise<MenuItemVO[]> => {
  const limit = block.limit ?? 6;
  if (block.source === 'manual') {
    const ids = (block.items ?? []).map((i) => (typeof i === 'object' ? i.id : i));
    if (ids.length === 0) return [];
    const items = await findMenuItems(locale, { id: { in: ids } });
    return ids.flatMap((id) => items.find((i) => i.id === id) ?? []);
  }
  if (block.source === 'category') {
    const category = populated(block.category)?.id ?? block.category;
    if (!category) return [];
    return findMenuItems(locale, { category: { equals: category } }, limit);
  }
  return findMenuItems(locale, { featured: { equals: true } }, limit);
};

export const cmsService = {
  isDraft,
  getPage,
  getPageSlugs,
  getSiteSettings,
  getNavigation,
  getMenu,
  getMenuHighlights,
};
