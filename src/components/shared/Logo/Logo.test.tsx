import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Logo } from './Logo';

describe('Logo', () => {
  it('is labelled when given a title and hidden otherwise', () => {
    const { getByRole, container, rerender } = render(<Logo title="Sandpiper Cafe" />);
    expect(getByRole('img', { name: 'Sandpiper Cafe' })).toBeInTheDocument();
    rerender(<Logo />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('draws the badge circle behind the wordmark', () => {
    const { container } = render(<Logo variant="badge" />);
    expect(container.querySelector('circle')).toBeInTheDocument();
    expect(container.querySelectorAll('path')).toHaveLength(21);
  });
});
