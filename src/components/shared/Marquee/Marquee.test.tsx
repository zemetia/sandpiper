import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Marquee } from './Marquee';

describe('Marquee', () => {
  it('exposes the items once to screen readers and hides the moving copies', () => {
    const { container } = render(<Marquee items={['Coffee', 'Bagels']} label="Facts" />);
    expect(screen.getByRole('region', { name: 'Facts' })).toHaveTextContent('Coffee · Bagels');
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.getAllByText('Coffee', { selector: 'span' })).toHaveLength(4);
  });

  it('renders nothing without items', () => {
    const { container } = render(<Marquee items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
