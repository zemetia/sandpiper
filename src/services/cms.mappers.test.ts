import { describe, expect, it } from 'vitest';

import type { MenuItem, Page } from '@/payload-types';

import { toLink, toMenuItem } from './cms.mappers';

const page = (slug: string) => ({ id: 1, slug, title: slug }) as Page;

describe('toLink', () => {
  it('maps internal pages to locale-less paths, home to root', () => {
    expect(toLink({ type: 'reference', reference: page('menu'), label: 'Menu' })?.href).toBe(
      '/menu',
    );
    expect(toLink({ type: 'reference', reference: page('home'), label: 'Home' })?.href).toBe('/');
  });

  it('drops links without a label or an unpopulated reference', () => {
    expect(toLink({ type: 'reference', reference: 3, label: 'Menu' })).toBeNull();
    expect(toLink({ type: 'custom', url: 'https://x.test' })).toBeNull();
  });

  it('keeps custom URLs and new-tab flags', () => {
    expect(toLink({ type: 'custom', url: 'https://x.test', label: 'X', newTab: true })).toEqual({
      href: 'https://x.test',
      label: 'X',
      newTab: true,
      appearance: 'primary',
    });
  });
});

describe('toMenuItem', () => {
  const item = {
    id: 7,
    name: 'Flat White',
    slug: 'flat-white',
    price: 35000,
    compareAtPrice: 30000,
    variants: [{ label: 'Iced', price: 37000 }],
    category: 1,
    availability: 'available',
    updatedAt: '',
    createdAt: '',
  } as MenuItem;

  it('formats prices and ignores a compare-at price that is not higher', () => {
    const vo = toMenuItem(item, 'IDR', 'id');
    expect(vo.price).toMatch(/^Rp\s?35\.000$/);
    expect(vo.compareAtPrice).toBeNull();
    expect(vo.variants[0]?.label).toBe('Iced');
  });
});
