import type { Meta, StoryObj } from '@storybook/nextjs';

import { Header } from './Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    siteName: 'Sandpiper',
    items: [
      { href: '/', label: 'Home', newTab: false, appearance: 'link' },
      { href: '/menu', label: 'Menu', newTab: false, appearance: 'link' },
      { href: '/about', label: 'About', newTab: false, appearance: 'link' },
    ],
    cta: { href: '/about', label: 'Visit us', newTab: false, appearance: 'primary' },
    labels: { openMenu: 'Open menu', closeMenu: 'Close menu' },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCta: Story = { args: { cta: null } };
