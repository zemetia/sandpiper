import { formatPrice } from '@/lib/format';
import type { Media, MenuItem, Page } from '@/payload-types';
import type { ImageVO, LinkVO, MenuItemVO } from '@/types/value-objects';

type ImageSize = keyof NonNullable<Media['sizes']>;

/** Payload stores relations as an id until populated — only a populated doc is usable. */
export const populated = <T extends object>(value: number | T | null | undefined): T | null =>
  value && typeof value === 'object' ? value : null;

export function toImage(
  value: number | Media | null | undefined,
  size?: ImageSize,
): ImageVO | null {
  const media = populated(value);
  if (!media?.url) return null;
  const variant = size ? media.sizes?.[size] : undefined;
  const useVariant = Boolean(variant?.url);
  return {
    url: (useVariant ? variant?.url : media.url) ?? media.url,
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

/** Internal hrefs are locale-less (`/menu`) — `@/i18n/navigation` Link adds the prefix. */
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

export function toMenuItem(item: MenuItem, currency: 'IDR' | 'USD', locale: string): MenuItemVO {
  const price = (v: number) => formatPrice(v, currency, locale);
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
  };
}
