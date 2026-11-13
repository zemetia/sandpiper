import { describe, expect, it } from 'vitest';

import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats rupiah the Indonesian way in both languages', () => {
    expect(formatPrice(38000, 'IDR', 'id')).toMatch(/^Rp\s?38\.000$/);
    expect(formatPrice(38000, 'IDR', 'en')).toMatch(/^Rp\s?38\.000$/);
  });

  it('formats dollars with cents', () => {
    expect(formatPrice(4.5, 'USD', 'en')).toBe('$4.50');
  });
});
