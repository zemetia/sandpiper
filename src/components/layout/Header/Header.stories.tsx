import type { Meta, StoryObj } from '@storybook/nextjs';

import type { NavigationVO } from '@/types/value-objects';

import { Header } from './Header';

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

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { siteName: 'Sandpiper', nav, settings, labels: { ...labels, ticker: 'Café facts' } },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCta: Story = { args: { nav: { ...nav, cta: null } } };
