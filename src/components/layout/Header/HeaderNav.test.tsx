import type React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { NavigationVO } from '@/types/value-objects';

import { HeaderNav } from './HeaderNav';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'>) => <a {...props} />,
  usePathname: () => '/catering',
}));
vi.mock('@/components/shared/LanguageSwitcher', () => ({ LanguageSwitcher: () => <div /> }));

const nav: NavigationVO['header'] = {
  items: [
    { href: '/', label: 'Home', newTab: false, appearance: 'link', icon: 'home', badge: null },
    {
      href: '/catering',
      label: 'Catering',
      newTab: false,
      appearance: 'link',
      icon: 'cloche',
      badge: null,
    },
    {
      href: '/about',
      label: 'About',
      newTab: false,
      appearance: 'link',
      icon: 'info',
      badge: null,
    },
  ],
  cta: { href: '/menu', label: 'Order now', newTab: false, appearance: 'primary' },
  ctaBadge: '~15 MIN',
  infoBar: ['Open daily 7am – 4pm', '1640 South St, Philadelphia'],
  ticker: ['Open daily 7am – 4pm', 'Proudly serving Lavazza'],
  contactHeading: 'Come say hi',
  promo: {
    eyebrow: 'Hungry?',
    heading: 'Skip the line.',
    link: { href: '/menu', label: 'Order now', newTab: false, appearance: 'primary' },
  },
};
const settings = {
  address: '1640 South St\nPhiladelphia, PA',
  phone: '(267) 858-6183',
  hours: [{ days: 'Open daily', time: '7am – 4pm' }],
  mapUrl: 'https://maps.example',
  socials: [{ platform: 'instagram', url: 'https://instagram.example' }],
};
const labels = {
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menu: 'Menu',
  home: 'Home',
  call: 'Call us',
  map: 'Find us on the map',
  instagram: 'Instagram',
};

describe('HeaderNav', () => {
  it('splits desktop links around the logo and marks the current page', () => {
    render(<HeaderNav siteName="Sandpiper" nav={nav} settings={settings} labels={labels} />);
    const [left, right] = screen.getAllByRole('navigation', { name: 'Menu' });
    expect(within(left as HTMLElement).getAllByRole('link')).toHaveLength(2);
    expect(within(right as HTMLElement).getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(within(left as HTMLElement).getByRole('link', { name: 'Catering' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('opens the drawer with the CTA listed second and closes on Escape', async () => {
    render(<HeaderNav siteName="Sandpiper" nav={nav} settings={settings} labels={labels} />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const drawer = screen.getByRole('dialog', { name: 'Menu' });
    const rows = within(drawer).getAllByRole('listitem');
    expect(rows[1]).toHaveTextContent('Order now~15 MIN');
    expect(within(drawer).getByText('1640 South St, Philadelphia, PA')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
