import type { Meta, StoryObj } from '@storybook/nextjs';

import { Marquee } from './Marquee';

const meta = {
  title: 'Shared/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  args: {
    items: ['Open daily 7am – 4pm', 'Proudly serving Lavazza', '1640 South St, Philly'],
    separator: <span className="text-berry px-6">✦</span>,
    className: 'bg-ink py-3',
    itemClassName: 'text-sunny text-sm font-semibold uppercase tracking-[0.14em]',
    label: 'Café facts',
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Reverse: Story = { args: { reverse: true } };
