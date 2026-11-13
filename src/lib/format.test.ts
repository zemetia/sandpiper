import { describe, expect, it } from 'vitest';

import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats dollars with cents, dropping them for whole amounts', () => {
    expect(formatPrice(4.5)).toBe('$4.50');
    expect(formatPrice(11)).toBe('$11');
  });
});
