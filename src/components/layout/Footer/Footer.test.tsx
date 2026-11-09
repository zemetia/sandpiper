import type React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { SiteSettingsVO } from '@/types/value-objects';

import { Footer } from './Footer';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: { href: string; className?: string; children?: React.ReactNode }) => (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  ),
}));

const settings: SiteSettingsVO = {
  siteName: 'Sandpiper',
  tagline: 'Coffee by the shore',
  logo: null,
  currency: 'IDR',
  email: null,
  phone: '+62 812',
  whatsappUrl: null,
  address: 'Jl. Pantai 1',
  mapUrl: null,
  hours: [{ days: 'Mon – Fri', time: '07:00 – 21:00' }],
  socials: [{ platform: 'instagram', url: 'https://instagram.com/x' }],
  announcement: null,
};
const labels = {
  hours: 'Opening hours',
  address: 'Find us',
  follow: 'Follow',
  rights: 'All rights reserved.',
};

describe('Footer', () => {
  it('renders settings-driven sections', () => {
    render(<Footer settings={settings} blurb={null} items={[]} labels={labels} />);
    expect(screen.getByText('Coffee by the shore')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Opening hours' })).toBeInTheDocument();
    expect(screen.getByText('Jl. Pantai 1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/x',
    );
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument();
  });

  it('omits empty sections', () => {
    render(
      <Footer
        settings={{ ...settings, hours: [], address: null, socials: [] }}
        blurb={null}
        items={[]}
        labels={labels}
      />,
    );
    expect(screen.queryByRole('heading', { name: 'Opening hours' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Find us' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Follow' })).toBeNull();
  });
});
