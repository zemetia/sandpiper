/**
 * True for same-origin absolute paths only. Rejects `//evil.com` and `/\evil.com`
 * (browsers normalise the backslash), which would otherwise be open redirects.
 */
export const isSafePath = (path: string): boolean => /^\/(?![/\\])/.test(path);
