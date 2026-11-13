// Next.js keeps a client-sent X-Forwarded-For as is (it only fills it in when missing), so the
// leftmost entry is whatever the caller typed. Only trust what our own infrastructure wrote:
//   TRUSTED_IP_HEADER  — a header the edge overwrites on every request (cf-connecting-ip on
//                        Cloudflare, x-vercel-forwarded-for on Vercel, x-real-ip from nginx).
//   TRUSTED_PROXY_HOPS — reverse proxies that append to X-Forwarded-For (default 1). The client
//                        is the entry that many places from the right; everything left of it is
//                        caller-controlled. With 0 (Next.js facing the internet directly) the
//                        socket address is lost whenever the caller sends the header, so the
//                        per-IP limit is best-effort there — run behind a proxy in production.

const IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;
const IPV6 = /^[0-9a-f:.]+$/i;

function proxyHops(): number {
  const hops = Number(process.env['TRUSTED_PROXY_HOPS'] ?? 1);
  return Number.isInteger(hops) && hops >= 0 ? hops : 1;
}

// One IPv6 holder usually controls a whole /64, so bucket by prefix or rotation walks past the limit.
function normalize(raw: string | undefined): string | null {
  const ip = raw
    ?.trim()
    .replace(/^\[|\]$/g, '')
    .toLowerCase();
  if (!ip) return null;
  const mapped = ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  if (IPV4.test(mapped)) return mapped;
  if (!ip.includes(':') || !IPV6.test(ip)) return null;

  const [head = '', tail = ''] = ip.split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const groups = ip.includes('::')
    ? [...left, ...Array<string>(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right]
    : left;
  return `${groups
    .slice(0, 4)
    .map((g) => g.replace(/^0+(?=.)/, ''))
    .join(':')}::/64`;
}

export function clientIp(headers: Headers): string {
  const trustedHeader = process.env['TRUSTED_IP_HEADER'];
  if (trustedHeader) return normalize(headers.get(trustedHeader) ?? undefined) ?? 'unknown';

  const chain = (headers.get('x-forwarded-for') ?? '').split(',');
  const index = chain.length - Math.max(1, proxyHops());
  return normalize(chain[Math.max(0, index)]) ?? 'unknown';
}
