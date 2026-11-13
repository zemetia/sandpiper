import type { Meta, StoryObj } from '@storybook/nextjs';

import { CmsLink } from './CmsLink';

const meta = {
  title: 'CMS/CmsLink',
  component: CmsLink,
  tags: ['autodocs'],
  args: {
    link: {
      href: '/menu',
      label: 'View Menu',
      newTab: false,
      appearance: 'primary',
    },
    size: 'lg',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof CmsLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  args: {
    link: {
      href: '/menu',
      label: 'View Menu',
      newTab: false,
      appearance: 'primary',
    },
  },
};

export const Outline: Story = {
  args: {
    link: {
      href: '/about',
      label: 'About Us',
      newTab: false,
      appearance: 'outline',
    },
  },
};

export const LinkAppearance: Story = {
  args: {
    link: {
      href: '/menu',
      label: 'Explore dishes',
      newTab: false,
      appearance: 'link',
    },
  },
};

export const ExternalNewTab: Story = {
  args: {
    link: {
      href: 'https://x.test',
      label: 'Visit External (New Tab)',
      newTab: true,
      appearance: 'primary',
    },
  },
};
