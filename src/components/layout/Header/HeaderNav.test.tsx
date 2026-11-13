import type React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { LinkVO } from '@/types/value-objects';

import { HeaderNav } from './HeaderNav';

vi.mock('@/i18n/navigation', () => ({
  Link: (props: { href: string; className?: string; children?: React.ReactNode }) => (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  ),
  usePathname: () => '/menu',
}));
vi.mock('@/components/shared/LanguageSwitcher', () => ({ LanguageSwitcher: () => <div /> }));

const items: LinkVO[] = [
  { href: '/', label: 'Home', newTab: false, appearance: 'link' },
  { href: '/menu', label: 'Menu', newTab: false, appearance: 'link' },
];
const labels = { openMenu: 'Open menu', closeMenu: 'Close menu' };

describe('HeaderNav', () => {
  it('renders items and marks the current page', () => {
    render(<HeaderNav items={items} cta={null} labels={labels} />);
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Menu' })).toBeInTheDocument();
  });

  it('toggles the mobile menu', async () => {
    const { container } = render(<HeaderNav items={items} cta={null} labels={labels} />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-nav')).toBeNull();

    await userEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(container.querySelector('#mobile-nav')).not.toBeNull();
  });
});
