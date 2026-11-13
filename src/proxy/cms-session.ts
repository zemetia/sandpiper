import { payloadSecret } from '../cms/secret';

// Verifies the Payload session cookie (HS256 JWT) without importing Payload, so a made-up
// `payload-token` can't buy the higher CMS rate limit. Payload signs with the first 32 hex
// chars of sha256(PAYLOAD_SECRET). Logout/session revocation is still enforced by Payload itself.

const encoder = new TextEncoder();
let keyPromise: Promise<CryptoKey> | null = null;

function signingKey(): Promise<CryptoKey> {
  keyPromise ??= crypto.subtle.digest('SHA-256', encoder.encode(payloadSecret)).then((hash) => {
    const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
    return crypto.subtle.importKey(
      'raw',
      encoder.encode(hex.slice(0, 32)),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
  });
  return keyPromise;
}

function base64UrlDecode(part: string): Uint8Array<ArrayBuffer> {
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')), (c) =>
    c.charCodeAt(0),
  );
}

function decodeJson(part: string): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(new TextDecoder().decode(base64UrlDecode(part)));
    return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Returns the signed-in user id, or null when the token is missing, forged or expired. */
export async function verifyCmsSession(token: string | undefined): Promise<string | null> {
  const [header, payload, signature] = token?.split('.') ?? [];
  if (!header || !payload || !signature) return null;
  if (decodeJson(header)?.['alg'] !== 'HS256') return null;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await signingKey(),
      base64UrlDecode(signature),
      encoder.encode(`${header}.${payload}`),
    );
    if (!valid) return null;
  } catch {
    return null;
  }

  const claims = decodeJson(payload);
  const exp = claims?.['exp'];
  const id = claims?.['id'];
  if (typeof exp !== 'number' || exp * 1000 <= Date.now()) return null;
  return typeof id === 'string' || typeof id === 'number' ? String(id) : null;
}
