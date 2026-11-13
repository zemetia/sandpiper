import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
  CateringHeroBlock as HeroData,
  CateringMenuBlock as MenuData,
  CateringQuoteBlock as QuoteData,
  CateringRibbonBlock as RibbonData,
  CateringStepsBlock as StepsData,
  CateringUseCasesBlock as UseCasesData,
  Media,
} from '@/payload-types';

import { CateringQuoteForm } from '../catering/CateringQuoteForm';
import { CateringHeroBlock } from './CateringHeroBlock';
import { CateringMenuBlock } from './CateringMenuBlock';
import { CateringQuoteBlock } from './CateringQuoteBlock';
import { CateringRibbonBlock } from './CateringRibbonBlock';
import { CateringStepsBlock } from './CateringStepsBlock';
import { CateringUseCasesBlock } from './CateringUseCasesBlock';

const requestQuote = vi.fn();

vi.mock('@/services/cms.service', () => ({
  cmsService: {
    getSiteSettings: async () => ({
      phone: '(267) 858-6183',
      address: '1640 South St\nPhiladelphia, PA',
      mapUrl: 'https://maps.example/sandpiper',
    }),
  },
}));
vi.mock('@/services/catering.service', () => ({
  cateringService: { requestQuote: (data: unknown) => requestQuote(data) },
}));
vi.mock('../CmsImage', () => ({
  CmsImage: ({ image }: { image: { url: string; alt: string } | null }) =>
    image ? <span role="img" aria-label={image.alt} /> : null,
}));

const media = (name: string) =>
  ({ id: 1, alt: name, url: `/api/media/file/${name}.webp`, width: 400, height: 400 }) as Media;

const withQuery = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}
    >
      {ui}
    </QueryClientProvider>,
  );

