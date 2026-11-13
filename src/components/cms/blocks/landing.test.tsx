import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type {
  GramWallBlock as GramWallData,
  Media,
  MuralStoryBlock as MuralStoryData,
  Page,
  ReviewThreadBlock as ReviewThreadData,
  RibbonsBlock as RibbonsData,
  SunCtaBlock as SunCtaData,
} from '@/payload-types';
import type { MenuBoardCategoryVO, MenuItemVO } from '@/types/value-objects';

import { MenuBoardTabs } from '../landing/MenuBoardTabs';
import { GramWallBlock } from './GramWallBlock';
import { MuralStoryBlock } from './MuralStoryBlock';
import { ReviewThreadBlock } from './ReviewThreadBlock';
import { RibbonsBlock } from './RibbonsBlock';
import { SunCtaBlock } from './SunCtaBlock';

vi.mock('../CmsImage', () => ({
  CmsImage: ({ image }: { image: { url: string; alt: string } | null }) =>
    image ? <span role="img" aria-label={image.alt} /> : null,
}));

const menuPage = { id: 1, slug: 'menu', title: 'Menu', updatedAt: '', createdAt: '' } as Page;
const media = (name: string) =>
  ({ id: 1, alt: name, url: `/api/media/file/${name}.webp`, width: 400, height: 400 }) as Media;

describe('RibbonsBlock', () => {
  it('renders both ribbons as decoration hidden from assistive tech', () => {
    const block: RibbonsData = {
      blockType: 'ribbons',
      topWords: ['BAGELS', 'PANCAKES'],
      bottomWords: ['LUNCH'],
    };
    const { container } = render(<RibbonsBlock block={block} />);
    const tracks = container.querySelectorAll('[aria-hidden="true"].marquee-track');
    expect(tracks).toHaveLength(2);
    expect(tracks[1]).toHaveTextContent('BAGELS');
    expect(tracks[0]).toHaveTextContent('LUNCH');
  });

  it('renders nothing without words', () => {
    const { container } = render(
      <RibbonsBlock block={{ blockType: 'ribbons', topWords: [], bottomWords: [] }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe('MuralStoryBlock', () => {
  it('renders the split headline, magnifier captions and story link', () => {
    const block: MuralStoryData = {
      blockType: 'muralStory',
      headingBold: 'Drawn by hand,',
      headingLight: 'made by hand.',
      image: media('mural'),
      callouts: [{ image: media('bird'), caption: 'our sandpiper bird' }],
      body: 'A corner café.',
      link: { type: 'reference', reference: menuPage, label: 'Our story →' },
    };
    render(<MuralStoryBlock block={block} />);
    expect(
      screen.getByRole('heading', { name: 'Drawn by hand, made by hand.' }),
    ).toBeInTheDocument();
    expect(screen.getByText('our sandpiper bird')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Our story →' })).toHaveAttribute('href', '/menu');
  });
});

describe('GramWallBlock', () => {
  it('renders the handle, follow button and one polaroid per photo', () => {
    const block: GramWallData = {
      blockType: 'gramWall',
      handle: '@sandpiper.philly',
      link: { type: 'custom', url: 'https://instagram.com/x', label: 'Follow', newTab: true },
      photos: [media('a'), media('b')],
    };
    render(<GramWallBlock block={block} />);
    expect(screen.getByRole('heading', { name: '@sandpiper.philly' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Follow' })).toHaveAttribute('target', '_blank');
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});

describe('ReviewThreadBlock', () => {
  it('keeps heading line breaks and renders each review with its author', async () => {
    const block: ReviewThreadData = {
      blockType: 'reviewThread',
      heading: 'WORD ON\nSOUTH ST.',
      ratings: [{ score: '4.8', platform: 'Google' }],
      reviews: [{ quote: 'Smoothies slap', author: 'Jo', source: 'Google', tone: 'sunny' }],
    };
    render(await ReviewThreadBlock({ block }));
    expect(screen.getByRole('heading')).toHaveClass('whitespace-pre-line');
    expect(screen.getByText('★ 4.8')).toBeInTheDocument();
    expect(screen.getByText('Smoothies slap')).toHaveClass('bg-sunny');
    expect(screen.getByText(/— Jo/)).toHaveTextContent('— Jo, Google');
  });
});

describe('SunCtaBlock', () => {
  it('renders the heading, order link and stamp', () => {
    const block: SunCtaData = {
      blockType: 'sunCta',
      heading: 'Skip the line.',
      link: { type: 'reference', reference: menuPage, label: 'Order online' },
      stamp: { label: 'READY IN', value: '~15 min' },
    };
    render(<SunCtaBlock block={block} />);
    expect(screen.getByRole('heading', { name: 'Skip the line.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Order online' })).toHaveAttribute('href', '/menu');
    expect(screen.getByText('~15 min')).toBeInTheDocument();
  });
});

describe('MenuBoardTabs', () => {
  const item = (id: number, name: string, featured = false) =>
    ({ id, name, price: '$9', description: null, featured, image: null }) as MenuItemVO;
  const categories: MenuBoardCategoryVO[] = [
    {
      id: 1,
      slug: 'b',
      name: 'Breakfast',
      items: [item(1, 'Short Stack')],
      image: null,
      featured: item(1, 'Short Stack'),
    },
    {
      id: 2,
      slug: 's',
      name: 'Smoothies',
      items: [item(2, 'Very Berry')],
      image: null,
      featured: null,
    },
  ];

  it('switches the panel with clicks and arrow keys', async () => {
    render(<MenuBoardTabs categories={categories} stickerLabel="FAN FAVE" menuLink={null} />);
    expect(screen.getByRole('tab', { name: /Breakfast/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Short Stack · $9')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: /Smoothies/ }));
    expect(screen.getByText('Very Berry')).toBeInTheDocument();
    expect(screen.queryByText('FAN FAVE')).toBeNull();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /Breakfast/ })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Short Stack');
  });
});
