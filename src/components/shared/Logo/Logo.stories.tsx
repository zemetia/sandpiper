import type { Meta, StoryObj } from '@storybook/nextjs';

import { Logo } from './Logo';

const meta = {
  title: 'Shared/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: { title: 'Sandpiper Cafe', className: 'w-64' },
  decorators: [
    (Story) => (
      <div className="bg-sunny p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmark: Story = {};
export const Badge: Story = { args: { variant: 'badge', className: 'w-40' } };
