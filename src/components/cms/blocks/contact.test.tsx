import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
  ContactFindBlock as FindData,
  ContactFormBlock as FormData,
  ContactHeroBlock as HeroData,
  Media,
} from '@/payload-types';

import { ContactFindBlock } from './ContactFindBlock';
import { ContactFormBlock } from './ContactFormBlock';
import { ContactHeroBlock } from './ContactHeroBlock';

const send = vi.fn();

vi.mock('@/services/cms.service', () => ({
  cmsService: {
    getSiteSettings: async () => ({
      phone: '(267) 858-6183',
      mapUrl: 'https://maps.example/sandpiper',
    }),
  },
}));
vi.mock('@/services/contact.service', () => ({
  contactService: { send: (data: unknown) => send(data) },
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

describe('ContactHeroBlock', () => {
  const block: HeroData = {
    blockType: 'contactHero',
    heading: 'Say hi to\n*the bird.*',
    showCall: true,
    links: [
      {
        link: {
          type: 'custom',
          url: 'https://maps.example/x',
          label: 'Get directions',
          newTab: true,
        },
      },
    ],
    hours: { value: '7am – 4pm', rows: [{ label: 'Lunch', value: 'from 11am' }] },
    photo: media('Lattes'),
  };

  it('renders a tel: call button from Site settings, the link and the hours card', async () => {
    render(await ContactHeroBlock({ block, isFirst: true }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Say hi tothe bird.');
    expect(screen.getByRole('link', { name: /858-6183/ })).toHaveAttribute(
      'href',
      'tel:2678586183',
    );
    expect(screen.getByRole('link', { name: /Get directions/ })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByText('from 11am')).toBeInTheDocument();
  });

  it('drops the call button when switched off', async () => {
    render(await ContactHeroBlock({ block: { ...block, showCall: false }, isFirst: false }));
    expect(screen.queryByRole('link', { name: /858-6183/ })).not.toBeInTheDocument();
  });
});

describe('ContactFormBlock', () => {
  const block: FormData = {
    blockType: 'contactForm',
    heading: 'Send a note,\n*we’ll write back.*',
    topics: ['Just saying hi', 'Catering'],
    successHeading: 'Message sent!',
    details: [
      {
        icon: 'mail',
        label: 'Email',
        value: 'hello@sandpiper.cafe',
        url: 'mailto:hello@sandpiper.cafe',
      },
      { icon: 'pin', value: '1640 South St' },
    ],
    callout: {
      text: 'Feeding a crowd?',
      link: { type: 'custom', url: '/catering', label: 'Quote' },
    },
  };

  beforeEach(() => send.mockReset());

  it('renders linked and plain details plus the callout', () => {
    withQuery(<ContactFormBlock block={block} />);
    expect(screen.getByRole('link', { name: /hello@sandpiper.cafe/ })).toHaveAttribute(
      'href',
      'mailto:hello@sandpiper.cafe',
    );
    expect(screen.queryByRole('link', { name: /1640 South St/ })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Quote/ })).toHaveAttribute('href', '/catering');
  });

  it('sends a valid message with the picked topic and shows the thank-you', async () => {
    send.mockResolvedValue({ ok: true });
    withQuery(<ContactFormBlock block={block} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Catering' }));
    await userEvent.type(screen.getByLabelText('Your name'), 'Jordan');
    await userEvent.type(screen.getByLabelText('Email'), 'jordan@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'Trays for 20?');
    await userEvent.click(screen.getByRole('button', { name: /Send message/ }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Message sent!'));
    expect(send).toHaveBeenCalledWith({
      name: 'Jordan',
      email: 'jordan@example.com',
      topic: 'Catering',
      message: 'Trays for 20?',
      website: '',
    });
  });
});

describe('ContactFindBlock', () => {
  const block: FindData = {
    blockType: 'contactFind',
    heading: 'Right on\n*South Street.*',
    facts: [{ icon: 'pin', title: '1640 South St' }],
    useMapUrl: true,
    link: { type: 'custom', label: 'Open in Google Maps' },
  };

  it('points the button at the Site settings map link', async () => {
    render(await ContactFindBlock({ block }));
    const cta = screen.getByRole('link', { name: /Open in Google Maps/ });
    expect(cta).toHaveAttribute('href', 'https://maps.example/sandpiper');
    expect(cta).toHaveAttribute('target', '_blank');
  });

  it('uses the block link when the map toggle is off', async () => {
    render(
      await ContactFindBlock({
        block: {
          ...block,
          useMapUrl: false,
          link: { type: 'custom', url: '/menu', label: 'See the menu' },
        },
      }),
    );
    expect(screen.getByRole('link', { name: /See the menu/ })).toHaveAttribute('href', '/menu');
  });
});
