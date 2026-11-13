// @vitest-environment node
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { payloadSecret } from '../cms/secret';
import { clientIp } from './client-ip';
import { verifyCmsSession } from './cms-session';
import { applyRateLimit, resetRateLimits } from './rate-limit';

const encoder = new TextEncoder();
const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

async function signToken(claims: Record<string, unknown>, secret = payloadSecret) {
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(secret)));
  const hex = Array.from(hash, (b) => b.toString(16).padStart(2, '0')).join('');
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(hex.slice(0, 32)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const head = b64url(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body = b64url(encoder.encode(JSON.stringify(claims)));
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(`${head}.${body}`));
  return `${head}.${body}.${b64url(new Uint8Array(sig))}`;
}

const inAnHour = () => Math.floor(Date.now() / 1000) + 3600;

function request(path: string, init: { method?: string; headers?: Record<string, string> } = {}) {
  return new NextRequest(`http://localhost${path}`, init);
}

async function fire(times: number, make: (i: number) => NextRequest) {
  const statuses: number[] = [];
  for (let i = 0; i < times; i += 1) statuses.push((await applyRateLimit(make(i)))?.status ?? 200);
  return statuses;
}

describe('clientIp', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('ignores caller-supplied X-Forwarded-For entries left of the trusted proxy', () => {
    const headers = new Headers({ 'x-forwarded-for': '6.6.6.6, 1.2.3.4' });
    expect(clientIp(headers)).toBe('1.2.3.4');
    vi.stubEnv('TRUSTED_PROXY_HOPS', '2');
    expect(clientIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 1.2.3.4, 10.0.0.1' }))).toBe(
      '1.2.3.4',
    );
  });

  it('reads only the configured edge header when set', () => {
    vi.stubEnv('TRUSTED_IP_HEADER', 'cf-connecting-ip');
    const headers = new Headers({ 'cf-connecting-ip': '1.2.3.4', 'x-forwarded-for': '6.6.6.6' });
    expect(clientIp(headers)).toBe('1.2.3.4');
  });

  it('buckets IPv6 by /64 and rejects garbage', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '2001:db8:0:1::abcd' }))).toBe(
      '2001:db8:0:1::/64',
    );
    expect(clientIp(new Headers({ 'x-forwarded-for': '2001:db8:0:1:ffff::1' }))).toBe(
      '2001:db8:0:1::/64',
    );
    expect(clientIp(new Headers({ 'x-forwarded-for': '::ffff:1.2.3.4' }))).toBe('1.2.3.4');
    expect(clientIp(new Headers({ 'x-forwarded-for': '<script>' }))).toBe('unknown');
  });
});

describe('verifyCmsSession', () => {
  it('accepts a token signed with the Payload secret', async () => {
    expect(await verifyCmsSession(await signToken({ id: 7, exp: inAnHour() }))).toBe('7');
  });

  it('rejects forged, expired and malformed tokens', async () => {
    expect(await verifyCmsSession(await signToken({ id: 7, exp: inAnHour() }, 'wrong'))).toBeNull();
    expect(await verifyCmsSession(await signToken({ id: 7, exp: 1 }))).toBeNull();
    expect(await verifyCmsSession('abc')).toBeNull();
    expect(await verifyCmsSession(undefined)).toBeNull();
  });
});

describe('applyRateLimit', () => {
  beforeEach(() => resetRateLimits());

  it('limits login attempts per IP even when X-Forwarded-For is rotated', async () => {
    const statuses = await fire(12, (i) =>
      request('/api/users/login', {
        method: 'POST',
        headers: { 'x-forwarded-for': `10.0.0.${i}, 1.2.3.4` },
      }),
    );
    expect(statuses.slice(0, 10)).toEqual(Array(10).fill(200));
    expect(statuses.slice(10)).toEqual([429, 429]);
  });

  it('returns a Payload-style error body with Retry-After', async () => {
    await fire(10, () => request('/api/users/forgot-password', { method: 'POST' }));
    const res = await applyRateLimit(request('/api/users/forgot-password', { method: 'POST' }));
    expect(res?.status).toBe(429);
    expect(Number(res?.headers.get('retry-after'))).toBeGreaterThan(0);
    expect(((await res?.json()) as { errors: { message: string }[] }).errors[0]?.message).toMatch(
      /Too many requests/,
    );
  });

  it('treats anonymous GraphQL POSTs as auth attempts', async () => {
    const statuses = await fire(11, () => request('/api/graphql', { method: 'POST' }));
    expect(statuses.at(-1)).toBe(429);
  });

  it('does not raise the API limit for a fake session cookie', async () => {
    const statuses = await fire(61, () =>
      request('/api/pages', { headers: { cookie: 'payload-token=forged.token.value' } }),
    );
    expect(statuses.at(-1)).toBe(429);
  });

  it('gives a verified session the CMS limit', async () => {
    const token = await signToken({ id: 1, exp: inAnHour() });
    const statuses = await fire(100, () =>
      request('/api/pages', { headers: { cookie: `payload-token=${token}` } }),
    );
    expect(statuses.every((s) => s === 200)).toBe(true);
  });

  it('leaves non-API routes alone', async () => {
    expect(await fire(100, () => request('/menu'))).not.toContain(429);
  });
});
