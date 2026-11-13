import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type {
  AboutBeliefBlock as BeliefData,
  AboutClosingBlock as ClosingData,
  AboutGalleryBlock as GalleryData,
  AboutHeroBlock as HeroData,
  AboutKitchenBlock as KitchenData,
  AboutTeamBlock as TeamData,
  Media,
} from '@/payload-types';

import { headingLines } from '../story/primitives';
import { AboutBeliefBlock } from './AboutBeliefBlock';
import { AboutClosingBlock } from './AboutClosingBlock';
import { AboutGalleryBlock } from './AboutGalleryBlock';
import { AboutHeroBlock } from './AboutHeroBlock';
import { AboutKitchenBlock } from './AboutKitchenBlock';
import { AboutTeamBlock } from './AboutTeamBlock';

vi.mock('../CmsImage', () => ({
  CmsImage: ({ image }: { image: { url: string; alt: string } | null }) =>
    image ? <span role="img" aria-label={image.alt} /> : null,
}));

const media = (name: string) =>
  ({ id: 1, alt: name, url: `/api/media/file/${name}.webp`, width: 400, height: 400 }) as Media;

describe('headingLines', () => {
  it('splits lines and flags *starred* lines as the accent', () => {
    expect(headingLines('Welcome to\n*Sandpiper*\r\n\nCafe!')).toEqual([
      { text: 'Welcome to', accent: false },
      { text: 'Sandpiper', accent: true },
      { text: 'Cafe!', accent: false },
    ]);
  });
});

describe('AboutHeroBlock', () => {
  const block: HeroData = {
    blockType: 'aboutHero',
    eyebrow: 'ABOUT US',
    heading: 'Welcome to\n*Sandpiper*\nCafe!',
    tags: ['Family-owned', 'All-day breakfast'],
    polaroids: [{ image: media('Interior'), caption: 'pull up a seat' }],
    stamp: { top: 'FAMILY', value: 'OWNED', bottom: '& OPERATED' },
  };

  it('renders the h1 with the accent line in blue, tags, polaroid and stamp', () => {
    render(<AboutHeroBlock block={block} isFirst />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome toSandpiperCafe!');
    expect(screen.getByText('Sandpiper')).toHaveClass('text-blue');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'Interior' })).toBeInTheDocument();
    expect(screen.getByText('pull up a seat')).toBeInTheDocument();
    expect(screen.getByText('OWNED')).toBeInTheDocument();
  });
});

describe('AboutBeliefBlock', () => {
  it('renders the statement and one card per plate', () => {
    const block: BeliefData = {
      blockType: 'aboutBelief',
      eyebrow: 'OUR BELIEF',
      heading: 'Everyone deserves\n*something better.*',
      plates: [
        { name: 'The BEC', tag: 'SANDWICH', image: media('The BEC') },
        { name: 'Veggie Hash' },
      ],
    };
    render(<AboutBeliefBlock block={block} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Everyone deservessomething better.',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('SANDWICH')).toBeInTheDocument();
  });
});

describe('AboutKitchenBlock', () => {
  it('numbers the pillars and shows the seal', () => {
    const block: KitchenData = {
      blockType: 'aboutKitchen',
      heading: 'Prepared with care,\n*plate by plate.*',
      pillars: [
        { title: 'Breakfast sandwiches', icon: 'sandwich' },
        { title: 'Lavazza & espresso', icon: 'coffee' },
      ],
      photos: { main: media('Hot coffee') },
      stamp: { top: 'PROUDLY', value: 'Lavazza', bottom: 'POURING' },
    };
    render(<AboutKitchenBlock block={block} />);
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Lavazza & espresso')).toBeInTheDocument();
    expect(screen.getByText('Lavazza')).toBeInTheDocument();
  });
});

describe('AboutGalleryBlock', () => {
  it('splits photos into a top row of three and a bottom row', () => {
    const block: GalleryData = {
      blockType: 'aboutGallery',
      heading: 'A little look inside.',
      photos: ['a', 'b', 'c', 'd', 'e'].map((n) => ({ image: media(n), caption: n })),
    };
    const { container } = render(<AboutGalleryBlock block={block} />);
    const rows = container.querySelectorAll('.grid');
    expect(rows).toHaveLength(2);
    expect(rows[0]?.querySelectorAll('figure')).toHaveLength(3);
    expect(rows[1]?.querySelectorAll('figure')).toHaveLength(2);
  });
});

describe('AboutTeamBlock', () => {
  const block: TeamData = {
    blockType: 'aboutTeam',
    heading: 'The family behind the counter.',
    members: [{ name: 'Sam', role: 'Head Barista', tone: 'berry', note: 'latte art on demand' }],
    hiring: {
      heading: 'Want to join the family?',
      enableLink: true,
      link: { type: 'custom', url: 'mailto:hello@sandpiper.cafe', label: 'Apply now' },
    },
  };

  it('renders members and the hiring card button', () => {
    render(<AboutTeamBlock block={block} />);
    expect(screen.getByText('Head Barista')).toHaveClass('bg-berry');
    expect(screen.getByRole('link', { name: /Apply now/ })).toHaveAttribute(
      'href',
      'mailto:hello@sandpiper.cafe',
    );
  });

  it('hides the hiring button when it is switched off', () => {
    render(<AboutTeamBlock block={{ ...block, hiring: { ...block.hiring, enableLink: false } }} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('AboutClosingBlock', () => {
  it('renders the statement, links and sign-off', () => {
    const block: ClosingData = {
      blockType: 'aboutClosing',
      heading: 'Good food,\n*that’s Sandpiper Cafe.*',
      links: [
        { link: { type: 'custom', url: '/menu', label: 'Order online' } },
        { link: { type: 'custom', url: '/menu', label: 'See the menu', appearance: 'outline' } },
      ],
      note: 'see you on South St',
    };
    render(<AboutClosingBlock block={block} />);
    expect(screen.getByText('that’s Sandpiper Cafe.')).toHaveClass('text-blue');
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('see you on South St')).toBeInTheDocument();
  });
});
