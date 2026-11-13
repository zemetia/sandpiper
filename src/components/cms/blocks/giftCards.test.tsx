import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type {
  GiftCardFaqBlock as GiftCardFaqData,
  GiftCardHeroBlock as GiftCardHeroData,
  GiftCardPanelsBlock as GiftCardPanelsData,
  GiftCardStepsBlock as GiftCardStepsData,
} from '@/payload-types';

import { GiftCardFaqBlock } from './GiftCardFaqBlock';
import { GiftCardHeroBlock } from './GiftCardHeroBlock';
import { GiftCardPanelsBlock } from './GiftCardPanelsBlock';
import { GiftCardStepsBlock } from './GiftCardStepsBlock';

const toast = 'https://order.toasttab.com/egiftcards/sandpiper-1640-south-street';

describe('GiftCardHeroBlock', () => {
  const block: GiftCardHeroData = {
    blockType: 'giftCardHero',
    eyebrow: 'SANDPIPER eGIFT CARDS',
    line1: 'GIVE THEM',
    line2: 'BREAKFAST.',
    amounts: [{ value: '$25' }, { value: '$50', selected: true }, { value: '$100' }],
    anyAmount: 'or any amount',
    buyLink: { type: 'custom', url: toast, label: 'Buy an eGift Card', newTab: true },
    card: { label: 'eGIFT CARD', backAmount: '$100' },
    tag: { label: 'DELIVERED BY', value: 'email, instantly' },
  };

  it('renders the headline, external buy link and preselected amount', async () => {
    render(await GiftCardHeroBlock({ block, isFirst: true }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('GIVE THEMBREAKFAST.');
    const buy = screen.getByRole('link', { name: 'Buy an eGift Card' });
    expect(buy).toHaveAttribute('href', toast);
    expect(buy).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('button', { name: '$50' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('email, instantly')).toBeInTheDocument();
  });

  it('re-prints the front card when another amount is picked', async () => {
    const { container } = render(await GiftCardHeroBlock({ block, isFirst: false }));
    const group = screen.getByRole('group', { name: 'Gift card amount' });
    await userEvent.click(within(group).getByRole('button', { name: '$25' }));
    expect(within(group).getByRole('button', { name: '$25' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(container.querySelector('.gc-amount-pop')).toHaveTextContent('$25');
  });
});

describe('GiftCardStepsBlock', () => {
  it('numbers the steps in order', () => {
    const block: GiftCardStepsData = {
      blockType: 'giftCardSteps',
      heading: 'Easy as a\nshort stack.',
      steps: [
        { icon: 'card', title: 'Pick an amount' },
        { icon: 'mail', title: 'Send it by email' },
      ],
    };
    render(<GiftCardStepsBlock block={block} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Easy as a short stack.');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveTextContent('02');
    expect(items[1]).toHaveTextContent('Send it by email');
  });
});

describe('GiftCardPanelsBlock', () => {
  it('shows the link address for external links and the phone note', () => {
    const block: GiftCardPanelsData = {
      blockType: 'giftCardPanels',
      panels: [
        {
          tone: 'sunny',
          icon: 'gift',
          heading: 'Buy an eGift Card',
          link: { type: 'custom', url: toast, label: 'Buy on Toast', newTab: true },
          note: 'Opens Toast in a new tab',
        },
      ],
    };
    render(<GiftCardPanelsBlock block={block} />);
    expect(screen.getByRole('link', { name: 'Buy on Toast' })).toHaveAttribute('href', toast);
    expect(
      screen.getByText('order.toasttab.com/egiftcards/sandpiper-1640-south-street'),
    ).toBeInTheDocument();
    expect(screen.getByText('Opens Toast in a new tab')).toBeInTheDocument();
  });

  it('renders nothing without panels', () => {
    const { container } = render(
      <GiftCardPanelsBlock block={{ blockType: 'giftCardPanels', panels: [] }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe('GiftCardFaqBlock', () => {
  it('renders questions and answers as a description list', () => {
    const block: GiftCardFaqData = {
      blockType: 'giftCardFaq',
      heading: 'Good\nto know.',
      items: [{ question: 'Where can I use it?', answer: 'At 1640 South St.' }],
    };
    const { container } = render(<GiftCardFaqBlock block={block} />);
    expect(container.querySelector('dt')).toHaveTextContent('Where can I use it?');
    expect(container.querySelector('dd')).toHaveTextContent('At 1640 South St.');
  });
});
