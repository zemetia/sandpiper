import type React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type {
  CallToActionBlock as CtaData,
  FaqBlock as FaqData,
  HeroBlock as HeroData,
  Page,
  TestimonialsBlock as TestimonialsData,
} from '@/payload-types';

import { CallToActionBlock } from './CallToActionBlock';
import { FaqBlock } from './FaqBlock';
import { HeroBlock } from './HeroBlock';
import { TestimonialsBlock } from './TestimonialsBlock';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: { href: string; className?: string; children?: React.ReactNode }) => (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  ),
}));

const menuPage = { id: 1, slug: 'menu', title: 'Menu', updatedAt: '', createdAt: '' } as Page;

describe('HeroBlock', () => {
  const block: HeroData = {
    blockType: 'hero',
    variant: 'minimal',
    heading: 'Slow mornings',
    subheading: 'Great coffee',
  };

  it('uses h1 only for the first block on the page', () => {
    const { rerender } = render(<HeroBlock block={block} isFirst />);
    expect(screen.getByRole('heading', { level: 1, name: 'Slow mornings' })).toBeInTheDocument();
    rerender(<HeroBlock block={block} isFirst={false} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Slow mornings' })).toBeInTheDocument();
  });

  it('renders the subheading and links', () => {
    render(
      <HeroBlock
        block={{
          ...block,
          links: [{ link: { type: 'reference', reference: menuPage, label: 'See the menu' } }],
        }}
        isFirst
      />,
    );
    expect(screen.getByText('Great coffee')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'See the menu' })).toHaveAttribute('href', '/menu');
  });
});

describe('FaqBlock', () => {
  it('renders each question as a summary', () => {
    const block: FaqData = { blockType: 'faq', items: [{ question: 'Wi-Fi?', answer: 'Yes.' }] };
    const { container } = render(<FaqBlock block={block} />);
    expect(container.querySelector('summary')).toHaveTextContent('Wi-Fi?');
    expect(screen.getByText('Yes.')).toBeInTheDocument();
  });

  it('renders nothing without items', () => {
    const { container } = render(<FaqBlock block={{ blockType: 'faq', items: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('TestimonialsBlock', () => {
  it('renders quote, author and source', () => {
    const block: TestimonialsData = {
      blockType: 'testimonials',
      quotes: [{ quote: 'Best flat white.', author: 'Rani', source: 'Google review' }],
    };
    render(<TestimonialsBlock block={block} />);
    expect(screen.getByText('Best flat white.')).toBeInTheDocument();
    expect(screen.getByText('Rani')).toBeInTheDocument();
    expect(screen.getByText(/Google review/)).toBeInTheDocument();
  });
});

describe('CallToActionBlock', () => {
  it('renders heading, body and resolved page link', () => {
    const block: CtaData = {
      blockType: 'cta',
      heading: 'Hungry already?',
      body: 'Browse the menu.',
      links: [{ link: { type: 'reference', reference: menuPage, label: 'Browse' } }],
    };
    render(<CallToActionBlock block={block} />);
    expect(screen.getByRole('heading', { name: 'Hungry already?' })).toBeInTheDocument();
    expect(screen.getByText('Browse the menu.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse' })).toHaveAttribute('href', '/menu');
  });
});
