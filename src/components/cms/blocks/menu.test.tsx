import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { MenuBrowserBlock as MenuBrowserData } from '@/payload-types';
import type { MenuCategoryVO, MenuItemVO } from '@/types/value-objects';

import { MenuBrowserBlock } from './MenuBrowserBlock';

vi.mock('../CmsImage', () => ({
  CmsImage: ({ image }: { image: { alt: string } | null }) => <span>{image?.alt}</span>,
}));

const item = (id: number, name: string, extra: Partial<MenuItemVO> = {}): MenuItemVO => ({
  id,
  slug: name.toLowerCase().replace(/\W+/g, '-'),
  name,
  description: null,
  price: '$9.50',
  compareAtPrice: null,
  variants: [],
  tags: [],
  image: { url: `/${id}.webp`, alt: `${name} photo`, width: 1, height: 1, position: '50% 50%' },
  availability: 'available',
  featured: false,
  badge: null,
  ...extra,
});

const menu: MenuCategoryVO[] = [
  {
    id: 1,
    slug: 'breakfast',
    name: 'Breakfast',
    description: 'Griddle classics, served all day.',
    items: [
      item(1, 'Classic Breakfast', { badge: 'FAVE', description: 'Two eggs your way' }),
      item(2, 'Lox Bagel', { availability: 'soldOut' }),
    ],
  },
  { id: 2, slug: 'lunch', name: 'Lunch', description: null, items: [item(3, 'Blazing Chicken')] },
];

vi.mock('@/services/cms.service', () => ({
  cmsService: {
    getMenu: vi.fn(async () => menu),
    getSiteSettings: vi.fn(async () => ({ address: '1640 South St, Philadelphia' })),
  },
}));

const toast = 'https://www.toasttab.com/local/order/sandpiper-1640-south-street';

const block: MenuBrowserData = {
  blockType: 'menuBrowser',
  opensAt: '07:00',
  closesAt: '16:00',
  hoursLabel: '7:00 AM – 4:00 PM daily',
  pickup: { link: { type: 'custom', url: toast, label: 'PICKUP', newTab: true } },
  delivery: { link: { type: 'custom', url: '/order', label: 'DELIVERY' } },
  showSoldOut: true,
};

const renderBlock = async (overrides: Partial<MenuBrowserData> = {}) =>
  render(await MenuBrowserBlock({ block: { ...block, ...overrides }, isFirst: true }));

describe('MenuBrowserBlock', () => {
  beforeEach(() => localStorage.clear());

  it('renders the header, categories and dishes from the CMS', async () => {
    await renderBlock();
    expect(screen.getByRole('heading', { level: 1, name: 'Menu' })).toBeInTheDocument();
    expect(screen.getAllByText('1640 South St, Philadelphia').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 2, name: 'Breakfast' })).toBeInTheDocument();
    expect(screen.getByText('Griddle classics, served all day.')).toBeInTheDocument();
    expect(screen.getByText('FAVE')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Lunch' })[0]).toHaveAttribute('href', '#lunch');
  });

  it('marks sold-out dishes and leaves them without an order button', async () => {
    await renderBlock();
    expect(screen.getByText('SOLD OUT')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Order Lox Bagel/ })).not.toBeInTheDocument();
  });

  it('hides sold-out dishes when the editor turns them off', async () => {
    await renderBlock({ showSoldOut: false });
    expect(screen.queryByText('Lox Bagel')).not.toBeInTheDocument();
  });

  it('points the + buttons at the channel picked in the switch and remembers it', async () => {
    const user = userEvent.setup();
    await renderBlock();
    const add = () => screen.getByRole('link', { name: /Order Classic Breakfast for/ });
    expect(add()).toHaveAttribute('href', toast);
    expect(add()).toHaveAttribute('target', '_blank');

    const toggle = screen.getByRole('group', { name: 'Pickup or delivery' });
    await user.click(within(toggle).getByRole('button', { name: 'DELIVERY' }));
    expect(add()).toHaveAttribute('href', '/order');
    expect(add()).toHaveAccessibleName('Order Classic Breakfast for delivery');
    expect(localStorage.getItem('sp-menu-mode')).toBe('delivery');
  });

  it('hides the switch and + buttons when no order links are set', async () => {
    await renderBlock({ pickup: {}, delivery: {} });
    expect(screen.queryByRole('group', { name: 'Pickup or delivery' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Order / })).not.toBeInTheDocument();
  });

  it('filters dishes as you type and offers to clear an empty search', async () => {
    const user = userEvent.setup();
    await renderBlock();
    const search = screen.getByRole('searchbox', { name: 'Search the menu' });

    await user.type(search, 'chicken');
    expect(screen.getByText('Blazing Chicken')).toBeInTheDocument();
    expect(screen.queryByText('Classic Breakfast')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Breakfast' })).not.toBeInTheDocument();
    expect(screen.getByText('1 dish found')).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'pizza');
    expect(screen.getByText('Nothing on the menu matches “pizza”.')).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: 'Clear search' })[0] as HTMLElement);
    expect(screen.getByText('Classic Breakfast')).toBeInTheDocument();
  });
});
