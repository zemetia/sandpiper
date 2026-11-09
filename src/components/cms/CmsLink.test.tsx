import type React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { LinkVO } from '@/types/value-objects';
import { CmsLink } from './CmsLink';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: {
    href: string;
    className?: string;
    target?: string;
    rel?: string;
    children?: React.ReactNode;
  }) => (
    <a href={props.href} className={props.className} target={props.target} rel={props.rel}>
      {props.children}
    </a>
  ),
  usePathname: () => '/',
}));

describe('CmsLink', () => {
  it('renders internal link with href /menu', () => {
    const link: LinkVO = {
      href: '/menu',
      label: 'View Menu',
      newTab: false,
      appearance: 'primary',
    };
    render(<CmsLink link={link} />);
    const anchor = screen.getByRole('link', { name: 'View Menu' });
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '/menu');
    expect(anchor).not.toHaveAttribute('target');
    expect(anchor).not.toHaveAttribute('rel');
  });

  it('renders external link with external href', () => {
    const link: LinkVO = {
      href: 'https://x.test',
      label: 'External Link',
      newTab: false,
      appearance: 'link',
    };
    render(<CmsLink link={link} />);
    const anchor = screen.getByRole('link', { name: 'External Link' });
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', 'https://x.test');
    expect(anchor).not.toHaveAttribute('target');
    expect(anchor).not.toHaveAttribute('rel');
  });

  it('adds target="_blank" and rel="noopener noreferrer" when newTab is true for internal link', () => {
    const link: LinkVO = {
      href: '/menu',
      label: 'Open Menu in New Tab',
      newTab: true,
      appearance: 'outline',
    };
    render(<CmsLink link={link} />);
    const anchor = screen.getByRole('link', { name: 'Open Menu in New Tab' });
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('adds target="_blank" and rel="noopener noreferrer" when newTab is true for external link', () => {
    const link: LinkVO = {
      href: 'https://x.test',
      label: 'Open External in New Tab',
      newTab: true,
      appearance: 'primary',
    };
    render(<CmsLink link={link} />);
    const anchor = screen.getByRole('link', { name: 'Open External in New Tab' });
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