describe('CateringHeroBlock', () => {
  const block: HeroData = {
    blockType: 'cateringHero',
    eyebrow: 'CATERING · SOUTH PHILLY',
    heading: 'FEED THE\nWHOLE CREW.',
    links: [
      { link: { type: 'custom', url: '#quote', label: 'Request a quote', appearance: 'primary' } },
      { link: { type: 'custom', url: '#menu', label: 'See catering menu', appearance: 'outline' } },
    ],
    facts: [{ icon: 'timer', value: '48 HRS', label: 'notice' }],
    photos: { main: media('Classic breakfast') },
    stamp: { label: 'TRAYS SERVE', value: '10+' },
    note: 'boxed up by 8am',
  };

  it('renders the headline as h1 only when first, with anchor links and facts', () => {
    const { rerender } = render(<CateringHeroBlock block={block} isFirst />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FEED THEWHOLE CREW.');
    expect(screen.getByRole('link', { name: /Request a quote/ })).toHaveAttribute('href', '#quote');
    expect(screen.getByRole('link', { name: 'See catering menu' })).toHaveAttribute(
      'href',
      '#menu',
    );
    expect(screen.getByText('48 HRS')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Classic breakfast' })).toBeInTheDocument();
    expect(screen.getByText('boxed up by 8am')).toBeInTheDocument();
    rerender(<CateringHeroBlock block={block} isFirst={false} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});

describe('CateringRibbonBlock', () => {
  it('renders the words and nothing when empty', () => {
    const block: RibbonData = { blockType: 'cateringRibbon', words: ['BAGEL SPREADS'] };
    const { container, rerender } = render(<CateringRibbonBlock block={block} />);
    expect(container).toHaveTextContent('BAGEL SPREADS');
    rerender(<CateringRibbonBlock block={{ blockType: 'cateringRibbon', words: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('CateringMenuBlock', () => {
  it('numbers categories, lists items with prices and links phone chips to cards', async () => {
    const block: MenuData = {
      blockType: 'cateringMenu',
      heading: 'PICK YOUR SPREAD',
      categories: [
        {
          title: 'Breakfast Trays',
          shortLabel: 'Breakfast',
          items: [{ name: 'The BEC Tray', price: '$120', description: '10 sandwiches' }],
        },
        { title: 'Bagels & Bakery', items: [{ name: 'Bagel Tray', price: '$55' }] },
      ],
      note: 'Prices before tax.',
    };
    render(await CateringMenuBlock({ block }));
    expect(screen.getByRole('heading', { level: 3, name: 'Breakfast Trays' })).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Breakfast' })).toHaveAttribute(
      'href',
      '#catering-menu-1',
    );
    expect(screen.getByRole('link', { name: 'Bagels & Bakery' })).toHaveAttribute(
      'href',
      '#catering-menu-2',
    );
    expect(document.getElementById('catering-menu-2')).toHaveTextContent('Bagel Tray');
  });
});

describe('CateringUseCasesBlock and CateringStepsBlock', () => {
  it('renders each use case', () => {
    const block: UseCasesData = {
      blockType: 'cateringUseCases',
      headingBold: 'MADE FOR',
      headingLight: 'the whole neighborhood.',
      cases: [{ icon: 'briefcase', title: 'Office Breakfasts', body: 'Bagels before standup.' }],
    };
    render(<CateringUseCasesBlock block={block} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('MADE FOR');
    expect(
      screen.getByRole('heading', { level: 3, name: 'Office Breakfasts' }),
    ).toBeInTheDocument();
  });

  it('renders steps in both the phone timeline and the desktop cards', () => {
    const block: StepsData = {
      blockType: 'cateringSteps',
      heading: 'Three steps to a full table.',
      steps: [{ title: 'Tell us the plan' }, { title: 'We build your menu' }],
    };
    render(<CateringStepsBlock block={block} />);
    expect(screen.getAllByRole('heading', { name: 'We build your menu' })).toHaveLength(2);
  });
});

describe('CateringQuoteBlock', () => {
  it('falls back to site settings for contact details and opens the first FAQ', async () => {
    const block: QuoteData = {
      blockType: 'cateringQuote',
      heading: 'GET A\nCATERING QUOTE',
      callLabel: 'Call or text',
      callPrompt: 'Rather talk?',
      occasions: ['Office breakfast', 'Party'],
      faqs: [
        { question: 'How much notice?', answer: '48 hours.' },
        { question: 'Do you deliver?', answer: 'Yes.' },
      ],
    };
    withQuery(await CateringQuoteBlock({ block }));
    const calls = screen.getAllByRole('link', { name: /267/ });
    expect(calls[0]).toHaveAttribute('href', 'tel:2678586183');
    expect(screen.getByText('1640 South St')).toBeInTheDocument();
    const details = screen.getAllByRole('group');
    expect(details.find((d) => d.tagName === 'DETAILS')).toHaveAttribute('open');
    expect(screen.getByRole('radio', { name: 'Office breakfast' })).toBeChecked();
  });
});

describe('CateringQuoteForm', () => {
  const labels = new Proxy({} as never, { get: (_, key) => String(key) });

  beforeEach(() => requestQuote.mockReset());

  it('submits the parsed request and shows the success message', async () => {
    requestQuote.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    withQuery(
      <CateringQuoteForm
        title="Catering request"
        occasions={['Team lunch', 'Party']}
        submitLabel="Send my request"
        finePrint={null}
        success={{ heading: 'Request received!', body: null }}
        labels={labels}
      />,
    );
    await user.type(screen.getByLabelText('name'), 'Jane Doe');
    await user.type(screen.getByLabelText('email'), 'jane@example.com');
    await user.type(screen.getByLabelText('headcount'), '25');
    await user.click(screen.getByRole('radio', { name: 'Party' }));
    await user.click(screen.getByRole('radio', { name: 'delivery' }));
    await user.click(screen.getByRole('button', { name: /Send my request/ }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Request received!'));
    expect(requestQuote).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        headcount: 25,
        occasion: 'Party',
        fulfillment: 'delivery',
      }),
    );
  });
});
