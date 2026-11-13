import { formatPrice } from '@/lib/format';
import type { Category, Media, MenuItem, Page } from '@/payload-types';
import type {
  ImageVO,
  LinkVO,
  MenuBoardCategoryVO,
  MenuItemVO,
  NavIcon,
  NavItemVO,
} from '@/types/value-objects';

type ImageSize = keyof NonNullable<Media['sizes']>;

/** Payload stores relations as an id until populated — only a populated doc is usable. */
export const populated = <T extends object>(value: number | T | null | undefined): T | null =>
  value && typeof value === 'object' ? value : null;

/** Payload prefixes size variants with `serverURL`; keep our own media relative so next/image treats it as local. */
const relativeMedia = (url: string) => url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, '');

export function toImage(
  value: number | Media | null | undefined,
  size?: ImageSize,
): ImageVO | null {
  const media = populated(value);
  if (!media?.url) return null;
  const variant = size ? media.sizes?.[size] : undefined;
  const useVariant = Boolean(variant?.url);
  return {
    url: relativeMedia((useVariant ? variant?.url : media.url) ?? media.url),
    alt: media.alt,
    width: (useVariant ? variant?.width : media.width) ?? 1200,
    height: (useVariant ? variant?.height : media.height) ?? 800,
    position: `${media.focalX ?? 50}% ${media.focalY ?? 50}%`,
  };
}

export type CmsLink = {
  type?: 'reference' | 'custom' | null;
  newTab?: boolean | null;
  reference?: number | Page | null;
  url?: string | null;
  label?: string | null;
  appearance?: 'primary' | 'outline' | 'link' | null;
};

/** Internal hrefs are site paths (`/menu`), with the homepage at `/`. */
export function toLink(link: CmsLink | null | undefined): LinkVO | null {
  if (!link?.label) return null;
  let href: string | null = null;
  if (link.type === 'custom') {
    href = link.url ?? null;
  } else {
    const page = populated(link.reference);
    if (page) href = !page.slug || page.slug === 'home' ? '/' : `/${page.slug}`;
  }
  if (!href) return null;
  return {
    href,
    label: link.label,
    newTab: Boolean(link.newTab),
    appearance: link.appearance ?? 'primary',
  };
}

export const toLinks = (rows: { link: CmsLink }[] | null | undefined): LinkVO[] =>
  (rows ?? []).map((r) => toLink(r.link)).filter((l): l is LinkVO => l !== null);

export function toMenuItem(item: MenuItem): MenuItemVO {
  const price = formatPrice;
  return {
    id: item.id,
    slug: item.slug ?? String(item.id),
    name: item.name,
    description: item.description ?? null,
    price: price(item.price),
    compareAtPrice:
      item.compareAtPrice && item.compareAtPrice > item.price ? price(item.compareAtPrice) : null,
    variants: (item.variants ?? []).map((v) => ({ label: v.label, price: price(v.price) })),
    tags: item.tags ?? [],
    image: toImage(item.image, 'card'),
    availability: item.availability,
    featured: Boolean(item.featured),
    badge: item.badge?.trim() || null,
  };
}

export const toNavItems = (
  rows: { link: CmsLink; icon?: NavIcon | null; badge?: string | null }[] | null | undefined,
): NavItemVO[] =>
  (rows ?? []).flatMap((r) => {
    const link = toLink(r.link);
    return link ? [{ ...link, icon: r.icon ?? null, badge: r.badge || null }] : [];
  });

/** Featured item (or the first one) names the sticker; the category photo wins for the plate. */
export function toMenuBoardCategory(
  category: Category,
  items: MenuItemVO[],
  limit: number,
): MenuBoardCategoryVO {
  const shown = items.slice(0, limit);
  const featured = items.find((i) => i.featured) ?? shown[0] ?? null;
  return {
    id: category.id,
    slug: category.slug ?? String(category.id),
    name: category.name,
    items: shown,
    featured,
    image:
      toImage(category.image, 'card') ??
      featured?.image ??
      items.find((i) => i.image)?.image ??
      null,
  };
}
