import { describe, expect, it } from 'vitest';

import { isSafePath } from './safe-path';

describe('isSafePath', () => {
  it.each(['/', '/en', '/id/menu?x=1'])('accepts %s', (p) => expect(isSafePath(p)).toBe(true));
  it.each(['//evil.com', '/\\evil.com', 'https://evil.com', 'en/menu', ''])('rejects %s', (p) =>
    expect(isSafePath(p)).toBe(false),
  );
});
