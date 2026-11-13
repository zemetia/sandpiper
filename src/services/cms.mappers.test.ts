import { describe, expect, it } from 'vitest';

import type { Category, Media, MenuItem, Page } from '@/payload-types';
import type { MenuItemVO } from '@/types/value-objects';

import { toImage, toLink, toMenuBoardCategory, toMenuItem, toNavItems } from './cms.mappers';

const page = (slug: string) => ({ id: 1, slug, title: slug }) as Page;

describe('toLink', () => {
  it('maps internal pages to site paths, home to root', () => {
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
    price: 6.5,
    compareAtPrice: 6,
    variants: [{ label: 'Iced', price: 7 }],
    category: 1,
    availability: 'available',
    updatedAt: '',
    createdAt: '',
  } as MenuItem;

  it('formats prices and ignores a compare-at price that is not higher', () => {
    const vo = toMenuItem(item);
    expect(vo.price).toBe('$6.50');
    expect(vo.compareAtPrice).toBeNull();
    expect(vo.variants[0]?.label).toBe('Iced');
    expect(vo.badge).toBeNull();
  });

  it('trims the badge and treats a blank one as none', () => {
    expect(toMenuItem({ ...item, badge: ' FAVE ' }).badge).toBe('FAVE');
    expect(toMenuItem({ ...item, badge: '  ' }).badge).toBeNull();
  });
});

describe('toNavItems', () => {
  it('keeps icon and badge, drops rows without a usable link', () => {
    const items = toNavItems([
      { link: { type: 'custom', url: '/order', label: 'Order' }, icon: 'bag', badge: '~15 MIN' },
      { link: { type: 'reference', reference: 4, label: 'Broken' } },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ href: '/order', icon: 'bag', badge: '~15 MIN' });
  });
});

describe('toMenuBoardCategory', () => {
  const vo = (id: number, featured = false, image = false) =>
    ({
      id,
      name: `Item ${id}`,
      featured,
      image: image ? { url: `/${id}.webp`, alt: '', width: 1, height: 1, position: '' } : null,
    }) as MenuItemVO;
  const category = { id: 2, name: 'Breakfast', slug: 'breakfast' } as Category;

  it('limits rows, picks the featured item and falls back to an item photo', () => {
    const board = toMenuBoardCategory(category, [vo(1), vo(2, false, true), vo(3, true)], 2);
    expect(board.items.map((i) => i.id)).toEqual([1, 2]);
    expect(board.featured?.id).toBe(3);
    expect(board.image?.url).toBe('/2.webp');
  });
});

describe('toImage', () => {
  it('makes absolute media URLs from size variants relative', () => {
    const media = {
      id: 1,
      alt: 'Pancakes',
      url: '/api/media/file/pancakes.webp',
      width: 800,
      height: 600,
      sizes: {
        card: {
          url: 'http://localhost:3000/api/media/file/pancakes-900x675.webp',
          width: 900,
          height: 675,
        },
      },
    } as Media;
    expect(toImage(media, 'card')?.url).toBe('/api/media/file/pancakes-900x675.webp');
    expect(toImage(media)?.url).toBe('/api/media/file/pancakes.webp');
  });
});
