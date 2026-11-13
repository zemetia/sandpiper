import { describe, expect, it } from 'vitest';

import { isOpenAt } from './hours';

// November: Philadelphia is UTC−5.
const philly = (hhmm: string) => new Date(`2026-11-13T${hhmm}:00-05:00`);

describe('isOpenAt', () => {
  it('uses café time, not the server clock', () => {
    expect(isOpenAt('07:00', '16:00', philly('06:59'))).toBe(false);
    expect(isOpenAt('07:00', '16:00', philly('07:00'))).toBe(true);
    expect(isOpenAt('07:00', '16:00', philly('15:59'))).toBe(true);
    expect(isOpenAt('07:00', '16:00', philly('16:00'))).toBe(false);
  });

  it('handles windows that cross midnight', () => {
    expect(isOpenAt('18:00', '02:00', philly('23:30'))).toBe(true);
    expect(isOpenAt('18:00', '02:00', philly('01:00'))).toBe(true);
    expect(isOpenAt('18:00', '02:00', philly('12:00'))).toBe(false);
  });
});
