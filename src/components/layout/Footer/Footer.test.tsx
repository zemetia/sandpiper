import type React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { NavigationVO, SiteSettingsVO } from '@/types/value-objects';

import { Footer } from './Footer';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'>) => <a {...props} />,
}));
vi.mock('@/components/shared/LanguageSwitcher', () => ({ LanguageSwitcher: () => <div /> }));
vi.mock('./NewsletterForm', () => ({
  NewsletterForm: (props: { buttonLabel: string }) => <button>{props.buttonLabel}</button>,
}));

const settings: SiteSettingsVO = {
  siteName: 'Sandpiper',
  tagline: 'Breakfast on South Street',
  logo: null,
  currency: 'USD',
  email: null,
  phone: '(267) 858-6183',
  whatsappUrl: null,
  address: '1640 South St\nPhiladelphia, PA',
  mapUrl: null,
  hours: [{ days: 'Open daily', time: '7am – 4pm' }],
  socials: [{ platform: 'instagram', url: 'https://instagram.com/x' }],
  announcement: null,
};
const footer: NavigationVO['footer'] = {
  blurb: null,
  items: [{ href: '/menu', label: 'Menu', newTab: false, appearance: 'link' }],
  exploreHeading: 'Explore',
  visitHeading: null,
  copyright: 'Sandpiper Cafe · South Philly',
  note: 'Proudly serving Lavazza',
  wordmark: 'SANDPIPER',
  newsletter: {
    heading: 'GET THE SPECIALS',
    body: null,
    placeholder: null,
    buttonLabel: 'Sign up',
  },
};
const labels = {
  explore: 'Explore',
  visit: 'Visit',
  instagram: 'Instagram',
  map: 'Map',
  call: 'Call us',
  newsletter: { email: 'Email', thanks: 'Thanks', invalid: 'Invalid', error: 'Error' },
};

describe('Footer', () => {
  it('builds the Visit column from site settings', () => {
    render(<Footer settings={settings} footer={footer} labels={labels} />);
    expect(screen.getByText('Breakfast on South Street')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Visit' })).toBeInTheDocument();
    expect(screen.getByText('Philadelphia, PA')).toBeInTheDocument();
    expect(screen.getByText('Open daily 7am – 4pm')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/x',
    );
    expect(screen.getByRole('link', { name: 'Call us' })).toHaveAttribute('href', 'tel:2678586183');
  });

  it('renders newsletter and wordmark only when configured', () => {
    const { rerender } = render(<Footer settings={settings} footer={footer} labels={labels} />);
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByText('SANDPIPER')).toBeInTheDocument();

    rerender(
      <Footer
        settings={settings}
        footer={{ ...footer, newsletter: null, wordmark: null }}
        labels={labels}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Sign up' })).toBeNull();
    expect(screen.queryByText('SANDPIPER')).toBeNull();
  });
});
