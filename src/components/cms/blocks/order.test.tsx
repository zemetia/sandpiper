import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type {
  OrderChoicesBlock as OrderChoicesData,
  OrderHeroBlock as OrderHeroData,
} from '@/payload-types';

import { OrderChoicesBlock } from './OrderChoicesBlock';
import { OrderHeroBlock } from './OrderHeroBlock';

const toast = 'https://www.toasttab.com/local/order/sandpiper-1640-south-street';

describe('OrderHeroBlock', () => {
  const block: OrderHeroData = {
    blockType: 'orderHero',
    eyebrow: 'ORDER NOW · 1640 SOUTH STREET, PHILADELPHIA',
    line1: 'Hungry?',
    line2: 'Pick your way.',
    toggle: { pickup: 'PICKUP', delivery: 'DELIVERY' },
    menuLink: { type: 'custom', url: '/menu', label: 'Not sure yet? See our menu' },
  };

  it('renders the headline, the menu link and a pickup / delivery switch', async () => {
    const user = userEvent.setup();
    render(<OrderHeroBlock block={block} isFirst />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hungry?Pick your way.');
    expect(screen.getByRole('link', { name: 'Not sure yet? See our menu' })).toHaveAttribute(
      'href',
      '/menu',
    );
    const toggle = screen.getByRole('group', { name: 'Pickup or delivery' });
    const pickup = within(toggle).getByRole('button', { name: 'PICKUP' });
    const delivery = within(toggle).getByRole('button', { name: 'DELIVERY' });
    expect(pickup).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.dataset['orderView']).toBe('pickup');

    await user.click(delivery);
    expect(delivery).toHaveAttribute('aria-pressed', 'true');
    expect(pickup).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.dataset['orderView']).toBe('delivery');
  });
});

describe('OrderChoicesBlock', () => {
  const block: OrderChoicesData = {
    blockType: 'orderChoices',
    pickup: {
      title: 'Pickup',
      steps: [{ text: 'Build your order on Toast' }, { text: 'Choose a pickup time' }],
      link: { type: 'custom', url: toast, label: 'Order pickup on Toast', newTab: true },
    },
    delivery: {
      title: 'Delivery',
      apps: [
        { app: 'doordash', name: 'DoorDash', url: 'https://www.doordash.com/store/46323691' },
        {
          app: 'ubereats',
          name: 'Uber Eats',
          promoCode: 'eats-hn17lnqm',
          url: 'https://www.ubereats.com/store-browse-uuid/613f10bc',
        },
      ],
    },
  };

  it('sends pickup to Toast in a new tab and numbers the steps', () => {
    render(<OrderChoicesBlock block={block} />);
    const order = screen.getByRole('link', { name: /Order pickup on Toast/ });
    expect(order).toHaveAttribute('href', toast);
    expect(order).toHaveAttribute('target', '_blank');
    const steps = within(screen.getAllByRole('list')[0] as HTMLElement).getAllByRole('listitem');
    expect(steps[1]).toHaveTextContent('2Choose a pickup time');
  });

  it('links each delivery app to its store and copies the promo code', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    render(<OrderChoicesBlock block={block} />);
    expect(screen.getByRole('link', { name: /DoorDash/ })).toHaveAttribute(
      'href',
      'https://www.doordash.com/store/46323691',
    );
    await user.click(screen.getByRole('button', { name: 'Copy promo code eats-hn17lnqm' }));
    expect(writeText).toHaveBeenCalledWith('eats-hn17lnqm');
    expect(screen.getByText('COPIED')).toBeInTheDocument();
  });
});
